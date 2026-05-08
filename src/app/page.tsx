'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, staggerChild, floatingOrb, buttonTap } from '@/lib/animations';

const WhatsAppMockup = () => {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [botText, setBotText] = useState('');
  const fullBotText = '✅ Captured!\n\nReliance Digital\n₹82,990\nReturn by: 10/05/2026\n\nWarranty: 1 year protected 🔒';

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => { setStep(2); setTyping(true); }, 2500);
    const t3 = setTimeout(() => {
      setTyping(false);
      let i = 0;
      const interval = setInterval(() => {
        setBotText(fullBotText.slice(0, i + 1));
        i++;
        if (i >= fullBotText.length) clearInterval(interval);
      }, 20);
      setStep(3);
    }, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      style={{
        width: '280px',
        background: '#0f0f0f',
        borderRadius: '24px',
        border: '0.5px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}
    >
      {/* WA Header */}
      <div style={{
        background: '#1a2a1a',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏛️</div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>ReceiptVault AI</p>
          <p style={{ fontSize: '10px', color: '#25D366' }}>● online</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: '16px', minHeight: '200px', background: '#0a0a0a' }}>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <div style={{ background: '#1f4e1f', borderRadius: '16px 16px 4px 16px', padding: '8px 12px', maxWidth: '180px' }}>
              <div style={{ width: '100%', height: '60px', borderRadius: '8px', background: '#2a5a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '6px' }}>🧾</div>
              <p style={{ fontSize: '11px', color: '#86efac' }}>Receipt photo</p>
            </div>
          </motion.div>
        )}
        {step >= 2 && typing && (
          <div style={{ display: 'flex', gap: '4px', padding: '8px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px 16px 16px 4px', width: 'fit-content' }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ delay: i * 0.15, repeat: Infinity, duration: 0.6 }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-tertiary)' }} />
            ))}
          </div>
        )}
        {step >= 3 && botText && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px 16px 16px 4px', padding: '10px 12px', maxWidth: '220px' }}>
            <p style={{ fontSize: '12px', color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{botText}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-splash)', overflowX: 'hidden', position: 'relative' }} className="grid-bg">

      {/* Ambient orbs */}
      <motion.div variants={floatingOrb} animate="animate" style={{
        position: 'absolute', top: '-300px', right: '-200px',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.05, 1], transition: { duration: 10, repeat: Infinity, delay: 2 } }} style={{
        position: 'absolute', bottom: '-200px', left: '-100px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* Header */}
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '64px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid var(--separator)',
          display: 'flex', alignItems: 'center',
          padding: '0 40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="url(#hLogoGrad)" strokeWidth="1.5" />
            <text x="16" y="20" textAnchor="middle" fontSize="10" fontFamily="Sora" fontWeight="700" fill="url(#hLogoGrad)">V</text>
            <defs>
              <linearGradient id="hLogoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" /><stop offset="1" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '17px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>ReceiptVault</span>
        </div>

        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['Features', 'How it works', 'Pricing'].map(item => (
            <a key={item} href="#" style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              {item}
            </a>
          ))}
          <Link href="/login">
            <motion.button whileTap={{ scale: 0.97 }} style={{
              padding: '8px 18px', borderRadius: '20px',
              background: 'var(--glass-medium)', border: '0.5px solid var(--glass-border)',
              color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'DM Sans',
              cursor: 'pointer',
            }}>
              Sign In
            </motion.button>
          </Link>
        </nav>
      </motion.header>

      {/* Hero */}
      <div style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', maxWidth: '1100px', margin: '0 auto', padding: '140px 40px 80px' }}>
        <div style={{ display: 'flex', gap: '80px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Left: text */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            style={{ flex: 1, minWidth: '300px', textAlign: 'left' }}
          >
            {/* Badge */}
            <motion.div variants={staggerChild}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)',
                color: 'var(--accent)', fontSize: '12px', fontWeight: 600,
                padding: '5px 12px', borderRadius: '999px', marginBottom: '24px',
              }}>
                ✦ Samsung PRISM Hackathon 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={staggerChild} style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 'clamp(42px, 5vw, 72px)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-primary)' }}>Your receipts.</span><br />
              <span className="gradient-text">Remembered forever.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={staggerChild} style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.6, marginBottom: '36px' }}>
              AI-powered receipt intelligence. Deadlines tracked. Money protected.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerChild} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02, boxShadow: '0 0 40px rgba(129,140,248,0.35)' }}
                  whileTap={buttonTap}
                  style={{
                    height: '52px', padding: '0 28px', borderRadius: '26px',
                    background: 'linear-gradient(135deg, #818CF8, #A5B4FC)',
                    border: 'none', color: '#ffffff',
                    fontSize: '16px', fontFamily: 'Sora', fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 24px rgba(129,140,248,0.35)',
                  }}
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={buttonTap}
                  style={{
                    height: '52px', padding: '0 28px', borderRadius: '26px',
                    background: 'transparent',
                    border: '0.5px solid var(--accent-border)',
                    color: 'var(--accent)', fontSize: '16px', fontFamily: 'DM Sans', fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  View Demo →
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p variants={staggerChild} style={{ marginTop: '28px', fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'DM Mono', letterSpacing: '0.04em' }}>
              Built with Gemini 2.0 Flash · Google OAuth · Supabase · WhatsApp API
            </motion.p>
          </motion.div>

          {/* Right: WhatsApp mockup */}
          <WhatsAppMockup />
        </div>

        {/* Feature Cards */}
        <div style={{ marginTop: '100px' }}>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '32px' }}>WHY RECEIPTVAULT</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: '🧾', title: 'Intelligent Extraction',
                desc: 'Gemini 2.0 Flash reads any receipt — photos, PDFs, screenshots — and extracts every field accurately.',
                glow: '0 0 32px rgba(129,140,248,0.15)',
              },
              {
                icon: '⏰', title: 'Deadline Guardian',
                desc: 'Never miss a return window again. Get alerts before deadlines, not after.',
                glow: '0 0 32px rgba(251,191,36,0.15)',
              },
              {
                icon: '✨', title: 'Spending Intelligence',
                desc: 'Understand your money deeply. Category breakdowns, trends, and AI insights.',
                glow: '0 0 32px rgba(192,132,252,0.15)',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: `var(--shadow-card), ${card.glow}` }}
                style={{
                  background: 'var(--glass-medium)',
                  border: '0.5px solid var(--glass-border)',
                  borderRadius: '20px',
                  padding: '28px',
                  height: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'left',
                  cursor: 'default',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '17px', color: 'var(--text-primary)', marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '0.5px solid var(--separator)',
        padding: '32px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="url(#fLogoGrad)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="fLogoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" /><stop offset="1" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '14px', color: 'var(--text-secondary)' }}>ReceiptVault</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Samsung PRISM 2026</p>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Powered by Gemini <span style={{ color: 'var(--purple)' }}>✦</span>
        </p>
      </footer>
    </div>
  );
}
