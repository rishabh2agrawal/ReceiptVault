'use client';
import { motion } from 'framer-motion';
import { pulse } from '@/lib/animations';

interface DeadlineBadgeProps { daysLeft: number | null; }

export default function DeadlineBadge({ daysLeft }: DeadlineBadgeProps) {
  if (daysLeft === null) return (
    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)',
      background: 'var(--bg-tertiary)', borderRadius: '8px',
      padding: '3px 8px', fontWeight: 600 }}>
      Safe ✓
    </span>
  );
  if (daysLeft < 0) return (
    <span style={{ fontSize: '11px', color: 'var(--rose)',
      background: 'var(--rose-dim)', borderRadius: '8px',
      padding: '3px 8px', fontWeight: 600 }}>
      Expired
    </span>
  );
  if (daysLeft === 0 || daysLeft === 1) return (
    <motion.span variants={pulse} animate="animate"
      style={{ fontSize: '11px', color: 'var(--rose)',
        background: 'var(--rose-dim)', borderRadius: '8px',
        padding: '3px 8px', fontWeight: 600, display: 'inline-block' }}>
      {daysLeft === 0 ? 'Today!' : 'Tomorrow!'}
    </motion.span>
  );
  if (daysLeft <= 3) return (
    <span style={{ fontSize: '11px', color: 'var(--amber)',
      background: 'var(--amber-dim)', borderRadius: '8px',
      padding: '3px 8px', fontWeight: 600 }}>
      {daysLeft}d left
    </span>
  );
  return (
    <span style={{ fontSize: '11px', color: 'var(--accent)',
      background: 'var(--accent-dim)', borderRadius: '8px',
      padding: '3px 8px', fontWeight: 600 }}>
      {daysLeft}d left
    </span>
  );
}
