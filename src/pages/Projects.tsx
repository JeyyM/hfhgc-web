import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ExternalLink, Clock, Tag, ArrowRight } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function Projects() {
  const navigate = useNavigate();
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {list.map((p: any, i: number) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.05 }} 
              className="bg-white rounded-2xl overflow-hidden scrapbook-shadow hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row min-h-[320px]">
                {/* Cover Image - Left Side */}
                {(p.cover_image_url || p.image_url) && (
                  <div className="relative w-full sm:w-72 h-64 sm:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-br from-[var(--color-green-2)] to-[var(--color-green-3)]">
                    <img 
                      src={p.cover_image_url || p.image_url} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-white/95 text-[var(--color-green-5)] shadow-lg backdrop-blur-sm">
                        {p.category}
                      </span>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
                        p.status === 'upcoming' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-green-500 text-white'
                      }`}>
                        {p.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content - Right Side */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col min-w-0">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-[var(--color-green-5)] mb-2 line-clamp-2 group-hover:text-[var(--color-green-4)] transition-colors">
                    {p.title}
                  </h3>
                  
                  {/* Excerpt */}
                  {p.excerpt && (
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                      {p.excerpt}
                    </p>
                  )}
                  
                  {/* Event Details */}
                  {(p.date_display || p.time_display || p.location) && (
                    <div className="mb-3 p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg space-y-1.5 border border-blue-200">
                      {p.date_display && (
                        <p className="flex items-center gap-2 text-sm text-blue-900 font-semibold">
                          <Calendar size={15} className="flex-shrink-0" />
                          {p.date_display}
                        </p>
                      )}
                      {p.time_display && (
                        <p className="flex items-center gap-2 text-xs text-blue-800">
                          <Clock size={14} className="flex-shrink-0" />
                          {p.time_display}
                        </p>
                      )}
                      {p.location && (
                        <p className="flex items-center gap-2 text-xs text-blue-800">
                          <MapPin size={14} className="flex-shrink-0" />
                          <span className="line-clamp-1">{p.location}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Bottom Row: Participants, Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {/* Participants */}
                    {p.participants && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        <Users size={14} className="flex-shrink-0" />
                        <span className="font-medium">{p.participants}</span>
                        {p.spots_left != null && (
                          <span className="text-[var(--color-green-5)] font-bold">
                            · {p.spots_left} left
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {p.tags && p.tags.length > 0 && (
                      <>
                        {p.tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span 
                            key={idx}
                            className="text-xs px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {p.tags.length > 2 && (
                          <span className="text-xs px-2.5 py-1.5 bg-gray-100 text-gray-500 rounded-lg">
                            +{p.tags.length - 2}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto pt-3 flex flex-col sm:flex-row gap-2">
                    {p.registration_link && p.status === 'upcoming' && (
                      <a 
                        href={p.registration_link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-green-5)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--color-green-4)] transition-all duration-300 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
                      >
                        <ExternalLink size={16} />
                        <span>Register Now</span>
                      </a>
                    )}
                    <button 
                      onClick={() => navigate(`/projects/${p.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors group/btn text-sm whitespace-nowrap"
                    >
                      <span>Learn More</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
