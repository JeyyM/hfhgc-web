import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Heart, Building, Users, Handshake, Globe, Quote, Check, X, Home as HomeIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch, useSettings } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import SEO from '../components/SEO';
import { LUCIDE_ICONS } from '../components/AdminUI';

export default function Partnerships() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [partnerSlide, setPartnerSlide] = useState(0);
  const [partnerDir, setPartnerDir] = useState(1);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { settings } = useSettings();

  const { data: communities,    loading: coL } = useFetch<any>('featured_communities',    { order: { column: 'sort_order' } });
  const { data: communityStats, loading: csL } = useFetch<any>('featured_community_stats', { order: { column: 'sort_order' } });
  const { data: whyItems,     loading: wL  } = useFetch<any>('partnership_why_items', { order: { column: 'sort_order' } });
  const { data: packages,     loading: pkL } = useFetch<any>('partnership_packages',  { order: { column: 'sort_order' } });
  const { data: packageLineItems, loading: pkiL } = useFetch<any>('partnership_package_items', { order: { column: 'sort_order' } });
  const { data: partners,     loading: pL  } = useFetch<any>('partners',              { order: { column: 'sort_order' } });
  const { data: testimonials, loading: tL  } = useFetch<any>('partner_testimonials',  { order: { column: 'sort_order' } });
  const { data: stats,        loading: sL  } = useFetch<any>('impact_stats',          { order: { column: 'sort_order' } });

  const packageItemsByPkg = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const it of packageLineItems) {
      const pid = it.package_id as string;
      if (!pid) continue;
      if (!map.has(pid)) map.set(pid, []);
      map.get(pid)!.push(it);
    }
    for (const rows of map.values()) {
      rows.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    }
    return map;
  }, [packageLineItems]);

  const iconMap: Record<string, any> = { Heart, Building, Users, Handshake, Globe };

  if (coL || csL || wL || pkL || pkiL || pL || tL || sL) return <LoadingSpinner />;

  const visibleCommunities = communities.filter((c: any) => c.is_visible !== false);
  const visibleWhyItems    = whyItems.filter((w: any) => w.is_visible !== false);
  const visiblePackages    = packages.filter((p: any) => p.is_visible !== false);
  const visible            = partners.filter((p: any) => p.is_visible !== false);
  const currentPartners    = visible.filter((p: any) => !p.is_past);
  const pastPartners       = visible.filter((p: any) => p.is_past);
  const partnershipStats   = stats.filter((s: any) =>
    s.label === '12+' || s.label === '₱3.2M' || s.label === '80+' || s.label === '6'
  );

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <SEO title="Partnerships" description="Discover the partnerships and collaborations of Habitat for Humanity Green Chapter DLSU with organizations dedicated to sustainable housing." path="/partnerships" />

      {/* ── Hero ── */}
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold mb-4">Our Partners</motion.h1>
          <p className="text-xl text-white max-w-2xl mx-auto">Building together with organizations that share our vision.</p>
        </div>
      </section>

      {/* ── Featured Communities ── */}
      {visibleCommunities.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Shared heading */}
            <div className="text-center mb-16">
              <span className="inline-block bg-[var(--color-green-1)] text-[var(--color-green-5)] font-bold text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                Featured {visibleCommunities.length === 1 ? 'Community' : 'Communities'}
              </span>
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)]">
                Communities We've Partnered With
              </h2>
            </div>

            {/* Alternating rows */}
            <div className="space-y-20">
              {visibleCommunities.map((community: any, cIdx: number) => {
                const isEven = cIdx % 2 === 0;
                const chips  = communityStats.filter((s: any) => s.community_name === community.name);
                return (
                  <div key={community.id}>
                    <div className={`flex flex-col ${windowWidth >= 900 ? (isEven ? 'md:flex-row' : 'md:flex-row-reverse') : ''} gap-12 items-center`}>

                      {/* Polaroid image */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex justify-center w-full md:w-1/2 flex-shrink-0"
                      >
                        <div className={`polaroid ${isEven ? 'rotate-2' : '-rotate-2'} max-w-lg w-full`}>
                          <img
                            src={community.image_url || `https://placehold.co/600x420?text=${encodeURIComponent(community.name)}`}
                            alt={community.name}
                            className="w-full h-auto object-cover rounded-sm"
                          />
                          {community.image_caption && (
                            <p className="font-heading text-center mt-4 text-lg text-[var(--color-text-main)]">{community.image_caption}</p>
                          )}
                        </div>
                      </motion.div>

                      {/* Text + stats */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 24 : -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                      >
                        <h3 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-4">{community.name}</h3>
                        <p className="text-[var(--color-text-main)] text-lg leading-relaxed mb-8 whitespace-pre-line">
                          {community.description}
                        </p>
                        {chips.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {chips.map((chip: any) => {
                              const Icon = LUCIDE_ICONS[chip.icon_name] || HomeIcon;
                              return (
                                <div key={chip.id} className="flex items-center gap-3 bg-white border-2 border-[var(--color-green-3)] rounded-xl px-4 py-3 scrapbook-shadow">
                                  <div className="w-9 h-9 rounded-full bg-[var(--color-green-5)] flex items-center justify-center flex-shrink-0">
                                    <Icon size={17} className="text-white" />
                                  </div>
                                  <div>
                                    <p className="text-xl font-heading font-bold text-[var(--color-green-5)] leading-none">{chip.value}</p>
                                    <p className="text-[11px] font-semibold text-gray-500 mt-0.5 uppercase tracking-wide">{chip.label}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Divider between communities */}
                    {cIdx < visibleCommunities.length - 1 && (
                      <div className="mt-20 border-t-2 border-dashed border-[var(--color-green-3)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Why Partner With Us ── */}
      {visibleWhyItems.length > 0 && (
        <section className="py-20 bg-[var(--color-bg-main)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid ${windowWidth < 900 ? 'grid-cols-1' : 'grid-cols-2'} gap-16 items-center`}>
              {/* Placeholder / image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="polaroid -rotate-2 max-w-lg w-full">
                  <img
                    src={settings.partnerships_why_image_url || 'https://placehold.co/600x420?text=HFHGC+Partnership'}
                    alt="HFHGC Partnership"
                    className="w-full h-auto object-cover rounded-sm"
                  />
                  <p className="font-heading text-center mt-4 text-lg text-[var(--color-text-main)]">
                    {settings.partnerships_why_image_caption || 'Building partnerships, building hope'}
                  </p>
                </div>
              </motion.div>

              {/* Bullet items */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Why partner with us?</h2>
                <p className="text-[var(--color-text-main)] text-lg mb-8">
                  A partnership with HFHGC is more than a sponsorship — it's a commitment to building hope alongside us.
                </p>
                <ul className="space-y-5">
                  {visibleWhyItems.map((item: any, idx: number) => {
                    const Icon = LUCIDE_ICONS[item.icon_name] || HomeIcon;
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.12, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 bg-white border-2 border-[var(--color-green-3)] rounded-2xl p-5 scrapbook-shadow"
                      >
                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[var(--color-green-1)] flex items-center justify-center">
                          <Icon className="text-[var(--color-green-5)]" size={22} />
                        </div>
                        <p className="text-[var(--color-text-main)] font-medium text-base leading-snug min-w-0 flex-1">{item.text}</p>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── Partnership Packages ── */}
      {visiblePackages.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Partnership Packages</h2>
              <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
                Choose a package that fits your organization's goals and make a meaningful impact with us.
              </p>
            </div>

            {(() => {
              const tierStyles = [
                {
                  headerBg:   'bg-amber-400',
                  headerText: 'text-amber-900',
                  border:     'border-amber-400',
                  statBg:     'bg-amber-50',
                  statText:   'text-amber-700',
                },
                {
                  headerBg:   'bg-gray-300',
                  headerText: 'text-gray-700',
                  border:     'border-gray-300',
                  statBg:     'bg-gray-50',
                  statText:   'text-gray-600',
                },
                {
                  headerBg:   'bg-orange-300',
                  headerText: 'text-orange-900',
                  border:     'border-orange-400',
                  statBg:     'bg-orange-50',
                  statText:   'text-orange-700',
                },
              ];

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                  {visiblePackages.map((pkg: any, pIdx: number) => {
                    const s = tierStyles[pIdx] ?? tierStyles[tierStyles.length - 1];
                    const lines = packageItemsByPkg.get(pkg.id as string) ?? [];
                    const showPopular = pkg.is_most_popular === true;
                    return (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: pIdx * 0.12, duration: 0.5 }}
                        viewport={{ once: true }}
                        className={`rounded-2xl border-2 ${s.border} overflow-hidden scrapbook-shadow bg-white min-w-0 max-w-lg mx-auto w-full md:max-w-none`}
                      >
                        {/* Tier header — badge row reserved on every card so headers align */}
                        <div className={`${s.headerBg} px-4 pb-8 text-center`}>
                          <div className="flex justify-center items-center min-h-[2rem] pt-3 mb-2">
                            {showPopular && (
                              <span className="bg-[var(--color-green-5)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <div className="text-5xl mb-3">{pkg.tier_emoji}</div>
                          <h3 className={`text-3xl font-heading font-bold ${s.headerText}`}>{pkg.tier_name}</h3>
                        </div>

                        {/* Benefits (admin-defined rows) */}
                        <div className="flex flex-col divide-y divide-gray-100 text-center">
                          {lines.length === 0 ? (
                            <div className="px-4 py-8 text-sm text-gray-400 italic">Package details coming soon.</div>
                          ) : (
                            lines.map((row: any, rIdx: number) => (
                              <div
                                key={row.id ?? rIdx}
                                className={`px-4 sm:px-6 py-5 sm:py-6 flex flex-col items-center justify-center gap-2 sm:gap-3 ${
                                  rIdx % 2 === 0 ? s.statBg : ''
                                }`}
                              >
                                <div className="flex flex-col gap-1 max-w-[20rem]">
                                  {(row.title || '').trim() && (
                                    <p className="text-xs text-gray-700 uppercase tracking-wide font-bold">{row.title}</p>
                                  )}
                                  {(row.subtext || '').trim() && (
                                    <p className="text-xs text-gray-600 leading-snug">{row.subtext}</p>
                                  )}
                                </div>
                                {row.display_type === 'checkbox' ? (
                                  row.is_included ? (
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-green-5)] flex items-center justify-center shrink-0 shadow-sm">
                                      <Check size={18} className="text-white" strokeWidth={3} />
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-sm">
                                      <X size={18} className="text-white" strokeWidth={3} />
                                    </div>
                                  )
                                ) : (
                                  <p className={`text-3xl sm:text-4xl font-heading font-bold tabular-nums leading-none ${s.statText}`}>
                                    {String(row.text_value ?? '').trim() !== '' ? row.text_value : '—'}
                                  </p>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ── Impact Stats ── */}
      {partnershipStats.length > 0 && (
        <section className="py-16 bg-[var(--color-bg-main)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipStats.map((stat: any, idx: number) => {
                const Icon = iconMap[stat.icon_name] || Handshake;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
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

      {/* ── Current Partners ── */}
      {currentPartners.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-4 text-center">Our Current Partners</h2>
            <p className="text-center text-[var(--color-text-main)] max-w-2xl mx-auto mb-12">
              We're proud to work alongside these incredible organizations who share our vision of homes, communities, and hope.
            </p>
            <div className={`grid ${windowWidth < 600 ? 'grid-cols-1' : windowWidth < 1024 ? 'grid-cols-2 auto-grid-center' : 'grid-cols-3'} gap-8`}>
              {currentPartners.map((p: any, i: number) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-2 border-black bg-white rounded-2xl p-6 scrapbook-shadow hover:shadow-xl transition-shadow flex flex-col items-center text-center"
                >
                  {p.image_url && (
                    <div className="flex justify-center mb-4 w-full">
                      <img src={p.image_url} alt={p.name} className="h-16 object-contain" />
                    </div>
                  )}
                  <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-2">{p.name}</h3>
                  {p.description && <p className="text-sm text-[var(--color-text-main)] mb-3">{p.description}</p>}
                  <div className="flex items-center justify-center flex-wrap gap-3 text-xs text-gray-500 mt-auto pt-2">
                    {p.since_year && <span className="text-[var(--color-green-5)] font-semibold">Partner since {p.since_year}</span>}
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

      {/* ── Past Supporters ── */}
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

      {/* ── Partner Testimonials ── */}
      {testimonials.filter((t: any) => t.is_visible !== false).length > 0 && (() => {
        const visible = testimonials.filter((t: any) => t.is_visible !== false);
        const goTo = (idx: number) => {
          setPartnerDir(idx > partnerSlide ? 1 : -1);
          setPartnerSlide(idx);
        };
        const prev = () => goTo((partnerSlide - 1 + visible.length) % visible.length);
        const next = () => goTo((partnerSlide + 1) % visible.length);
        const variants = {
          enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit:  (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
        };
        const current = visible[partnerSlide];
        return (
          <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                    <Quote className="text-white" size={28} />
                  </div>
                </div>
                <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-3">What Our Partners Say</h2>
                <p className="text-lg text-[var(--color-text-main)] max-w-xl mx-auto">
                  Hear from the organizations who have walked alongside us in building hope.
                </p>
              </div>

              {/* Carousel card */}
              <div className="relative bg-[var(--color-green-5)] rounded-3xl p-10 md:p-14 overflow-hidden scrapbook-shadow">
                <AnimatePresence custom={partnerDir} mode="wait">
                  <motion.div
                    key={partnerSlide}
                    custom={partnerDir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="flex flex-row items-center gap-10"
                  >
                    <div className="flex-shrink-0">
                      {current?.image_url && (
                        <img
                          src={current.image_url}
                          alt={current.name}
                          className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white/40 shadow-lg"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <Quote className="text-white/30 mb-4" size={40} />
                      <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-6 italic">
                        "{current?.quote}"
                      </p>
                      <p className="text-white font-heading font-bold text-lg">{current?.name}</p>
                      <p className="text-white/70 text-sm">{current?.title}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {visible.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="text-white" size={22} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="text-white" size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators */}
              {visible.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {visible.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === partnerSlide ? 'w-8 bg-[var(--color-green-5)]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* ── Looking for a different fit? ── */}
      <section className="py-20 bg-[var(--color-bg-main)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[var(--color-green-5)] rounded-2xl px-8 py-12 text-center scrapbook-shadow"
          >
            <p className="text-3xl font-heading font-bold text-white mb-3">
              Looking for a different fit?
            </p>
            <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
              Not sure which package fits? Let's talk and find the right arrangement for your organization.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-[var(--color-green-5)] font-bold px-10 py-3 rounded-full hover:bg-[var(--color-green-1)] transition-all hover:scale-105 scrapbook-shadow text-lg"
            >
              Contact Us to Discuss Your Needs
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
