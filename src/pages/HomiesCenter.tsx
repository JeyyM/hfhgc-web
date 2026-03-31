import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Bell, Quote, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function HomiesCenter() {
  const { data: testimonials, loading: tL } = useFetch<any>('testimonials', { order: { column: 'sort_order' } });
  const { data: announcements, loading: anL } = useFetch<any>('announcements', { order: { column: 'published_at', ascending: false } });
  const { data: faqs, loading: fL } = useFetch<any>('faqs', { order: { column: 'sort_order' } });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (tL || anL || fL) return <LoadingSpinner />;

  const visible = testimonials.filter((t: any) => t.is_visible !== false);
  const visibleAnn = announcements.filter((a: any) => a.is_visible !== false);
  const visibleFaqs = faqs.filter((f: any) => f.is_visible !== false);

  const goTo = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };
  const prev = () => goTo((currentSlide - 1 + visible.length) % visible.length);
  const next = () => goTo((currentSlide + 1) % visible.length);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const tagColor = (tag: string) => {
    const t = tag?.toLowerCase() || '';
    if (t.includes('event')) return 'bg-[var(--color-green-5)] text-white';
    if (t.includes('recruit')) return 'bg-[var(--color-green-3)] text-white';
    if (t.includes('project') || t.includes('update')) return 'bg-[var(--color-green-4)] text-white';
    if (t.includes('milestone')) return 'bg-orange-500 text-white';
    return 'bg-[var(--color-green-5)] text-white';
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">

      {/* Hero */}
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            Homie Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Stories from our community, the latest announcements, and answers to your questions — all in one place.
          </motion.p>
        </div>
      </section>

      {/* Testimonials Carousel */}
      {visible.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                  <Quote className="text-white" size={28} />
                </div>
              </div>
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-3">What Our Homies Say</h2>
              <p className="text-lg text-[var(--color-text-main)] max-w-xl mx-auto">
                Hear directly from the students and volunteers who make HFHGC what it is.
              </p>
            </div>

            {/* Carousel Card */}
            <div className="relative bg-[var(--color-green-5)] rounded-3xl p-10 md:p-14 overflow-hidden scrapbook-shadow">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="flex flex-col md:flex-row items-center gap-10"
                >
                  <div className="flex-shrink-0">
                    {visible[currentSlide]?.photo_url && (
                      <img
                        src={visible[currentSlide].photo_url}
                        alt={visible[currentSlide].name}
                        className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white/40 shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div>
                    <Quote className="text-white/30 mb-4" size={40} />
                    <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-6 italic">
                      "{visible[currentSlide]?.quote}"
                    </p>
                    <p className="text-white font-heading font-bold text-lg">{visible[currentSlide]?.name}</p>
                    <p className="text-white/70 text-sm">{visible[currentSlide]?.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

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
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {visible.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-[var(--color-green-5)]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Announcements */}
      {visibleAnn.length > 0 && (
        <section className="py-24 bg-[var(--color-bg-main)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                  <Bell className="text-white" size={28} />
                </div>
              </div>
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-3">Announcements</h2>
              <p className="text-lg text-[var(--color-text-main)] max-w-xl mx-auto">
                Stay up to date with the latest news, updates, and milestones from HFHGC.
              </p>
            </div>

            <div className="space-y-8">
              {visibleAnn.map((ann: any, idx: number) => (
                <motion.div
                  key={ann.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden scrapbook-border scrapbook-shadow flex flex-col sm:flex-row"
                >
                  {ann.image_url && (
                    <div className="sm:w-64 flex-shrink-0">
                      <img
                        src={ann.image_url}
                        alt={ann.title}
                        className="w-full h-48 sm:h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      {ann.tag && <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColor(ann.tag)}`}>{ann.tag}</span>}
                      <span className="text-sm text-gray-400">{new Date(ann.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-3">{ann.title}</h3>
                    <p className="text-[var(--color-text-main)] text-sm leading-relaxed">{ann.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {visibleFaqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                  <MessageCircleQuestion className="text-white" size={28} />
                </div>
              </div>
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-3">Frequently Asked Questions</h2>
              <p className="text-lg text-[var(--color-text-main)] max-w-xl mx-auto">
                Got questions? We've got answers. If you can't find what you're looking for, feel free to reach out.
              </p>
            </div>

            <div className="space-y-4">
              {visibleFaqs.map((faq: any, index: number) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-[var(--color-bg-main)] rounded-2xl scrapbook-border scrapbook-shadow overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-lg font-heading font-bold text-[var(--color-text-main)] pr-8">
                      {faq.question}
                    </span>
                    <span className={`p-2 rounded-full flex-shrink-0 transition-colors ${openFaq === index ? 'bg-[var(--color-green-5)] text-white' : 'bg-[var(--color-green-1)] text-[var(--color-green-5)]'}`}>
                      {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600 border-t border-gray-100 pt-4 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <p className="text-lg text-[var(--color-text-main)] mb-6">Still have questions?</p>
              <Link
                to="/contact"
                className="inline-block bg-[var(--color-green-5)] hover:bg-[var(--color-green-4)] text-white font-bold py-3 px-10 rounded-full transition-all hover:scale-105 scrapbook-shadow"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
