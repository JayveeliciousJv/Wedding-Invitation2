import { useEffect, useState } from "react";

function diff(target: Date) {
  const now = new Date();
  const ms = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const items = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hours" },
    { v: t.m, l: "Minutes" },
    { v: t.s, l: "Seconds" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {items.map((i, idx) => (
        <div key={i.l} className="flex items-center">
          <div
            className="text-center min-w-[64px] sm:min-w-[88px] px-2 py-3 sm:px-4 sm:py-4 rounded-2xl border border-white/10"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", backdropFilter: "blur(6px)" }}
          >
            <div className="font-serif text-3xl sm:text-5xl text-gold tabular-nums">
              {String(i.v).padStart(2, "0")}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-soft mt-1">
              {i.l}
            </div>
          </div>
          {idx < items.length - 1 && <div className="text-gold/50 mx-1">·</div>}
        </div>
      ))}
    </div>
  );
}
