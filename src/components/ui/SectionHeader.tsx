'use client';
import Link from 'next/link';

interface SectionHeaderProps {
  label: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function SectionHeader({ label, actionLabel, actionHref }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <span className="section-label">{label}</span>
      {actionLabel && actionHref && (
        <Link href={actionHref} style={{
          fontSize: '12px',
          color: 'var(--accent)',
          textDecoration: 'none',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
