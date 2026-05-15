import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { PageHeader, SectionCard, DynamicForm, ItemList, FieldDef } from '../components/AdminUI';
import { useFetchSingle, useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const aboutFields: FieldDef[] = [
  { key: 'header_title', label: 'Header Title' },
  { key: 'header_subtitle', label: 'Header Subtitle', type: 'textarea', rows: 2 },
  { key: 'story_title', label: 'Story Title' },
  { key: 'story_body', label: 'Story Body', type: 'textarea', rows: 6 },
  { key: 'story_image_url', label: 'Story Image', type: 'gallery', half: true },
  { key: 'story_image_caption', label: 'Image Caption', type: 'text', half: true },
];

const visionFields: FieldDef[] = [
  { key: 'vision_title', label: 'Vision Title' },
  { key: 'vision_body', label: 'Vision Body', type: 'textarea', rows: 5 },
  { key: 'vision_image_url', label: 'Vision Image', type: 'gallery' },
];

const missionFields: FieldDef[] = [
  { key: 'mission_title', label: 'Mission Title' },
  { key: 'mission_body', label: 'Mission Body', type: 'textarea', rows: 5 },
  { key: 'mission_image_url', label: 'Mission Image', type: 'gallery' },
];

const valueFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
];

export default function AdminEditAbout() {
  const { data: about, loading: aL, refetch: refetchAbout } = useFetchSingle<any>('about_page');
  const { data: values, loading: vL, refetch: refetchValues } = useFetch<any>('core_values', { order: { column: 'sort_order' } });
  const { upsert: upsertAbout } = useUpsert('about_page');
  const { upsert: upsertValue } = useUpsert('core_values');
  const { remove: removeValue } = useDelete('core_values');

  const [form, setForm] = useState<Record<string, any>>({});
  const [valueList, setValueList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (about) setForm({ ...about });
  }, [about]);
  useEffect(() => {
    setValueList([...values]);
  }, [values]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await upsertAbout(form);
      for (const v of valueList) await upsertValue(v);
      await Promise.all([refetchAbout(), refetchValues()]);
      setMsg('Saved!');
    } catch {
      setMsg('Error saving.');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (aL || vL) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 pb-16">
      <PageHeader
        title="Edit About Page"
        description={
          'Edit sections below — lists update as you type. Use Save all changes once when you are ready to publish.'
        }
      >
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-xl font-semibold shadow-sm hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <Save size={18} />
          {saving ? 'Saving…' : 'Save all changes'}
        </button>
      </PageHeader>

      {msg && (
        <div
          role="status"
          className={
            'mb-6 px-4 py-3 rounded-xl text-sm font-semibold border ' +
            (msg.includes('Error')
              ? 'bg-red-50 text-red-800 border-red-100'
              : 'bg-green-50 text-green-800 border-green-100')
          }
        >
          {msg}
        </div>
      )}

      <SectionCard
        title="Header & story"
        description="Top headline, introduction, main story copy, and story photo on the About page."
        collapsible={false}
      >
        <DynamicForm
          fields={aboutFields}
          data={form}
          onChange={(k, v) => setForm(prev => ({ ...prev, [k]: v }))}
        />
      </SectionCard>

      <SectionCard
        title="Vision"
        description="Vision statement block and supporting image."
        collapsible={false}
      >
        <DynamicForm
          fields={visionFields}
          data={form}
          onChange={(k, v) => setForm(prev => ({ ...prev, [k]: v }))}
        />
      </SectionCard>

      <SectionCard
        title="Mission"
        description="Mission statement block and supporting image."
        collapsible={false}
      >
        <DynamicForm
          fields={missionFields}
          data={form}
          onChange={(k, v) => setForm(prev => ({ ...prev, [k]: v }))}
        />
      </SectionCard>

      <SectionCard
        title="Core values"
        description="Values cards shown on the About page."
        collapsible={false}
      >
        <ItemList
          variant="inline"
          inlineFoldable
          items={valueList}
          fields={valueFields}
          onSave={(item, idx) => {
            const next = [...valueList];
            next[idx] = item;
            setValueList(next);
          }}
          onDelete={async idx => {
            if (valueList[idx].id) await removeValue(valueList[idx].id);
            setValueList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() =>
            setValueList(prev => [...prev, { title: '', description: '', sort_order: prev.length + 1 }])
          }
          addLabel="Add core value"
          emptyLabel="No core values yet."
          renderPreview={v => (
            <span className="font-heading font-semibold text-gray-900 truncate">
              {v.title?.trim() || 'Untitled value'}
            </span>
          )}
        />
      </SectionCard>
    </div>
  );
}
