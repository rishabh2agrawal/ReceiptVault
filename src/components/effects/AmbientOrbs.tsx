'use client';
import { motion } from 'framer-motion';
import { floatingOrb } from '@/lib/animations';

export default function AmbientOrbs() {
  return (
    <>
      {/* Top right indigo orb */}
      <motion.div
        variants={floatingOrb}
        animate="animate"
        style={{
          position: 'fixed',
          top: '-200px',
          right: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(40px)',
        }}
      />
      {/* Bottom left purple orb */}
      <motion.div
        variants={floatingOrb}
        animate="animate"
        style={{
          position: 'fixed',
          bottom: '-200px',
          left: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(40px)',
          animationDelay: '3s',
        }}
        transition={{ delay: 3 }}
      />
    </>
  );
}
