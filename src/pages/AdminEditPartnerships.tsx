import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Home as HomeIcon, ChevronDown } from 'lucide-react';
import { PageHeader, SectionCard, ItemList, DynamicForm, FormField, FieldDef, LUCIDE_ICONS } from '../components/AdminUI';
import { useFetch, useUpsert, useDelete, useSettings } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

// ── Field definitions ─────────────────────────────────────────────────────────

const communityFields: FieldDef[] = [
  { key: 'name', label: 'Community Name' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 5 },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible on site', type: 'toggle', half: true },
  { key: 'image_url', label: 'Community Photo', type: 'gallery', half: true },
  { key: 'image_caption', label: 'Photo Caption', type: 'text', half: true },
];

const whySectionImageFields: FieldDef[] = [
  { key: 'partnerships_why_image_url', label: 'Section Photo', type: 'gallery', half: true },
  { key: 'partnerships_why_image_caption', label: 'Photo Caption', type: 'text', half: true },
];

const whyItemFields: FieldDef[] = [
  { key: 'text', label: 'Benefit Text', type: 'textarea', rows: 2 },
  { key: 'icon_name', label: 'Icon', type: 'icon', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible on site', type: 'toggle' },
];

const packageFields: FieldDef[] = [
  { key: 'tier_name', label: 'Tier Name', placeholder: 'e.g. Gold', half: true },
  { key: 'tier_emoji', label: 'Emoji', placeholder: 'e.g. 🥇', half: true },
  { key: 'is_most_popular', label: 'Most popular ribbon', type: 'toggle', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible on site', type: 'toggle', half: true },
];

const packageItemFields: FieldDef[] = [
  { key: 'title', label: 'Item name' },
  { key: 'subtext', label: 'Subtext', type: 'textarea', rows: 2 },
  {
    key: 'display_type',
    label: 'Row type',
    type: 'select',
    options: ['text', 'checkbox'],
    half: true,
  },
  {
    key: 'text_value',
    label: 'Text value',
    placeholder: 'Shown for text rows',
    half: true,
    visibleWhen: (d) => d.display_type !== 'checkbox',
  },
  {
    key: 'is_included',
    label: 'Included (✓ vs ✕)',
    type: 'toggle',
    half: true,
    visibleWhen: (d) => d.display_type === 'checkbox',
  },
];

const partnerFields: FieldDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
  { key: 'image_url', label: 'Logo', type: 'gallery' },
  { key: 'website', label: 'Website', type: 'url' },
  { key: 'since_year', label: 'Partner Since (Year)', type: 'number', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_past', label: 'Past Partner', type: 'toggle', half: true },
  { key: 'is_visible', label: 'Visible on site', type: 'toggle', half: true },
];

const testimonialFields: FieldDef[] = [
  { key: 'name', label: 'Name', half: true },
  { key: 'title', label: 'Title / Role', half: true },
  { key: 'quote', label: 'Quote', type: 'textarea', rows: 3 },
  { key: 'image_url', label: 'Photo', type: 'gallery' },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible on site', type: 'toggle', half: true },
];

/* ── Legacy partnership_benefits editor (disabled — may return) ───────────────
const benefitFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { key: 'icon_name', label: 'Icon', type: 'icon', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible on site', type: 'toggle', half: true },
];
──────────────────────────────────────────────────────────────────────────────*/

function buildPackageLineMatrix(packages: any[], flatItems: any[]): any[][] {
  const byPkg = new Map<string, any[]>();
  for (const it of flatItems) {
    const pid = it.package_id as string | undefined;
    if (!pid) continue;
    const list = byPkg.get(pid) ?? [];
    list.push(it);
    byPkg.set(pid, list);
  }
  for (const arr of byPkg.values()) {
    arr.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
  }
  return packages.map((p) => (p.id ? [...(byPkg.get(p.id as string) ?? [])] : []));
}

// ── Inline stat chip row ──────────────────────────────────────────────────────

function StatChipRow({
  stat,
  onChange,
  onDelete,
}: {
  stat: any;
  onChange: (updated: any) => void;
  onDelete: () => void;
}) {
  const iconField: FieldDef = { key: 'icon_name', label: 'Icon', type: 'icon', iconPickerCompact: true };
  const inputBase =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent transition-colors';

  return (
    <div className="flex flex-wrap items-end gap-3 bg-white border border-gray-200 rounded-xl p-4 min-w-0 shadow-sm">
      <div className="flex-shrink-0 w-full sm:w-32 min-w-0">
        <FormField
          field={iconField}
          value={stat.icon_name || 'Users'}
          onChange={(_key, val) => onChange({ ...stat, icon_name: val })}
        />
      </div>
      <div className="flex-shrink-0 w-full sm:w-28">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Main Text</label>
        <input
          type="text"
          value={stat.value ?? ''}
          onChange={e => onChange({ ...stat, value: e.target.value })}
          placeholder="e.g. 150"
          className={inputBase}
        />
      </div>
      <div className="flex-1 min-w-[120px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Subtext</label>
        <input
          type="text"
          value={stat.label ?? ''}
          onChange={e => onChange({ ...stat, label: e.target.value })}
          placeholder="e.g. Families Supported"
          className={inputBase}
        />
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors sm:mt-6"
        title="Remove chip"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

// ── Featured communities (inline cards + stat chips) ───────────────────────────

function CommunityListEditor({
  communities,
  stats,
  onUpdateCommunities,
  onUpdateStats,
  onDeleteCommunity,
  onDeleteStat,
}: {
  communities: any[];
  stats: any[];
  onUpdateCommunities: (list: any[]) => void;
  onUpdateStats: (list: any[]) => void;
  onDeleteCommunity: (idx: number) => void;
  onDeleteStat: (id: string | undefined, tempKey: string | undefined) => void;
}) {
  /** Per-community body expansion (defaults to expanded until toggled). */
  const [bodyExpandedMap, setBodyExpandedMap] = useState<Record<string, boolean>>({});

  const rowKey = (c: any, idx: number) => (c.id != null ? String(c.id) : `new-${idx}`);

  const isBodyExpanded = (c: any, idx: number) => {
    const k = rowKey(c, idx);
    return bodyExpandedMap[k] !== undefined ? bodyExpandedMap[k] : false;
  };

  const toggleBody = (c: any, idx: number) => {
    const k = rowKey(c, idx);
    setBodyExpandedMap(prev => ({
      ...prev,
      [k]: !(prev[k] !== undefined ? prev[k] : false),
    }));
  };

  const communityStatsFor = (name: string) => stats.filter(s => s.community_name === name);

  const onCommunityChange = (idx: number, key: string, val: any) => {
    const community = communities[idx];
    const oldName = community.name;
    const next = [...communities];
    next[idx] = { ...next[idx], [key]: val };
    onUpdateCommunities(next);
    if (key === 'name' && oldName && val !== oldName) {
      onUpdateStats(stats.map(s => (s.community_name === oldName ? { ...s, community_name: val } : s)));
    }
  };

  const updateStat = (updated: any) => {
    onUpdateStats(
      stats.map(s =>
        (s.id && s.id === updated.id) || (s._tempKey && s._tempKey === updated._tempKey) ? updated : s
      )
    );
  };

  const deleteStat = (stat: any) => {
    onDeleteStat(stat.id, stat._tempKey);
    onUpdateStats(
      stats.filter(s => !(s.id && s.id === stat.id) && !(s._tempKey && s._tempKey === stat._tempKey))
    );
  };

  const addStat = (communityName: string) => {
    onUpdateStats([
      ...stats,
      {
        _tempKey: `${communityName || 'new'}_${Date.now()}`,
        community_name: communityName,
        icon_name: 'Users',
        value: '',
        label: '',
        sort_order: communityStatsFor(communityName).length + 1,
      },
    ]);
  };

  return (
    <div>
      {communities.length === 0 && (
        <p className="text-gray-400 text-sm italic py-6 text-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 mb-5">
          No featured communities yet.
        </p>
      )}

      <div className="space-y-4">
        {communities.map((community, idx) => {
          const chips = communityStatsFor(community.name);
          const bodyOpen = isBodyExpanded(community, idx);
          return (
            <div
              key={community.id ?? `new-${idx}`}
              className="rounded-xl border border-gray-200 bg-[linear-gradient(to_bottom,#fafafa_0%,#fff_48px)] p-5 shadow-sm overflow-hidden min-w-0"
            >
              <div
                className={
                  bodyOpen
                    ? 'flex items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100'
                    : 'flex items-center justify-between gap-3'
                }
              >
                <button
                  type="button"
                  onClick={() => toggleBody(community, idx)}
                  className="flex items-center gap-2 flex-1 min-w-0 text-left rounded-lg px-2 py-1.5 -ml-2 hover:bg-gray-50/90 transition-colors"
                  aria-expanded={bodyOpen}
                  title={bodyOpen ? 'Show less' : 'Show more'}
                >
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-gray-500 transition-transform duration-200 ${bodyOpen ? '' : '-rotate-90'}`}
                  />
                  <span className="min-w-0 flex-1 block">
                    <span className="font-heading font-semibold text-gray-900 truncate block">
                      {community.name?.trim() || 'Untitled community'}
                    </span>
                    {chips.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {chips.length} stat chip{chips.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    if (confirm('Delete this community?')) {
                      onDeleteCommunity(idx);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  title="Remove community"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {bodyOpen && (
                <>
                  <DynamicForm
                    fields={communityFields}
                    data={community}
                    onChange={(k, v) => onCommunityChange(idx, k, v)}
                  />

                  <div className="border-t border-dashed border-gray-200 pt-6 mt-6 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Stat chips</p>
                    {chips.length === 0 && (
                      <p className="text-xs text-gray-400 italic">No stat chips yet — add one below.</p>
                    )}
                    <div className="space-y-3">
                      {chips.map((chip: any) => (
                        <StatChipRow
                          key={chip.id ?? chip._tempKey}
                          stat={chip}
                          onChange={updateStat}
                          onDelete={() => deleteStat(chip)}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addStat(community.name)}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--color-green-5)] border-2 border-dashed border-[var(--color-green-3)] rounded-xl hover:bg-[var(--color-green-1)] transition-colors w-full"
                    >
                      <Plus size={18} />
                      Add stat chip
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          onUpdateCommunities([
            ...communities,
            {
              name: '',
              description: '',
              image_url: '',
              image_caption: '',
              is_visible: true,
              sort_order: communities.length + 1,
            },
          ]);
        }}
        className="mt-5 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--color-green-5)] border-2 border-dashed border-[var(--color-green-3)] rounded-xl hover:bg-[var(--color-green-1)] transition-colors w-full"
      >
        <Plus size={18} />
        Add community
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminEditPartnerships() {
  const { data: communities, loading: coL, refetch: refetchCommunities } = useFetch<any>('featured_communities', {
    order: { column: 'sort_order' },
  });
  const { data: communityStats, loading: csL, refetch: refetchCommunityStats } = useFetch<any>('featured_community_stats', {
    order: { column: 'sort_order' },
  });
  const { data: whyItems, loading: wL, refetch: refetchWhyItems } = useFetch<any>('partnership_why_items', { order: { column: 'sort_order' } });
  const { data: packages, loading: pkL, refetch: refetchPackages } = useFetch<any>('partnership_packages', { order: { column: 'sort_order' } });
  const { data: packageItemsFlat, loading: pkiL, refetch: refetchPackageItems } = useFetch<any>('partnership_package_items', {
    order: { column: 'sort_order' },
  });
  const { data: partners, loading: pL, refetch: refetchPartners } = useFetch<any>('partners', { order: { column: 'sort_order' } });
  const { data: testimonials, loading: tL, refetch: refetchTest } = useFetch<any>('partner_testimonials', { order: { column: 'sort_order' } });
  // Legacy partnership_benefits — re-enable fetch + loading (bL) below when needed:
  // const { data: benefits, loading: bL, refetch: refetchBenefits } = useFetch<any>('partnership_benefits', { order: { column: 'sort_order' } });

  const { upsert: upsertCommunity } = useUpsert('featured_communities');
  const { upsert: upsertCommunityStat } = useUpsert('featured_community_stats');
  const { upsert: upsertWhyItem } = useUpsert('partnership_why_items');
  const { upsert: upsertPackage } = useUpsert('partnership_packages');
  const { upsert: upsertPackageItem } = useUpsert('partnership_package_items');
  const { upsert: upsertPartner } = useUpsert('partners');
  const { upsert: upsertTest } = useUpsert('partner_testimonials');
  // const { upsert: upsertBenefit } = useUpsert('partnership_benefits');

  const { remove: removeCommunity } = useDelete('featured_communities');
  const { remove: removeCommunityStat } = useDelete('featured_community_stats');
  const { remove: removeWhyItem } = useDelete('partnership_why_items');
  const { remove: removePackage } = useDelete('partnership_packages');
  const { remove: removePackageItem } = useDelete('partnership_package_items');
  const { remove: removePartner } = useDelete('partners');
  const { remove: removeTest } = useDelete('partner_testimonials');
  // const { remove: removeBenefit } = useDelete('partnership_benefits');

  const { settings, updateAll: updateSettings } = useSettings();
  const [whyImageUrl, setWhyImageUrl] = useState('');
  const [whyImageCaption, setWhyImageCaption] = useState('');

  useEffect(() => {
    setWhyImageUrl(settings.partnerships_why_image_url ?? '');
    setWhyImageCaption(settings.partnerships_why_image_caption ?? '');
  }, [settings]);

  const [communityList, setCommunityList] = useState<any[]>([]);
  const [communityStatList, setCommunityStatList] = useState<any[]>([]);
  const [whyItemList, setWhyItemList] = useState<any[]>([]);
  const [packageList, setPackageList] = useState<any[]>([]);
  const [packageLineMatrix, setPackageLineMatrix] = useState<any[][]>([]);
  const [deletedPackageItemIds, setDeletedPackageItemIds] = useState<string[]>([]);
  const [partnerList, setPartnerList] = useState<any[]>([]);
  const [testList, setTestList] = useState<any[]>([]);
  // const [benefitList, setBenefitList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setCommunityList([...communities]);
  }, [communities]);
  useEffect(() => {
    setCommunityStatList([...communityStats]);
  }, [communityStats]);
  useEffect(() => {
    setWhyItemList([...whyItems]);
  }, [whyItems]);
  useEffect(() => {
    const sorted = [...packages].sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
    setPackageList(sorted);
    setPackageLineMatrix(buildPackageLineMatrix(sorted, packageItemsFlat));
    setDeletedPackageItemIds([]);
  }, [packages, packageItemsFlat]);
  useEffect(() => {
    setPartnerList([...partners]);
  }, [partners]);
  useEffect(() => {
    setTestList([...testimonials]);
  }, [testimonials]);
  /* useEffect(() => {
    setBenefitList([...benefits]);
  }, [benefits]); */

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      for (const c of communityList) await upsertCommunity(c);
      for (const s of communityStatList) {
        const { _tempKey, ...clean } = s;
        await upsertCommunityStat(clean);
      }
      await updateSettings({
        partnerships_why_image_url: whyImageUrl,
        partnerships_why_image_caption: whyImageCaption,
      });
      for (const w of whyItemList) await upsertWhyItem(w);

      let savedPkgs = [...packageList];
      for (let pi = 0; pi < savedPkgs.length; pi++) {
        const row = savedPkgs[pi];
        const payload = {
          id: row.id,
          tier_name: row.tier_name,
          tier_emoji: row.tier_emoji ?? '🏆',
          is_most_popular: !!row.is_most_popular,
          sort_order: Number(row.sort_order) ?? pi,
          is_visible: row.is_visible !== false,
        };
        const saved = await upsertPackage(payload as any);
        if (saved) savedPkgs[pi] = saved;
      }

      for (let pi = 0; pi < savedPkgs.length; pi++) {
        const pkgId = savedPkgs[pi]?.id as string | undefined;
        if (!pkgId) continue;
        const rows = packageLineMatrix[pi] ?? [];
        for (let li = 0; li < rows.length; li++) {
          const raw = rows[li];
          const displayType = raw.display_type === 'checkbox' ? 'checkbox' : 'text';
          await upsertPackageItem({
            id: raw.id,
            package_id: pkgId,
            sort_order: li,
            title: String(raw.title ?? ''),
            subtext: String(raw.subtext ?? ''),
            display_type: displayType,
            text_value: displayType === 'text' ? String(raw.text_value ?? '') : '',
            is_included: displayType === 'checkbox' ? !!raw.is_included : false,
          } as any);
        }
      }

      for (const deadId of deletedPackageItemIds) {
        await removePackageItem(deadId);
      }
      setDeletedPackageItemIds([]);
      setPackageList(savedPkgs);

      for (const p of partnerList) await upsertPartner(p);
      for (const t of testList) await upsertTest(t);
      // for (const b of benefitList) await upsertBenefit(b);
      await Promise.all([
        refetchCommunities(),
        refetchCommunityStats(),
        refetchWhyItems(),
        refetchPackages(),
        refetchPackageItems(),
        refetchPartners(),
        refetchTest(),
        // refetchBenefits(),
      ]);
      setMsg('Saved!');
    } catch {
      setMsg('Error saving.');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (coL || csL || wL || pkL || pkiL || pL || tL) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 pb-16">
      <PageHeader
        title="Edit Partnerships"
        description={
          'Featured communities, packages, partners, and testimonials for the Partnerships page. Edit below — lists update as you type. Save all changes once when you are ready to publish.'
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
        title="Featured communities"
        description="Each community has its own photo, copy, and stat chips (icon, main value, label)."
        collapsible={false}
      >
        <CommunityListEditor
          communities={communityList}
          stats={communityStatList}
          onUpdateCommunities={setCommunityList}
          onUpdateStats={setCommunityStatList}
          onDeleteCommunity={async idx => {
            if (communityList[idx].id) await removeCommunity(communityList[idx].id);
            setCommunityList(prev => prev.filter((_, i) => i !== idx));
          }}
          onDeleteStat={async id => {
            if (id) await removeCommunityStat(id);
          }}
        />
      </SectionCard>

      <SectionCard
        title="Why partner with us"
        description="Section image (site settings) and benefit bullets shown next to it on the page."
        collapsible={false}
      >
        <div className="mb-8 pb-8 border-b border-gray-100">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Section image</p>
          <DynamicForm
            fields={whySectionImageFields}
            data={{
              partnerships_why_image_url: whyImageUrl,
              partnerships_why_image_caption: whyImageCaption,
            }}
            onChange={(k, v) => {
              if (k === 'partnerships_why_image_url') setWhyImageUrl(v);
              else setWhyImageCaption(v);
            }}
          />
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Benefit bullets</p>
        <ItemList
          variant="inline"
          inlineFoldable
          items={whyItemList}
          fields={whyItemFields}
          onSave={(item, idx) => {
            const next = [...whyItemList];
            next[idx] = item;
            setWhyItemList(next);
          }}
          onDelete={async idx => {
            if (whyItemList[idx].id) await removeWhyItem(whyItemList[idx].id);
            setWhyItemList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() =>
            setWhyItemList(prev => [
              ...prev,
              { icon_name: 'CheckCircle', text: '', is_visible: true, sort_order: prev.length + 1 },
            ])
          }
          addLabel="Add benefit"
          emptyLabel="No benefit bullets yet."
          renderPreview={w => {
            const Icon = LUCIDE_ICONS[w.icon_name] || HomeIcon;
            return (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-green-1)] flex items-center justify-center flex-shrink-0 border border-[var(--color-green-3)]/40">
                  <Icon size={20} className="text-[var(--color-green-5)]" />
                </div>
                <span className="font-heading font-semibold text-gray-900 truncate">{w.text || 'New benefit'}</span>
              </div>
            );
          }}
        />
      </SectionCard>

      <SectionCard
        title="Partnership packages"
        description="Each tier: name, emoji, optional Most popular ribbon, sort order, and visibility — same height as other cards on the site. Under each tier, add line items: Text shows a large value; Checkbox shows a green check or red X."
        collapsible={false}
      >
        <div className="space-y-10">
          {packageList.map((pkg, pIdx) => (
            <div
              key={pkg.id ?? `new-pkg-${pIdx}`}
              className="rounded-2xl border-2 border-gray-200 bg-[linear-gradient(to_bottom,#fafafa_0%,#fff_56px)] shadow-sm overflow-hidden min-w-0"
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-white/80">
                <span className="font-heading font-bold text-gray-900 truncate min-w-0">
                  {pkg.tier_emoji || '🏆'} {pkg.tier_name?.trim() || `Tier ${pIdx + 1}`}
                </span>
                <button
                  type="button"
                  title="Remove tier"
                  onClick={async () => {
                    if (!confirm('Delete this package tier and all its line items?')) return;
                    if (pkg.id) await removePackage(pkg.id);
                    setPackageList((prev) => prev.filter((_, i) => i !== pIdx));
                    setPackageLineMatrix((prev) => prev.filter((_, i) => i !== pIdx));
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="p-5 md:p-6 space-y-8">
                <DynamicForm
                  fields={packageFields}
                  data={pkg}
                  onChange={(key, val) => {
                    setPackageList((prev) => {
                      const n = [...prev];
                      n[pIdx] = { ...n[pIdx], [key]: val };
                      return n;
                    });
                  }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Public card line items</p>
                  <ItemList
                    variant="inline"
                    inlineFoldable
                    items={packageLineMatrix[pIdx] ?? []}
                    fields={packageItemFields}
                    onSave={(item, idx) => {
                      setPackageLineMatrix((prev) => {
                        const n = prev.map((r) => [...r]);
                        const row = [...(n[pIdx] ?? [])];
                        row[idx] = item;
                        n[pIdx] = row;
                        return n;
                      });
                    }}
                    onDelete={(idx) => {
                      const row = packageLineMatrix[pIdx]?.[idx];
                      if (row?.id) setDeletedPackageItemIds((d) => [...d, row.id]);
                      setPackageLineMatrix((prev) => {
                        const n = prev.map((r) => [...r]);
                        const rowList = [...(n[pIdx] ?? [])];
                        rowList.splice(idx, 1);
                        n[pIdx] = rowList;
                        return n;
                      });
                    }}
                    onAdd={() =>
                      setPackageLineMatrix((prev) => {
                        const n = prev.map((r) => [...r]);
                        while (n.length <= pIdx) n.push([]);
                        const rowList = [...(n[pIdx] ?? [])];
                        rowList.push({
                          title: '',
                          subtext: '',
                          display_type: 'text',
                          text_value: '',
                          is_included: false,
                        });
                        n[pIdx] = rowList;
                        return n;
                      })
                    }
                    addLabel="Add line item"
                    emptyLabel='No rows yet — e.g. a “followers” amount (text) or “included in package” (checkbox).'
                    renderPreview={(row) => (
                      <span className="font-heading font-semibold text-gray-900 min-w-0 block text-left">
                        <span className="truncate">{row.title?.trim() || 'New row'}</span>
                        <span className="text-gray-500 font-normal text-sm block sm:inline sm:before:content-['_·_']">
                          {row.display_type === 'checkbox'
                            ? row.is_included
                              ? 'Included (✓)'
                              : 'Not included (✕)'
                            : row.text_value != null && String(row.text_value).trim() !== ''
                              ? String(row.text_value)
                              : 'Text value'}
                        </span>
                      </span>
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setPackageList((prev) => [
              ...prev,
              {
                tier_name: '',
                tier_emoji: '🏆',
                is_most_popular: false,
                is_visible: true,
                sort_order: prev.length,
              },
            ]);
            setPackageLineMatrix((prev) => [...prev, []]);
          }}
          className="mt-6 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--color-green-5)] border-2 border-dashed border-[var(--color-green-3)] rounded-xl hover:bg-[var(--color-green-1)] transition-colors w-full"
        >
          <Plus size={18} />
          Add package tier
        </button>
      </SectionCard>

      <SectionCard
        title="Partners"
        description="Use Past Partner for organizations shown in Past Supporters."
        collapsible={false}
      >
        <ItemList
          variant="inline"
          inlineFoldable
          items={partnerList}
          fields={partnerFields}
          onSave={(item, idx) => {
            const next = [...partnerList];
            next[idx] = item;
            setPartnerList(next);
          }}
          onDelete={async idx => {
            if (partnerList[idx].id) await removePartner(partnerList[idx].id);
            setPartnerList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() =>
            setPartnerList(prev => [
              ...prev,
              { name: '', is_visible: true, is_past: false, sort_order: prev.length + 1 },
            ])
          }
          addLabel="Add partner"
          emptyLabel="No partners yet."
          renderPreview={p => (
            <span className="font-heading font-semibold text-gray-900">
              {p.name || 'New partner'}
              {p.is_past && (
                <span className="ml-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Past</span>
              )}
            </span>
          )}
        />
      </SectionCard>

      <SectionCard
        title="Partner testimonials"
        description="Quotes shown in What Our Partners Say."
        collapsible={false}
      >
        <ItemList
          variant="inline"
          inlineFoldable
          items={testList}
          fields={testimonialFields}
          onSave={(item, idx) => {
            const next = [...testList];
            next[idx] = item;
            setTestList(next);
          }}
          onDelete={async idx => {
            if (testList[idx].id) await removeTest(testList[idx].id);
            setTestList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() =>
            setTestList(prev => [
              ...prev,
              { name: '', title: '', quote: '', is_visible: true, sort_order: prev.length + 1 },
            ])
          }
          addLabel="Add testimonial"
          emptyLabel="No testimonials yet."
          renderPreview={t => (
            <div className="min-w-0">
              <span className="font-heading font-semibold text-gray-900 truncate block">
                {t.name?.trim() || 'Untitled'}
              </span>
              {t.title?.trim() && <span className="text-sm text-gray-500 truncate block">{t.title}</span>}
            </div>
          )}
        />
      </SectionCard>

      {/* Legacy partnership benefits — uncomment benefitFields + hooks + benefitList state/effect/save/refetch above
      <SectionCard
        title="Legacy partnership benefits"
        description="Older benefit cards — not used on the page if bullets above are filled. Safe to leave empty."
        collapsible={false}
      >
        <ItemList
          variant="inline"
          inlineFoldable
          items={benefitList}
          fields={benefitFields}
          onSave={(item, idx) => {
            const next = [...benefitList];
            next[idx] = item;
            setBenefitList(next);
          }}
          onDelete={async idx => {
            if (benefitList[idx].id) await removeBenefit(benefitList[idx].id);
            setBenefitList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() =>
            setBenefitList(prev => [
              ...prev,
              { title: '', description: '', icon_name: 'Heart', is_visible: true, sort_order: prev.length + 1 },
            ])
          }
          addLabel="Add legacy benefit"
          emptyLabel="No legacy benefits."
          renderPreview={b => {
            const Icon = LUCIDE_ICONS[b.icon_name] || HomeIcon;
            return (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-green-1)] flex items-center justify-center flex-shrink-0 border border-[var(--color-green-3)]/40">
                  <Icon size={20} className="text-[var(--color-green-5)]" />
                </div>
                <span className="font-heading font-semibold text-gray-900 truncate">{b.title || 'New benefit'}</span>
              </div>
            );
          }}
        />
      </SectionCard>
      */}
    </div>
  );
}
