import { TargetAndTransition } from "framer-motion";
import { HuyenCoState } from "./HuyenCoState";

export const motionVariants: Record<HuyenCoState, {
  head: TargetAndTransition;
  eyes: TargetAndTransition;
  glow: TargetAndTransition;
  hand?: TargetAndTransition;
}> = {
  IDLE: {
    head: { y: [0, -1.5, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    eyes: { scaleY: [1, 1, 0.1, 1], transition: { duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1] } },
    glow: { opacity: [0.3, 0.5, 0.3], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
  },
  CURIOUS: {
    head: { rotate: 6, y: -2, transition: { duration: 0.3, ease: "easeOut" } },
    eyes: { scaleY: 1.1, transition: { duration: 0.2 } },
    glow: { opacity: 0.7, transition: { duration: 0.3 } },
  },
  THINKING: {
    head: { rotate: -3, y: -1, transition: { duration: 0.4 } },
    eyes: { scaleY: [0.9, 1, 0.9], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
    glow: { opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1], transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } },
  },
  UNDERSTANDING: {
    head: { y: [0, 3, 0], transition: { duration: 0.4, ease: "easeInOut" } },
    eyes: { scaleY: 1, transition: { duration: 0.2 } },
    glow: { opacity: 0.8, transition: { duration: 0.3 } },
  },
  EXPLAINING: {
    head: { rotate: [0, 2, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
    eyes: { scaleY: 1, transition: { duration: 0.2 } },
    glow: { opacity: 0.9, transition: { duration: 0.5 } },
  },
  ENCOURAGING: {
    head: { y: [0, -3, 0], transition: { duration: 0.4 } },
    eyes: { scaleY: 1.15, transition: { duration: 0.3 } },
    glow: { opacity: 1, transition: { duration: 0.3 } },
  },
  REMEMBERED: {
    head: { rotate: [0, -4, 0], y: [0, -2, 0], transition: { duration: 0.5 } },
    eyes: { scaleY: [1, 1.2, 1], transition: { duration: 0.4 } },
    glow: { opacity: [0.5, 1, 0.8], transition: { duration: 0.5 } },
  },
};
