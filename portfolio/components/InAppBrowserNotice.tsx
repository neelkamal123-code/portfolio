'use client';

import { useEffect, useState } from 'react';

function isLinkedInInAppBrowser(userAgent: string) {
  return /LinkedInApp|LIAPP/i.test(userAgent);
}

export function InAppBrowserNotice() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dismissed = window.sessionStorage.getItem('li_notice_dismissed') === '1';
    const inApp = isLinkedInInAppBrowser(window.navigator.userAgent);
    setShow(inApp && !dismissed);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 68,
        left: 12,
        right: 12,
        zIndex: 250,
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(8,12,22,0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '10px 12px',
      }}
    >
      <p style={{ fontSize: '.75rem', lineHeight: 1.45, color: 'rgba(220,235,252,0.84)' }}>
        For best experience, open this page in your phone browser. In LinkedIn, tap the menu and choose
        {' '}
        <strong style={{ color: '#EBF4FF' }}>Open in Browser</strong>.
      </p>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            } catch {
              setCopied(false);
            }
          }}
          style={{
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: 999,
            background: 'transparent',
            color: 'rgba(220,235,252,0.78)',
            fontSize: '.68rem',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied' : 'Copy Link'}
        </button>
        <button
          onClick={() => {
            window.sessionStorage.setItem('li_notice_dismissed', '1');
            setShow(false);
          }}
          style={{
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: 999,
            background: 'transparent',
            color: 'rgba(220,235,252,0.78)',
            fontSize: '.68rem',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
