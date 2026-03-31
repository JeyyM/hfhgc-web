import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function Projects() {
  const { data: projects, loading } = useFetch<any>('projects', { order: { column: 'sort_order' } });
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');

  if (loading) return <LoadingSpinner />;

  const visible = projects.filter((p: any) => p.is_visible !== false);
  const upcoming = visible.filter((p: any) => p.status === 'upcoming');
  const completed = visible.filter((p: any) => p.status === 'completed');
  const list = tab === 'upcoming' ? upcoming : completed;

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold text-white mb-4">Projects & Events</motion.h1>
          <p className="text-xl text-white max-w-2xl mx-auto">Discover our upcoming activities and past accomplishments.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center gap-4 mb-12">
          <button onClick={() => setTab('upcoming')} className={'px-6 py-2.5 rounded-full font-bold transition-colors ' + (tab === 'upcoming' ? 'bg-[var(--color-green-5)] text-white' : 'bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)]')}>Upcoming</button>
          <button onClick={() => setTab('completed')} className={'px-6 py-2.5 rounded-full font-bold transition-colors ' + (tab === 'completed' ? 'bg-[var(--color-green-5)] text-white' : 'bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)]')}>Completed</button>
        </div>

        {list.length === 0 && <p className="text-center text-gray-500 py-16">No {tab} projects at the moment.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((p: any, i: number) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl overflow-hidden scrapbook-shadow">
              {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover" />}
              <div className="p-6">
                <span className={'inline-block text-xs font-bold px-2 py-1 rounded-full mb-3 ' + (p.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700')}>{p.category}</span>
                <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-3">{p.title}</h3>
                {p.description && <p className="text-sm text-[var(--color-text-main)] mb-4">{p.description}</p>}
                <div className="space-y-2 text-sm text-gray-600">
                  {p.date_display && <p className="flex items-center gap-2"><Calendar size={14} />{p.date_display}{p.time_display && (' at ' + p.time_display)}</p>}
                  {p.location && <p className="flex items-center gap-2"><MapPin size={14} />{p.location}</p>}
                  {p.participants && <p className="flex items-center gap-2"><Users size={14} />{p.participants} participants{p.spots_left != null && (' (' + p.spots_left + ' spots left)')}</p>}
                </div>
                {p.registration_link && p.status === 'upcoming' && (
                  <a href={p.registration_link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 bg-[var(--color-green-5)] text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-[var(--color-green-4)] transition-colors">
                    <ExternalLink size={14} />Register
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
