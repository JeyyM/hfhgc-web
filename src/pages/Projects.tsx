import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Users, ExternalLink, Clock, ArrowRight, Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import SEO from '../components/SEO';
import {
  PROJECT_PAGE_SIZE,
  PROJECT_SORT_OPTIONS,
  type ProjectSortKey,
  filterProjectsBySearch,
  sortProjects,
} from '../lib/projectListFilters';

export default function Projects() {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { data: projects, loading } = useFetch<any>('projects', { order: { column: 'sort_order' } });

  const [tab, setTab]       = useState<'upcoming' | 'completed'>('upcoming');
  const [search, setSearch] = useState('');
  const [sort, setSort]     = useState<ProjectSortKey>('newest');
  const [page, setPage]     = useState(1);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to page 1 whenever tab / search / sort changes
  useEffect(() => { setPage(1); }, [tab, search, sort]);

  const visible   = useMemo(() => projects.filter((p: any) => p.is_visible !== false), [projects]);
  const byTab     = useMemo(() => visible.filter((p: any) => p.status === tab), [visible, tab]);

  const filtered  = useMemo(() => filterProjectsBySearch(byTab, search), [byTab, search]);

  const sorted     = useMemo(() => sortProjects(filtered, sort), [filtered, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PROJECT_PAGE_SIZE));
  const paginated  = useMemo(
    () => sorted.slice((page - 1) * PROJECT_PAGE_SIZE, page * PROJECT_PAGE_SIZE),
    [sorted, page]
  );

  if (loading) return <LoadingSpinner />;

  const handleTabChange = (next: 'upcoming' | 'completed') => {
    setTab(next);
    setSearch('');
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <SEO title="Projects" description="Explore the projects and initiatives by Habitat for Humanity Green Chapter DLSU — sustainable housing builds, community outreach, and more." path="/projects" />
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold text-white mb-4">Projects & Events</motion.h1>
          <p className="text-xl text-white max-w-2xl mx-auto">Discover our upcoming activities and past accomplishments.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Tab switcher */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleTabChange('upcoming')}
            className={'px-6 py-2.5 rounded-full font-bold transition-colors ' + (tab === 'upcoming' ? 'bg-[var(--color-green-5)] text-white' : 'bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)]')}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleTabChange('completed')}
            className={'px-6 py-2.5 rounded-full font-bold transition-colors ' + (tab === 'completed' ? 'bg-[var(--color-green-5)] text-white' : 'bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)]')}
          >
            Completed
          </button>
        </div>

        {/* Search + Sort bar */}
        <div className="flex flex-row gap-3 mb-6">
          <div className="relative flex-1 min-w-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, category, location, tags…"
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-green-5)] transition-colors bg-white"
            />
          </div>
          <div className="relative flex-shrink-0">
            <ArrowUpDown size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as ProjectSortKey)}
              className="pl-9 pr-8 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-green-5)] transition-colors bg-white appearance-none cursor-pointer font-medium text-gray-700"
            >
              {PROJECT_SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        {search.trim() && (
          <p className="text-sm text-gray-500 mb-4">
            {sorted.length} result{sorted.length !== 1 ? 's' : ''} for <span className="font-semibold text-gray-700">"{search.trim()}"</span>
          </p>
        )}

        {/* Empty state */}
        {sorted.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            {search.trim() ? 'No projects match your search.' : `No ${tab} projects at the moment.`}
          </p>
        )}

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${page}-${search}-${sort}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`grid ${windowWidth < 1280 ? 'grid-cols-1' : 'grid-cols-2'} gap-6 pb-8`}
          >
            {paginated.map((p: any, i: number) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => navigate(`/projects/${p.id}`)}
                className="bg-white rounded-2xl overflow-hidden scrapbook-shadow hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row min-h-[320px]">
                  {/* Cover Image */}
                  {(p.cover_image_url || p.image_url) && (
                    <div className={`relative w-full h-64 sm:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-br from-[var(--color-green-2)] to-[var(--color-green-3)] ${windowWidth < 1280 ? 'sm:w-96' : 'sm:w-72'}`}>
                      <img
                        src={p.cover_image_url || p.image_url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-white/95 text-[var(--color-green-5)] shadow-lg backdrop-blur-sm">
                          {p.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${p.status === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
                          {p.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className={`flex-1 flex flex-col min-w-0 ${windowWidth < 1280 ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[var(--color-green-5)] mb-2 line-clamp-2 group-hover:text-[var(--color-green-4)] transition-colors">
                      {p.title}
                    </h3>

                    {p.excerpt && (
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{p.excerpt}</p>
                    )}

                    {(p.date_display || p.time_display || p.location) && (
                      <div className="mb-3 p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg space-y-1.5 border border-blue-200">
                        {p.date_display && (
                          <p className="flex items-center gap-2 text-sm text-blue-900 font-semibold">
                            <Calendar size={15} className="flex-shrink-0" />{p.date_display}
                          </p>
                        )}
                        {p.time_display && (
                          <p className="flex items-center gap-2 text-xs text-blue-800">
                            <Clock size={14} className="flex-shrink-0" />{p.time_display}
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

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {p.participants && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                          <Users size={14} className="flex-shrink-0" />
                          <span className="font-medium">{p.participants}</span>
                          {p.spots_left != null && (
                            <span className="text-[var(--color-green-5)] font-bold">· {p.spots_left} left</span>
                          )}
                        </div>
                      )}
                      {p.tags && p.tags.length > 0 && p.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="text-xs px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium">{tag}</span>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 flex flex-col sm:flex-row gap-2">
                      {p.registration_link && p.status === 'upcoming' && (
                        <a
                          href={p.registration_link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-green-5)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--color-green-4)] transition-all duration-300 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
                        >
                          <ExternalLink size={16} />
                          <span>Register Now</span>
                        </a>
                      )}
                      <div className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl group-hover:bg-gray-200 transition-colors text-sm whitespace-nowrap">
                        <span>Learn More</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 pb-8 flex-wrap">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
              const show = n === 1 || n === totalPages || Math.abs(n - page) <= 1;
              const isEllipsisBefore = n === page - 2 && page - 2 > 1;
              const isEllipsisAfter  = n === page + 2 && page + 2 < totalPages;
              if (!show) {
                if (isEllipsisBefore || isEllipsisAfter) {
                  return <span key={n} className="px-1 text-gray-400 select-none">…</span>;
                }
                return null;
              }
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 font-bold text-sm transition-colors ${
                    n === page
                      ? 'bg-[var(--color-green-5)] border-[var(--color-green-5)] text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)]'
                  }`}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            <span className="ml-2 text-sm text-gray-500">
              Page {page} of {totalPages} · {sorted.length} item{sorted.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
