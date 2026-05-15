import { useCallback, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useSettings } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import SEO from '../components/SEO';

/** Mirrors supabase/schema.sql CHECK constraints on contact_submissions */
const CONTACT_MAX = {
  name: 200,
  email: 254,
  subject: 500,
  message: 8000,
} as const;

const CONTACT_SUBMIT_COOLDOWN_MS = 60_000;
const CONTACT_SUBMIT_TS_KEY = 'hfhgc_contact_last_submit_ts';

export default function Contact() {
  const { settings, loading: sL } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const turnstileRef = useRef<TurnstileInstance>(null);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? '';
  const supabaseAnon = import.meta.env.VITE_SUPABASE_PUBLIC_KEY?.trim() ?? '';
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? '';

  const captchaReady = useCallback((token: string) => {
    setCaptchaToken(token);
    setError('');
  }, []);

  const captchaExpire = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  const captchaFail = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  if (sL) return <LoadingSpinner />;

  const formConfigured = Boolean(supabaseUrl && supabaseAnon && turnstileSiteKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (!formConfigured) {
        setError('Contact form is not configured. Please reach us using the email or address shown on the left.');
        return;
      }

      const name = form.name.trim();
      const email = form.email.trim();
      const subject = form.subject.trim();
      const message = form.message.trim();

      if (name.length === 0 || name.length > CONTACT_MAX.name) {
        setError(`Name must be between 1 and ${CONTACT_MAX.name} characters.`);
        return;
      }
      if (email.length < 3 || email.length > CONTACT_MAX.email) {
        setError('Please enter a valid email address.');
        return;
      }
      if (subject.length === 0 || subject.length > CONTACT_MAX.subject) {
        setError(`Subject must be between 1 and ${CONTACT_MAX.subject} characters.`);
        return;
      }
      if (message.length === 0 || message.length > CONTACT_MAX.message) {
        setError(`Message must be between 1 and ${CONTACT_MAX.message} characters.`);
        return;
      }

      const prev = sessionStorage.getItem(CONTACT_SUBMIT_TS_KEY);
      if (prev) {
        const elapsed = Date.now() - Number(prev);
        if (!Number.isFinite(elapsed) || elapsed < CONTACT_SUBMIT_COOLDOWN_MS) {
          setError('Please wait a minute before sending another message.');
          return;
        }
      }

      if (!captchaToken) {
        setError('Complete the verification challenge before sending.');
        return;
      }

      const res = await fetch(`${supabaseUrl}/functions/v1/submit-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnon}`,
          apikey: supabaseAnon,
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          captchaToken,
        }),
      });

      let payload: { error?: string; ok?: boolean } = {};
      try {
        payload = await res.json();
      } catch {
        /* empty */
      }

      if (!res.ok || !payload.ok) {
        const msg =
          typeof payload?.error === 'string' ? payload.error : `Request failed (${res.status}). Please try again.`;
        setError(msg);
        return;
      }

      sessionStorage.setItem(CONTACT_SUBMIT_TS_KEY, String(Date.now()));
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    } catch (err) {
      console.error('Contact submit:', err);
      setError('Failed to send message. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <SEO title="Contact Us" description="Get in touch with Habitat for Humanity Green Chapter DLSU. Send us a message or reach out via email." path="/contact" />
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold mb-4">Contact Us</motion.h1>
          <p className="text-xl text-white max-w-2xl mx-auto">We&apos;d love to hear from you. Reach out anytime!</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-8">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-green-1)] rounded-full flex items-center justify-center flex-shrink-0"><Mail className="text-[var(--color-green-5)]" size={20} /></div>
                <div>
                  <h3 className="font-heading font-bold text-[var(--color-green-5)]">Email</h3>
                  <p className="text-[var(--color-text-main)]">{settings.org_email || 'habitatforhumanitydlsu@gmail.com'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-green-1)] rounded-full flex items-center justify-center flex-shrink-0"><MapPin className="text-[var(--color-green-5)]" size={20} /></div>
                <div>
                  <h3 className="font-heading font-bold text-[var(--color-green-5)]">Address</h3>
                  <p className="text-[var(--color-text-main)]">{settings.org_address || 'De La Salle University, Taft Ave, Manila'}</p>
                </div>
              </div>
              {settings.org_phone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--color-green-1)] rounded-full flex items-center justify-center flex-shrink-0"><Phone className="text-[var(--color-green-5)]" size={20} /></div>
                  <div>
                    <h3 className="font-heading font-bold text-[var(--color-green-5)]">Phone</h3>
                    <p className="text-[var(--color-text-main)]">{settings.org_phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl scrapbook-shadow">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-16 h-16 bg-[var(--color-green-1)] rounded-full flex items-center justify-center mx-auto mb-4"><Send className="text-[var(--color-green-5)]" size={28} /></div>
                <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-2">Message Sent!</h3>
                <p className="text-[var(--color-text-main)]">We&apos;ll get back to you soon.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-6 text-[var(--color-green-5)] hover:underline font-semibold">Send another message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {!formConfigured && (
                  <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                    Configure <code className="text-xs">VITE_SUPABASE_URL</code>,{' '}
                    <code className="text-xs">VITE_SUPABASE_PUBLIC_KEY</code>, and{' '}
                    <code className="text-xs">VITE_TURNSTILE_SITE_KEY</code>, then deploy the{' '}
                    <code className="text-xs">submit-contact</code> Edge Function.
                  </p>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input required maxLength={CONTACT_MAX.name} autoComplete="name" disabled={!formConfigured} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent disabled:opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input required type="email" maxLength={CONTACT_MAX.email} autoComplete="email" disabled={!formConfigured} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent disabled:opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <input required maxLength={CONTACT_MAX.subject} disabled={!formConfigured} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent disabled:opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea required rows={5} maxLength={CONTACT_MAX.message} disabled={!formConfigured} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent disabled:opacity-50" />
                </div>

                {formConfigured && (
                  <div className="min-h-[65px]" aria-live="polite">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={turnstileSiteKey}
                      onSuccess={captchaReady}
                      onExpire={captchaExpire}
                      onError={captchaFail}
                      options={{ theme: 'auto' }}
                      className="min-h-[65px]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !formConfigured || !captchaToken}
                  className="w-full bg-[var(--color-green-5)] text-white font-bold py-3 rounded-full hover:bg-[var(--color-green-4)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />{submitting ? 'Sending...' : 'Send Message'}
                </button>
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
