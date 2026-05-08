'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, FileText, Clock, BarChart2, CreditCard, Settings, ChevronRight, LogOut, User
} from 'lucide-react';
import { staggerContainer, staggerChild, pulse } from '@/lib/animations';
import { mockUser } from '@/lib/mockData';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/receipts', label: 'Receipts', icon: FileText },
  { href: '/dashboard/deadlines', label: 'Deadlines', icon: Clock },
  { href: '/dashboard/spending', label: 'Spending', icon: BarChart2 },
  { href: '/dashboard/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'fixed',
        left: 0, top: 0, bottom: 0,
        width: 'var(--sidebar-width)',
        background: 'var(--sidebar-bg)',
        backdropFilter: 'blur(20px)',
        borderRight: '0.5px solid var(--separator)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        borderBottom: '0.5px solid var(--separator)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" />
            <polygon points="16,8 22,12 22,20 16,24 10,20 10,12" fill="url(#logoGradFill)" opacity="0.3" />
            <text x="16" y="20" textAnchor="middle" fontSize="10" fontFamily="Sora" fontWeight="700" fill="url(#logoGrad)">V</text>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="logoGradFill" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{
            fontFamily: 'Sora',
            fontWeight: 700,
            fontSize: '18px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
          }}>ReceiptVault</span>
        </div>
      </div>

      {/* Navigation */}
      <motion.nav
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}
      >
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <motion.div key={item.href} variants={staggerChild} style={{ position: 'relative', marginBottom: '4px' }}>
              <Link href={item.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative' }}>
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'var(--accent-dim)',
                        borderRadius: '12px',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {active && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        bottom: '8px',
                        width: '3px',
                        background: 'var(--accent)',
                        borderRadius: '0 2px 2px 0',
                      }}
                    />
                  )}
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    height: '44px',
                    padding: '0 12px',
                    borderRadius: '12px',
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '15px',
                    fontWeight: 500,
                    transition: 'color 0.2s, background 0.2s',
                  }}
                    onMouseEnter={e => !active && (e.currentTarget.style.background = 'var(--glass-light)')}
                    onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* Gemini Active badge */}
        <div style={{ marginTop: '24px', padding: '0 4px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--purple-dim)',
            border: '0.5px solid rgba(192,132,252,0.3)',
            borderRadius: '10px',
            padding: '8px 12px',
          }}>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'var(--purple)', fontSize: '12px' }}
            >
              ✦
            </motion.span>
            <span style={{ color: 'var(--purple)', fontSize: '11px', fontWeight: 600 }}>Gemini Active</span>
          </div>
          <p style={{
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            fontFamily: 'DM Mono',
            marginTop: '8px',
            padding: '0 4px',
          }}>
            Last synced: 2m ago
          </p>
        </div>
      </motion.nav>

      {/* User profile card */}
      <div style={{ padding: '12px', borderTop: '0.5px solid var(--separator)', position: 'relative' }}>
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '12px',
                right: '12px',
                background: 'var(--bg-elevated)',
                border: '0.5px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '6px',
                boxShadow: 'var(--shadow-elevated)',
                marginBottom: '4px',
                zIndex: 200,
              }}
            >
              <button style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                width: '100%', padding: '8px 10px', borderRadius: '8px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--text-secondary)', fontSize: '13px', fontFamily: 'DM Sans',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--glass-light)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <User size={14} />
                View Profile
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                width: '100%', padding: '8px 10px', borderRadius: '8px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--rose)', fontSize: '13px', fontFamily: 'DM Sans',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--rose-dim)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
          onClick={() => setShowDropdown(p => !p)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '14px',
            background: 'var(--glass-light)',
            border: '0.5px solid var(--glass-border)',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'var(--bg-tertiary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 700, color: 'var(--accent)',
            overflow: 'hidden', position: 'relative'
          }}>
            <img
              src={mockUser.photoUrl}
              alt={mockUser.name}
              width={32}
              height={32}
              style={{ objectFit: 'cover', position: 'relative', zIndex: 2 }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span style={{ position: 'absolute', zIndex: 1 }}>RV</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {mockUser.name}
            </p>
            <p style={{
              fontSize: '11px', color: 'var(--text-secondary)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {mockUser.email}
            </p>
          </div>
          <ChevronRight size={14} color="var(--text-tertiary)" />
        </motion.div>
      </div>
    </motion.aside>
  );
}
