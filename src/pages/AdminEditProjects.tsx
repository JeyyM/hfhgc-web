import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { PageHeader, SectionCard, ItemList, FieldDef } from '../components/AdminUI';
import { useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const projectFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { key: 'category', label: 'Category', half: true },
  { key: 'status', label: 'Status', type: 'select', options: ['upcoming', 'completed'], half: true },
  { key: 'image_url', label: 'Image URL', type: 'url' },
  { key: 'date_display', label: 'Date Display', placeholder: 'e.g. June 15, 2025', half: true },
  { key: 'time_display', label: 'Time Display', placeholder: 'e.g. 8:00 AM', half: true },
  { key: 'location', label: 'Location' },
  { key: 'participants', label: 'Participants', type: 'number', half: true },
  { key: 'spots_left', label: 'Spots Left', type: 'number', half: true },
  { key: 'registration_link', label: 'Registration Link', type: 'url' },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

export default function AdminEditProjects() {
  const { data: projects, loading, refetch } = useFetch<any>('projects', { order: { column: 'sort_order' } });
  const { upsert } = useUpsert('projects');
  const { remove } = useDelete('projects');

  const [list, setList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { setList([...projects]); }, [projects]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      for (const p of list) await upsert(p);
      await refetch();
      setMsg('Saved!');
    } catch { setMsg('Error saving.'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Edit Projects" description="Manage projects and events.">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50">
          <Save size={18} />{saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </PageHeader>
      {msg && <div className={'mb-4 px-4 py-2 rounded-lg text-sm font-semibold ' + (msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>{msg}</div>}

      <SectionCard title="Projects & Events">
        <ItemList items={list} fields={projectFields}
          onSave={(item, idx) => { const next = [...list]; next[idx] = item; setList(next); }}
          onDelete={async (idx) => { if (list[idx].id) await remove(list[idx].id); setList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setList(prev => [...prev, { title: '', description: '', category: 'Build', status: 'upcoming', is_visible: true, sort_order: prev.length + 1 }])}
          addLabel="Add Project"
          renderPreview={(p) => <span className="text-sm font-semibold text-gray-800">{p.title || 'New Project'} <span className="text-xs text-gray-500">({p.status})</span></span>} />
      </SectionCard>
    </div>
  );
}
