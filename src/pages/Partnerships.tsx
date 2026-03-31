import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function Partnerships() {
  const { data: partners, loading: pL } = useFetch<any>('partners', { order: { column: 'sort_order' } });
  const { data: testimonials, loading: tL } = useFetch<any>('partner_testimonials', { order: { column: 'sort_order' } });

  if (pL || tL) return <LoadingSpinner />;

  const visible = partners.filter((p: any) => p.is_visible !== false);
  const tierOrder = ['gold', 'silver', 'bronze', 'community'];
  const grouped: Record<string, any[]> = {};
  for (const p of visible) {
    const t = p.tier || 'community';
    if (!grouped[t]) grouped[t] = [];
    grouped[t].push(p);
  }

  const tierColors: Record<string, string> = {
    gold: 'border-yellow-400 bg-yellow-50',
    silver: 'border-gray-300 bg-gray-50',
    bronze: 'border-orange-300 bg-orange-50',
    community: 'border-[var(--color-green-3)] bg-[var(--color-green-1)]',
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold mb-4">Our Partners</motion.h1>
          <p className="text-xl text-white max-w-2xl mx-auto">Building together with organizations that share our vision.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {tierOrder.map(tier => {
          const list = grouped[tier];
          if (!list || list.length === 0) return null;
          return (
            <div key={tier} className="mb-16">
              <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] capitalize mb-8 text-center">{tier} Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((p: any, i: number) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={'border-2 rounded-2xl p-6 scrapbook-shadow ' + (tierColors[tier] || tierColors.community)}>
                    {p.image_url && <img src={p.image_url} alt={p.name} className="h-16 object-contain mb-4" />}
                    <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-2">{p.name}</h3>
                    {p.description && <p className="text-sm text-[var(--color-text-main)] mb-3">{p.description}</p>}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {p.since_year && <span>Partner since {p.since_year}</span>}
                      {p.website && <a href={p.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[var(--color-green-5)] hover:underline"><ExternalLink size={12} />Website</a>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {testimonials.length > 0 && (
        <section className="py-16 bg-[var(--color-green-1)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] text-center mb-12">What Our Partners Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t: any) => (
                <div key={t.id} className="bg-white p-8 rounded-2xl scrapbook-shadow">
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
