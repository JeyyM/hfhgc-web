import { useState, useEffect } from 'react';
import { Save, Home as HomeIcon } from 'lucide-react';
import { PageHeader, SectionCard, DynamicForm, ItemList, FieldDef, LUCIDE_ICONS } from '../components/AdminUI';
import { useFetchSingle, useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const heroFields: FieldDef[] = [
  { key: 'heading_line1', label: 'Heading Line 1', half: true },
  { key: 'heading_accent1', label: 'Accent Word 1', half: true },
  { key: 'heading_line2', label: 'Heading Line 2', half: true },
  { key: 'heading_accent2', label: 'Accent Word 2', half: true },
  { key: 'subtext', label: 'Subtext', type: 'textarea', rows: 2 },
  { key: 'image_url', label: 'Hero Image', type: 'gallery', half: true },
  { key: 'image_caption', label: 'Image Caption', type: 'text', half: true },
  { key: 'cta1_label', label: 'CTA 1 Label', half: true },
  { key: 'cta1_link', label: 'CTA 1 Link', half: true },
  { key: 'cta2_label', label: 'CTA 2 Label', half: true },
  { key: 'cta2_link', label: 'CTA 2 Link', half: true },
];

const impactFields: FieldDef[] = [
  { key: 'impact_title', label: 'Impact Section Title' },
  { key: 'impact_subtitle', label: 'Impact Section Subtitle', type: 'textarea', rows: 3 },
];

const contactFields: FieldDef[] = [
  { key: 'contact_title', label: 'Contact Section Title' },
  { key: 'contact_subtitle', label: 'Contact Section Subtitle', type: 'textarea', rows: 3 },
];

const cardFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
  { key: 'icon_name', label: 'Icon', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
];

const statFields: FieldDef[] = [
  { key: 'label', label: 'Label', half: true },
  { key: 'value', label: 'Value', half: true },
  { key: 'icon_name', label: 'Icon', half: true },
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
    <div className="max-w-4xl mx-auto w-full min-w-0 pb-16">
      <PageHeader
        title="Edit Home Page"
        description={'Edit fields directly below — lists update as you type. Use Save all changes once when you are ready to publish.'}
      >
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-xl font-semibold shadow-sm hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <Save size={18} />{saving ? 'Saving…' : 'Save all changes'}
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
        title="Hero"
        description="Main headline, hero image, and button labels at the top of the home page."
        collapsible={false}
      >
        <DynamicForm
          fields={heroFields}
          data={heroForm}
          onChange={(k, v) => setHeroForm(prev => ({ ...prev, [k]: v }))}
        />
      </SectionCard>

      <SectionCard
        title="Feature cards"
        description="Three-up icons and blurbs below the hero."
        collapsible={false}
      >
        <ItemList
          variant="inline"
          inlineFoldable
          items={cardList}
          fields={cardFields}
          onSave={(item, idx) => { const next = [...cardList]; next[idx] = item; setCardList(next); }}
          onDelete={async (idx) => {
            if (cardList[idx].id) await removeCard(cardList[idx].id);
            setCardList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() =>
            setCardList(prev => [...prev, { title: '', description: '', icon_name: 'Home', sort_order: prev.length + 1 }])
          }
          addLabel="Add card"
          emptyLabel="No feature cards yet."
          renderPreview={(c) => {
            const Icon = LUCIDE_ICONS[c.icon_name] || HomeIcon;
            return (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-green-1)] flex items-center justify-center flex-shrink-0 border border-[var(--color-green-3)]/40">
                  <Icon size={20} className="text-[var(--color-green-5)]" />
                </div>
                <span className="font-heading font-semibold text-gray-900 truncate">{c.title?.trim() || 'Untitled card'}</span>
              </div>
            );
          }}
        />
      </SectionCard>

      <SectionCard
        title="Impact section"
        description="Section heading and the statistic tiles."
        collapsible={false}
      >
        <div className="space-y-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Section copy</p>
            <DynamicForm
              fields={impactFields}
              data={heroForm}
              onChange={(k, v) => setHeroForm(prev => ({ ...prev, [k]: v }))}
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Statistics</p>
            <ItemList
              variant="inline"
              inlineFoldable
              items={statList}
              fields={statFields}
              onSave={(item, idx) => { const next = [...statList]; next[idx] = item; setStatList(next); }}
              onDelete={async (idx) => {
                if (statList[idx].id) await removeStat(statList[idx].id);
                setStatList(prev => prev.filter((_, i) => i !== idx));
              }}
              onAdd={() =>
                setStatList(prev => [...prev, { label: '', value: '', icon_name: 'Users', sort_order: prev.length + 1 }])
              }
              addLabel="Add stat"
              emptyLabel="No impact stats yet."
              renderPreview={(s) => {
                const Icon = LUCIDE_ICONS[s.icon_name] || HomeIcon;
                return (
                  <div className="flex items-center gap-3 min-w-0 flex-wrap">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-green-1)] flex items-center justify-center flex-shrink-0 border border-[var(--color-green-3)]/40">
                      <Icon size={20} className="text-[var(--color-green-5)]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-heading font-bold text-[var(--color-green-5)] text-lg">{s.label || '—'}</span>
                      <span className="text-gray-600 text-sm ml-2">{s.value ?? ''}</span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Get in touch"
        description="Heading above the contact strip near the bottom of the home page."
        collapsible={false}
      >
        <DynamicForm
          fields={contactFields}
          data={heroForm}
          onChange={(k, v) => setHeroForm(prev => ({ ...prev, [k]: v }))}
        />
      </SectionCard>
    </div>
  );
}
