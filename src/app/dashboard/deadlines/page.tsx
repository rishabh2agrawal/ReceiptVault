'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { staggerContainer, staggerChild, pulse, scaleIn } from '@/lib/animations';
import { mockDeadlines } from '@/lib/mockData';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import DeadlineBadge from '@/components/ui/DeadlineBadge';
import GlassCard from '@/components/ui/GlassCard';
import PageWrapper from '@/components/layout/PageWrapper';

export default function DeadlinesPage() {
  const today = mockDeadlines.filter(r => r.daysLeft === 0 || r.daysLeft === 1);
  const thisWeek = mockDeadlines.filter(r => r.daysLeft !== null && r.daysLeft >= 2 && r.daysLeft <= 7);
  const safe = mockDeadlines.filter(r => r.daysLeft !== null && r.daysLeft > 7);
  const urgentItem = mockDeadlines.find(r => r.daysLeft !== null && r.daysLeft <= 1 && r.daysLeft >= 0);

  const getUrgencyColor = (daysLeft: number | null) => {
    if (daysLeft === null) return 'var(--text-tertiary)';
    if (daysLeft <= 1) return 'var(--rose)';
    if (daysLeft <= 3) return 'var(--amber)';
    return 'var(--accent)';
  };

  return (
    <PageWrapper>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header */}
        <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '34px', color: 'var(--text-primary)', letterSpacing: '-0.8px' }}>
            Deadline Guardian
          </h1>
          <Clock size={24} color="var(--amber)" />
        </motion.div>

        {/* Triage row */}
        <motion.div variants={staggerChild} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <GlassCard glowColor="rose">
            <p className="section-label" style={{ color: 'var(--rose)', marginBottom: '10px' }}>TODAY</p>
            <span style={{ color: 'var(--rose)' }}><AnimatedCounter value={today.length} prefix="" plain className="hero-amount-large" /></span>
          </GlassCard>
          <GlassCard glowColor="amber">
            <p className="section-label" style={{ color: 'var(--amber)', marginBottom: '10px' }}>THIS WEEK</p>
            <span style={{ color: 'var(--amber)' }}><AnimatedCounter value={thisWeek.length} prefix="" plain className="hero-amount-large" /></span>
          </GlassCard>
          <GlassCard glowColor="emerald">
            <p className="section-label" style={{ color: 'var(--emerald)', marginBottom: '10px' }}>SAFE</p>
            <span style={{ color: 'var(--emerald)' }}><AnimatedCounter value={safe.length} prefix="" plain className="hero-amount-large" /></span>
          </GlassCard>
        </motion.div>

        {/* Urgent featured */}
        {urgentItem && (
          <motion.div variants={staggerChild}>
            <GlassCard glowColor="rose" noPadding style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <motion.span animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: 'var(--rose)', fontSize: '16px' }}>⚡</motion.span>
                <span className="section-label" style={{ color: 'var(--rose)' }}>URGENT</span>
              </div>
              <p style={{ fontFamily: 'Sora', fontWeight: 300, fontSize: '28px', color: 'var(--text-primary)', letterSpacing: '-1px' }}>
                {urgentItem.store}
              </p>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '16px' }}>
                {urgentItem.items[0]?.name}
              </p>
              <Link href={`/dashboard/receipts/${urgentItem.id}`}>
                <span style={{ fontSize: '14px', color: 'var(--accent)', cursor: 'pointer' }}>View Receipt →</span>
              </Link>
            </GlassCard>
          </motion.div>
        )}

        {/* Timeline */}
        <motion.div variants={staggerChild}>
          <p className="section-label" style={{ marginBottom: '24px' }}>TIMELINE</p>
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '12px', top: 0, bottom: 0,
              width: '2px',
              background: 'linear-gradient(var(--accent), transparent)',
            }} />

            {/* TODAY marker */}
            <div style={{ position: 'absolute', left: '5px', top: '20px' }}>
              <div style={{ position: 'relative', width: '14px', height: '14px' }}>
                <motion.div animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent)', opacity: 0.4 }} />
                <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent)', opacity: 0.3 }} />
                <div style={{ position: 'absolute', inset: '3px', borderRadius: '50%', background: 'var(--accent)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
              {mockDeadlines.filter(r => r.daysLeft !== null && r.daysLeft >= 0).map((receipt, i) => (
                <motion.div
                  key={receipt.id}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                    width: '46%',
                  }}
                >
                  <Link href={`/dashboard/receipts/${receipt.id}`} style={{ textDecoration: 'none' }}>
                    <GlassCard noPadding pressable style={{
                      padding: '16px',
                      borderLeft: `3px solid ${getUrgencyColor(receipt.daysLeft)}`,
                      borderRadius: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                          {receipt.store}
                        </p>
                        <DeadlineBadge daysLeft={receipt.daysLeft} />
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{receipt.items[0]?.name}</p>
                      <p style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '6px' }}>
                        {receipt.returnDeadline}
                      </p>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}
