import { motion, type Variants, type HTMLMotionProps } from 'framer-motion'

// ── Variants ─────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
}

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
}

const itemScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
}

// ── Exports ──────────────────────────────────────────────────────────────

/**
 * Wraps children with staggered entry animation.
 * Each child should be wrapped in <StaggerItem> or have its own variant control.
 */
export const StaggerContainer = ({ children, ...props }: HTMLMotionProps<'div'>) => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" {...props}>
    {children}
  </motion.div>
)

/**
 * Individual item that fades up when its parent StaggerContainer enters.
 */
export const StaggerItem = ({ children, ...props }: HTMLMotionProps<'div'>) => (
  <motion.div variants={itemFadeUp} {...props}>
    {children}
  </motion.div>
)

/**
 * Individual item that scales in (for modals, cards, etc.).
 */
export const StaggerScaleItem = ({ children, ...props }: HTMLMotionProps<'div'>) => (
  <motion.div variants={itemScaleIn} {...props}>
    {children}
  </motion.div>
)
