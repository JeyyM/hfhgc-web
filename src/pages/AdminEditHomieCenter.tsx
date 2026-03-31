import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { PageHeader, SectionCard, ItemList, FieldDef } from '../components/AdminUI';
import { useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const testimonialFields: FieldDef[] = [
  { key: 'name', label: 'Name', half: true },
  { key: 'role', label: 'Role', half: true },
  { key: 'quote', label: 'Quote', type: 'textarea', rows: 3 },
  { key: 'photo_url', label: 'Photo URL', type: 'url' },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

const announcementFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
  { key: 'tag', label: 'Tag', half: true },
  { key: 'image_url', label: 'Image URL', type: 'url', half: true },
  { key: 'published_at', label: 'Publish Date', type: 'date', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

const faqFields: FieldDef[] = [
  { key: 'question', label: 'Question' },
  { key: 'answer', label: 'Answer', type: 'textarea', rows: 3 },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

export default function AdminEditHomieCenter() {
  const { data: testimonials, loading: tL, refetch: rT } = useFetch<any>('testimonials', { order: { column: 'sort_order' } });
  const { data: announcements, loading: aL, refetch: rA } = useFetch<any>('announcements', { order: { column: 'published_at', ascending: false } });
  const { data: faqs, loading: fL, refetch: rF } = useFetch<any>('faqs', { order: { column: 'sort_order' } });
  const { upsert: upsertT } = useUpsert('testimonials');
  const { upsert: upsertA } = useUpsert('announcements');
  const { upsert: upsertF } = useUpsert('faqs');
  const { remove: removeT } = useDelete('testimonials');
  const { remove: removeA } = useDelete('announcements');
  const { remove: removeF } = useDelete('faqs');

  const [tList, setTList] = useState<any[]>([]);
  const [aList, setAList] = useState<any[]>([]);
  const [fList, setFList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { setTList([...testimonials]); }, [testimonials]);
  useEffect(() => { setAList([...announcements]); }, [announcements]);
  useEffect(() => { setFList([...faqs]); }, [faqs]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      for (const t of tList) await upsertT(t);
      for (const a of aList) await upsertA(a);
      for (const f of fList) await upsertF(f);
      await Promise.all([rT(), rA(), rF()]);
      setMsg('Saved!');
    } catch { setMsg('Error saving.'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (tL || aL || fL) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Edit Homies Center" description="Manage testimonials, announcements, and FAQs.">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50">
          <Save size={18} />{saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </PageHeader>
      {msg && <div className={'mb-4 px-4 py-2 rounded-lg text-sm font-semibold ' + (msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>{msg}</div>}

      <SectionCard title="Testimonials">
        <ItemList items={tList} fields={testimonialFields}
          onSave={(item, idx) => { const next = [...tList]; next[idx] = item; setTList(next); }}
          onDelete={async (idx) => { if (tList[idx].id) await removeT(tList[idx].id); setTList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setTList(prev => [...prev, { name: '', role: '', quote: '', is_visible: true, sort_order: prev.length + 1 }])}
          addLabel="Add Testimonial" />
      </SectionCard>

      <SectionCard title="Announcements">
        <ItemList items={aList} fields={announcementFields}
          onSave={(item, idx) => { const next = [...aList]; next[idx] = item; setAList(next); }}
          onDelete={async (idx) => { if (aList[idx].id) await removeA(aList[idx].id); setAList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setAList(prev => [...prev, { title: '', body: '', tag: '', is_visible: true, published_at: new Date().toISOString().split('T')[0] }])}
          addLabel="Add Announcement" />
      </SectionCard>

      <SectionCard title="FAQs">
        <ItemList items={fList} fields={faqFields}
          onSave={(item, idx) => { const next = [...fList]; next[idx] = item; setFList(next); }}
          onDelete={async (idx) => { if (fList[idx].id) await removeF(fList[idx].id); setFList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setFList(prev => [...prev, { question: '', answer: '', is_visible: true, sort_order: prev.length + 1 }])}
          addLabel="Add FAQ" />
      </SectionCard>
    </div>
  );
}
