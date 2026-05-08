import Sidebar from '@/components/layout/Sidebar';
import AmbientOrbs from '@/components/effects/AmbientOrbs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }} className="grid-bg">
      <AmbientOrbs />
      <Sidebar />

      {/* Main content */}
      <main style={{
        marginLeft: 'var(--sidebar-width)',
        flex: 1,
        minHeight: '100vh',
        padding: '32px',
        position: 'relative',
        zIndex: 1,
        overflowY: 'auto',
      }}>
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
            padding: 16px !important;
            padding-bottom: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
