import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Home as HomeIcon, Mail, MapPin, Users } from 'lucide-react';
import { useFetchSingle, useFetch, useSettings } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import SEO from '../components/SEO';
import { LUCIDE_ICONS } from '../components/AdminUI';
import { SOCIAL_ICON_MAP, PLATFORM_LABELS, type SocialLink } from '../lib/socialIcons';

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enable caching with 15-minute TTL for all content
  const { data: hero, loading: hL } = useFetchSingle<any>('home_hero', 15 * 60 * 1000);
  const { data: cards, loading: cL } = useFetch<any>('home_cards', { 
    order: { column: 'sort_order' },
    cache: true,
    cacheTTL: 15 * 60 * 1000
  });
  const { data: stats, loading: sL } = useFetch<any>('impact_stats', { 
    order: { column: 'sort_order' },
    cache: true,
    cacheTTL: 15 * 60 * 1000
  });
  const { settings } = useSettings();
  const { data: socialLinks } = useFetch<SocialLink>('social_links', { order: { column: 'sort_order' } });

  if (hL || cL || sL) return <LoadingSpinner />;
  const h = hero || ({} as any);

  const PolaroidImage = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
      <div className="polaroid rotate-3 z-20 relative">
        <img src={h.image_url || 'https://placehold.co/600x400?text=Hero+Image'} alt="Hero" className="w-full h-auto object-cover rounded-sm" referrerPolicy="no-referrer" />
        <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">{h.image_caption}</p>
      </div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-green-4)] rounded-full opacity-20 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-green-1)] rounded-full opacity-30 blur-2xl" />
    </motion.div>
  );

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <SEO title="Home" description="Habitat for Humanity Green Chapter DLSU — Building homes, communities, and hope through sustainable housing initiatives in the Philippines." path="/" />
      {/* Hero */}
      <section className="hero-section relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-[var(--color-green-5)] leading-tight mb-6">
                {h.heading_line1} <span className="text-[var(--color-green-4)]">{h.heading_accent1}</span><br />
                {h.heading_line2} <span className="text-[var(--color-green-2)]">{h.heading_accent2}</span>.
              </h1>
              
              {/* Show polaroid between heading and subtext when width < 1050px */}
              {windowWidth < 1050 && <div className="mb-8"><PolaroidImage /></div>}
              
              <p className="text-xl text-[var(--color-text-main)] mb-8 max-w-lg">{h.subtext}</p>
              <div className="flex flex-wrap gap-4">
                <Link to={h.cta1_link || '/projects'} className="bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow">{h.cta1_label}</Link>
                <Link to={h.cta2_link || '/contact'} className="bg-[var(--color-green-2)] hover:bg-[var(--color-green-4)] text-[var(--color-text-main)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow flex items-center gap-2">{h.cta2_label} <ArrowRight size={20} /></Link>
              </div>
            </motion.div>
            
            {/* Show polaroid on the right side when width >= 1050px */}
            {windowWidth >= 1050 && <PolaroidImage />}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid ${windowWidth < 600 ? 'grid-cols-1' : windowWidth < 980 ? 'grid-cols-2 auto-grid-center' : 'grid-cols-3'} gap-8`}>
            {cards.map((c: any) => {
              const Icon = LUCIDE_ICONS[c.icon_name] || HomeIcon;
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
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">At Habitat for Humanity Green Chapter, every action helps build a lasting and sustainable impact. Together, through small steps, we can eliminate the cycle of poverty housing and make a difference.</p>
          </div>
          <div className={`grid ${windowWidth < 980 ? 'grid-cols-2' : 'grid-cols-3'} gap-6 max-w-4xl mx-auto`}>
            {stats.map((s: any, i: number) => {
              const Icon = LUCIDE_ICONS[s.icon_name] || HomeIcon;
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6">Get In Touch</h2>
            <p className="text-xl text-[var(--color-text-main)] max-w-2xl mx-auto mb-10">Be part of the change! Reach out to volunteer or partner with us in building stronger communities.
</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-block bg-[var(--color-green-5)] text-white font-bold py-4 px-10 rounded-full hover:bg-[var(--color-green-4)] transition-all hover:scale-105 scrapbook-shadow text-lg">Contact Us</Link>
              <Link to="/about" className="inline-block bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)] font-bold py-4 px-10 rounded-full hover:bg-[var(--color-green-1)] transition-all hover:scale-105 text-lg shadow-[3px_3px_0px_rgba(0,0,0,0.12)]">Learn More</Link>
            </div>
            <div className={`mt-16 grid ${windowWidth < 600 ? 'grid-cols-1' : windowWidth < 980 ? 'grid-cols-2 auto-grid-center' : 'grid-cols-3'} gap-10 text-left max-w-6xl mx-auto`}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="bg-[var(--color-green-5)] p-12 rounded-2xl scrapbook-shadow">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4"><Mail className="text-white" size={24} /></div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Email Us</h3>
                <p className="text-white/80 text-sm mb-3">We reply within 24 hours on school days.</p>
                <a href={'mailto:' + (settings.org_email || 'habitatforhumanitydlsu@gmail.com')} className="text-white font-semibold hover:underline">{settings.org_email || 'habitatforhumanitydlsu@gmail.com'}</a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="bg-[var(--color-green-5)] p-12 rounded-2xl scrapbook-shadow">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4"><MapPin className="text-white" size={24} /></div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Find Us</h3>
                <p className="text-white/80 text-sm mb-3">Based at the heart of Manila's premier university.</p>
                <p className="text-white font-semibold">{settings.org_address || 'De La Salle University, Taft Ave, Manila'}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="bg-[var(--color-green-5)] p-12 rounded-2xl scrapbook-shadow">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4"><Users className="text-white" size={24} /></div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Follow Us</h3>
                <p className="text-white/80 text-sm mb-3">Stay updated on our latest builds and events.</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {socialLinks.map(link => {
                    const Icon = SOCIAL_ICON_MAP[link.platform];
                    if (!Icon) return null;
                    return (
                      <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors" title={PLATFORM_LABELS[link.platform] || link.platform}>
                        <Icon className="w-5 h-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
