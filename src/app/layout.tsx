import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'ReceiptVault — AI Receipt Intelligence',
  description: 'AI-powered receipt intelligence dashboard. Deadlines tracked. Money protected. Built for Samsung PRISM Hackathon 2026.',
  keywords: ['receipt', 'AI', 'spending', 'finance', 'warranty', 'deadlines'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="noise">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              border: '0.5px solid var(--glass-border)',
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: 'DM Sans',
            },
          }}
        />
      </body>
    </html>
  );
}
