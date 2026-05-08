'use client';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

function formatIndian(n: number, prefix = '₹'): string {
  const s = Math.floor(n).toString();
  if (s.length <= 3) return prefix + s;
  const last3 = s.slice(-3);
  const rest  = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return prefix + rest + ',' + last3;
}

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  className?: string;
  duration?: number;
  plain?: boolean;
}

export default function AnimatedCounter({
  value, prefix = '₹', className, duration = 1400, plain = false
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const steps = 80;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (current >= steps) { setCount(value); clearInterval(timer); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value, isInView, duration]);

  return (
    <span ref={ref} className={className}>
      {plain ? count : formatIndian(count, prefix)}
    </span>
  );
}
