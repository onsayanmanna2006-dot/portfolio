"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global Framer Motion config. `reducedMotion="user"` makes every motion component
 * skip transform/scale animations when the OS has "reduce motion" enabled.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
