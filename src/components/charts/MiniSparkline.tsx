'use client';
import {
  AreaChart, Area, ResponsiveContainer,
} from 'recharts';

interface MiniSparklineProps {
  data: Array<{ amount: number }>;
  height?: number;
}

export default function MiniSparkline({ data, height = 56 }: MiniSparklineProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#818CF8"
            strokeWidth={1.5}
            fill="url(#sparkGrad)"
            dot={false}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
