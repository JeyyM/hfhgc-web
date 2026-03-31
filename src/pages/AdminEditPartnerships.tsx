import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { PageHeader, SectionCard, ItemList, FieldDef } from '../components/AdminUI';
import { useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const partnerFields: FieldDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
  { key: 'image_url', label: 'Logo', type: 'url' },
  { key: 'website', label: 'Website', type: 'url' },
  { key: 'since_year', label: 'Partner Since (Year)', type: 'number', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

const testimonialFields: FieldDef[] = [
  { key: 'name', label: 'Name', half: true },
  { key: 'title', label: 'Title/Role', half: true },
  { key: 'quote', label: 'Quote', type: 'textarea', rows: 3 },
  { key: 'image_url', label: 'Image', type: 'gallery' },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

const benefitFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { key: 'icon_name', label: 'Icon', half: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number', half: true },
  { key: 'is_visible', label: 'Visible', type: 'toggle', half: true },
];

export default function AdminEditPartnerships() {
  const { data: partners, loading: pL, refetch: refetchPartners } = useFetch<any>('partners', { order: { column: 'sort_order' } });
  const { data: testimonials, loading: tL, refetch: refetchTest } = useFetch<any>('partner_testimonials', { order: { column: 'sort_order' } });
  const { data: benefits, loading: bL, refetch: refetchBenefits } = useFetch<any>('partnership_benefits', { order: { column: 'sort_order' } });
  const { upsert: upsertPartner } = useUpsert('partners');
  const { upsert: upsertTest } = useUpsert('partner_testimonials');
  const { upsert: upsertBenefit } = useUpsert('partnership_benefits');
  const { remove: removePartner } = useDelete('partners');
  const { remove: removeTest } = useDelete('partner_testimonials');
  const { remove: removeBenefit } = useDelete('partnership_benefits');

  const [partnerList, setPartnerList] = useState<any[]>([]);
  const [testList, setTestList] = useState<any[]>([]);
  const [benefitList, setBenefitList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { setPartnerList([...partners]); }, [partners]);
  useEffect(() => { setTestList([...testimonials]); }, [testimonials]);
  useEffect(() => { setBenefitList([...benefits]); }, [benefits]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      for (const p of partnerList) await upsertPartner(p);
      for (const t of testList) await upsertTest(t);
      for (const b of benefitList) await upsertBenefit(b);
      await Promise.all([refetchPartners(), refetchTest(), refetchBenefits()]);
      setMsg('Saved!');
    } catch { setMsg('Error saving.'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (pL || tL || bL) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Edit Partnerships" description="Manage partners and their testimonials.">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50">
          <Save size={18} />{saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </PageHeader>
      {msg && <div className={'mb-4 px-4 py-2 rounded-lg text-sm font-semibold ' + (msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>{msg}</div>}

      <SectionCard title="Partners">
        <ItemList items={partnerList} fields={partnerFields}
          onSave={(item, idx) => { const next = [...partnerList]; next[idx] = item; setPartnerList(next); }}
          onDelete={async (idx) => { if (partnerList[idx].id) await removePartner(partnerList[idx].id); setPartnerList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setPartnerList(prev => [...prev, { name: '', is_visible: true, sort_order: prev.length + 1 }])}
          addLabel="Add Partner"
          renderPreview={(p) => <span className="text-sm font-semibold text-gray-800">{p.name || 'New Partner'}</span>} />
      </SectionCard>

      <SectionCard title="Partnership Benefits (Why Partner With Us)" description="Benefits displayed in the 'Why Partner With Us' section">
        <ItemList items={benefitList} fields={benefitFields}
          onSave={(item, idx) => { const next = [...benefitList]; next[idx] = item; setBenefitList(next); }}
          onDelete={async (idx) => { if (benefitList[idx].id) await removeBenefit(benefitList[idx].id); setBenefitList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setBenefitList(prev => [...prev, { title: '', description: '', icon_name: 'Heart', is_visible: true, sort_order: prev.length + 1 }])}
          addLabel="Add Benefit"
          renderPreview={(b) => <span className="text-sm font-semibold text-gray-800">{b.title || 'New Benefit'}</span>} />
      </SectionCard>

      <SectionCard title="Partner Testimonials">
        <ItemList items={testList} fields={testimonialFields}
          onSave={(item, idx) => { const next = [...testList]; next[idx] = item; setTestList(next); }}
          onDelete={async (idx) => { if (testList[idx].id) await removeTest(testList[idx].id); setTestList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setTestList(prev => [...prev, { name: '', title: '', quote: '', is_visible: true, sort_order: prev.length + 1 }])}
          addLabel="Add Testimonial" />
      </SectionCard>
    </div>
  );
}
