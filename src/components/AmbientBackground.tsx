"use client";

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-32 left-[-10%] hidden h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.18),_transparent_62%)] blur-3xl md:block" />
      <div className="absolute right-[-14%] top-[18%] hidden h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.14),_transparent_60%)] blur-3xl md:block" />
      <div className="absolute bottom-[-18rem] left-[28%] hidden h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.12),_transparent_58%)] blur-3xl md:block" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 dark:opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0%,transparent_42%,rgba(255,255,255,0.55)_100%)] dark:bg-[radial-gradient(circle_at_top,transparent_0%,transparent_42%,rgba(2,6,23,0.72)_100%)]" />
    </div>
  );
}
