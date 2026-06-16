import { useState } from 'react';
import { Save, Plus, Trash2, GripVertical, Eye, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader, SectionCard } from '../components/AdminUI';
import { Link } from 'react-router-dom';

// ─── Mock data matching the structure of the public PrivacyPolicy page ───────

interface PolicySection {
  id: string;
  icon: string;
  title: string;
  body: string;
}

const INITIAL_META = {
  last_updated: 'May 27, 2026',
  effective_date: 'May 27, 2026',
  org_name: 'Habitat for Humanity Green Chapter DLSU',
  org_email: 'hfhgc@dlsu.edu.ph',
  org_address: 'De La Salle University, 2401 Taft Ave, Malate, Manila, 1004 Metro Manila',
  website_domain: 'hfhgc.org',
  intro_text:
    'This Privacy Policy describes how {org_name} ("we", "us", or "our") collects, uses, and shares information about you when you visit our website at {website_domain}. By using our website, you agree to the practices described in this policy.',
};

const INITIAL_SECTIONS: PolicySection[] = [
  {
    id: 's1',
    icon: 'Database',
    title: 'Information We Collect',
    body: `We collect information you voluntarily provide to us when you interact with our website, including when you submit our contact form or reach out to us directly. The types of information we may collect include:\n\n• Full name and email address submitted through our contact form\n• Subject and message content of your inquiry\n• Any other information you choose to include in your communications with us\n\nWe also automatically collect certain technical information when you visit our website, such as your browser type, operating system, referring URLs, and general geographic region (country/region level only). This data is collected through standard server logs and does not identify you personally.`,
  },
  {
    id: 's2',
    icon: 'Eye',
    title: 'How We Use Your Information',
    body: `{org_name} uses the information we collect solely to carry out our student organization's activities and to communicate with you. Specifically, we use your information to:\n\n• Respond to your inquiries, questions, and messages\n• Send updates about our projects, events, and volunteer opportunities — only when you have expressed interest\n• Improve the content and usability of our website\n• Comply with any applicable legal obligations\n• Protect the security and integrity of our website\n\nWe do NOT use your information for advertising, profiling, or any automated decision-making processes. We do not sell, trade, or rent your personal information to third parties.`,
  },
  {
    id: 's3',
    icon: 'UserCheck',
    title: 'Data Sharing & Disclosure',
    body: `We respect your privacy and will never sell or share your personal information with outside parties for marketing or commercial purposes. We may share your information only in the following limited circumstances:\n\n• With Habitat for Humanity Philippines (our national chapter) as required for organizational reporting\n• With De La Salle University administration for student organization compliance purposes\n• With trusted service providers (e.g., Supabase for secure data storage) who are bound by confidentiality agreements\n• When required by law, court order, or governmental authority\n• To protect the rights, property, or safety of our members, partners, or the public`,
  },
  {
    id: 's4',
    icon: 'Lock',
    title: 'Cookies & Tracking Technologies',
    body: `Our website uses minimal cookies and local storage technologies strictly necessary for the website to function. We do NOT use advertising cookies, cross-site tracking, or behavioral analytics platforms.\n\nThe limited technologies we use include:\n\n• Session tokens to keep admin users authenticated during their session\n• Local/session storage to remember your preferences (e.g., "Remember me" on admin login)\n• Standard browser caching to improve page load performance\n\nYou may configure your browser to block or delete cookies; however, some website features (such as the admin panel) may not function correctly without them.`,
  },
  {
    id: 's5',
    icon: 'Shield',
    title: 'Data Security',
    body: `We take the security of your personal information seriously. We implement industry-standard measures to protect your data, including:\n\n• Encrypted data transmission via HTTPS/TLS on all pages\n• Row-level security policies enforced at the database layer\n• Admin access restricted to authenticated and authorized users only\n• Rate limiting on our contact form to prevent spam and abuse\n• Cloudflare Turnstile CAPTCHA to protect form submissions\n\nWhile we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security, but we commit to notifying affected users promptly in the event of a data breach.`,
  },
  {
    id: 's6',
    icon: 'Trash2',
    title: 'Data Retention',
    body: `We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by applicable law.\n\n• Contact form submissions are retained for up to 12 months for organizational records\n• Admin session tokens expire automatically after 3 days of inactivity\n• Website analytics data (non-personal) may be retained indefinitely for trend analysis\n\nYou may request deletion of your personal data at any time by contacting us at the address listed below.`,
  },
  {
    id: 's7',
    icon: 'Bell',
    title: 'Your Rights',
    body: `You have the following rights with respect to your personal information held by us:\n\n• Access — request a copy of the personal data we hold about you\n• Correction — request that we correct inaccurate or incomplete information\n• Deletion — request that we delete your personal information from our records\n• Objection — object to our processing of your personal data\n• Portability — request your data in a structured, machine-readable format\n\nTo exercise any of these rights, please contact us at {org_email}. We will respond to your request within 30 days.`,
  },
  {
    id: 's8',
    icon: 'RefreshCw',
    title: 'Changes to This Policy',
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or the services we offer. When we make material changes, we will update the "Last Updated" date at the top of this page.\n\nWe encourage you to review this page periodically to stay informed about how we protect your information. Your continued use of our website after any changes constitutes your acceptance of the updated policy.`,
  },
  {
    id: 's9',
    icon: 'Mail',
    title: 'Contact Us',
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us:\n\n{org_name}\n{org_email}\n{org_address}\n\nYou may also use our Contact Page to send us a message directly.`,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function MetaField({
  label,
  value,
  onChange,
  hint,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  type?: 'text' | 'textarea';
}) {
  const base =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent transition-colors';
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className={`${base} resize-none`}
        />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className={base} />
      )}
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function SectionEditor({
  section,
  index,
  total,
  onChange,
  onDelete,
  onMove,
}: {
  section: PolicySection;
  index: number;
  total: number;
  onChange: (s: PolicySection) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const [open, setOpen] = useState(index < 2);
  const base =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent transition-colors';

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Row header */}
      <div
        className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 cursor-pointer select-none hover:bg-gray-50/80 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {/* Drag handle (cosmetic) */}
        <GripVertical size={16} className="text-gray-300 flex-shrink-0 cursor-grab" />

        {/* Index badge */}
        <span className="w-6 h-6 flex-shrink-0 rounded-full bg-[var(--color-green-5)] text-white text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>

        <span className="flex-1 font-heading font-semibold text-gray-900 truncate">
          {section.title.trim() || 'Untitled section'}
        </span>

        {/* Move up / down */}
        <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"
            title="Move up"
          >
            <ChevronUp size={15} />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"
            title="Move down"
          >
            <ChevronDown size={15} />
          </button>
        </div>

        {/* Delete */}
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors flex-shrink-0"
          title="Delete section"
        >
          <Trash2 size={15} />
        </button>

        {/* Collapse indicator */}
        {open ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
      </div>

      {/* Body */}
      {open && (
        <div className="px-5 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Section Title</label>
              <input
                type="text"
                value={section.title}
                onChange={e => onChange({ ...section, title: e.target.value })}
                className={base}
                placeholder="e.g. Information We Collect"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Icon Name
                <span className="ml-1.5 text-xs font-normal text-gray-400">(Lucide icon)</span>
              </label>
              <input
                type="text"
                value={section.icon}
                onChange={e => onChange({ ...section, icon: e.target.value })}
                className={base}
                placeholder="e.g. Shield, Lock, Eye"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Body Content
              <span className="ml-1.5 text-xs font-normal text-gray-400">
                — Use bullet points starting with • and blank lines to separate paragraphs. Variables: {'{org_name}'}, {'{org_email}'}, {'{org_address}'}, {'{website_domain}'}
              </span>
            </label>
            <textarea
              value={section.body}
              onChange={e => onChange({ ...section, body: e.target.value })}
              rows={10}
              className={`${base} resize-y font-mono text-[13px] leading-relaxed`}
              placeholder="Enter the body content for this section…"
            />
          </div>

          {/* Preview chip */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-green-3)]" />
            {section.body.split('\n').filter(l => l.trim()).length} non-empty line(s)
            &nbsp;·&nbsp;
            {section.body.replace(/\s+/g, ' ').trim().split(' ').length} words
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function AdminEditPrivacyPolicy() {
  const [meta, setMeta] = useState({ ...INITIAL_META });
  const [sections, setSections] = useState<PolicySection[]>(INITIAL_SECTIONS);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const setMetaField = (key: keyof typeof INITIAL_META) => (val: string) =>
    setMeta(prev => ({ ...prev, [key]: val }));

  const handleSectionChange = (index: number, updated: PolicySection) => {
    setSections(prev => prev.map((s, i) => (i === index ? updated : s)));
  };

  const handleDelete = (index: number) => {
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, dir: -1 | 1) => {
    setSections(prev => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleAdd = () => {
    setSections(prev => [
      ...prev,
      {
        id: `s_${Date.now()}`,
        icon: 'FileText',
        title: 'New Section',
        body: '',
      },
    ]);
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    // Simulated save delay (no DB integration yet)
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setMsg('Changes saved! (mock — no database connected yet)');
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 pb-16">
      <PageHeader
        title="Edit Privacy Policy"
        description="Manage the policy metadata (dates, contact info) and all body sections shown on the /policy page."
      >
        {/* Preview link */}
        <Link
          to="/policy"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold text-sm shadow-sm hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)] transition-colors"
        >
          <Eye size={16} />
          Preview page
        </Link>

        {/* Save button */}
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

      {/* Status message */}
      {msg && (
        <div
          role="status"
          className={
            'mb-6 px-4 py-3 rounded-xl text-sm font-semibold border ' +
            (msg.toLowerCase().includes('error')
              ? 'bg-red-50 text-red-800 border-red-100'
              : 'bg-green-50 text-green-800 border-green-100')
          }
        >
          {msg}
        </div>
      )}

      {/* ── Mock-data notice ── */}
      <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <Shield size={18} className="flex-shrink-0 mt-0.5 text-amber-500" />
        <p>
          <strong>Mock data only.</strong> This editor is not yet connected to a database.
          Changes will persist only for the current browser session.
        </p>
      </div>

      {/* ── 1. Page Metadata ── */}
      <SectionCard
        title="Page metadata"
        description="Dates and organisation contact details used throughout the policy."
        collapsible={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <MetaField
            label="Last Updated"
            value={meta.last_updated}
            onChange={setMetaField('last_updated')}
            hint="Displayed at the top of the policy page."
          />
          <MetaField
            label="Effective Date"
            value={meta.effective_date}
            onChange={setMetaField('effective_date')}
          />
          <MetaField
            label="Organisation Name"
            value={meta.org_name}
            onChange={setMetaField('org_name')}
          />
          <MetaField
            label="Contact Email"
            value={meta.org_email}
            onChange={setMetaField('org_email')}
            hint="Used in the intro and 'Your Rights' section."
          />
          <MetaField
            label="Website Domain"
            value={meta.website_domain}
            onChange={setMetaField('website_domain')}
          />
          <MetaField
            label="Physical Address"
            value={meta.org_address}
            onChange={setMetaField('org_address')}
            hint="Shown in the contact block at the bottom."
          />
        </div>
      </SectionCard>

      {/* ── 2. Introduction ── */}
      <SectionCard
        title="Introduction paragraph"
        description="The lead text that appears immediately below the hero, before the table of contents."
        collapsible={false}
      >
        <MetaField
          label="Intro Text"
          value={meta.intro_text}
          onChange={setMetaField('intro_text')}
          type="textarea"
          hint="Supports {org_name} and {website_domain} placeholders."
        />
      </SectionCard>

      {/* ── 3. Policy Sections ── */}
      <SectionCard
        title="Policy sections"
        description={`${sections.length} section${sections.length !== 1 ? 's' : ''} — each maps to a numbered block on the public page. Re-order with ↑ ↓, expand to edit content.`}
        collapsible={false}
        actions={
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-green-5)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-green-4)] transition-colors"
          >
            <Plus size={15} />
            Add section
          </button>
        }
      >
        {sections.length === 0 && (
          <p className="text-gray-400 text-sm py-6 text-center">No sections yet. Click "Add section" to get started.</p>
        )}
        <div className="space-y-3">
          {sections.map((s, i) => (
            <SectionEditor
              key={s.id}
              section={s}
              index={i}
              total={sections.length}
              onChange={updated => handleSectionChange(i, updated)}
              onDelete={() => handleDelete(i)}
              onMove={dir => handleMove(i, dir)}
            />
          ))}
        </div>

        {sections.length > 0 && (
          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-semibold text-gray-400 hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)] transition-colors"
          >
            <Plus size={16} />
            Add another section
          </button>
        )}
      </SectionCard>

      {/* ── Bottom save bar ── */}
      <div className="sticky bottom-4 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-green-5)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving…' : 'Save all changes'}
        </button>
      </div>
    </div>
  );
}
