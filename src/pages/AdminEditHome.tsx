import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { PageHeader, SectionCard, DynamicForm, ItemList, FieldDef } from '../components/AdminUI';
import { useFetchSingle, useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const heroFields: FieldDef[] = [
  { key: 'heading_line1', label: 'Heading Line 1', half: true },
  { key: 'heading_accent1', label: 'Accent Word 1', half: true },
  { key: 'heading_line2', label: 'Heading Line 2', half: true },
  { key: 'heading_accent2', label: 'Accent Word 2', half: true },
  { key: 'subtext', label: 'Subtext', type: 'textarea', rows: 2 },
  { key: 'image_url', label: 'Image URL', type: 'url' },
  { key: 'image_caption', label: 'Image Caption' },
  { key: 'cta1_label', label: 'CTA 1 Label', half: true },
  { key: 'cta1_link', label: 'CTA 1 Link', half: true },
  { key: 'cta2_label', label: 'CTA 2 Label', half: true },
  { key: 'cta2_link', label: 'CTA 2 Link', half: true },
];

const cardFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
  { key: 'icon_name', label: 'Icon Name', placeholder: 'Home, Heart, Users...' },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
];

const statFields: FieldDef[] = [
  { key: 'label', label: 'Label', half: true },
  { key: 'value', label: 'Value', half: true },
  { key: 'icon_name', label: 'Icon Name', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
];

export default function AdminEditHome() {
  const { data: hero, loading: hL, refetch: refetchHero } = useFetchSingle<any>('home_hero');
  const { data: cards, loading: cL, refetch: refetchCards } = useFetch<any>('home_cards', { order: { column: 'sort_order' } });
  const { data: stats, loading: sL, refetch: refetchStats } = useFetch<any>('impact_stats', { order: { column: 'sort_order' } });
  const { upsert: upsertHero } = useUpsert('home_hero');
  const { upsert: upsertCard } = useUpsert('home_cards');
  const { upsert: upsertStat } = useUpsert('impact_stats');
  const { remove: removeCard } = useDelete('home_cards');
  const { remove: removeStat } = useDelete('impact_stats');

  const [heroForm, setHeroForm] = useState<Record<string, any>>({});
  const [cardList, setCardList] = useState<any[]>([]);
  const [statList, setStatList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { if (hero) setHeroForm({ ...hero }); }, [hero]);
  useEffect(() => { setCardList([...cards]); }, [cards]);
  useEffect(() => { setStatList([...stats]); }, [stats]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await upsertHero(heroForm);
      for (const c of cardList) await upsertCard(c);
      for (const s of statList) await upsertStat(s);
      await Promise.all([refetchHero(), refetchCards(), refetchStats()]);
      setMsg('Saved!');
    } catch { setMsg('Error saving.'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (hL || cL || sL) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Edit Home Page" description="Manage hero section, cards, and impact stats.">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50">
          <Save size={18} />{saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </PageHeader>
      {msg && <div className={'mb-4 px-4 py-2 rounded-lg text-sm font-semibold ' + (msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>{msg}</div>}

      <SectionCard title="Hero Section">
        <DynamicForm fields={heroFields} data={heroForm} onChange={(k, v) => setHeroForm(prev => ({ ...prev, [k]: v }))} />
      </SectionCard>

      <SectionCard title="Feature Cards">
        <ItemList items={cardList} fields={cardFields}
          onSave={(item, idx) => { const next = [...cardList]; next[idx] = item; setCardList(next); }}
          onDelete={async (idx) => { if (cardList[idx].id) await removeCard(cardList[idx].id); setCardList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setCardList(prev => [...prev, { title: '', description: '', icon_name: 'Home', sort_order: prev.length + 1 }])}
          addLabel="Add Card" />
      </SectionCard>

      <SectionCard title="Impact Stats">
        <ItemList items={statList} fields={statFields}
          onSave={(item, idx) => { const next = [...statList]; next[idx] = item; setStatList(next); }}
          onDelete={async (idx) => { if (statList[idx].id) await removeStat(statList[idx].id); setStatList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setStatList(prev => [...prev, { label: '', value: '', icon_name: 'Users', sort_order: prev.length + 1 }])}
          addLabel="Add Stat" />
      </SectionCard>
    </div>
  );
}
