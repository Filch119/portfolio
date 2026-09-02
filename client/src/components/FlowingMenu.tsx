/*
 * Typed adapter for the shadcn-generated React Bits FlowingMenu source.
 * The generated marquee behavior remains in FlowingMenu.jsx and is styled by
 * FlowingMenu.css; this wrapper keeps the page implementation type-safe.
 */

import type { ComponentType } from "react";

export type FlowingMenuItem = {
  link: string;
  text: string;
  image: string;
};

export type FlowingMenuProps = {
  items?: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
};

import FlowingMenuSource from "./FlowingMenu.jsx";

const FlowingMenu = FlowingMenuSource as ComponentType<FlowingMenuProps>;

export default FlowingMenu;
