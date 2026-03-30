"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";

export type Transition = {
  duration?: number;
  delay?: number;
  ease?: string;
  type?: string;
  stiffness?: number;
  damping?: number;
};

type Variants = Record<string, Record<string, unknown>>;

type TargetLike = Record<string, unknown> | string | undefined;

type ViewportOptions = {
  once?: boolean;
  margin?: string;
  amount?: number;
};

type MotionProps = {
  initial?: TargetLike | false;
  animate?: TargetLike;
  whileInView?: TargetLike;
  whileHover?: TargetLike;
  whileTap?: TargetLike;
  transition?: Transition;
  variants?: Variants;
  viewport?: ViewportOptions;
  style?: CSSProperties & Record<string, unknown>;
};

export type HTMLMotionProps<T extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[T] & MotionProps;

type Listener = (value: number) => void;

class MotionValue {
  private value: number;
  private listeners = new Set<Listener>();

  constructor(initial: number) {
    this.value = initial;
  }

  get() {
    return this.value;
  }

  set(next: number) {
    if (this.value === next) return;
    this.value = next;
    this.listeners.forEach((listener) => listener(next));
  }

  onChange(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

const isMotionValue = (value: unknown): value is MotionValue => {
  return (
    typeof value === "object" &&
    value !== null &&
    "get" in value &&
    "set" in value &&
    "onChange" in value
  );
};

const resolveTarget = (
  value: TargetLike,
  variants?: Variants,
): Record<string, unknown> | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") {
    return variants?.[value];
  }
  return value;
};

const toGsapVars = (
  target: Record<string, unknown> | undefined,
  transition?: Transition,
): gsap.TweenVars => {
  if (!target) return {};
  const transformKeys = new Set([
    "x",
    "y",
    "z",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
    "translateX",
    "translateY",
  ]);
  const hasTransform = Object.keys(target).some((key) => transformKeys.has(key));
  return {
    ...target,
    duration: transition?.duration,
    delay: transition?.delay,
    ease: transition?.ease,
    overwrite: "auto",
    force3D: hasTransform ? true : undefined,
  };
};

type InViewCallback = (entry: IntersectionObserverEntry) => void;

const observerRegistry = new Map<string, IntersectionObserver>();
const observerCallbacks = new Map<Element, InViewCallback>();

const getObserverKey = (options?: ViewportOptions) =>
  `${options?.margin ?? "0px"}|${options?.amount ?? 0.1}`;

const getObserver = (options?: ViewportOptions) => {
  const key = getObserverKey(options);
  const existing = observerRegistry.get(key);
  if (existing) return existing;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        observerCallbacks.get(entry.target)?.(entry);
      });
    },
    {
      rootMargin: options?.margin ?? "0px",
      threshold: options?.amount ?? 0.1,
    },
  );

  observerRegistry.set(key, observer);
  return observer;
};

const observeInView = (
  element: Element,
  options: ViewportOptions | undefined,
  callback: InViewCallback,
) => {
  const observer = getObserver(options);
  observerCallbacks.set(element, callback);
  observer.observe(element);

  return () => {
    observerCallbacks.delete(element);
    observer.unobserve(element);
  };
};

const useMotionElement = (
  ref: React.RefObject<HTMLElement | null>,
  props: MotionProps,
) => {
  const {
    initial,
    animate,
    whileInView,
    whileHover,
    whileTap,
    transition,
    variants,
    viewport,
    style,
  } = props;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initialTarget = resolveTarget(initial as TargetLike, variants);
    if (initial !== false && initialTarget) {
      gsap.set(el, initialTarget as gsap.TweenVars);
    }

    const animateTarget = resolveTarget(animate, variants);
    if (animateTarget) {
      gsap.to(el, toGsapVars(animateTarget, transition));
    }
  }, [ref, initial, animate, variants, transition]);

  useEffect(() => {
    const el = ref.current;
    const inViewTarget = resolveTarget(whileInView, variants);
    if (!el || !inViewTarget) return;

    const cleanup = observeInView(el, viewport, (entry) => {
      if (!entry.isIntersecting) return;
      gsap.to(el, toGsapVars(inViewTarget, transition));
      if (viewport?.once !== false) cleanup();
    });

    return cleanup;
  }, [
    ref,
    whileInView,
    variants,
    transition,
    viewport?.margin,
    viewport?.once,
    viewport?.amount,
  ]);

  useEffect(() => {
    const el = ref.current;
    const hoverTarget = resolveTarget(whileHover, variants);
    if (!el || !hoverTarget) return;

    const onEnter = () => gsap.to(el, toGsapVars(hoverTarget, transition));
    const onLeave = () => {
      const animateTarget = resolveTarget(animate, variants);
      if (animateTarget) gsap.to(el, toGsapVars(animateTarget, transition));
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, whileHover, animate, variants, transition]);

  useEffect(() => {
    const el = ref.current;
    const tapTarget = resolveTarget(whileTap, variants);
    if (!el || !tapTarget) return;

    const onDown = () => gsap.to(el, toGsapVars(tapTarget, transition));
    const onUp = () => {
      const animateTarget = resolveTarget(animate, variants);
      if (animateTarget) gsap.to(el, toGsapVars(animateTarget, transition));
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, [ref, whileTap, animate, variants, transition]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !style) return;

    const unsubscribers: Array<() => void> = [];

    Object.entries(style).forEach(([key, value]) => {
      if (!isMotionValue(value)) return;

      gsap.set(el, { [key]: value.get() });
      unsubscribers.push(
        value.onChange((next) => {
          gsap.set(el, { [key]: next });
        }),
      );
    });

    return () => {
      unsubscribers.forEach((dispose) => dispose());
    };
  }, [ref, style]);
};

