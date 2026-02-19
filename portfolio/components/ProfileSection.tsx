'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Download, Mail } from 'lucide-react';
import { BuyMeACoffeeIcon } from './BuyMeACoffeeIcon';
import { profile } from '@/app/data';
import { trackEvent } from '@/lib/analytics';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

export function ProfileSection() {
  const [showQuickMessage, setShowQuickMessage] = useState(false);
  const [messageName, setMessageName] = useState('');
  const [messageEmail, setMessageEmail] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [copiedToEmail, setCopiedToEmail] = useState(false);

  const copyToEmail = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else if (typeof document !== 'undefined') {
        const temp = document.createElement('textarea');
        temp.value = profile.email;
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }

      setCopiedToEmail(true);
      trackEvent('quick_message_to_copy');
      window.setTimeout(() => setCopiedToEmail(false), 1400);
    } catch {
      setCopiedToEmail(false);
    }
  };

  const onQuickMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = messageName.trim() || 'Portfolio Visitor';
    const trimmedEmail = messageEmail.trim() || 'Not provided';
    const trimmedMessage = messageBody.trim();
    if (!trimmedMessage) return;

    const subjectText = `Portfolio inquiry from ${trimmedName}`;
    const bodyText =
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`
    ;
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(bodyText);
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    const browserComposeUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}&body=${body}`;

    trackEvent('quick_message_submit', {
      has_name: Boolean(messageName.trim()),
      has_email: Boolean(messageEmail.trim()),
      message_length: trimmedMessage.length,
    });

    let fallbackCancelled = false;
    const cancelFallback = () => {
      fallbackCancelled = true;
      window.removeEventListener('blur', cancelFallback);
      window.removeEventListener('pagehide', cancelFallback);
    };

    window.addEventListener('blur', cancelFallback, { once: true });
    window.addEventListener('pagehide', cancelFallback, { once: true });

    window.setTimeout(() => {
      if (fallbackCancelled) return;
      trackEvent('quick_message_browser_fallback', { provider: 'gmail' });
      window.open(browserComposeUrl, '_blank', 'noopener,noreferrer');
      cancelFallback();
    }, 1400);

    window.location.href = mailtoUrl;
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: '40px 24px 0', display: 'flex', flexDirection: 'column', gap: 0 }}
    >
      {/* Badge */}
      <motion.div variants={item} style={{ marginBottom: 28 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 12px 5px 8px', borderRadius: 100,
          background: 'rgba(134,239,172,0.08)',
          border: '1px solid rgba(134,239,172,0.18)',
        }}>
          <div className="badge-dot" style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#86EFAC', flexShrink: 0,
          }} />
          <span style={{ fontSize: '.7rem', fontWeight: 400, letterSpacing: '.06em', color: 'rgba(134,239,172,0.8)' }}>
            Open to opportunities
          </span>
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1 variants={item} style={{
        fontSize: 'clamp(3rem,9vw,5.5rem)', fontWeight: 800,
        letterSpacing: '-.045em', lineHeight: .97, color: '#EBF4FF',
        marginBottom: 14,
      }}>
        {profile.name.split(' ').map((w, i) => (
          <span key={i} style={{ display: 'block' }}>{w}</span>
        ))}
      </motion.h1>

      {/* Title */}
      <motion.p variants={item} style={{
        fontSize: '.84rem', fontWeight: 300, letterSpacing: '.015em',
        color: 'rgba(170,195,220,0.42)', marginBottom: 28,
      }}>
        {profile.title} · {profile.location}
      </motion.p>

      {/* Bio */}
      <motion.p variants={item} style={{
        fontSize: '.94rem', fontWeight: 300, lineHeight: 1.75, letterSpacing: '-.005em',
        color: 'rgba(185,205,225,0.5)', maxWidth: 380, marginBottom: 36,
      }}>
        {profile.bio}
      </motion.p>

      <motion.div variants={item} style={{ height: 1, maxWidth: 340, background: 'rgba(255,255,255,0.055)', marginBottom: 28 }} />

      {/* Actions */}
      <motion.div variants={item} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        <a
          href={profile.resumeUrl}
          download
          className="action-pill primary"
          onClick={() => trackEvent('resume_download_click')}
        >
          <Download size={13} strokeWidth={1.5} />
          Resume
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="action-pill primary"
          onClick={() => trackEvent('contact_click', { method: 'mailto' })}
        >
          <Mail size={13} strokeWidth={1.5} />
          Contact
        </a>
        <button
          type="button"
          className="action-pill primary"
          onClick={() => {
            const nextState = !showQuickMessage;
            setShowQuickMessage(nextState);
            trackEvent('quick_message_toggle', { open: nextState });
          }}
        >
          Quick Message
        </button>
      </motion.div>

      {showQuickMessage && (
        <motion.form
          variants={item}
          onSubmit={onQuickMessageSubmit}
          style={{
            display: 'grid',
            gap: 10,
            maxWidth: 380,
            marginBottom: 22,
            padding: '14px 12px',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: '.7rem', letterSpacing: '.05em', color: 'rgba(178,200,226,0.56)' }}>To</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                readOnly
                value={profile.email}
                aria-label="Recipient email"
                style={{
                  flex: 1,
                  padding: '9px 11px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(6,14,28,0.65)',
                  color: '#EAF3FF',
                  fontSize: '.8rem',
                }}
              />
              <button
                type="button"
                className="action-pill primary"
                onClick={copyToEmail}
                style={{ minWidth: 84, justifyContent: 'center' }}
              >
                {copiedToEmail ? <Check size={13} strokeWidth={1.7} /> : <Copy size={13} strokeWidth={1.7} />}
                {copiedToEmail ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Your name"
            value={messageName}
            onChange={e => setMessageName(e.currentTarget.value)}
            style={{
              padding: '9px 11px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(6,14,28,0.65)',
              color: '#EAF3FF',
              fontSize: '.8rem',
            }}
          />
          <input
            type="email"
            placeholder="Your email"
            value={messageEmail}
            onChange={e => setMessageEmail(e.currentTarget.value)}
            style={{
              padding: '9px 11px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(6,14,28,0.65)',
              color: '#EAF3FF',
              fontSize: '.8rem',
            }}
          />
          <textarea
            placeholder="Your message"
            value={messageBody}
            onChange={e => setMessageBody(e.currentTarget.value)}
            rows={4}
            required
            style={{
              resize: 'vertical',
              minHeight: 92,
              padding: '10px 11px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(6,14,28,0.65)',
              color: '#EAF3FF',
              fontSize: '.82rem',
              lineHeight: 1.45,
            }}
          />
          <button type="submit" className="action-pill primary" style={{ width: 'fit-content' }}>
            Send Message
          </button>
        </motion.form>
      )}

      {/* Social */}
      <motion.div variants={item} style={{ display: 'flex', gap: 18 }}>
        {[['GitHub', profile.github], ['LinkedIn', profile.linkedin]].map(([label, url]) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: '.72rem', fontWeight: 600, letterSpacing: '.06em',
            color: 'rgba(150,175,205,0.28)', textDecoration: 'none',
            transition: 'color .2s',
          }}
          onClick={() => trackEvent('social_click', { platform: label })}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(185,210,235,0.6)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(150,175,205,0.28)')}
          >
            {label} ↗
          </a>
        ))}
      </motion.div>

      {profile.buyMeACoffeeUrl && (
        <motion.a
          href={profile.buyMeACoffeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('coffee_click')}
          aria-label="Buy me a coffee"
          title="Buy me a coffee"
          style={{
            position: 'fixed',
            right: 18,
            bottom: 'calc(120px + var(--dock-offset, 0px))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            textDecoration: 'none',
            lineHeight: 0,
            zIndex: 130,
          }}
          animate={{ y: [0, -7, 0], x: [0, 2, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.2, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <BuyMeACoffeeIcon size={30} />
        </motion.a>
      )}
    </motion.div>
  );
}
