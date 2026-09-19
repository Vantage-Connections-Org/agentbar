"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Fades a section in when it scrolls into view. Server-rendered visible: only sections that
 *  start below the fold are hidden (after hydration) and revealed, so first paint is never
 *  delayed and the page reads fine without JavaScript. Respects reduced motion. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight) return; // already on screen: leave it alone
    el.classList.add("reveal-pending");
    if (delay) el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("reveal-in");
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
