import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { PageHeader, SectionCard, DynamicForm, FieldDef } from '../components/AdminUI';
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

const inputClass =
  'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent transition-colors';

const generalFields: FieldDef[] = [
  { key: 'org_name', label: 'Organization Name' },
  { key: 'org_email', label: 'Contact Email', type: 'email', half: true },
  { key: 'org_phone', label: 'Phone', half: true },
  { key: 'org_address', label: 'Mailing Address', type: 'textarea', rows: 3 },
];

export default function AdminSettings() {
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

  useEffect(() => {
    setSocials([...socialLinks]);
  }, [socialLinks]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      for (const field of generalFields) {
        const existing = settingsMap[field.key];
        const row = existing
          ? { ...existing, value: form[field.key] || '' }
          : { key: field.key, value: form[field.key] || '' };
        await upsertSetting(row, 'key');
      }

      for (let i = 0; i < socials.length; i++) {
        const s = socials[i];
        const isNew = typeof s.id === 'string' && s.id.startsWith('new-');
        const row = isNew
          ? { platform: s.platform, url: s.url, sort_order: i }
          : { id: s.id, platform: s.platform, url: s.url, sort_order: i };
        await upsertSocial(row);
      }

      await Promise.all([refetchSettings(), refetchSocial()]);
      setMsg('Saved!');
    } catch {
      setMsg('Error saving.');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const addSocialLink = () => {
    const usedPlatforms = socials.map((s: any) => s.platform);
    const available = PLATFORMS.find(p => !usedPlatforms.includes(p.value));
    setSocials([
      ...socials,
      {
        id: 'new-' + Date.now(),
        platform: available?.value || 'facebook',
        url: '',
        sort_order: socials.length,
      },
    ]);
  };

  const handleDeleteSocial = async (index: number) => {
    const link = socials[index];
    const label = PLATFORMS.find(p => p.value === link.platform)?.label || link.platform;
    if (!window.confirm(`Remove ${label}? This cannot be undone.`)) return;
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
    <div className="max-w-4xl mx-auto w-full min-w-0 pb-16">
      <PageHeader
        title="Site Settings"
        description={
          'Organization details and social links used across the site. Edit below, then save once when you are ready to publish.'
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
        title="Organization"
        description="Name, email, phone, and address shown in the footer, contact page, and other global spots."
        collapsible={false}
      >
        <DynamicForm
          fields={generalFields}
          data={form}
          onChange={(k, v) => setForm(prev => ({ ...prev, [k]: String(v ?? '') }))}
        />
      </SectionCard>

      <SectionCard
        title="Social media"
        description="Links appear in the footer, home page, and contact section."
        collapsible={false}
      >
        {socials.length === 0 ? (
          <p className="text-gray-400 text-sm italic py-6 text-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 mb-5">
            No social links yet. Add one below.
          </p>
        ) : (
          <div className="space-y-4 mb-5">
            {socials.map((s, i) => (
              <div
                key={s.id}
                className="rounded-xl border border-gray-200 bg-[linear-gradient(to_bottom,#fafafa_0%,#fff_48px)] p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
                  <span className="font-heading font-semibold text-gray-900">
                    {PLATFORMS.find(p => p.value === s.platform)?.label ?? s.platform}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSocial(i)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Remove link"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:items-start">
                  <div className="min-w-0">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Platform</label>
                    <select
                      value={s.platform}
                      onChange={e => updateSocial(i, 'platform', e.target.value)}
                      className={inputClass}
                    >
                      {PLATFORMS.map(p => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Profile URL</label>
                    <input
                      type="url"
                      value={s.url}
                      onChange={e => updateSocial(i, 'url', e.target.value)}
                      placeholder="https://…"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addSocialLink}
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--color-green-5)] border-2 border-dashed border-[var(--color-green-3)] rounded-xl hover:bg-[var(--color-green-1)] transition-colors w-full"
        >
          <Plus size={18} />
          Add social link
        </button>
      </SectionCard>
    </div>
  );
}
