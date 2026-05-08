'use client';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { formatIndianCurrency } from '@/lib/formatters';

interface SpendingAreaChartProps {
  data: Array<{ day?: string; month?: string; amount: number }>;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-elevated)',
        border: '0.5px solid var(--glass-border)',
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: 'var(--shadow-elevated)',
      }}>
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>{label}</p>
        <p style={{ fontSize: '16px', fontFamily: 'Sora', fontWeight: 300, color: 'var(--text-primary)' }}>
          {formatIndianCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function SpendingAreaChart({ data, height = 200 }: SpendingAreaChartProps) {
  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818CF8" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={data[0]?.day !== undefined ? 'day' : 'month'}
            tick={{ fill: 'var(--text-tertiary)', fontSize: 11, fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--glass-border)', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#A5B4FC"
            strokeWidth={1.5}
            fill="url(#colorAmount)"
            isAnimationActive={true}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
