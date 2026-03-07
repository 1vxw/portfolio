"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function VisitCount() {
  const [views, setViews] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/vincepradas.github.io/portfolio")
      .then((res) => res.json())
      .then((data) => setViews(data.value))
      .catch(() => setViews(0));
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="rounded-full border border-cyan-400/40 bg-black/30 px-2 py-[4px] text-xs font-semibold text-cyan-400 backdrop-blur-md select-none dark:bg-white/10">
        {views ?? "..."} visits
      </div>
    </div>
  );
}
