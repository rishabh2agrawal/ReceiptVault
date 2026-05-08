import { Variants } from 'framer-motion';

// Page enter/exit transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

// Staggered container — parent of staggered children
export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

// Individual staggered child
export const staggerChild: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

// Fade in only (for charts, backgrounds)
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

// Slide in from left (sidebar items)
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

// Scale in (cards, modals)
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
};

// Hero number reveal
export const heroReveal: Variants = {
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// Card hover — used with whileHover
export const cardHover = {
  y: -4,
  boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.12)',
  transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
};

// Button press — used with whileTap
export const buttonTap = {
  scale: 0.97,
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
};

// Sidebar nav item active indicator
export const navIndicator: Variants = {
  initial: { opacity: 0, scaleX: 0 },
  animate: { opacity: 1, scaleX: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
};

// Table row stagger
export const tableRow: Variants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
};

// Floating orb animation (ambient background blobs)
export const floatingOrb: Variants = {
  animate: {
    y: [0, -20, 0],
    scale: [1, 1.05, 1],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

// Pulse (for Gemini Active badge, urgent deadline dots)
export const pulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

// Shimmer skeleton
export const shimmer: Variants = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

// Count-up spring (for stat numbers)
export const numberReveal: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 20, delay: 0.2 } },
};

// Notification bell swing
export const bellSwing: Variants = {
  animate: {
    rotate: [-12, 12, -8, 8, -4, 4, 0],
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

// Scan line (one-time boot effect)
export const scanLine: Variants = {
  initial: { top: '-2px', opacity: 0.8 },
  animate: { top: '100vh', opacity: 0, transition: { duration: 1.2, ease: 'linear' as const, delay: 0.5 } },
};
