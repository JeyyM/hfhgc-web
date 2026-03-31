import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { PageHeader, SectionCard, ItemList, FieldDef } from '../components/AdminUI';
import { useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const memberFields: FieldDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'category', label: 'Category', type: 'select', options: ['executive', 'committee', 'advisor'] },
  { key: 'course', label: 'Course / Department', half: true },
  { key: 'department', label: 'Department', half: true },
  { key: 'bio', label: 'Bio', type: 'textarea', rows: 2 },
  { key: 'email', label: 'Email', type: 'email', half: true },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'url', half: true },
  { key: 'facebook', label: 'Facebook URL', type: 'url', half: true },
  { key: 'image_url', label: 'Image URL', type: 'url', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

const alumniFields: FieldDef[] = [
  { key: 'name', label: 'Name', half: true },
  { key: 'year', label: 'Year', half: true },
  { key: 'quote', label: 'Quote', type: 'textarea', rows: 3 },
  { key: 'current_position', label: 'Current Position' },
  { key: 'image_url', label: 'Image URL', type: 'url' },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

export default function AdminEditTeam() {
  const { data: members, loading: mL, refetch: refetchMembers } = useFetch<any>('team_members', { order: { column: 'sort_order' } });
  const { data: alumni, loading: aL, refetch: refetchAlumni } = useFetch<any>('alumni_testimonials', { order: { column: 'sort_order' } });
  const { upsert: upsertMember } = useUpsert('team_members');
  const { upsert: upsertAlumni } = useUpsert('alumni_testimonials');
  const { remove: removeMember } = useDelete('team_members');
  const { remove: removeAlumni } = useDelete('alumni_testimonials');

  const [memberList, setMemberList] = useState<any[]>([]);
  const [alumniList, setAlumniList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { setMemberList([...members]); }, [members]);
  useEffect(() => { setAlumniList([...alumni]); }, [alumni]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      for (const m of memberList) await upsertMember(m);
      for (const a of alumniList) await upsertAlumni(a);
      await Promise.all([refetchMembers(), refetchAlumni()]);
      setMsg('Saved!');
    } catch { setMsg('Error saving.'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (mL || aL) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Edit Team" description="Manage team members and alumni testimonials.">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50">
          <Save size={18} />{saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </PageHeader>
      {msg && <div className={'mb-4 px-4 py-2 rounded-lg text-sm font-semibold ' + (msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>{msg}</div>}

      <SectionCard title="Team Members">
        <ItemList items={memberList} fields={memberFields}
          onSave={(item, idx) => { const next = [...memberList]; next[idx] = item; setMemberList(next); }}
          onDelete={async (idx) => { if (memberList[idx].id) await removeMember(memberList[idx].id); setMemberList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setMemberList(prev => [...prev, { name: '', position: '', category: 'executive', course: '', is_visible: true, sort_order: prev.length + 1 }])}
          addLabel="Add Team Member"
          renderPreview={(m) => <span className="text-sm font-semibold text-gray-800">{m.name || 'New Member'} <span className="text-xs text-gray-500">({m.category})</span></span>} />
      </SectionCard>

      <SectionCard title="Alumni Testimonials">
        <ItemList items={alumniList} fields={alumniFields}
          onSave={(item, idx) => { const next = [...alumniList]; next[idx] = item; setAlumniList(next); }}
          onDelete={async (idx) => { if (alumniList[idx].id) await removeAlumni(alumniList[idx].id); setAlumniList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setAlumniList(prev => [...prev, { name: '', year: '', quote: '', is_visible: true, sort_order: prev.length + 1 }])}
          addLabel="Add Alumni Testimonial" />
      </SectionCard>
    </div>
  );
}
