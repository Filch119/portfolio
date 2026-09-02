/*
 * Typed adapter for the shadcn-generated React Bits Particles-JS-CSS source.
 * The implementation remains in Particles.jsx exactly as added by the registry;
 * this adapter gives the portfolio a stable TypeScript-facing prop contract.
 */

import type { ComponentType } from "react";

export type ParticlesProps = {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  className?: string;
};

// The registry source is JavaScript by design; the adapter exposes its typed props.
import ParticlesSource from "./Particles.jsx";

const Particles = ParticlesSource as ComponentType<ParticlesProps>;

export default Particles;
