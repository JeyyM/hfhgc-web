import { useState, useEffect } from 'react';
import { Save, Plus, Pencil, Trash2, X, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader, SectionCard, ItemList, DynamicForm, FormField, FieldDef, LUCIDE_ICONS } from '../components/AdminUI';
import { useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import { Home as HomeIcon } from 'lucide-react';

// ── Field definitions ─────────────────────────────────────────────────────────

const communityFields: FieldDef[] = [
  { key: 'name',          label: 'Community Name' },
  { key: 'description',   label: 'Description', type: 'textarea', rows: 5 },
  { key: 'sort_order',    label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible',    label: 'Visible on site', type: 'toggle', half: true },
  { key: 'image_url',     label: 'Community Photo', type: 'gallery' },
  { key: 'image_caption', label: 'Photo Caption', type: 'text' },
];

const whyItemFields: FieldDef[] = [
  { key: 'icon_name',  label: 'Icon', type: 'icon', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'text',       label: 'Benefit Text', type: 'textarea', rows: 2 },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

const packageFields: FieldDef[] = [
  { key: 'tier_name',                 label: 'Tier Name', placeholder: 'e.g. Gold', half: true },
  { key: 'tier_emoji',                label: 'Emoji', placeholder: 'e.g. 🥇', half: true },
  { key: 'followers_count',           label: 'Social Media Followers', type: 'number', half: true },
  { key: 'publicity_materials_count', label: 'Publicity Materials', type: 'number', half: true },
  { key: 'has_report',                label: 'Post-Activity Report', type: 'toggle', half: true },
  { key: 'sort_order',                label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible',                label: 'Visible', type: 'toggle', half: true },
];

const partnerFields: FieldDef[] = [
  { key: 'name',        label: 'Name' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
  { key: 'image_url',   label: 'Logo', type: 'gallery' },
  { key: 'website',     label: 'Website', type: 'url' },
  { key: 'since_year',  label: 'Partner Since (Year)', type: 'number', half: true },
  { key: 'sort_order',  label: 'Sort Order', type: 'number', half: true },
  { key: 'is_past',     label: 'Past Partner', type: 'toggle', half: true },
  { key: 'is_visible',  label: 'Visible', type: 'toggle', half: true },
];

const testimonialFields: FieldDef[] = [
  { key: 'name',       label: 'Name', half: true },
  { key: 'title',      label: 'Title / Role', half: true },
  { key: 'quote',      label: 'Quote', type: 'textarea', rows: 3 },
  { key: 'image_url',  label: 'Photo', type: 'gallery' },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

const benefitFields: FieldDef[] = [
  { key: 'title',       label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { key: 'icon_name',   label: 'Icon', type: 'icon', half: true },
  { key: 'sort_order',  label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible',  label: 'Visible', type: 'toggle', half: true },
];

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
  const iconField: FieldDef = { key: 'icon_name', label: 'Icon', type: 'icon' };
  const inputBase = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent transition-colors';
  const Icon = LUCIDE_ICONS[stat.icon_name] || HomeIcon;

  return (
    <div className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 min-w-0 overflow-hidden">
      {/* Icon preview + picker */}
      <div className="flex-shrink-0 w-32">
        <FormField
          field={iconField}
          value={stat.icon_name || 'Users'}
          onChange={(_key, val) => onChange({ ...stat, icon_name: val })}
        />
      </div>

      {/* Value */}
      <div className="flex-shrink-0 w-24">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Main Text</label>
        <input
          type="text"
          value={stat.value ?? ''}
          onChange={e => onChange({ ...stat, value: e.target.value })}
          placeholder="e.g. 150"
          className={inputBase}
        />
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Subtext</label>
        <input
          type="text"
          value={stat.label ?? ''}
          onChange={e => onChange({ ...stat, label: e.target.value })}
          placeholder="e.g. Families Supported"
          className={inputBase}
        />
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={onDelete}
        className="flex-shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4"
        title="Remove chip"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

// ── Integrated community + stats accordion ────────────────────────────────────

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
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [editingIdx,  setEditingIdx]  = useState<number | null>(null);
  const [editData,    setEditData]    = useState<Record<string, any>>({});

  const startEdit = (idx: number) => {
    setEditData({ ...communities[idx] });
    setEditingIdx(idx);
    setExpandedIdx(idx);
  };

  const cancelEdit = () => { setEditingIdx(null); setEditData({}); };

  const saveEdit = (idx: number) => {
    const oldName = communities[idx].name;
    const newName = editData.name;
    const next = [...communities];
    next[idx] = editData;
    onUpdateCommunities(next);
    // Keep stats in sync if community name changed
    if (oldName && newName && oldName !== newName) {
      onUpdateStats(stats.map(s => s.community_name === oldName ? { ...s, community_name: newName } : s));
    }
    setEditingIdx(null);
    setEditData({});
  };

  const communityStatsFor = (name: string) => stats.filter(s => s.community_name === name);

  const updateStat = (updated: any) => {
    onUpdateStats(stats.map(s =>
      (s.id && s.id === updated.id) || (s._tempKey && s._tempKey === updated._tempKey) ? updated : s
    ));
  };

  const deleteStat = (stat: any) => {
    onDeleteStat(stat.id, stat._tempKey);
    onUpdateStats(stats.filter(s =>
      !(s.id && s.id === stat.id) && !(s._tempKey && s._tempKey === stat._tempKey)
    ));
  };

  const addStat = (communityName: string) => {
    onUpdateStats([...stats, {
      _tempKey: `${communityName}_${Date.now()}`,
      community_name: communityName,
      icon_name: 'Users',
      value: '',
      label: '',
      sort_order: communityStatsFor(communityName).length + 1,
    }]);
  };

  return (
    <div>
      {communities.length === 0 && (
        <p className="text-gray-400 text-sm italic py-4">No communities yet.</p>
      )}

      <div className="space-y-3">
        {communities.map((community, idx) => {
          const chips = communityStatsFor(community.name);
          const isExpanded = expandedIdx === idx;
          const isEditing  = editingIdx  === idx;

          return (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
              {/* ── Header row ── */}
              <div
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
              >
                <GripVertical size={16} className="text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-800 truncate block">
                    {community.name || 'New Community'}
                  </span>
                  {chips.length > 0 && (
                    <span className="text-xs text-gray-400">{chips.length} stat chip{chips.length !== 1 ? 's' : ''}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={e => { e.stopPropagation(); startEdit(idx); }}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); if (confirm('Delete this community?')) onDeleteCommunity(idx); }}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                  {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </div>

              {/* ── Expanded content ── */}
              {isExpanded && (
                <div className="px-4 py-4 border-t border-gray-100 space-y-6 overflow-hidden min-w-0">

                  {/* Community fields */}
                  {isEditing ? (
                    <>
                      <DynamicForm
                        fields={communityFields}
                        data={editData}
                        onChange={(k, v) => setEditData(prev => ({ ...prev, [k]: v }))}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
                        >
                          <X size={14} />Cancel
                        </button>
                        <button
                          onClick={() => saveEdit(idx)}
                          className="px-4 py-2 text-sm font-semibold text-white bg-[var(--color-green-5)] rounded-lg hover:bg-[var(--color-green-4)] transition-colors flex items-center gap-1"
                        >
                          <Save size={14} />Save Community
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1.5 min-w-0">
                      {communityFields.map(f => (
                        <div key={f.key} className="flex gap-2 text-sm min-w-0">
                          <span className="font-semibold text-gray-500 min-w-[120px] flex-shrink-0">{f.label}:</span>
                          <span className="text-gray-700 break-words min-w-0 flex-1">
                            {f.type === 'toggle'
                              ? (community[f.key] ? '✅ Yes' : '❌ No')
                              : f.key === 'image_url' && community[f.key]
                                ? <img src={community[f.key]} alt="" className="h-10 w-auto rounded" />
                                : String(community[f.key] ?? '—')}
                          </span>
                        </div>
                      ))}
                      <div className="pt-1">
                        <button
                          onClick={() => startEdit(idx)}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                          <Pencil size={12} />Edit Community Details
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Stat chips sub-section ── */}
                  <div className="border-t border-dashed border-gray-200 pt-4">
                    <p className="text-sm font-bold text-gray-700 mb-3">Stat Chips</p>

                    {chips.length === 0 && (
                      <p className="text-xs text-gray-400 italic mb-3">No stat chips yet — add one below.</p>
                    )}

                    <div className="space-y-2">
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
                      className="mt-3 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--color-green-5)] border-2 border-dashed border-[var(--color-green-3)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors w-full justify-center"
                    >
                      <Plus size={15} />Add Stat Chip
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add community */}
      <button
        onClick={() => {
          onUpdateCommunities([...communities, {
            name: '', description: '', image_url: '', image_caption: '',
            is_visible: true, sort_order: communities.length + 1,
          }]);
          setExpandedIdx(communities.length);
          setEditingIdx(communities.length);
          setEditData({
            name: '', description: '', image_url: '', image_caption: '',
            is_visible: true, sort_order: communities.length + 1,
          });
        }}
        className="mt-4 flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--color-green-5)] border-2 border-dashed border-[var(--color-green-3)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors w-full justify-center"
      >
        <Plus size={16} />Add Community
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminEditPartnerships() {
  // ── Fetches
  const { data: communities,    loading: coL, refetch: refetchCommunities }    = useFetch<any>('featured_communities',    { order: { column: 'sort_order' } });
  const { data: communityStats, loading: csL, refetch: refetchCommunityStats } = useFetch<any>('featured_community_stats', { order: { column: 'sort_order' } });
  const { data: whyItems,       loading: wL,  refetch: refetchWhyItems }       = useFetch<any>('partnership_why_items',   { order: { column: 'sort_order' } });
  const { data: packages,       loading: pkL, refetch: refetchPackages }       = useFetch<any>('partnership_packages',    { order: { column: 'sort_order' } });
  const { data: partners,       loading: pL,  refetch: refetchPartners }       = useFetch<any>('partners',                { order: { column: 'sort_order' } });
  const { data: testimonials,   loading: tL,  refetch: refetchTest }           = useFetch<any>('partner_testimonials',    { order: { column: 'sort_order' } });
  const { data: benefits,       loading: bL,  refetch: refetchBenefits }       = useFetch<any>('partnership_benefits',    { order: { column: 'sort_order' } });

  // ── Upserts
  const { upsert: upsertCommunity }     = useUpsert('featured_communities');
  const { upsert: upsertCommunityStat } = useUpsert('featured_community_stats');
  const { upsert: upsertWhyItem }       = useUpsert('partnership_why_items');
  const { upsert: upsertPackage }       = useUpsert('partnership_packages');
  const { upsert: upsertPartner }       = useUpsert('partners');
  const { upsert: upsertTest }          = useUpsert('partner_testimonials');
  const { upsert: upsertBenefit }       = useUpsert('partnership_benefits');

  // ── Deletes
  const { remove: removeCommunity }     = useDelete('featured_communities');
  const { remove: removeCommunityStat } = useDelete('featured_community_stats');
  const { remove: removeWhyItem }       = useDelete('partnership_why_items');
  const { remove: removePackage }       = useDelete('partnership_packages');
  const { remove: removePartner }       = useDelete('partners');
  const { remove: removeTest }          = useDelete('partner_testimonials');
  const { remove: removeBenefit }       = useDelete('partnership_benefits');

  // ── Local state
  const [communityList,     setCommunityList]     = useState<any[]>([]);
  const [communityStatList, setCommunityStatList] = useState<any[]>([]);
  const [whyItemList,       setWhyItemList]       = useState<any[]>([]);
  const [packageList,       setPackageList]       = useState<any[]>([]);
  const [partnerList,       setPartnerList]       = useState<any[]>([]);
  const [testList,          setTestList]          = useState<any[]>([]);
  const [benefitList,       setBenefitList]       = useState<any[]>([]);
  const [saving,            setSaving]            = useState(false);
  const [msg,               setMsg]               = useState('');

  useEffect(() => { setCommunityList([...communities]);         }, [communities]);
  useEffect(() => { setCommunityStatList([...communityStats]); }, [communityStats]);
  useEffect(() => { setWhyItemList([...whyItems]);              }, [whyItems]);
  useEffect(() => { setPackageList([...packages]);              }, [packages]);
  useEffect(() => { setPartnerList([...partners]);              }, [partners]);
  useEffect(() => { setTestList([...testimonials]);             }, [testimonials]);
  useEffect(() => { setBenefitList([...benefits]);              }, [benefits]);

  // ── Save all
  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      for (const c of communityList)     await upsertCommunity(c);
      // Strip temp keys before upserting stats
      for (const s of communityStatList) {
        const { _tempKey, ...clean } = s;
        await upsertCommunityStat(clean);
      }
      for (const w of whyItemList)   await upsertWhyItem(w);
      for (const p of packageList)   await upsertPackage(p);
      for (const p of partnerList)   await upsertPartner(p);
      for (const t of testList)      await upsertTest(t);
      for (const b of benefitList)   await upsertBenefit(b);
      await Promise.all([
        refetchCommunities(), refetchCommunityStats(), refetchWhyItems(),
        refetchPackages(), refetchPartners(), refetchTest(), refetchBenefits(),
      ]);
      setMsg('Saved!');
    } catch {
      setMsg('Error saving.');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (coL || csL || wL || pkL || pL || tL || bL) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Edit Partnerships" description="Manage communities, package tiers, partners, and testimonials.">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50"
        >
          <Save size={18} />{saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </PageHeader>

      {msg && (
        <div className={`mb-4 px-4 py-2 rounded-lg text-sm font-semibold ${msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {msg}
        </div>
      )}

      {/* ── Featured Communities (with inline stat chips) ── */}
      <SectionCard
        title="Featured Communities"
        description="Each community includes its own stat chips (icon, main text, subtext)."
      >
        <CommunityListEditor
          communities={communityList}
          stats={communityStatList}
          onUpdateCommunities={setCommunityList}
          onUpdateStats={setCommunityStatList}
          onDeleteCommunity={async (idx) => {
            if (communityList[idx].id) await removeCommunity(communityList[idx].id);
            setCommunityList(prev => prev.filter((_, i) => i !== idx));
          }}
          onDeleteStat={async (id) => {
            if (id) await removeCommunityStat(id);
          }}
        />
      </SectionCard>

      {/* ── Why Partner With Us ── */}
      <SectionCard
        title="Why Partner With Us"
        description="The bullet-point benefits shown in the 'Why partner with us?' section."
      >
        <ItemList
          items={whyItemList}
          fields={whyItemFields}
          onSave={(item, idx) => { const next = [...whyItemList]; next[idx] = item; setWhyItemList(next); }}
          onDelete={async (idx) => {
            if (whyItemList[idx].id) await removeWhyItem(whyItemList[idx].id);
            setWhyItemList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() => setWhyItemList(prev => [...prev, {
            icon_name: 'CheckCircle', text: '', is_visible: true, sort_order: prev.length + 1,
          }])}
          addLabel="Add Benefit"
          renderPreview={(w) => (
            <span className="text-sm font-semibold text-gray-800 truncate">{w.text || 'New Benefit'}</span>
          )}
        />
      </SectionCard>

      {/* ── Partnership Packages ── */}
      <SectionCard
        title="Partnership Packages"
        description="The Gold / Silver / Bronze tier cards. Each row is one tier."
      >
        <ItemList
          items={packageList}
          fields={packageFields}
          onSave={(item, idx) => { const next = [...packageList]; next[idx] = item; setPackageList(next); }}
          onDelete={async (idx) => {
            if (packageList[idx].id) await removePackage(packageList[idx].id);
            setPackageList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() => setPackageList(prev => [...prev, {
            tier_name: '', tier_emoji: '🏆', followers_count: 0,
            publicity_materials_count: 0, has_report: true,
            is_visible: true, sort_order: prev.length + 1,
          }])}
          addLabel="Add Package Tier"
          renderPreview={(p) => (
            <span className="text-sm font-semibold text-gray-800">
              {p.tier_emoji} {p.tier_name || 'New Tier'}
              {p.followers_count ? <span className="ml-2 text-gray-400 font-normal">· {p.followers_count} followers</span> : null}
            </span>
          )}
        />
      </SectionCard>

      {/* ── Current / Past Partners ── */}
      <SectionCard
        title="Partners"
        description="Toggle 'Past Partner' to move an org to the Past Supporters section."
      >
        <ItemList
          items={partnerList}
          fields={partnerFields}
          onSave={(item, idx) => { const next = [...partnerList]; next[idx] = item; setPartnerList(next); }}
          onDelete={async (idx) => {
            if (partnerList[idx].id) await removePartner(partnerList[idx].id);
            setPartnerList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() => setPartnerList(prev => [...prev, {
            name: '', is_visible: true, is_past: false, sort_order: prev.length + 1,
          }])}
          addLabel="Add Partner"
          renderPreview={(p) => (
            <span className="text-sm font-semibold text-gray-800">
              {p.name || 'New Partner'}
              {p.is_past && <span className="ml-2 text-xs text-gray-400 font-normal">Past</span>}
            </span>
          )}
        />
      </SectionCard>

      {/* ── Partner Testimonials ── */}
      <SectionCard title="Partner Testimonials">
        <ItemList
          items={testList}
          fields={testimonialFields}
          onSave={(item, idx) => { const next = [...testList]; next[idx] = item; setTestList(next); }}
          onDelete={async (idx) => {
            if (testList[idx].id) await removeTest(testList[idx].id);
            setTestList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() => setTestList(prev => [...prev, {
            name: '', title: '', quote: '', is_visible: true, sort_order: prev.length + 1,
          }])}
          addLabel="Add Testimonial"
        />
      </SectionCard>

      {/* ── Legacy Benefits ── */}
      <SectionCard
        title="Legacy Partnership Benefits"
        description="Old 'Why Partner With Us' cards (replaced by the bullet items above). Keep empty or delete."
      >
        <ItemList
          items={benefitList}
          fields={benefitFields}
          onSave={(item, idx) => { const next = [...benefitList]; next[idx] = item; setBenefitList(next); }}
          onDelete={async (idx) => {
            if (benefitList[idx].id) await removeBenefit(benefitList[idx].id);
            setBenefitList(prev => prev.filter((_, i) => i !== idx));
          }}
          onAdd={() => setBenefitList(prev => [...prev, {
            title: '', description: '', icon_name: 'Heart', is_visible: true, sort_order: prev.length + 1,
          }])}
          addLabel="Add Legacy Benefit"
          renderPreview={(b) => (
            <span className="text-sm font-semibold text-gray-800">{b.title || 'New Benefit'}</span>
          )}
        />
      </SectionCard>
    </div>
  );
}
