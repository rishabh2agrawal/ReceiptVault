'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerChild, buttonTap } from '@/lib/animations';
import { mockUser } from '@/lib/mockData';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';
import PageWrapper from '@/components/layout/PageWrapper';

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: '44px', height: '24px',
        borderRadius: '12px',
        background: checked ? 'var(--accent)' : 'var(--bg-tertiary)',
        border: '0.5px solid var(--glass-border)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          position: 'absolute',
          top: '2px',
          width: '20px', height: '20px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}

function SettingRow({ label, right, divider = true }: { label: string; right: React.ReactNode; divider?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px',
      borderBottom: divider ? '0.5px solid var(--separator)' : 'none',
    }}>
      <span style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{label}</span>
      {right}
    </div>
  );
}

export default function SettingsPage() {
  const [toggles, setToggles] = useState({
    deadlineAlerts: true,
    spendingAlerts: true,
    vaultMode: false,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles(p => ({ ...p, [key]: !p[key] }));

  const handleDownload = () => {
    const data = JSON.stringify({ user: mockUser, version: '1.0.0', exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receiptvault-data.json';
    a.click();
  };

  return (
    <PageWrapper>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }}>

        {/* Header */}
        <motion.div variants={staggerChild}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '34px', color: 'var(--text-primary)', letterSpacing: '-0.8px' }}>
            Settings
          </h1>
        </motion.div>

        {/* Profile card */}
        <motion.div variants={staggerChild}>
          <GlassCard noPadding style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <img src={mockUser.photoUrl} alt={mockUser.name} width={44} height={44}
                style={{ borderRadius: '50%', background: 'var(--bg-tertiary)' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)' }}>{mockUser.name}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{mockUser.email}</p>
              </div>
              <button style={{
                padding: '7px 14px', borderRadius: '20px',
                background: 'var(--glass-medium)', border: '0.5px solid var(--glass-border)',
                color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', fontFamily: 'DM Sans',
              }}>
                Edit Profile
              </button>
            </div>
            <span style={{
              display: 'inline-block',
              background: 'var(--accent-dim)', borderRadius: '999px',
              padding: '4px 12px', fontSize: '12px', color: 'var(--accent)', fontWeight: 600,
            }}>
              ReceiptVault · Samsung PRISM 2026
            </span>
          </GlassCard>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={staggerChild}>
          <p className="section-label" style={{ marginBottom: '8px' }}>NOTIFICATIONS</p>
          <GlassCard noPadding>
            <SettingRow label="Quiet Hours" right={
              <span style={{ fontFamily: 'DM Mono', fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>10 PM – 8 AM</span>
            } />
            <SettingRow label="Alert Frequency" right={
              <span style={{ fontFamily: 'DM Mono', fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>Daily</span>
            } />
            <SettingRow label="Deadline Alerts" right={
              <Toggle checked={toggles.deadlineAlerts} onChange={() => toggle('deadlineAlerts')} />
            } />
            <SettingRow label="Spending Alerts" right={
              <Toggle checked={toggles.spendingAlerts} onChange={() => toggle('spendingAlerts')} />
            } divider={false} />
          </GlassCard>
        </motion.div>

        {/* Appearance */}
        <motion.div variants={staggerChild}>
          <p className="section-label" style={{ marginBottom: '8px' }}>APPEARANCE</p>
          <GlassCard noPadding>
            <SettingRow label="Vault Mode 🌌" right={
              <Toggle checked={toggles.vaultMode} onChange={() => toggle('vaultMode')} />
            } divider={false} />
          </GlassCard>
        </motion.div>

        {/* Connected services */}
        <motion.div variants={staggerChild}>
          <p className="section-label" style={{ marginBottom: '8px' }}>CONNECTED SERVICES</p>
          <GlassCard noPadding>
            <SettingRow label="WhatsApp" right={
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)' }} />
                <span style={{ fontSize: '13px', color: 'var(--emerald)', fontWeight: 500 }}>Connected</span>
              </div>
            } />
            <SettingRow label="Telegram" right={
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-tertiary)' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Not connected</span>
                <span style={{ fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>Connect</span>
              </div>
            } divider={false} />
          </GlassCard>
        </motion.div>

        {/* Data */}
        <motion.div variants={staggerChild}>
          <p className="section-label" style={{ marginBottom: '8px' }}>DATA</p>
          <GlassCard noPadding>
            <SettingRow label="Download My Data" right={
              <button onClick={handleDownload} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '14px', color: 'var(--accent)', fontFamily: 'DM Sans',
              }}>
                Download
              </button>
            } />
            <SettingRow label="Clear History" right={
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '14px', color: 'var(--rose)', fontFamily: 'DM Sans',
              }}>
                Clear
              </button>
            } divider={false} />
          </GlassCard>
        </motion.div>

        {/* About */}
        <motion.div variants={staggerChild}>
          <p className="section-label" style={{ marginBottom: '8px' }}>ABOUT</p>
          <GlassCard noPadding>
            <SettingRow label="Version" right={
              <span style={{ fontFamily: 'DM Mono', fontSize: '13px', color: 'var(--text-tertiary)' }}>1.0.0</span>
            } />
            <SettingRow label="Samsung PRISM 2026" right={
              <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Hackathon Edition</span>
            } />
            <SettingRow label="Powered by" right={
              <span style={{ fontSize: '13px', color: 'var(--purple)', fontWeight: 600 }}>Gemini ✦</span>
            } divider={false} />
          </GlassCard>
        </motion.div>

        {/* Sign out */}
        <motion.div variants={staggerChild} style={{ textAlign: 'center', paddingBottom: '32px' }}>
          <motion.button
            whileTap={buttonTap}
            whileHover={{ opacity: 0.7 }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Sora', fontWeight: 500, fontSize: '17px', color: 'var(--rose)',
            }}
          >
            Sign Out
          </motion.button>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}
