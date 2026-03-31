import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { PageHeader, SectionCard, ItemList, FieldDef } from '../components/AdminUI';
import { useFetch, useUpsert, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

const postFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug', placeholder: 'auto-generated-from-title' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2 },
  { key: 'content', label: 'Content (HTML)', type: 'textarea', rows: 8 },
  { key: 'author_name', label: 'Author Name', half: true },
  { key: 'author_role', label: 'Author Role', half: true },
  { key: 'category', label: 'Category', type: 'select', options: ['News', 'Events', 'Builds', 'Community', 'Impact Stories', 'Announcements'] },
  { key: 'tags', label: 'Tags', type: 'tags' },
  { key: 'image_url', label: 'Image URL', type: 'url' },
  { key: 'read_time', label: 'Read Time', placeholder: '5 min read', half: true },
  { key: 'published_at', label: 'Publish Date', type: 'date', half: true },
  { key: 'is_featured', label: 'Featured', type: 'toggle', half: true },
  { key: 'is_published', label: 'Published', type: 'toggle', half: true },
];

export default function AdminEditBlog() {
  const { data: posts, loading, refetch } = useFetch<any>('blog_posts', { order: { column: 'published_at', ascending: false } });
  const { upsert } = useUpsert('blog_posts');
  const { remove } = useDelete('blog_posts');

  const [list, setList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { setList([...posts]); }, [posts]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      for (const p of list) {
        if (!p.slug && p.title) p.slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        await upsert(p);
      }
      await refetch();
      setMsg('Saved!');
    } catch { setMsg('Error saving.'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Edit Blog" description="Manage blog posts.">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50">
          <Save size={18} />{saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </PageHeader>
      {msg && <div className={'mb-4 px-4 py-2 rounded-lg text-sm font-semibold ' + (msg.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700')}>{msg}</div>}

      <SectionCard title="Blog Posts">
        <ItemList items={list} fields={postFields}
          onSave={(item, idx) => { const next = [...list]; next[idx] = item; setList(next); }}
          onDelete={async (idx) => { if (list[idx].id) await remove(list[idx].id); setList(prev => prev.filter((_, i) => i !== idx)); }}
          onAdd={() => setList(prev => [...prev, { title: '', slug: '', excerpt: '', content: '', author_name: '', category: 'News', tags: [], is_published: false, is_featured: false, published_at: new Date().toISOString().split('T')[0] }])}
          addLabel="Add Blog Post"
          renderPreview={(p) => <span className="text-sm font-semibold text-gray-800">{p.title || 'New Post'} <span className="text-xs text-gray-500">{p.is_published ? '(Published)' : '(Draft)'}</span></span>} />
      </SectionCard>
    </div>
  );
}
