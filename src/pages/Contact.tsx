import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useInsert, useSettings } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import SEO from '../components/SEO';

// ── EmailJS configuration ──
// 1. Go to https://www.emailjs.com/ and sign up (free)
// 2. Add an Email Service (Gmail) → you'll get a SERVICE_ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Copy your Public Key from Account → General
const EMAILJS_SERVICE_ID = 'service_6qvx0xp';
const EMAILJS_TEMPLATE_ID = 'template_emq3pfe';
const EMAILJS_PUBLIC_KEY = 'TTjL641mYEK-Q_Ugv';

export default function Contact() {
  const { settings, loading: sL } = useSettings();
  const { insert } = useInsert<any>('contact_submissions');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (sL) return <LoadingSpinner />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Also save to Supabase as backup
      await insert(form);

      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
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
          <p className="text-xl text-white max-w-2xl mx-auto">We'd love to hear from you. Reach out anytime!</p>
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
                <p className="text-[var(--color-text-main)]">We'll get back to you soon.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-[var(--color-green-5)] hover:underline font-semibold">Send another message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-[var(--color-green-5)] text-white font-bold py-3 rounded-full hover:bg-[var(--color-green-4)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
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
