import type { CSSProperties, ReactNode } from "react";

/** Fades a section in as it scrolls into view, with a CSS scroll-driven animation
 *  (see .reveal in globals.css). No JavaScript: content is visible by default and only
 *  animates in browsers that support animation-timeline, unless reduced motion is on. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const style = delay ? ({ "--reveal-delay": `${Math.round(delay * 100)}%` } as CSSProperties) : undefined;
  return (
    <div className={className ? `reveal ${className}` : "reveal"} style={style}>
      {children}
    </div>
  );
}
