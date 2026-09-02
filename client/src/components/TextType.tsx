/*
 * Typed adapter for the shadcn-generated React Bits TextType source.
 * The generated implementation remains in TextType.jsx and reuses GSAP.
 */

import type { ComponentType, ElementType, ReactNode } from "react";

export type TextTypeProps = {
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: ReactNode;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
};

import TextTypeSource from "./TextType.jsx";

const TextType = TextTypeSource as ComponentType<TextTypeProps>;

export default TextType;
