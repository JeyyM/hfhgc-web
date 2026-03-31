import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function FAQ() {
  const { data: faqs, loading } = useFetch<any>('faqs', { order: { column: 'sort_order' } });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (loading) return <LoadingSpinner />;

  const visible = faqs.filter((f: any) => f.is_visible !== false);

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold mb-4">FAQ</motion.h1>
          <p className="text-xl text-[var(--color-green-1)] max-w-2xl mx-auto">Find answers to the most commonly asked questions.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-3">
          {visible.map((f: any, i: number) => (
            <div key={f.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-[var(--color-green-5)]">{f.question}</span>
                <ChevronDown size={20} className={'text-[var(--color-green-5)] transition-transform ' + (openIdx === i ? 'rotate-180' : '')} />
              </button>
              {openIdx === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 pb-5">
                  <p className="text-[var(--color-text-main)]">{f.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
