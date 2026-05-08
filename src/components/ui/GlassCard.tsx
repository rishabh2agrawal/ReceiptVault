'use client';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cardHover, buttonTap } from '@/lib/animations';
import clsx from 'clsx';

type GlowColor = 'none' | 'indigo' | 'amber' | 'rose' | 'emerald';

const glowShadows: Record<GlowColor, string> = {
  none:    '',
  indigo:  '0 0 32px rgba(129,140,248,0.20)',
  amber:   '0 0 32px rgba(251,191,36,0.20)',
  rose:    '0 0 32px rgba(248,113,113,0.20)',
  emerald: '0 0 32px rgba(52,211,153,0.20)',
};

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  glowColor?: GlowColor;
  pressable?: boolean;
  noPadding?: boolean;
}

export default function GlassCard({
  children, className, glowColor = 'none',
  pressable = false, noPadding = false, onClick, ...props
}: GlassCardProps) {
  const extraShadow = glowShadows[glowColor];
  return (
    <motion.div
      className={clsx('glass-card', !noPadding && 'p-5', className)}
      style={extraShadow ? { boxShadow: `var(--shadow-card), ${extraShadow}` } : undefined}
      whileHover={pressable || onClick ? cardHover : undefined}
      whileTap={pressable || onClick ? buttonTap : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
