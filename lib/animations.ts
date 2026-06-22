import { Variants } from "framer-motion";

// FADE UP — Elemen masuk dari bawah (mayoritas usage)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// FADE IN — Tanpa movement
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

// SLIDE FROM RIGHT
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// SLIDE FROM LEFT
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// SCALE IN — Spring overshoot untuk icons & pills
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay },
  }),
};

// STAGGER CONTAINER
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// NODE ENTRY — Spring dengan overshoot untuk icon nodes
export const nodeEnter: Variants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.4 + i * 0.08,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

// SLIDE TESTIMONIAL
export const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-30%" : "30%",
    opacity: 0,
  }),
};
