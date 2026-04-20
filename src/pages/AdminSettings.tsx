import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { PageHeader, SectionCard, FormField, FieldDef } from '../components/AdminUI';
import { useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'threads', label: 'Threads' },
];

const generalFields: FieldDef[] = [
  { key: 'org_name', label: 'Organization Name' },
  { key: 'org_email', label: 'Email', type: 'email' },
  { key: 'org_phone', label: 'Phone' },
  { key: 'org_address', label: 'Address' },
];

export default function AdminSettings() {
  // Fetch settings as rows (same pattern as AdminEditHome)
  const { data: settingsRows, loading: sL, refetch: refetchSettings } = useFetch<any>('site_settings');
  const { data: socialLinks, loading: socL, refetch: refetchSocial } = useFetch<any>('social_links', { order: { column: 'sort_order' } });
  const { upsert: upsertSetting } = useUpsert('site_settings');
  const { upsert: upsertSocial } = useUpsert('social_links');
  const { remove: removeSocial } = useDelete('social_links');

  const [form, setForm] = useState<Record<string, string>>({});
  const [settingsMap, setSettingsMap] = useState<Record<string, any>>({});
  const [socials, setSocials] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  // Build form from settings rows (same as AdminEditHome pattern with useEffect on data)
  useEffect(() => {
    const map: Record<string, any> = {};
    const formData: Record<string, string> = {};
    for (const row of settingsRows) {
      map[row.key] = row;
      formData[row.key] = row.value;
    }
    setSettingsMap(map);
    setForm(formData);
  }, [settingsRows]);

  useEffect(() => { setSocials([...socialLinks]); }, [socialLinks]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      // Save general settings using upsert (same pattern as AdminEditHome)
      for (const field of generalFields) {
        const existing = settingsMap[field.key];
        const row = existing
          ? { ...existing, value: form[field.key] || '' }
          : { key: field.key, value: form[field.key] || '' };
        await upsertSetting(row, 'key');
      }

      // Save social links using upsert
      for (let i = 0; i < socials.length; i++) {
        const s = socials[i];
        const isNew = typeof s.id === 'string' && s.id.startsWith('new-');
        const row = isNew
          ? { platform: s.platform, url: s.url, sort_order: i }
          : { id: s.id, platform: s.platform, url: s.url, sort_order: i };
        await upsertSocial(row);
      }

      await Promise.all([refetchSettings(), refetchSocial()]);
      setMsg('Settings saved!');
    } catch {
      setMsg('Error saving.');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const addSocialLink = () => {
    const usedPlatforms = socials.map((s: any) => s.platform);
    const available = PLATFORMS.find(p => !usedPlatforms.includes(p.value));
    setSocials([...socials, {
      id: 'new-' + Date.now(),
      platform: available?.value || 'facebook',
      url: '',
      sort_order: socials.length,
    }]);
  };

  const handleDeleteSocial = async (index: number) => {
    const link = socials[index];
    const label = PLATFORMS.find(p => p.value === link.platform)?.label || link.platform;
    if (!window.confirm(`Remove ${label}? This action cannot be undone.`)) return;
    if (link.id && !String(link.id).startsWith('new-')) {
      await removeSocial(link.id);
    }
    setSocials(prev => prev.filter((_, i) => i !== index));
  };

  const updateSocial = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = [...socials];
    updated[index] = { ...updated[index], [field]: value };
    setSocials(updated);
  };

  if (sL || socL) return <LoadingSpinner />;

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
          {generalFields.map(f => (
            <FormField key={f.key} field={f} value={form[f.key] || ''} onChange={(k, v) => setForm(prev => ({ ...prev, [k]: v }))} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Social Media">
        <p className="text-sm text-gray-500 mb-4">These links appear in the Home page, Footer, and Contact page.</p>
        <div className="space-y-3">
          {socials.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
              <GripVertical size={16} className="text-gray-400 flex-shrink-0" />
              <select
                value={s.platform}
                onChange={e => updateSocial(i, 'platform', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium bg-white focus:outline-none focus:border-[var(--color-green-5)] w-40 flex-shrink-0"
              >
                {PLATFORMS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <input
                type="url"
                value={s.url}
                onChange={e => updateSocial(i, 'url', e.target.value)}
                placeholder="https://..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-green-5)]"
              />
              <button onClick={() => handleDeleteSocial(i)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addSocialLink}
          className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)] transition-colors w-full justify-center"
        >
          <Plus size={18} /> Add Social Media Link
        </button>
      </SectionCard>
    </div>
  );
}