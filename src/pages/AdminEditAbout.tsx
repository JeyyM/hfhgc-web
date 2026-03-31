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
  { key: 'story_image_url', label: 'Story Image URL', type: 'url' },
  { key: 'story_image_caption', label: 'Image Caption' },
];

const valueFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
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

  useEffect(() => { if (about) setForm({ ...about }); }, [about]);
  useEffect(() => { setValueList([...values]); }, [values]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await upsertAbout(form);
      for (const v of valueList) await upsertValue(v);
      await Promise.all([refetchAbout(), refetchValues()]);
      setMsg('Saved!');
    } catch { setMsg('Error saving.'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (aL || vL) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Edit About Page" description="Manage about page content and core values.">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50">
          <Save size={18} />{saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </PageHeader>
      {msg && <div className={'mb-4 px-4 py-2 rounded-lg text-sm font-semibold ' + (msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>{msg}</div>}

      <SectionCard title="About Page Content">
        <DynamicForm fields={aboutFields} data={form} onChange={(k, v) => setForm(prev => ({ ...prev, [k]: v }))} />
      </SectionCard>

      <SectionCard title="Core Values">
        <ItemList items={valueList} fields={valueFields}
          onSave={(item, idx) => { const next = [...valueList]; next[idx] = item; setValueList(next); }}
          onDelete={async (idx) => { if (valueList[idx].id) await removeValue(valueList[idx].id); setValueList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setValueList(prev => [...prev, { title: '', description: '', sort_order: prev.length + 1 }])}
          addLabel="Add Core Value" />
      </SectionCard>
    </div>
  );
}
