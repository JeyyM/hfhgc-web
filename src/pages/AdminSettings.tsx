import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { PageHeader, SectionCard, FormField, FieldDef } from '../components/AdminUI';
import { useSettings } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const fields: FieldDef[] = [
  { key: 'org_name', label: 'Organization Name' },
  { key: 'org_email', label: 'Email', type: 'email' },
  { key: 'org_phone', label: 'Phone' },
  { key: 'org_address', label: 'Address' },
  { key: 'facebook_url', label: 'Facebook URL', type: 'url' },
  { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
  { key: 'twitter_url', label: 'Twitter URL', type: 'url' },
  { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
];

export default function AdminSettings() {
  const { settings, loading, updateAll } = useSettings();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { if (!loading) setForm({ ...settings }); }, [loading]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    const ok = await updateAll(form);
    setMsg(ok ? 'Settings saved!' : 'Error saving settings.');
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Site Settings" description="Manage global site configuration.">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50">
          <Save size={18} />{saving ? 'Saving...' : 'Save Settings'}
        </button>
      </PageHeader>
      {msg && <div className={'mb-4 px-4 py-2 rounded-lg text-sm font-semibold ' + (msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>{msg}</div>}
      <SectionCard title="General">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <FormField key={f.key} field={f} value={form[f.key] || ''} onChange={(k, v) => setForm(prev => ({ ...prev, [k]: v }))} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

//