import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatter?: (v: number) => string;
}

export function AnimatedCounter({
  value,
  duration = 600,
  formatter = String,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value);
  const raf = useRef(0);
  const start = useRef(0);
  const from = useRef(value);
  const prev = useRef(value);

  useEffect(() => {
    if (value === prev.current) return;
    from.current = prev.current;
    prev.current = value;
    start.current = 0;

    function tick(now: number) {
      if (!start.current) start.current = now;
      const elapsed = now - start.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplay(from.current + (value - from.current) * eased);
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    }

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value, duration]);

  return (
    <span className="animate-[counter-in_0.3s_ease-out]">
      {formatter(Math.round(display))}
    </span>
  );
}
