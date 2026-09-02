/*
 * Dark Quiet pill marquee.
 * The visual language is intentionally flat: text-only pills, one quiet border,
 * and continuous left-to-right motion. Reduced-motion users receive one static,
 * horizontally scrollable set instead of duplicated animated content.
 */

import { useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import "./PillMarquee.css";

export type PillMarqueeItem = {
  id: string;
  label: string;
  meta?: string;
  href?: string;
};

type PillMarqueeProps = {
  items: PillMarqueeItem[];
  ariaLabel: string;
  duration?: number;
};

function PillSet({ items, hidden = false }: { items: PillMarqueeItem[]; hidden?: boolean }) {
  return (
    <div className="pill-marquee-set" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <a
          className="pill-marquee-pill"
          href={item.href ?? `#${item.id}`}
          key={item.id}
          tabIndex={hidden ? -1 : undefined}
        >
          <span className="pill-marquee-pill-copy">
            {item.meta && <small>{item.meta}</small>}
            <strong>{item.label}</strong>
          </span>
          {/* <ArrowUpRight size={13} aria-hidden="true" /> */}
        </a>
      ))}
    </div>
  );
}

export default function PillMarquee({ items, ariaLabel, duration = 38 }: PillMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const animationStyle = { "--pill-marquee-duration": `${duration}s` } as CSSProperties;

  return (
    <div className={`pill-marquee ${reduceMotion ? "is-reduced" : ""}`}>
      <div className="pill-marquee-viewport" aria-label={ariaLabel}>
        <div className="pill-marquee-track" style={animationStyle}>
          <PillSet items={items} />
          {!reduceMotion && <PillSet items={items} hidden />}
        </div>
      </div>
      <p className="pill-marquee-help">
        <span /> {reduceMotion ? "scroll to browse" : "hover or focus to pause"} <span />
      </p>
    </div>
  );
}
