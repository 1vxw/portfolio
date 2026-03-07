"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const orbitDots = [
  { top: "12%", left: "8%", size: "h-3 w-3", delay: 0 },
  { top: "22%", right: "14%", size: "h-4 w-4", delay: 0.6 },
  { bottom: "28%", left: "12%", size: "h-2.5 w-2.5", delay: 1.2 },
  { bottom: "14%", right: "10%", size: "h-5 w-5", delay: 1.8 },
];

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{ y: ySlow, rotate }}
        className="absolute -top-32 left-[-10%] hidden h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.18),_transparent_62%)] blur-3xl md:block"
      />
      <motion.div
        style={{ y: yFast }}
        className="absolute right-[-14%] top-[18%] hidden h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.14),_transparent_60%)] blur-3xl md:block"
      />
      <motion.div
        style={{ y: ySlow }}
        className="absolute bottom-[-18rem] left-[28%] hidden h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.12),_transparent_58%)] blur-3xl md:block"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 dark:opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0%,transparent_42%,rgba(255,255,255,0.55)_100%)] dark:bg-[radial-gradient(circle_at_top,transparent_0%,transparent_42%,rgba(2,6,23,0.72)_100%)]" />
    </div>
  );
}
