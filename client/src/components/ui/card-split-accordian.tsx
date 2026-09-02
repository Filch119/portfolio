/*
 * Watermelon UI registry-compatible primitive: Card Split Accordian.
 * Design reminder: strict black-and-white grayscale, strong split composition,
 * and Motion Primitive-style height/opacity transitions. Keep the component
 * useful for editable placeholder portfolio data.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export type CardSplitAccordianItem = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  role: string;
  stack: string;
  href: string;
};

type CardSplitAccordianProps = {
  items: CardSplitAccordianItem[];
};

export function CardSplitAccordian({ items }: CardSplitAccordianProps) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState(items[0]?.id ?? "");

  return (
    <div className="card-split-accordian" aria-label="Project portfolio">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <motion.article
            key={item.id}
            layout
            className={`split-project ${isOpen ? "is-open" : ""}`}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button
              className="split-project-trigger"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${item.id}-details`}
              onClick={() => setOpenId(isOpen ? "" : item.id)}
            >
              <span className="split-project-index">{item.index}</span>
              <span className="split-project-heading">
                <span className="split-project-eyebrow">{item.eyebrow}</span>
                <span className="split-project-title">{item.title}</span>
              </span>
              <span className="split-project-toggle" aria-hidden="true">
                <ChevronDown size={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${item.id}-details`}
                  className="split-project-details"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="split-project-summary">
                    <p>{item.description}</p>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      View project / GitHub <ArrowUpRight size={15} />
                    </a>
                  </div>
                  <dl className="split-project-facts">
                    <div><dt>role / contribution</dt><dd>{item.role}</dd></div>
                    <div><dt>tools / technologies</dt><dd>{item.stack}</dd></div>
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
