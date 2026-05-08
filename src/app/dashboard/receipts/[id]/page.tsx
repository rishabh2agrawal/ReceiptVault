'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Sparkles, Trash2 } from 'lucide-react';
import { staggerContainer, staggerChild, scaleIn, heroReveal, buttonTap } from '@/lib/animations';
import { mockReceipts } from '@/lib/mockData';
import { getCategoryColor, getCategoryDimColor } from '@/lib/formatters';
import GlassCard from '@/components/ui/GlassCard';
import HeroAmount from '@/components/ui/HeroAmount';
import DeadlineBadge from '@/components/ui/DeadlineBadge';
import PageWrapper from '@/components/layout/PageWrapper';

function CountdownTile({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      style={{
        width: '72px', height: '72px',
        background: 'var(--bg-tertiary)',
        borderRadius: '14px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '4px',
      }}
    >
      <span style={{ fontFamily: 'DM Mono', fontSize: '28px', fontWeight: 300, color: 'var(--amber)', lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </span>
      <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function ReceiptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const receipt = mockReceipts.find(r => r.id === id);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!receipt?.returnDeadline) return;
    const [day, month, year] = receipt.returnDeadline.split('/');
    const deadline = new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59);

    const tick = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [receipt]);

  if (!receipt) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '18px' }}>Receipt not found</p>
          <Link href="/dashboard/receipts" style={{ color: 'var(--accent)', textDecoration: 'none', marginTop: '12px', display: 'block' }}>
            ← Back to Receipts
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const total = receipt.items.reduce((s, item) => s + item.price, 0);

  return (
    <PageWrapper>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>

        {/* Left column */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={staggerChild}>
            <Link href="/dashboard/receipts">
              <motion.span
                whileHover={{ x: -4 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '14px', color: 'var(--text-secondary)',
                  textDecoration: 'none', marginBottom: '20px', cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <ArrowLeft size={14} /> Receipts
              </motion.span>
            </Link>
          </motion.div>

          {/* Receipt Image */}
          <motion.div variants={scaleIn} initial="initial" animate="animate" style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '320px', marginBottom: '20px' }}>
            <motion.img
              src={receipt.imageUrl}
              alt={receipt.store}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '120px',
              background: 'linear-gradient(transparent, var(--bg-primary))',
            }} />
            <div style={{
              position: 'absolute', bottom: '16px', left: '16px',
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
              borderRadius: '10px', padding: '6px 10px',
            }}>
              <Sparkles size={12} color="var(--purple)" />
              <span style={{ fontSize: '11px', color: 'var(--purple)', fontWeight: 600 }}>Extracted by Gemini 2.0 Flash</span>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div variants={staggerChild} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <motion.button whileTap={buttonTap} whileHover={{ y: -2 }} style={{
              width: '100%', height: '48px', borderRadius: '24px',
              background: 'linear-gradient(135deg, #818CF8, #A5B4FC)',
              border: 'none', color: '#fff',
              fontSize: '15px', fontFamily: 'Sora', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              <Share2 size={16} /> Share via WhatsApp
            </motion.button>
            <motion.button whileTap={buttonTap} style={{
              width: '100%', height: '44px', borderRadius: '22px',
              background: 'var(--glass-medium)',
              border: '0.5px solid var(--accent-border)',
              color: 'var(--accent)', fontSize: '14px', fontFamily: 'DM Sans', fontWeight: 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              <Sparkles size={14} /> Re-extract with AI
            </motion.button>
            <motion.button whileTap={buttonTap} style={{
              width: '100%', height: '44px', borderRadius: '22px',
              background: 'var(--rose-dim)',
              border: 'none', color: 'var(--rose)',
              fontSize: '14px', fontFamily: 'DM Sans', fontWeight: 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              <Trash2 size={14} /> Delete Receipt
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Store name + amount */}
          <motion.div variants={staggerChild}>
            <motion.h1 variants={heroReveal} initial="initial" animate="animate"
              style={{ fontFamily: 'Sora', fontWeight: 300, fontSize: '32px', color: 'var(--text-primary)', letterSpacing: '-1px', marginBottom: '16px' }}>
              {receipt.store}
            </motion.h1>
            <HeroAmount amount={receipt.amount} />
          </motion.div>

          {/* Metadata pills */}
          <motion.div variants={staggerChild} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {[
              { label: receipt.date, color: 'var(--text-secondary)', bg: 'var(--bg-tertiary)' },
              { label: receipt.category, color: getCategoryColor(receipt.category), bg: getCategoryDimColor(receipt.category) },
              { label: receipt.paymentMode, color: 'var(--text-secondary)', bg: 'var(--bg-tertiary)' },
            ].map((pill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                style={{
                  padding: '6px 12px', borderRadius: '10px',
                  background: pill.bg, color: pill.color,
                  fontSize: '13px', fontFamily: 'DM Mono',
                }}
              >
                {pill.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Return window */}
          {receipt.returnDeadline && receipt.daysLeft !== null && receipt.daysLeft >= 0 && (
            <motion.div variants={staggerChild}>
              <GlassCard glowColor="amber" noPadding style={{ padding: '20px' }}>
                <p className="section-label" style={{ color: 'var(--amber)', marginBottom: '16px' }}>RETURN WINDOW</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CountdownTile value={countdown.days} label="Days" />
                  <CountdownTile value={countdown.hours} label="Hrs" />
                  <CountdownTile value={countdown.minutes} label="Min" />
                  <CountdownTile value={countdown.seconds} label="Sec" />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '12px', fontFamily: 'DM Mono' }}>
                  Deadline: {receipt.returnDeadline}
                </p>
              </GlassCard>
            </motion.div>
          )}

          {/* Items table */}
          <motion.div variants={staggerChild}>
            <GlassCard noPadding>
              <div style={{ padding: '16px 16px 0' }}>
                <p className="section-label" style={{ marginBottom: '12px' }}>ITEMS</p>
              </div>
              {receipt.items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px',
                  borderBottom: i < receipt.items.length - 1 ? '0.5px solid var(--separator)' : '0.5px solid var(--separator)',
                }}>
                  <span style={{ flex: 1, fontSize: '14px', color: 'var(--text-primary)' }}>{item.name}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontFamily: 'DM Mono', minWidth: '24px', textAlign: 'right' }}>×{item.qty}</span>
                  <span style={{ fontFamily: 'DM Mono', fontSize: '14px', color: 'var(--accent)', minWidth: '80px', textAlign: 'right' }}>
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '0 0 20px 20px',
              }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Total</span>
                <span style={{ fontFamily: 'DM Mono', fontSize: '16px', color: 'var(--accent)', fontWeight: 500 }}>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </GlassCard>
          </motion.div>

        </motion.div>
      </div>
    </PageWrapper>
  );
}
