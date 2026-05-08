'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerChild, fadeIn, buttonTap } from '@/lib/animations';
import { mockCategories, mockSpendingByMonth, mockSpendingByWeek, mockSpendingByYear, mockReceipts } from '@/lib/mockData';
import { formatIndianCurrency } from '@/lib/formatters';
import GlassCard from '@/components/ui/GlassCard';
import HeroAmount from '@/components/ui/HeroAmount';
import SpendingAreaChart from '@/components/charts/SpendingAreaChart';
import SectionHeader from '@/components/ui/SectionHeader';
import PageWrapper from '@/components/layout/PageWrapper';

type Period = 'Week' | 'Month' | 'Year';

const periodData: Record<Period, { data: any[]; total: number }> = {
  Week: { data: mockSpendingByWeek, total: mockSpendingByWeek.reduce((s, d) => s + d.amount, 0) },
  Month: { data: mockSpendingByMonth, total: mockSpendingByMonth.reduce((s, d) => s + d.amount, 0) },
  Year: { data: mockSpendingByYear, total: mockSpendingByYear.reduce((s, d) => s + d.amount, 0) },
};

const topMerchants = mockReceipts
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 5);

const aiInsights = [
  "Your electronics spending is 35% of your total — you're investing in quality tech.",
  "Food ordering peak is on Fridays. Consider cooking 2 extra meals per week to save ₹2,400/month.",
  "You have 3 subscriptions renewing this month totaling ₹957.",
];

