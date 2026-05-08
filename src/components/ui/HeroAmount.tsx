'use client';
import { motion } from 'framer-motion';
import { heroReveal } from '@/lib/animations';
import AnimatedCounter from './AnimatedCounter';

interface HeroAmountProps {
  amount: number;
  label?: string;
  subLabel?: string;
  size?: 'hero' | 'large';
  prefix?: string;
  delay?: number;
}

export default function HeroAmount({
  amount, label, subLabel, size = 'hero', prefix = '₹', delay = 0
}: HeroAmountProps) {
  return (
    <motion.div variants={heroReveal} initial="initial" animate="animate"
      style={{ transitionDelay: `${delay}s` }}>
      {label && (
        <p className="section-label mb-2">{label}</p>
      )}
      <div className="flex items-end gap-1">
        <span style={{ color: 'var(--text-secondary)', fontSize: size === 'hero' ? '28px' : '18px',
          fontWeight: 300, fontFamily: 'Sora', letterSpacing: '-0.02em', lineHeight: 1,
          marginBottom: size === 'hero' ? '8px' : '4px' }}>
          {prefix}
        </span>
        <AnimatedCounter
          value={amount}
          prefix=""
          className={size === 'hero' ? 'hero-amount' : 'hero-amount-large'}
        />
      </div>
      {subLabel && (
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)',
          marginTop: '8px', letterSpacing: '-0.01em' }}>
          {subLabel}
        </p>
      )}
    </motion.div>
  );
}
