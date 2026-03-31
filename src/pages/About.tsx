import { motion } from 'motion/react';
import { useFetchSingle, useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function About() {
  const { data: about, loading: aL } = useFetchSingle<any>('about_page');
  const { data: values, loading: vL } = useFetch<any>('core_values', { order: { column: 'sort_order' } });
  const { data: team, loading: tmL } = useFetch<any>('team_members', { order: { column: 'sort_order' }, eq: [['category', 'executive']] });

  if (aL || vL || tmL) return <LoadingSpinner />;
  const a = about || ({} as any);
  const colors = ['bg-[var(--color-green-4)]', 'bg-[var(--color-green-2)]', 'bg-[var(--color-green-3)]', 'bg-[var(--color-green-3)]'];

  return (
    <div className="bg-[var(--color-bg-main)] page-grid min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6">{a.header_title || 'About Us'}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-[var(--color-text-main)] max-w-3xl mx-auto">{a.header_subtitle}</motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="polaroid -rotate-2">
            <img src={a.story_image_url || 'https://placehold.co/600x500?text=Our+Story'} alt="Our Team" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
            <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">{a.story_image_caption}</p>
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-4)] mb-6">{a.story_title}</h2>
            <div className="space-y-4 text-lg text-[var(--color-text-main)]">
              {(a.story_body || '').split('\n').filter((p: string) => p.trim()).map((p: string, i: number) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-heading font-bold text-center text-[var(--color-green-5)] mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v: any, idx: number) => (
              <motion.div key={v.id} whileHover={{ scale: 1.05 }} className={colors[idx % colors.length] + ' p-6 rounded-xl text-white scrapbook-shadow transform ' + (idx % 2 === 0 ? 'rotate-1' : '-rotate-1')}>
                <h3 className="text-2xl font-heading font-bold mb-3">{v.title}</h3>
                <p className="text-white/90">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {team.length > 0 && (
          <div>
            <h2 className="text-3xl font-heading font-bold text-center text-[var(--color-green-5)] mb-12">Meet the Executive Board</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member: any) => (
                <div key={member.id} className="text-center">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 border-4 border-[var(--color-green-1)]">
                    <img
                      src={member.photo_url || `https://placehold.co/200x200?text=${encodeURIComponent(member.name)}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[var(--color-text-main)]">{member.name}</h3>
                  <p className="text-[var(--color-green-4)] font-medium">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
