'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerChild, buttonTap } from '@/lib/animations';
import { mockSubscriptions } from '@/lib/mockData';
import { formatIndianCurrency } from '@/lib/formatters';
import GlassCard from '@/components/ui/GlassCard';
import HeroAmount from '@/components/ui/HeroAmount';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import SectionHeader from '@/components/ui/SectionHeader';
import PageWrapper from '@/components/layout/PageWrapper';

type SubStatus = Record<string, 'active' | 'cancelling'>;

export default function SubscriptionsPage() {
  const [subStatus, setSubStatus] = useState<SubStatus>({});

  const monthlyCost = mockSubscriptions
    .filter(s => s.cycle === 'month')
    .reduce((sum, s) => sum + s.amount, 0);

  const annualCost = mockSubscriptions
    .filter(s => s.cycle === 'year')
    .reduce((sum, s) => sum + s.amount, 0);

  const renewingThisWeek = mockSubscriptions.filter(s => s.renewsIn <= 7).length;

  const totalMonthly = monthlyCost + Math.round(annualCost / 12);

  return (
    <PageWrapper>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header */}
        <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '34px', color: 'var(--text-primary)', letterSpacing: '-0.8px' }}>
            Subscriptions
          </h1>
          <span style={{
            background: 'var(--accent-dim)', borderRadius: '999px',
            padding: '5px 12px', fontFamily: 'DM Mono', fontSize: '13px', color: 'var(--accent)', fontWeight: 600,
          }}>
            {formatIndianCurrency(totalMonthly)}/mo
          </span>
        </motion.div>

        {/* Summary row */}
        <motion.div variants={staggerChild} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <GlassCard glowColor="indigo">
            <p className="section-label" style={{ marginBottom: '10px' }}>MONTHLY COST</p>
            <AnimatedCounter value={totalMonthly} className="hero-amount-large" />
          </GlassCard>
          <GlassCard glowColor="amber">
            <p className="section-label" style={{ color: 'var(--amber)', marginBottom: '10px' }}>RENEWALS THIS WEEK</p>
            <span style={{ color: 'var(--amber)' }}><AnimatedCounter value={renewingThisWeek} prefix="" plain className="hero-amount-large" /></span>
          </GlassCard>
          <GlassCard glowColor="emerald">
            <p className="section-label" style={{ color: 'var(--emerald)', marginBottom: '10px' }}>ANNUAL TOTAL</p>
            <span style={{ color: 'var(--emerald)' }}><AnimatedCounter value={annualCost} className="hero-amount-large" /></span>
          </GlassCard>
        </motion.div>

        {/* Subscriptions grid */}
        <motion.div variants={staggerChild}>
          <SectionHeader label="YOUR SUBSCRIPTIONS" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {mockSubscriptions.map((sub, i) => {
              const isCancelling = subStatus[sub.id] === 'cancelling';
              return (
                <motion.div
                  key={sub.id}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08 }}
                >
                  <GlassCard noPadding style={{ padding: '20px' }}>
                    {/* Top row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '28px', lineHeight: 1 }}>{sub.logo}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '17px', color: 'var(--text-primary)' }}>
                          {sub.name}
                        </p>
                      </div>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: sub.status === 'urgent' ? 'var(--amber)' : 'var(--emerald)',
                      }} />
                    </div>

                    <HeroAmount amount={sub.amount} size="large" subLabel={`/ ${sub.cycle}`} />

                    <p style={{ fontFamily: 'DM Mono', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px', marginBottom: '16px' }}>
                      Renews in {sub.renewsIn} days
                    </p>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        flex: 1, height: '36px', borderRadius: '18px',
                        background: 'var(--accent-dim)', border: 'none',
                        color: 'var(--accent)', fontSize: '13px', fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'DM Sans',
                      }}>
                        Keep
                      </button>
                      <motion.button
                        whileTap={buttonTap}
                        onClick={() => setSubStatus(p => ({
                          ...p,
                          [sub.id]: p[sub.id] === 'cancelling' ? 'active' : 'cancelling',
                        }))}
                        style={{
                          flex: 1, height: '36px', borderRadius: '18px',
                          background: 'transparent',
                          border: '0.5px solid var(--rose)',
                          color: 'var(--rose)', fontSize: '13px',
                          cursor: 'pointer', fontFamily: 'DM Sans',
                        }}
                      >
                        {isCancelling ? 'Undo' : 'Cancel'}
                      </motion.button>
                    </div>

                    {/* Accordion cancel confirm */}
                    <AnimatePresence>
                      {isCancelling && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{
                            marginTop: '12px', padding: '14px',
                            background: 'var(--rose-dim)', borderRadius: '12px',
                          }}>
                            <p style={{ fontSize: '13px', color: 'var(--rose)', marginBottom: '10px', lineHeight: 1.5 }}>
                              We&apos;ll remind you on WhatsApp to cancel {sub.name}
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button style={{
                                flex: 1, height: '32px', borderRadius: '16px',
                                background: 'var(--rose)', border: 'none',
                                color: '#fff', fontSize: '12px', fontWeight: 600,
                                cursor: 'pointer',
                              }}>
                                Confirm
                              </button>
                              <button
                                onClick={() => setSubStatus(p => ({ ...p, [sub.id]: 'active' }))}
                                style={{
                                  flex: 1, height: '32px', borderRadius: '16px',
                                  background: 'transparent', border: '0.5px solid var(--glass-border)',
                                  color: 'var(--text-secondary)', fontSize: '12px',
                                  cursor: 'pointer',
                                }}
                              >
                                Undo
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}
