import { useState, useEffect, ReactNode } from 'react';
import { Plus, Pencil, Trash2, Save, X, GripVertical, ChevronDown, ChevronUp, ImageIcon } from 'lucide-react';

/* ─── Shared Types ─── */
export interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'url' | 'email' | 'toggle' | 'image' | 'richtext' | 'tags';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  half?: boolean;         // render at half-width in a grid
  readOnly?: boolean;
  rows?: number;          // textarea rows
}

/* ─── Page Header ─── */
export function PageHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-[var(--color-green-5)]">{title}</h1>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>
        {children && <div className="flex items-center gap-3">{children}</div>}
      </div>
    </div>
  );
}

/* ─── Section Card ─── */
export function SectionCard({ title, description, children, actions }: {
  title: string; description?: string; children: ReactNode; actions?: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
      <div
        className="flex items-center justify-between px-6 py-4 border-b border-gray-100 cursor-pointer select-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div>
          <h2 className="text-lg font-heading font-bold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions && <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>{actions}</div>}
          {collapsed ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
        </div>
      </div>
      {!collapsed && <div className="px-6 py-5">{children}</div>}
    </div>
  );
}

/* ─── Generic Form Field ─── */
export function FormField({ field, value, onChange }: {
  field: FieldDef;
  value: any;
  onChange: (key: string, val: any) => void;
}) {
  const base = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green-5)] focus:border-transparent transition-colors';

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}{field.required && ' *'}</label>
        <textarea
          value={value ?? ''}
          onChange={e => onChange(field.key, e.target.value)}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          readOnly={field.readOnly}
          className={`${base} resize-none ${field.readOnly ? 'bg-gray-50' : ''}`}
        />
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}{field.required && ' *'}</label>
        <select value={value ?? ''} onChange={e => onChange(field.key, e.target.value)} className={base}>
          <option value="">Select...</option>
          {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }

  if (field.type === 'toggle') {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(field.key, !value)}
          className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-[var(--color-green-5)]' : 'bg-gray-300'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : ''}`} />
        </button>
        <label className="text-sm font-semibold text-gray-700">{field.label}</label>
      </div>
    );
  }

  if (field.type === 'image') {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
        <input
          type="url"
          value={value ?? ''}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder || 'Image URL (Supabase Storage)'}
          className={base}
        />
        {value && (
          <div className="mt-2">
            <img src={value} alt="Preview" className="h-24 w-auto rounded-lg object-cover border border-gray-200" />
          </div>
        )}
      </div>
    );
  }

  if (field.type === 'tags') {
    const tags: string[] = Array.isArray(value) ? value : (value || '').split(',').map((t: string) => t.trim()).filter(Boolean);
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
        <input
          type="text"
          value={tags.join(', ')}
          onChange={e => onChange(field.key, e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
          placeholder={field.placeholder || 'tag1, tag2, tag3'}
          className={base}
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((t, i) => (
              <span key={i} className="px-2 py-0.5 bg-[var(--color-green-1)] text-[var(--color-green-5)] text-xs font-semibold rounded-full">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default: text / number / date / url / email
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}{field.required && ' *'}</label>
      <input
        type={field.type || 'text'}
        value={value ?? ''}
        onChange={e => onChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={field.placeholder}
        readOnly={field.readOnly}
        className={`${base} ${field.readOnly ? 'bg-gray-50' : ''}`}
      />
    </div>
  );
}

/* ─── Dynamic Form (renders a set of FieldDefs) ─── */
export function DynamicForm({ fields, data, onChange }: {
  fields: FieldDef[];
  data: Record<string, any>;
  onChange: (key: string, val: any) => void;
}) {
  // Build rows: half-width fields are grouped in pairs
  const rows: FieldDef[][] = [];
  let i = 0;
  while (i < fields.length) {
    if (fields[i].half && i + 1 < fields.length && fields[i + 1].half) {
      rows.push([fields[i], fields[i + 1]]);
      i += 2;
    } else {
      rows.push([fields[i]]);
      i++;
    }
  }

  return (
    <div className="space-y-4">
      {rows.map((row, idx) =>
        row.length === 2 ? (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {row.map(f => <FormField key={f.key} field={f} value={data[f.key]} onChange={onChange} />)}
          </div>
        ) : (
          <FormField key={row[0].key} field={row[0]} value={data[row[0].key]} onChange={onChange} />
        )
      )}
    </div>
  );
}

/* ─── Sortable List with Add / Edit / Delete ─── */
export function ItemList<T extends Record<string, any>>({
  items,
  fields,
  onSave,
  onDelete,
  onAdd,
  renderPreview,
  addLabel = 'Add Item',
  emptyLabel = 'No items yet.',
}: {
  items: T[];
  fields: FieldDef[];
  onSave: (item: T, index: number) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
  renderPreview?: (item: T) => ReactNode;
  addLabel?: string;
  emptyLabel?: string;
}) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState<Record<string, any>>({});
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const startEdit = (idx: number) => {
    setEditData({ ...items[idx] });
    setEditingIdx(idx);
    setExpandedIdx(idx);
  };

  const cancelEdit = () => {
    setEditingIdx(null);
    setEditData({});
  };

  const saveEdit = (idx: number) => {
    onSave(editData as T, idx);
    setEditingIdx(null);
    setEditData({});
  };

  const handleChange = (key: string, val: any) => {
    setEditData(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div>
      {items.length === 0 && (
        <p className="text-gray-400 text-sm italic py-4">{emptyLabel}</p>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Header row */}
            <div
              className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <GripVertical size={16} className="text-gray-300 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                {renderPreview ? renderPreview(item) : (
                  <span className="text-sm font-semibold text-gray-800 truncate block">
                    {item.title || item.name || item.question || item.key || `Item ${idx + 1}`}
                  </span>
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
                  onClick={e => { e.stopPropagation(); if (confirm('Delete this item?')) onDelete(idx); }}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
                {expandedIdx === idx ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </div>
            </div>

            {/* Expanded form */}
            {expandedIdx === idx && (
              <div className="px-4 py-4 border-t border-gray-100">
                {editingIdx === idx ? (
                  <>
                    <DynamicForm fields={fields} data={editData} onChange={handleChange} />
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <X size={14} className="inline mr-1" />Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(idx)}
                        className="px-4 py-2 text-sm font-semibold text-white bg-[var(--color-green-5)] rounded-lg hover:bg-[var(--color-green-4)] transition-colors"
                      >
                        <Save size={14} className="inline mr-1" />Save
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    {fields.map(f => (
                      <div key={f.key} className="flex gap-2 text-sm">
                        <span className="font-semibold text-gray-500 min-w-[120px]">{f.label}:</span>
                        <span className="text-gray-800">
                          {f.type === 'toggle'
                            ? (item[f.key] ? '✅ Yes' : '❌ No')
                            : f.type === 'image' && item[f.key]
                              ? <img src={item[f.key]} alt="" className="h-12 w-auto rounded" />
                              : String(item[f.key] ?? '—')}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2">
                      <button
                        onClick={() => startEdit(idx)}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Pencil size={12} className="inline mr-1" />Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className="mt-4 flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--color-green-5)] border-2 border-dashed border-[var(--color-green-3)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors w-full justify-center"
      >
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
}

/* ─── Status Badge ─── */
export function StatusBadge({ active, labelOn = 'Visible', labelOff = 'Hidden' }: {
  active: boolean; labelOn?: string; labelOff?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full ${
      active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-gray-400'}`} />
      {active ? labelOn : labelOff}
    </span>
  );
}
