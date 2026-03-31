import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ExternalLink, Heart, Building, Users, CheckCircle, Handshake, Globe, Quote } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function Partnerships() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: partners, loading: pL } = useFetch<any>('partners', { order: { column: 'sort_order' } });
  const { data: testimonials, loading: tL } = useFetch<any>('partner_testimonials', { order: { column: 'sort_order' } });
  const { data: benefits, loading: bL } = useFetch<any>('partnership_benefits', { order: { column: 'sort_order' } });
  const { data: stats, loading: sL } = useFetch<any>('impact_stats', { order: { column: 'sort_order' } });

  if (pL || tL || bL || sL) return <LoadingSpinner />;

  const visible = partners.filter((p: any) => p.is_visible !== false);
  const visibleBenefits = benefits.filter((b: any) => b.is_visible !== false);
  const partnershipStats = stats.filter((s: any) => 
    s.label === '12+' || s.label === '₱3.2M' || s.label === '80+' || s.label === '6'
  );

  const currentPartners = visible.filter((p: any) => !p.is_past);
  const pastPartners = visible.filter((p: any) => p.is_past);

  const iconMap: Record<string, any> = {
    Heart, Building, Users, CheckCircle, Handshake, Globe
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold mb-4">Our Partners</motion.h1>
          <p className="text-xl text-white max-w-2xl mx-auto">Building together with organizations that share our vision.</p>
        </div>
      </section>

      {partnershipStats.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipStats.map((stat: any, idx: number) => {
                const Icon = iconMap[stat.icon_name] || Handshake;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[var(--color-green-1)] border-2 border-[var(--color-green-3)] rounded-2xl p-8 text-center scrapbook-shadow"
                  >
                    <Icon className="mx-auto mb-4 text-[var(--color-green-5)]" size={48} />
                    <p className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-2">{stat.label}</p>
                    <p className="text-[var(--color-green-5)] font-medium">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {visibleBenefits.length > 0 && (
        <section className="py-20 bg-[var(--color-bg-main)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Why Partner With Us?</h2>
              <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
                A partnership with HFHGC is more than a sponsorship — it's a commitment to building hope alongside us.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visibleBenefits.map((benefit: any, idx: number) => {
                const Icon = iconMap[benefit.icon_name] || CheckCircle;
                return (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-8 scrapbook-shadow flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-[var(--color-green-1)] flex items-center justify-center">
                        <Icon className="text-[var(--color-green-5)]" size={32} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-[var(--color-text-main)] mb-3">{benefit.title}</h3>
                      <p className="text-[var(--color-text-main)]">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Current Partners Section */}
      {currentPartners.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-4 text-center">Our Current Partners</h2>
            <p className="text-center text-[var(--color-text-main)] max-w-2xl mx-auto mb-12">We're proud to work alongside these incredible organizations who share our vision of homes, communities, and hope.</p>
            <div className={`grid ${windowWidth < 600 ? 'grid-cols-1' : windowWidth < 1024 ? 'grid-cols-2' : 'grid-cols-3'} gap-8`}>
              {currentPartners.map((p: any, i: number) => (
                <motion.div 
                  key={p.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.05 }} 
                  className="border-2 border-black bg-white rounded-2xl p-6 scrapbook-shadow hover:shadow-xl transition-shadow"
                >
                  {p.image_url && <img src={p.image_url} alt={p.name} className="h-16 object-contain mb-4" />}
                  <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-2">{p.name}</h3>
                  {p.description && <p className="text-sm text-[var(--color-text-main)] mb-3">{p.description}</p>}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {p.since_year && <span className="text-[var(--color-green-4)] font-medium">Partner since {p.since_year}</span>}
                    {p.website && p.website !== '#' && (
                      <a href={p.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[var(--color-green-5)] hover:underline">
                        <ExternalLink size={12} />Website
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Supporters Section - Original Design */}
      {pastPartners.length > 0 && (
        <section className="py-16 bg-[var(--color-bg-main)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-4 text-center">Past Supporters</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Organizations that have generously supported our mission over the years.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pastPartners.map((p: any, i: number) => (
                <motion.div 
                  key={p.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="border-2 border-black bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center scrapbook-shadow"
                >
                  {p.image_url && <img src={p.image_url} alt={p.name} className="h-20 w-full object-contain mb-4 grayscale" />}
                  <p className="text-sm font-medium text-gray-600">{p.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] text-center mb-12">What Our Partners Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t: any) => (
                <div key={t.id} className="bg-[var(--color-green-1)] p-8 rounded-2xl scrapbook-shadow relative">
                  <Quote className="absolute top-4 right-4 text-white opacity-40" size={48} />
                  <blockquote className="text-[var(--color-text-main)] italic mb-4">"{t.quote}"</blockquote>
                  <div className="flex items-center gap-3">
                    {t.image_url && <img src={t.image_url} alt={t.name} className="w-12 h-12 rounded-full object-cover" />}
                    <div>
                      <p className="font-heading font-bold text-[var(--color-green-5)]">{t.name}</p>
                      <p className="text-sm text-gray-600">{t.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