export default function SpendingPage() {
  const [period, setPeriod] = useState<Period>('Month');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const { data, total } = periodData[period];

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiTyping(true);
    setAiResponse('');
    setTimeout(() => {
      setAiTyping(false);
      const resp = aiInsights[Math.floor(Math.random() * aiInsights.length)];
      let i = 0;
      const interval = setInterval(() => {
        setAiResponse(resp.slice(0, i + 1));
        i++;
        if (i >= resp.length) clearInterval(interval);
      }, 18);
    }, 1800);
    setAiQuestion('');
  };

  return (
    <PageWrapper>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header */}
        <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '34px', color: 'var(--text-primary)', letterSpacing: '-0.8px' }}>
            Spending
          </h1>
          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '4px', position: 'relative' }}>
            {(['Week', 'Month', 'Year'] as Period[]).map(p => (
              <div key={p} style={{ position: 'relative' }}>
                {period === p && (
                  <motion.div layoutId="periodActive"
                    style={{ position: 'absolute', inset: 0, background: 'var(--glass-strong)', borderRadius: '8px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <button onClick={() => setPeriod(p)} style={{
                  position: 'relative',
                  padding: '7px 14px', borderRadius: '8px', border: 'none',
                  background: 'transparent',
                  color: period === p ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  fontSize: '13px', fontWeight: period === p ? 600 : 400,
                  cursor: 'pointer', fontFamily: 'DM Sans',
                  transition: 'color 0.2s',
                }}>
                  {p}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hero amount */}
        <motion.div variants={staggerChild}>
          <AnimatePresence mode="wait">
            <motion.div key={period} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <HeroAmount label="TOTAL" amount={total} subLabel={`${period === 'Week' ? 'This week' : period === 'Month' ? 'Last 6 months' : 'This year'}`} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Chart */}
        <motion.div variants={staggerChild}>
          <GlassCard noPadding style={{ padding: '20px' }}>
            <AnimatePresence mode="wait">
              <motion.div key={period} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SpendingAreaChart data={data} height={240} />
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </motion.div>

        {/* Category breakdown */}
        <motion.div variants={staggerChild}>
          <GlassCard noPadding style={{ padding: '20px' }}>
            <SectionHeader label="WHERE IT GOES" />

            {/* Stacked bar */}
            <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '24px' }}>
              {mockCategories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  whileInView={{ width: `${cat.percentage}%` }}
                  initial={{ width: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                  style={{
                    background: cat.color,
                    borderRadius: i === 0 ? '5px 0 0 5px' : i === mockCategories.length - 1 ? '0 5px 5px 0' : 0,
                    height: '100%',
                  }}
                />
              ))}
            </div>

            {/* Category rows */}
            {mockCategories.map((cat, i) => (
              <div key={cat.name} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                marginBottom: i < mockCategories.length - 1 ? '14px' : 0,
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: '14px', color: 'var(--text-primary)' }}>{cat.emoji} {cat.name}</span>
                <div style={{ flex: 2, height: '4px', borderRadius: '2px', background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
                  <motion.div
                    whileInView={{ scaleX: 1 }}
                    initial={{ scaleX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    style={{ height: '100%', background: cat.color, borderRadius: '2px', transformOrigin: 'left', width: `${cat.percentage}%` }}
                  />
                </div>
                <span style={{ fontFamily: 'DM Mono', fontSize: '12px', color: 'var(--text-tertiary)', width: '32px', textAlign: 'right' }}>
                  {cat.percentage}%
                </span>
                <span style={{ fontFamily: 'DM Mono', fontSize: '13px', color: 'var(--text-primary)', width: '90px', textAlign: 'right' }}>
                  {formatIndianCurrency(cat.amount)}
                </span>
              </div>
            ))}
          </GlassCard>
        </motion.div>

        {/* Top merchants */}
        <motion.div variants={staggerChild}>
          <GlassCard noPadding>
            <div style={{ padding: '16px 16px 0' }}>
              <p className="section-label" style={{ marginBottom: '0' }}>TOP STORES</p>
            </div>
            {topMerchants.map((r, i) => (
              <div key={r.id} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px',
                borderBottom: i < topMerchants.length - 1 ? '0.5px solid var(--separator)' : 'none',
              }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 300, fontSize: '22px', color: 'var(--text-tertiary)', width: '24px' }}>
                  {i + 1}
                </span>
                <span style={{ flex: 1, fontSize: '15px', color: 'var(--text-primary)', fontWeight: 500 }}>{r.store}</span>
                <span style={{ fontFamily: 'DM Mono', fontSize: '14px', color: 'var(--accent)' }}>
                  {formatIndianCurrency(r.amount)}
                </span>
              </div>
            ))}
          </GlassCard>
        </motion.div>

        {/* AI Insight */}
        <motion.div variants={staggerChild}>
          <GlassCard noPadding style={{ padding: '20px', borderLeft: '3px solid var(--accent)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--accent)', fontWeight: 600, marginBottom: '12px' }}>
              ✦ AI Insight
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              Your electronics spending is 35% of total budget. Your highest spend day is Friday. Consider setting a ₹5,000 weekly limit to save more.
            </p>

            <AnimatePresence>
              {aiTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', gap: '5px', marginBottom: '12px', padding: '10px 12px', background: 'var(--glass-light)', borderRadius: '12px', width: 'fit-content' }}>
                  {[0, 1, 2].map(j => (
                    <motion.div key={j} animate={{ y: [0, -5, 0] }} transition={{ delay: j * 0.15, repeat: Infinity, duration: 0.5 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {aiResponse && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '12px', padding: '10px 12px', background: 'var(--accent-dim)', borderRadius: '12px' }}>
                {aiResponse}
              </motion.p>
            )}

            <form onSubmit={handleAiSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                value={aiQuestion}
                onChange={e => setAiQuestion(e.target.value)}
                placeholder="Ask about my spending..."
                style={{ flex: 1, height: '40px', padding: '0 14px', fontSize: '14px', borderRadius: '20px' }}
              />
              <motion.button type="submit" whileTap={buttonTap} style={{
                height: '40px', padding: '0 16px', borderRadius: '20px',
                background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)',
                color: 'var(--accent)', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'DM Sans',
              }}>
                Ask
              </motion.button>
            </form>
          </GlassCard>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}
