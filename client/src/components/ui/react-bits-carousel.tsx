/*
 * React Bits-inspired carousel primitive.
 * Source direction: https://reactbits.dev/components/carousel
 * Adapted for this portfolio so the active project remains a flat editorial panel,
 * controls stay as sibling buttons, and no card component is nested inside another.
 */

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { ReactNode, useCallback, useEffect, useState } from "react";

export type ReactBitsCarouselItem = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  image?: string;
  meta?: string;
  role?: string;
  stack?: string;
  href?: string;
};

type ReactBitsCarouselProps = {
  items: ReactBitsCarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  onImageClick?: (item: ReactBitsCarouselItem) => void;
};

export function ReactBitsCarousel({
  items,
  baseWidth = 680,
  autoplay = false,
  autoplayDelay = 4000,
  pauseOnHover = true,
  loop = true,
  onImageClick,
}: ReactBitsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((nextIndex: number) => {
    if (!items.length) return;
    if (loop) {
      setActiveIndex((nextIndex + items.length) % items.length);
      return;
    }
    setActiveIndex(Math.min(Math.max(nextIndex, 0), items.length - 1));
  }, [items.length, loop]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrevious = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoplay || isPaused || items.length < 2) return;
    const timer = window.setInterval(goNext, autoplayDelay);
    return () => window.clearInterval(timer);
  }, [activeIndex, autoplay, autoplayDelay, goNext, isPaused, items.length]);

  if (!items.length) return null;
  const activeItem = items[activeIndex];
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  };

  return (
    <section
      className="reactbits-carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ "--carousel-width": `${baseWidth}px` } as React.CSSProperties}
      aria-roledescription="carousel"
      aria-label="Projects carousel"
      aria-live="polite"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="reactbits-viewport">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={activeItem.id}
            className={`reactbits-slide ${activeItem.image ? "has-image" : ""}`}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            aria-roledescription="slide"
            aria-label={`${activeIndex + 1} of ${items.length}`}
          >
            <div className="reactbits-slide-body">
              <div className="reactbits-slide-icon">{activeItem.icon}</div>
              <div className="reactbits-slide-copy">
                <span className="reactbits-slide-meta">{activeItem.meta ?? `project / 0${activeIndex + 1}`}</span>
                <h3>{activeItem.title}</h3>
                <p>{activeItem.description}</p>
                <dl className="reactbits-slide-facts">
                  <div><dt>role</dt><dd>{activeItem.role ?? "[your contribution]"}</dd></div>
                  <div><dt>tools</dt><dd>{activeItem.stack ?? "[technologies used]"}</dd></div>
                </dl>
                {activeItem.href && <a href={activeItem.href} target="_blank" rel="noreferrer">View project <ChevronRight size={14} /></a>}
              </div>
            </div>
            {activeItem.image && (
              <div
                className="reactbits-slide-image-frame"
                onClick={() => onImageClick?.(activeItem)}
                role={onImageClick ? "button" : undefined}
                tabIndex={onImageClick ? 0 : undefined}
                title="Click to expand full project screenshot"
              >
                <img src={activeItem.image} alt={activeItem.title} />
                <span className="reactbits-slide-image-overlay">
                  <Maximize2 size={12} /> expand preview
                </span>
              </div>
            )}
            <span className="reactbits-slide-count">0{activeIndex + 1} / 0{items.length}</span>
          </motion.article>
        </AnimatePresence>
      </div>
      <div className="reactbits-controls">
        <button type="button" onClick={goPrevious} disabled={!loop && activeIndex === 0} aria-label="Previous project"><ChevronLeft size={16} /></button>
        <div className="reactbits-dots" role="tablist" aria-label="Choose project">
          {items.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={activeIndex === index} aria-label={`Show ${item.title}`} onClick={() => goTo(index)}><span /></button>)}
        </div>
        <button type="button" onClick={goNext} disabled={!loop && activeIndex === items.length - 1} aria-label="Next project"><ChevronRight size={16} /></button>
      </div>
    </section>
  );
}
