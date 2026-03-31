import { motion } from 'motion/react';
import { Mail, Linkedin, Facebook, Users } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function Team() {
  const { data: members, loading: mL } = useFetch<any>('team_members', { order: { column: 'sort_order' } });
  const { data: alumni, loading: aL } = useFetch<any>('alumni_testimonials', { order: { column: 'sort_order' } });

  if (mL || aL) return <LoadingSpinner />;

  const exec = members.filter((m: any) => m.category === 'executive' && m.is_visible);
  const committee = members.filter((m: any) => m.category === 'committee' && m.is_visible);

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6">Meet Our Team</h1>
            <p className="text-xl text-white max-w-3xl mx-auto">Passionate students dedicated to building homes, communities, and hope.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Executive Board AY 2025-2026</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exec.map((m: any, i: number) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-[var(--color-bg-main)] rounded-2xl overflow-hidden scrapbook-border scrapbook-shadow hover:scale-105 transition-transform">
                <div className="relative">
                  <img src={m.image_url || 'https://placehold.co/400x264?text=' + encodeURIComponent(m.name)} alt={m.name} className="w-full h-64 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-heading font-bold text-white">{m.name}</h3>
                    <p className="text-[var(--color-green-1)] text-sm">{m.course}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[var(--color-green-5)] font-bold mb-3">{m.position}</p>
                  {m.bio && <p className="text-sm text-[var(--color-text-main)] mb-4">{m.bio}</p>}
                  <div className="flex gap-3">
                    {m.email && <a href={'mailto:' + m.email} className="p-2 bg-[var(--color-green-1)] rounded-full hover:bg-[var(--color-green-2)] transition-colors" title="Email"><Mail className="text-[var(--color-green-5)]" size={18} /></a>}
                    {m.linkedin && m.linkedin !== '#' && <a href={m.linkedin} className="p-2 bg-[var(--color-green-1)] rounded-full hover:bg-[var(--color-green-2)] transition-colors" title="LinkedIn"><Linkedin className="text-[var(--color-green-5)]" size={18} /></a>}
                    {m.facebook && m.facebook !== '#' && <a href={m.facebook} className="p-2 bg-[var(--color-green-1)] rounded-full hover:bg-[var(--color-green-2)] transition-colors" title="Facebook"><Facebook className="text-[var(--color-green-5)]" size={18} /></a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Committee Heads</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {committee.map((h: any, i: number) => (
              <motion.div key={h.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center">
                <div className="bg-white p-4 rounded-2xl scrapbook-border scrapbook-shadow hover:scale-105 transition-transform">
                  <img src={h.image_url || 'https://placehold.co/96x96?text=' + encodeURIComponent(h.name)} alt={h.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-[var(--color-green-5)]" />
                  <h3 className="font-heading font-bold text-[var(--color-green-5)] text-sm mb-1">{h.name}</h3>
                  <p className="text-xs text-[var(--color-text-main)] mb-2 font-semibold">{h.position}</p>
                  <p className="text-xs text-gray-600 mb-3">{h.course}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {alumni.length > 0 && (
        <section className="py-16 bg-[var(--color-green-1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Alumni Voices</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {alumni.map((t: any, i: number) => (
                <motion.div key={t.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: i * 0.2 }} className="bg-white p-8 rounded-2xl scrapbook-border scrapbook-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={t.image_url || 'https://placehold.co/64x64?text=Alumni'} alt={t.name} className="w-16 h-16 rounded-full object-cover border-4 border-[var(--color-green-5)]" />
                    <div>
                      <h3 className="font-heading font-bold text-[var(--color-green-5)]">{t.name}</h3>
                      <p className="text-sm text-gray-600">{t.year}</p>
                    </div>
                  </div>
                  <blockquote className="text-[var(--color-text-main)] italic mb-4">"{t.quote}"</blockquote>
                  {t.current_position && <p className="text-sm font-semibold text-[var(--color-green-4)]">{t.current_position}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-[var(--color-green-5)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="mx-auto mb-6 text-[var(--color-green-1)]" size={64} />
          <h2 className="text-4xl font-heading font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-xl text-white mb-8">We're always looking for passionate students who want to make a difference.</p>
          <a href="/contact" className="bg-white text-[var(--color-green-5)] hover:bg-[var(--color-green-1)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow">Contact Us</a>
        </div>
      </section>
    </div>
  );
}
