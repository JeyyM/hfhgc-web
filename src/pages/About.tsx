import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useFetchSingle, useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import SEO from '../components/SEO';

export default function About() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: about, loading: aL } = useFetchSingle<any>('about_page');
  const { data: values, loading: vL } = useFetch<any>('core_values', { order: { column: 'sort_order' } });

  if (aL || vL) return <LoadingSpinner />;
  const a = about || ({} as any);
  const colors = ['bg-[var(--color-green-4)]', 'bg-[var(--color-green-2)]', 'bg-[var(--color-green-3)]', 'bg-[var(--color-green-3)]'];

  return (
    <div className="bg-[var(--color-bg-main)] page-grid min-h-screen py-16">
      <SEO title="About Us" description="Learn about Habitat for Humanity Green Chapter DLSU — our vision, mission, core values, and commitment to building sustainable communities." path="/about" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6">{a.header_title || 'About Us'}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-[var(--color-text-main)] max-w-3xl mx-auto">{a.header_subtitle}</motion.p>
        </div>

        <div className={`grid ${windowWidth < 730 ? 'grid-cols-1' : 'grid-cols-2'} gap-12 items-center mb-24`}>
          {windowWidth >= 730 && (
            <div className="polaroid -rotate-2">
              <img src={a.story_image_url || 'https://placehold.co/600x500?text=Our+Story'} alt="Our Team" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
              <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">{a.story_image_caption}</p>
            </div>
          )}
          <div>
            {windowWidth < 730 && (
              <div className="polaroid -rotate-2 mb-8 max-w-md mx-auto">
                <img src={a.story_image_url || 'https://placehold.co/600x500?text=Our+Story'} alt="Our Team" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">{a.story_image_caption}</p>
              </div>
            )}
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-4)] mb-6">{a.story_title}</h2>
            <div className="space-y-4 text-lg text-[var(--color-text-main)]">
              {(a.story_body || '').split('\n').filter((p: string) => p.trim()).map((p: string, i: number) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-heading font-bold text-center text-[var(--color-green-5)] mb-12">Our Core Values</h2>
          <div className={`grid ${windowWidth < 765 ? 'grid-cols-2' : 'grid-cols-4'} gap-6`}>
            {values.map((v: any, idx: number) => (
              <motion.div key={v.id} whileHover={{ scale: 1.05 }} className={colors[idx % colors.length] + ' p-6 rounded-xl text-white scrapbook-shadow transform ' + (idx % 2 === 0 ? 'rotate-1' : '-rotate-1')}>
                <h3 className="text-2xl font-heading font-bold mb-3">{v.title}</h3>
                <p className="text-white/90">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="mb-24 space-y-16">
          {/* Vision — image on left, text on right */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className={`grid ${windowWidth < 730 ? 'grid-cols-1' : 'grid-cols-2'} gap-12 items-center`}>
            {windowWidth >= 730 && (
              <div className="polaroid -rotate-1">
                <img src={a.vision_image_url || 'https://placehold.co/600x400?text=Vision'} alt="Vision" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
            <div>
              {windowWidth < 730 && a.vision_image_url && (
                <div className="polaroid -rotate-1 mb-8 max-w-md mx-auto">
                  <img src={a.vision_image_url} alt="Vision" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-6">{a.vision_title || 'Vision'}</h2>
              <div className="space-y-4 text-lg text-[var(--color-text-main)]">
                {(a.vision_body || '').split('\n').filter((p: string) => p.trim()).map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </motion.div>

          {/* Mission — text on left, image on right */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className={`grid ${windowWidth < 730 ? 'grid-cols-1' : 'grid-cols-2'} gap-12 items-center`}>
            <div>
              {windowWidth < 730 && a.mission_image_url && (
                <div className="polaroid rotate-[4deg] mb-8 max-w-md mx-auto">
                  <img src={a.mission_image_url} alt="Mission" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <h2 className="text-3xl font-heading font-bold text-[var(--color-green-4)] mb-6">{a.mission_title || 'Mission'}</h2>
              <div className="space-y-4 text-lg text-[var(--color-text-main)]">
                {(a.mission_body || '').split('\n').filter((p: string) => p.trim()).map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
            {windowWidth >= 730 && (
              <div className="polaroid rotate-[4deg]">
                <img src={a.mission_image_url || 'https://placehold.co/600x400?text=Mission'} alt="Mission" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
