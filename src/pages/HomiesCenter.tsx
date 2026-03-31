import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronDown, Megaphone } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function HomiesCenter() {
  const { data: testimonials, loading: tL } = useFetch<any>('testimonials', { order: { column: 'sort_order' } });
  const { data: announcements, loading: anL } = useFetch<any>('announcements', { order: { column: 'published_at', ascending: false } });
  const { data: faqs, loading: fL } = useFetch<any>('faqs', { order: { column: 'sort_order' } });
  const [ci, setCi] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (tL || anL || fL) return <LoadingSpinner />;

  const visible = testimonials.filter((t: any) => t.is_visible !== false);
  const visibleAnn = announcements.filter((a: any) => a.is_visible !== false);
  const visibleFaqs = faqs.filter((f: any) => f.is_visible !== false);

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold mb-4">Homies Center</motion.h1>
          <p className="text-xl text-[var(--color-green-1)] max-w-2xl mx-auto">Hear from our community, stay updated, and find answers.</p>
        </div>
      </section>

      {visible.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] text-center mb-12">Testimonials</h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div key={ci} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="bg-[var(--color-green-1)] p-8 rounded-2xl scrapbook-shadow text-center">
                  {visible[ci]?.photo_url && <img src={visible[ci].photo_url} alt={visible[ci].name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[var(--color-green-5)]" />}
                  <blockquote className="text-lg text-[var(--color-text-main)] italic mb-4">"{visible[ci]?.quote}"</blockquote>
                  <p className="font-heading font-bold text-[var(--color-green-5)]">{visible[ci]?.name}</p>
                  <p className="text-sm text-gray-600">{visible[ci]?.role}</p>
                </motion.div>
              </AnimatePresence>
              {visible.length > 1 && (
                <div className="flex justify-center gap-4 mt-6">
                  <button onClick={() => setCi((ci - 1 + visible.length) % visible.length)} className="p-2 bg-[var(--color-green-5)] text-white rounded-full hover:bg-[var(--color-green-4)]"><ChevronLeft size={20} /></button>
                  <button onClick={() => setCi((ci + 1) % visible.length)} className="p-2 bg-[var(--color-green-5)] text-white rounded-full hover:bg-[var(--color-green-4)]"><ChevronRight size={20} /></button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {visibleAnn.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] text-center mb-12">Announcements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleAnn.map((a: any, i: number) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl overflow-hidden scrapbook-shadow">
                  {a.image_url && <img src={a.image_url} alt={a.title} className="w-full h-48 object-cover" />}
                  <div className="p-6">
                    {a.tag && <span className="inline-block bg-[var(--color-green-1)] text-[var(--color-green-5)] text-xs font-bold px-2 py-1 rounded-full mb-3">{a.tag}</span>}
                    <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-2">{a.title}</h3>
                    <p className="text-[var(--color-text-main)] text-sm">{a.body}</p>
                    <p className="text-xs text-gray-400 mt-3">{new Date(a.published_at).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {visibleFaqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {visibleFaqs.map((f: any, i: number) => (
                <div key={f.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-[var(--color-green-5)]">{f.question}</span>
                    <ChevronDown size={20} className={'text-[var(--color-green-5)] transition-transform ' + (openFaq === i ? 'rotate-180' : '')} />
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 pb-5">
                      <p className="text-[var(--color-text-main)]">{f.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
