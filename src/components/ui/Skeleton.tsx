'use client';
import { motion } from 'framer-motion';
import { shimmer } from '@/lib/animations';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: string;
}

export default function Skeleton({ className, width, height, rounded = '12px' }: SkeletonProps) {
  return (
    <motion.div
      variants={shimmer}
      animate="animate"
      className={clsx(className)}
      style={{
        width,
        height,
        borderRadius: rounded,
        background: 'var(--glass-medium)',
        border: '0.5px solid var(--glass-border)',
      }}
    />
  );
}
