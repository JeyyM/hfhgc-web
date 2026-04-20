import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { PageHeader, SectionCard, FormField, FieldDef } from '../components/AdminUI';
import { useSettings, useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import { supabase } from '../lib/supabase';

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

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  sort_order: number;
}

export default function AdminSettings() {
  const { settings, loading, updateAll } = useSettings();
  const { data: socialLinks, loading: socialLoading, refetch: refetchSocial } = useFetch<SocialLink>('social_links', {
    order: { column: 'sort_order' },
  });
  const [form, setForm] = useState<Record<string, string>>({});
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => { 
    if (!loading && !initialized) { 
      setForm({ ...settings }); 
      setInitialized(true); 
    } 
  }, [loading, initialized]);
  useEffect(() => { if (!socialLoading) setSocials([...socialLinks]); }, [socialLoading, socialLinks]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    
    // Save general settings
    console.log('Saving form data:', form);
    const ok = await updateAll(form);
    console.log('updateAll result:', ok);
    if (!ok) { setMsg('Error saving settings.'); setSaving(false); return; }

    // Save social links
    for (let i = 0; i < socials.length; i++) {
      const s = socials[i];
      if (s.id.startsWith('new-')) {
        const { data, error } = await supabase.from('social_links').insert({
          platform: s.platform,
          url: s.url,
          sort_order: i,
        }).select();
        console.log('Insert social link:', s.platform, data, error);
        if (error) { setMsg(`Error adding ${s.platform}: ${error.message}`); setSaving(false); return; }
      } else {
        const { data, error } = await supabase.from('social_links').update({
          platform: s.platform,
          url: s.url,
          sort_order: i,
        }).eq('id', s.id).select();
        console.log('Update social link:', s.platform, data, error);
        if (error) { setMsg(`Error updating ${s.platform}: ${error.message}`); setSaving(false); return; }
      }
    }

    setMsg('Settings saved!');
    setSaving(false);
    refetchSocial();
    setTimeout(() => setMsg(''), 3000);
  };

  const addSocialLink = () => {
    const usedPlatforms = socials.map(s => s.platform);
    const available = PLATFORMS.find(p => !usedPlatforms.includes(p.value));
    setSocials([...socials, {
      id: 'new-' + Date.now(),
      platform: available?.value || 'facebook',
      url: '',
      sort_order: socials.length,
    }]);
  };

  const removeSocialLink = async (index: number) => {
    const link = socials[index];
    const label = PLATFORMS.find(p => p.value === link.platform)?.label || link.platform;
    console.log('Delete clicked for:', label, link);
    if (!window.confirm(`Remove ${label}? This action cannot be undone.`)) {
      console.log('User cancelled delete');
      return;
    }
    if (!link.id.startsWith('new-')) {
      const { data, error } = await supabase.from('social_links').delete().eq('id', link.id).select();
      console.log('Delete result:', data, error);
    }
    setSocials(socials.filter((_, i) => i !== index));
    console.log('Removed from local state');
    refetchSocial();
  };

  const updateSocial = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = [...socials];
    updated[index] = { ...updated[index], [field]: value };
    setSocials(updated);
  };

  if (loading || socialLoading) return <LoadingSpinner />;

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
              <button onClick={() => removeSocialLink(i)} className="text-red-400 hover:text-red-600 transition-colors p-1">
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