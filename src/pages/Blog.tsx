import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function Blog() {
  const { data: posts, loading } = useFetch<any>('blog_posts', { order: { column: 'published_at', ascending: false } });
  const [search, setSearch] = useState('');

  if (loading) return <LoadingSpinner />;

  const filtered = posts.filter((p: any) =>
    p.is_published && (
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || '').toLowerCase().includes(search.toLowerCase())
    )
  );
  const featured = filtered.find((p: any) => p.is_featured);
  const rest = filtered.filter((p: any) => p !== featured);

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold mb-4">Blog & News</motion.h1>
          <p className="text-xl text-[var(--color-green-1)] max-w-2xl mx-auto mb-8">Stories, updates, and reflections from our community.</p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="w-full pl-12 pr-4 py-3 rounded-full border-0 text-gray-800 focus:ring-2 focus:ring-[var(--color-green-2)]" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {featured && (
          <Link to={'/blog/' + featured.slug} className="block mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden scrapbook-shadow hover:shadow-xl transition-shadow">
              <img src={featured.image_url || 'https://placehold.co/600x400?text=Featured'} alt={featured.title} className="w-full h-72 lg:h-full object-cover" />
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block bg-[var(--color-green-1)] text-[var(--color-green-5)] text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">Featured</span>
                <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-4">{featured.title}</h2>
                <p className="text-[var(--color-text-main)] mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={14} />{new Date(featured.published_at).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{featured.read_time}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((p: any, i: number) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={'/blog/' + p.slug} className="block bg-white rounded-2xl overflow-hidden scrapbook-shadow hover:shadow-xl transition-shadow h-full">
                <img src={p.image_url || 'https://placehold.co/400x250?text=Blog'} alt={p.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-xs font-bold text-[var(--color-green-5)] bg-[var(--color-green-1)] px-2 py-0.5 rounded-full">{p.category}</span>
                  <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mt-3 mb-2">{p.title}</h3>
                  <p className="text-sm text-[var(--color-text-main)] mb-4 line-clamp-2">{p.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{p.author_name}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{p.read_time}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && <p className="text-center text-gray-500 py-16">No posts found.</p>}
      </div>
    </div>
  );
}
