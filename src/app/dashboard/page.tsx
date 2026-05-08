'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, Shield, Clock, TrendingUp } from 'lucide-react';
import { staggerContainer, staggerChild, fadeIn, bellSwing, pulse, tableRow } from '@/lib/animations';
import {
  mockReceipts, mockSpendingByWeek, mockUser,
  totalSpentThisMonth, expiringCount, protectedCount, mockDeadlines,
} from '@/lib/mockData';
import GlassCard from '@/components/ui/GlassCard';
import HeroAmount from '@/components/ui/HeroAmount';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import DeadlineBadge from '@/components/ui/DeadlineBadge';
import SectionHeader from '@/components/ui/SectionHeader';
import SpendingAreaChart from '@/components/charts/SpendingAreaChart';
import MiniSparkline from '@/components/charts/MiniSparkline';
import PageWrapper from '@/components/layout/PageWrapper';

export default function DashboardHome() {
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bellRef.current && expiringCount > 0) {
      bellRef.current.animate([
        { transform: 'rotate(-12deg)' },
        { transform: 'rotate(12deg)' },
        { transform: 'rotate(-8deg)' },
        { transform: 'rotate(8deg)' },
        { transform: 'rotate(0deg)' },
      ], { duration: 800, delay: 500 });
    }
  }, []);

  const urgentDeadlines = mockDeadlines
    .filter(r => r.daysLeft !== null && r.daysLeft >= 0 && r.daysLeft <= 7)
    .slice(0, 3);

  const recentReceipts = mockReceipts.slice(0, 5);

  const getUrgencyColor = (daysLeft: number | null) => {
    if (daysLeft === null) return 'transparent';
    if (daysLeft <= 1) return 'var(--rose)';
    if (daysLeft <= 3) return 'var(--amber)';
    return 'var(--accent)';
  };

  const weeklySpend = mockSpendingByWeek.reduce((s, d) => s + d.amount, 0);

  return (
    <PageWrapper>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header row */}
        <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'DM Sans', marginBottom: '4px' }}>
              Good morning, {mockUser.name.split(' ')[0]} 👋
            </p>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '24px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {mockUser.name}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'var(--accent-dim)', borderRadius: '999px',
              padding: '5px 10px',
              fontSize: '11px', fontWeight: 600, color: 'var(--accent)',
            }}>
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}>✦</motion.span>
              Gemini Active
            </span>
            <div ref={bellRef} style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} color="var(--text-secondary)" />
              {expiringCount > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8px', fontWeight: 700, color: '#fff',
                }}>
                  {expiringCount}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hero Card */}
        <motion.div variants={staggerChild}>
          <GlassCard noPadding glowColor="indigo" style={{ padding: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
              <div>
                <HeroAmount
                  label="TOTAL SPENT THIS MONTH"
                  amount={totalSpentThisMonth}
                  subLabel="↑ 12% vs last month  ·  47 receipts"
                />
                <div style={{ marginTop: '20px' }}>
                  <MiniSparkline data={mockSpendingByWeek} height={56} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <GlassCard noPadding style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Clock size={18} color="var(--amber)" />
                    <div>
                      <p style={{ fontFamily: 'Sora', fontWeight: 300, fontSize: '22px', color: 'var(--amber)' }}>
                        <AnimatedCounter value={expiringCount} prefix="" plain />
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Expiring Soon</p>
                    </div>
                  </div>
                </GlassCard>
                <GlassCard noPadding style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Shield size={18} color="var(--emerald)" />
                    <div>
                      <p style={{ fontFamily: 'Sora', fontWeight: 300, fontSize: '22px', color: 'var(--emerald)' }}>
                        <AnimatedCounter value={protectedCount} prefix="" plain />
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Under Warranty</p>
                    </div>
                  </div>
                </GlassCard>
                <GlassCard noPadding style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <TrendingUp size={18} color="var(--accent)" />
                    <div>
                      <p style={{ fontFamily: 'Sora', fontWeight: 300, fontSize: '20px', color: 'var(--accent)' }}>
                        <AnimatedCounter value={weeklySpend} />
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Spent This Week</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Deadline Watch */}
        <motion.div variants={staggerChild}>
          <SectionHeader label="DEADLINE WATCH" actionLabel="See all →" actionHref="/dashboard/deadlines" />
          <GlassCard noPadding>
            {urgentDeadlines.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                <p style={{ fontSize: '14px' }}>✅ No urgent deadlines</p>
              </div>
            ) : (
              urgentDeadlines.map((receipt, i) => (
                <motion.div
                  key={receipt.id}
                  variants={tableRow}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: i * 0.07 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    height: '64px',
                    paddingLeft: '0',
                    paddingRight: '16px',
                    position: 'relative',
                    cursor: 'pointer',
                    borderBottom: i < urgentDeadlines.length - 1 ? '0.5px solid var(--separator)' : 'none',
                  }}
                >
                  <div style={{
                    width: '3px',
                    alignSelf: 'stretch',
                    background: getUrgencyColor(receipt.daysLeft),
                    borderRadius: '0 2px 2px 0',
                    flexShrink: 0,
                  }} />
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: getUrgencyColor(receipt.daysLeft),
                    flexShrink: 0, marginLeft: '12px',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
                      {receipt.store}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {receipt.items[0]?.name}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'DM Mono', fontSize: '13px', color: 'var(--text-tertiary)' }}>
                      {receipt.daysLeft === 0 ? 'today' : `${receipt.daysLeft}d`}
                    </span>
                    <DeadlineBadge daysLeft={receipt.daysLeft} />
                  </div>
                </motion.div>
              ))
            )}
          </GlassCard>
        </motion.div>

        {/* Recent Receipts */}
        <motion.div variants={staggerChild}>
          <SectionHeader label="RECENT RECEIPTS" actionLabel="View all →" actionHref="/dashboard/receipts" />
          <div className="scroll-row">
            {recentReceipts.map((receipt) => (
              <Link key={receipt.id} href={`/dashboard/receipts/${receipt.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.12)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '200px',
                    background: 'var(--glass-medium)',
                    border: '0.5px solid var(--glass-border)',
                    borderRadius: '20px',
                    padding: '16px',
                    position: 'relative',
                    boxShadow: 'var(--shadow-card)',
                    cursor: 'pointer',
                  }}
                >
                  {/* AI badge */}
                  <span style={{
                    position: 'absolute', top: '10px', right: '10px',
                    fontSize: '10px', color: 'var(--purple)',
                    background: 'var(--purple-dim)', borderRadius: '6px',
                    padding: '2px 6px', fontWeight: 600,
                  }}>
                    ✦ AI
                  </span>

                  {/* Store initial */}
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: 'var(--accent-dim)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Sora', fontWeight: 700, fontSize: '18px', color: 'var(--accent)',
                  }}>
                    {receipt.store[0]}
                  </div>

                  <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginTop: '12px' }}>
                    {receipt.store}
                  </p>
                  <p style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    {receipt.date}
                  </p>

                  <div style={{ marginTop: '12px' }}>
                    <HeroAmount amount={receipt.amount} size="large" />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <DeadlineBadge daysLeft={receipt.daysLeft} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Spending chart */}
        <motion.div variants={staggerChild}>
          <SectionHeader label="SPENDING THIS WEEK" />
          <GlassCard noPadding style={{ padding: '20px' }}>
            <SpendingAreaChart data={mockSpendingByWeek} height={200} />
          </GlassCard>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}
