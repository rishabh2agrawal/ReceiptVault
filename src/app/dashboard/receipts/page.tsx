'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, List } from 'lucide-react';
import { staggerContainer, staggerChild, tableRow, scaleIn } from '@/lib/animations';
import { mockReceipts } from '@/lib/mockData';
import { getCategoryColor, getCategoryDimColor } from '@/lib/formatters';
import GlassCard from '@/components/ui/GlassCard';
import HeroAmount from '@/components/ui/HeroAmount';
import DeadlineBadge from '@/components/ui/DeadlineBadge';
import SectionHeader from '@/components/ui/SectionHeader';
import PageWrapper from '@/components/layout/PageWrapper';

const CATEGORIES = ['All', 'Electronics', 'Food', 'Fashion', 'Groceries'];

export default function ReceiptsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const router = useRouter();

  const filtered = useMemo(() => {
    return mockReceipts.filter(r => {
      const matchSearch = r.store.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'All' || r.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <PageWrapper>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header */}
        <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '34px', color: 'var(--text-primary)', letterSpacing: '-0.8px' }}>
            Receipts
          </h1>
          <span style={{
            background: 'var(--bg-tertiary)', borderRadius: '999px',
            padding: '4px 10px', fontFamily: 'DM Mono', fontSize: '13px', color: 'var(--text-secondary)',
          }}>
            {mockReceipts.length}
          </span>
        </motion.div>

        {/* Toolbar */}
        <motion.div variants={staggerChild}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            {/* Search */}
            <div
              style={{ position: 'relative', flex: 1, maxWidth: '520px' }}
            >
              <Search size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search receipts..."
                style={{
                  width: '100%',
                  height: '44px',
                  borderRadius: '22px',
                  background: 'var(--bg-tertiary)',
                  border: '0.5px solid var(--glass-border)',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  fontSize: '14px',
                }}
              />
            </div>

            {/* View toggle */}
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-tertiary)', borderRadius: '10px', padding: '4px' }}>
              {[{ mode: 'grid' as const, Icon: LayoutGrid }, { mode: 'list' as const, Icon: List }].map(({ mode, Icon }) => (
                <button key={mode} onClick={() => setViewMode(mode)} style={{
                  padding: '6px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: viewMode === mode ? 'var(--glass-strong)' : 'transparent',
                  color: viewMode === mode ? 'var(--accent)' : 'var(--text-tertiary)',
                  transition: 'all 0.2s',
                }}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <div key={cat} style={{ position: 'relative' }}>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activePill"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'var(--accent-dim)',
                      borderRadius: '16px',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <button
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    position: 'relative',
                    padding: '0 14px',
                    height: '32px',
                    borderRadius: '16px',
                    border: activeCategory === cat ? 'none' : '0.5px solid var(--glass-border)',
                    background: 'transparent',
                    color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: activeCategory === cat ? 600 : 400,
                    cursor: 'pointer',
                    fontFamily: 'DM Sans',
                    transition: 'color 0.2s',
                  }}
                >
                  {cat}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div variants={staggerChild}>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                variants={scaleIn}
                initial="initial"
                animate="animate"
                style={{ textAlign: 'center', padding: '80px 0' }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ margin: '0 auto 16px' }}>
                  <polygon points="40,8 68,24 68,56 40,72 12,56 12,24" fill="none" stroke="var(--text-quaternary)" strokeWidth="2" />
                  <line x1="32" y1="36" x2="48" y2="36" stroke="var(--text-quaternary)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="32" y1="44" x2="42" y2="44" stroke="var(--text-quaternary)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontFamily: 'Sora', fontWeight: 600 }}>No receipts found</p>
                <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '6px' }}>Try a different filter</p>
              </motion.div>
            ) : viewMode === 'grid' ? (
              <motion.div
                key="grid"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}
              >
                {filtered.map((receipt) => (
                  <motion.div
                    key={receipt.id}
                    layout
                    layoutId={receipt.id}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 16 }}
                    viewport={{ once: true, margin: '-40px' }}
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.12)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push(`/dashboard/receipts/${receipt.id}`)}
                    style={{
                      background: 'var(--glass-medium)',
                      border: '0.5px solid var(--glass-border)',
                      borderRadius: '20px',
                      padding: '16px',
                      cursor: 'pointer',
                      position: 'relative',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: '10px', right: '10px',
                      fontSize: '10px', color: 'var(--purple)',
                      background: 'var(--purple-dim)', borderRadius: '6px',
                      padding: '2px 6px', fontWeight: 600,
                    }}>
                      ✦ AI
                    </span>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '14px',
                      background: getCategoryDimColor(receipt.category),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Sora', fontWeight: 700, fontSize: '20px',
                      color: getCategoryColor(receipt.category),
                    }}>
                      {receipt.store[0]}
                    </div>
                    <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginTop: '12px' }}>
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
                ))}
              </motion.div>
            ) : (
              <motion.div key="list">
                <GlassCard noPadding>
                  {filtered.map((receipt, i) => (
                    <motion.div
                      key={receipt.id}
                      variants={tableRow}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: i * 0.04 }}
                      onClick={() => router.push(`/dashboard/receipts/${receipt.id}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        height: '72px',
                        padding: '0 16px',
                        cursor: 'pointer',
                        borderBottom: i < filtered.length - 1 ? '0.5px solid var(--separator)' : 'none',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--glass-light)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: getCategoryDimColor(receipt.category),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Sora', fontWeight: 700, fontSize: '16px',
                        color: getCategoryColor(receipt.category),
                        flexShrink: 0,
                      }}>
                        {receipt.store[0]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
                          {receipt.store}
                        </p>
                        <p style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                          {receipt.date} · {receipt.category}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <HeroAmount amount={receipt.amount} size="large" />
                        <DeadlineBadge daysLeft={receipt.daysLeft} />
                      </div>
                    </motion.div>
                  ))}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}
