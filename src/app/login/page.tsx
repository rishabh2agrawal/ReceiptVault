'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { staggerContainer, staggerChild, floatingOrb, buttonTap } from '@/lib/animations';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    // Simulate loading then redirect to dashboard (demo mode — no real OAuth)
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const benefits = [
    'AI extracts receipt data automatically',
    'Return deadline alerts before it\'s too late',
    'Spending intelligence across all purchases',
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-splash)',
      display: 'flex',
      alignItems: 'stretch',
    }}>
      {/* Boot Sequence Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(100px)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              fontFamily: 'DM Mono',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '24px' }}
            >
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
                <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="var(--accent)" strokeWidth="1" />
                <motion.polygon
                  points="16,8 22,12 22,20 16,24 10,20 10,12"
                  fill="var(--accent)"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </svg>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1.5, ease: 'linear' }}
              style={{ height: '1px', background: 'var(--accent)', marginBottom: '16px', opacity: 0.5 }}
            />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.1, repeat: Infinity, repeatType: 'reverse' }}
              style={{ fontSize: '11px', letterSpacing: '0.2em' }}
            >
              SYNCHRONIZING VAULT...
            </motion.p>
            <p style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginTop: '8px' }}>SECURE HANDSHAKE: GEMINI_FLASH_V2</p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Ambient orb */}
      <motion.div
        variants={floatingOrb}
        animate="animate"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,140,248,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Left — Branding */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        style={{
          flex: '0 0 55%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
          zIndex: 1,
          borderRight: '0.5px solid var(--separator)',
        }}
        className="hide-on-mobile"
      >
        {/* Logo */}
        <motion.div variants={staggerChild} style={{ marginBottom: '32px' }}>
          <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="url(#loginLogoGrad)" strokeWidth="1.5" />
            <polygon points="16,8 22,12 22,20 16,24 10,20 10,12" fill="url(#loginLogoGradFill)" opacity="0.2" />
            <text x="16" y="20" textAnchor="middle" fontSize="10" fontFamily="Sora" fontWeight="700" fill="url(#loginLogoGrad)">V</text>
            <defs>
              <linearGradient id="loginLogoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" /><stop offset="1" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="loginLogoGradFill" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" /><stop offset="1" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.h1 variants={staggerChild} style={{
          fontFamily: 'Sora', fontWeight: 700, fontSize: '38px',
          color: 'var(--text-primary)', letterSpacing: '-0.04em',
          marginBottom: '12px', textAlign: 'center',
        }}>
          ReceiptVault
        </motion.h1>

        <motion.p variants={staggerChild} style={{
          fontSize: '16px', color: 'var(--text-secondary)',
          marginBottom: '48px', textAlign: 'center', maxWidth: '360px',
        }}>
          Your AI-powered receipt intelligence vault
        </motion.p>

        <motion.div variants={staggerContainer} style={{ width: '100%', maxWidth: '360px' }}>
          {benefits.map((benefit, i) => (
            <motion.div key={i} variants={staggerChild} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '20px',
            }}>
              <CheckCircle size={20} color="var(--emerald)" />
              <span style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{benefit}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right — Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: '100%',
            maxWidth: '400px',
            background: 'var(--glass-medium)',
            border: '0.5px solid var(--glass-border)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: 'var(--shadow-elevated)',
          }}
        >
          <h2 style={{
            fontFamily: 'Sora', fontWeight: 300, fontSize: '28px',
            letterSpacing: '-0.04em', color: 'var(--text-primary)',
            marginBottom: '6px',
          }}>
            Welcome back.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Sign in to your vault.
          </p>

          {/* Google Sign-In Button */}
          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            style={{
              width: '100%',
              height: '52px',
              borderRadius: '26px',
              background: '#FFFFFF',
              border: 'none',
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              marginBottom: '20px',
            }}
          >
            {loading ? (
              <Loader2 size={22} color="#1A1A1A" style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <svg width="22" height="22" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
            )}
            <span style={{
              color: '#1A1A1A',
              fontFamily: 'Sora',
              fontWeight: 600,
              fontSize: '16px',
            }}>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </motion.button>

          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.6 }}>
            By continuing you agree to our Terms of Service and Privacy Policy
          </p>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/dashboard" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>
              Continue as Guest →
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
