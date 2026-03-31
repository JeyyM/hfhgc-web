import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Heart, Home as HomeIcon, Users, Mail, MapPin, Clock,
} from 'lucide-react';
import { useFetchSingle, useFetch, useSettings } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const iconMap: Record<string, any> = { Home: HomeIcon, Heart, Users, Clock, Mail, MapPin };

export default function Home() {
  const { data: hero, loading: hL } = useFetchSingle<any>('home_hero');
  const { data: cards, loading: cL } = useFetch<any>('home_cards', { order: { column: 'sort_order' } });
  const { data: stats, loading: sL } = useFetch<any>('impact_stats', { order: { column: 'sort_order' } });
  const { settings } = useSettings();

  if (hL || cL || sL) return <LoadingSpinner />;
  const h = hero || ({} as any);

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      {/* Hero */}
      <section className="hero-section relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-[var(--color-green-5)] leading-tight mb-6">
                {h.heading_line1} <span className="text-[var(--color-green-4)]">{h.heading_accent1}</span>,<br />
                {h.heading_line2} <span className="text-[var(--color-green-2)]">{h.heading_accent2}</span>.
              </h1>
              <p className="text-xl text-[var(--color-text-main)] mb-8 max-w-lg">{h.subtext}</p>
              <div className="flex flex-wrap gap-4">
                <Link to={h.cta1_link || '/projects'} className="bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow">{h.cta1_label}</Link>
                <Link to={h.cta2_link || '/contact'} className="bg-[var(--color-green-2)] hover:bg-[var(--color-green-4)] text-[var(--color-text-main)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow flex items-center gap-2">{h.cta2_label} <ArrowRight size={20} /></Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="polaroid rotate-3 z-20 relative">
                <img src={h.image_url || 'https://placehold.co/600x400?text=Hero+Image'} alt="Hero" className="w-full h-auto object-cover rounded-sm" referrerPolicy="no-referrer" />
                <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">{h.image_caption}</p>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-green-4)] rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-green-1)] rounded-full opacity-30 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((c: any) => {
              const Icon = iconMap[c.icon_name] || HomeIcon;
              return (
                <motion.div key={c.id} whileHover={{ y: -10 }} className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6"><Icon className="text-white" size={28} /></div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4">{c.title}</h3>
                  <p className="text-white/90">{c.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Our Impact</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">Real numbers, real change. See the difference we're making together.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s: any, i: number) => {
              const Icon = iconMap[s.icon_name] || HomeIcon;
              return (
                <motion.div key={s.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"><Icon className="text-white" size={32} /></div>
                  <p className="text-5xl font-heading font-bold text-white mb-2">{s.value}</p>
                  <p className="text-white/90 font-semibold">{s.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6">Get In Touch</h2>
            <p className="text-xl text-[var(--color-text-main)] max-w-2xl mx-auto mb-10">Whether you want to volunteer, partner with us, or just learn more - we'd love to hear from you.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-block bg-[var(--color-green-5)] text-white font-bold py-4 px-10 rounded-full hover:bg-[var(--color-green-4)] transition-all hover:scale-105 scrapbook-shadow text-lg">Contact Us</Link>
              <Link to="/about" className="inline-block bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)] font-bold py-4 px-10 rounded-full hover:bg-[var(--color-green-1)] transition-all hover:scale-105 text-lg shadow-[3px_3px_0px_rgba(0,0,0,0.12)]">Learn More</Link>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="bg-[var(--color-green-5)] p-10 rounded-2xl scrapbook-shadow">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4"><Mail className="text-white" size={24} /></div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Email Us</h3>
                <p className="text-white/80 text-sm mb-3">We reply within 24 hours on school days.</p>
                <a href={'mailto:' + (settings.org_email || '')} className="text-white font-semibold hover:underline">{settings.org_email || 'hfhgc@dlsu.edu.ph'}</a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="bg-[var(--color-green-5)] p-10 rounded-2xl scrapbook-shadow">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4"><MapPin className="text-white" size={24} /></div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Find Us</h3>
                <p className="text-white/80 text-sm mb-3">Based at the heart of Manila's premier university.</p>
                <p className="text-white font-semibold">{settings.org_address || 'De La Salle University, Taft Ave, Manila'}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="bg-[var(--color-green-5)] p-10 rounded-2xl scrapbook-shadow">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4"><Users className="text-white" size={24} /></div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Follow Us</h3>
                <p className="text-white/80 text-sm mb-3">Stay updated on our latest builds and events.</p>
                <a href={settings.facebook_url || '#'} target="_blank" rel="noreferrer" className="text-white font-semibold hover:underline">@hfhgcdlsu</a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