const createMotionComponent = <T extends keyof React.JSX.IntrinsicElements>(
  tag: T,
) => {
  type Props = HTMLMotionProps<T>;

  const Component = React.forwardRef<HTMLElement, Props>(
    (props, externalRef) => {
      const {
        children,
        initial,
        animate,
        whileInView,
        whileHover,
        whileTap,
        transition,
        variants,
        viewport,
        style,
        ...rest
      } = props as Props & MotionProps;

      const innerRef = useRef<HTMLElement | null>(null);

      useMotionElement(innerRef, {
        initial,
        animate,
        whileInView,
        whileHover,
        whileTap,
        transition,
        variants,
        viewport,
        style,
      });

      const mergedStyle = useMemo(() => {
        if (!style) return undefined;
        const result: Record<string, unknown> = {};
        Object.entries(style).forEach(([key, value]) => {
          result[key] = isMotionValue(value) ? value.get() : value;
        });
        return result as CSSProperties;
      }, [style]);

      return React.createElement(
        tag,
        {
          ...rest,
          ref: (node: HTMLElement | null) => {
            innerRef.current = node;
            if (typeof externalRef === "function") externalRef(node);
            else if (externalRef && typeof externalRef === "object") {
              (
                externalRef as React.MutableRefObject<HTMLElement | null>
              ).current = node;
            }
          },
          style: mergedStyle,
        },
        children,
      );
    },
  );

  Component.displayName = `GsapMotion.${String(tag)}`;
  return Component;
};

export const motion = new Proxy(
  {},
  {
    get: (_target, prop: string) =>
      createMotionComponent(prop as keyof React.JSX.IntrinsicElements),
  },
) as unknown as {
  [key: string]: React.ComponentType<Record<string, unknown>>;
};

export function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useInView(
  ref: React.RefObject<Element | null>,
  options?: { once?: boolean; margin?: string },
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const checkInitial = () => {
      const rect = target.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) setInView(true);
    };

    checkInitial();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.once) observer.disconnect();
        } else if (!options?.once) {
          setInView(false);
        }
      },
      { rootMargin: options?.margin ?? "0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref, options?.margin, options?.once]);

  return inView;
}

export function useMotionValue(initial: number) {
  return useMemo(() => new MotionValue(initial), [initial]);
}

export function useScroll(options?: {
  container?: React.RefObject<HTMLElement>;
}) {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const container = options?.container?.current;
    const source: HTMLElement | Window = container ?? window;

    const update = () => {
      const currentY = container ? container.scrollTop : window.scrollY;
      const maxScroll = container
        ? container.scrollHeight - container.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;

      scrollY.set(currentY);
      scrollYProgress.set(maxScroll > 0 ? currentY / maxScroll : 0);
    };

    update();
    source.addEventListener("scroll", update, { passive: true });
    return () => source.removeEventListener("scroll", update as EventListener);
  }, [options?.container, scrollY, scrollYProgress]);

  return { scrollY, scrollYProgress };
}

export function useSpring(value: MotionValue) {
  return value;
}

export function useTransform(
  value: MotionValue,
  inputOrMapper: [number, number] | ((v: number) => number | string),
  output?: [number, number],
  options?: { clamp?: boolean },
) {
  const derived = useMotionValue(0);

  useEffect(() => {
    const compute = (v: number) => {
      if (typeof inputOrMapper === "function") {
        return inputOrMapper(v);
      }

      const [inMin, inMax] = inputOrMapper;
      const [outMin, outMax] = output ?? [0, 1];
      const rawRatio = inMax === inMin ? 0 : (v - inMin) / (inMax - inMin);
      const ratio =
        options?.clamp === false
          ? rawRatio
          : Math.max(0, Math.min(1, rawRatio));
      return outMin + ratio * (outMax - outMin);
    };

    const initial = compute(value.get());
    if (typeof initial === "number") derived.set(initial);

    return value.onChange((next) => {
      const mapped = compute(next);
      if (typeof mapped === "number") derived.set(mapped);
    });
  }, [value, inputOrMapper, output, derived, options?.clamp]);

  return derived;
}

export function useVelocity(value: MotionValue) {
  const velocity = useMotionValue(0);

  useEffect(() => {
    let lastValue = value.get();
    let lastTime = performance.now();

    return value.onChange((next) => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      if (dt > 0) {
        velocity.set((next - lastValue) / dt);
      }
      lastValue = next;
      lastTime = now;
    });
  }, [value, velocity]);

  return velocity;
}

export function useAnimationFrame(
  callback: (time: number, delta: number) => void,
) {
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (time: number) => {
      const delta = time - last;
      last = time;
      callback(time, delta);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [callback]);
}
