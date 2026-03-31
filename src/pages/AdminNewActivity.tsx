import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TipTapLink from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  User, 
  Tag,
  Save,
  Eye,
  ArrowLeft,
  Upload,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

export default function AdminNewActivity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author: 'Admin User',
    date: new Date().toISOString().split('T')[0],
    category: 'Community Build',
    tags: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published'
  });

  const [showPreview, setShowPreview] = useState(false);

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TipTapLink.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Start writing your project story here...</p>',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('hfhgc_admin_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Auto-generate slug from title
  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, slug }));
  }, [formData.title]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Get final HTML content from editor
    const finalContent = editor?.getHTML() || formData.content;
    
    // Mock save - in real implementation, this would call an API
    console.log('Saving activity:', { ...formData, content: finalContent });
    
    // Simulate save delay
    setTimeout(() => {
      alert(`Project ${formData.status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      navigate('/admin/blog');
    }, 500);
  };

  const addImageToEditor = () => {
    const url = prompt('Enter image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const categories = [
    'Community Build',
    'Fundraiser',
    'Workshop',
    'Training',
    'Volunteer Event',
    'Partnership',
    'Advocacy'
  ];



  return (
    <div className="min-h-screen bg-[var(--color-green-1)]">
      {/* Header */}
      <header className="bg-white border-b-2 border-[var(--color-green-3)] scrapbook-shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/blog"
                className="p-2 hover:bg-[var(--color-green-1)] rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-heading font-bold text-[var(--color-green-5)]">
                Create New Project
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-green-5)] text-[var(--color-green-5)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors"
              >
                <Eye size={18} />
                <span className="hidden sm:inline">Preview</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 scrapbook-border scrapbook-shadow"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                placeholder="e.g., Project Hope 1, March Community Build"
              />
            </div>

            {/* Slug (Auto-generated) */}
            <div>
              <label htmlFor="slug" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                URL Slug (Auto-generated)
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                readOnly
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <User className="inline mr-1" size={16} />
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <Calendar className="inline mr-1" size={16} />
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <Tag className="inline mr-1" size={16} />
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                  placeholder="volunteer, housing, community"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label htmlFor="featuredImage" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                <ImageIcon className="inline mr-1" size={16} />
                Featured Image URL
              </label>
              <input
                type="url"
                id="featuredImage"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                placeholder="https://example.com/image.jpg"
              />
              {formData.featuredImage && (
                <div className="mt-4">
                  <img 
                    src={formData.featuredImage} 
                    alt="Featured preview" 
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                Excerpt / Summary
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors resize-none"
                placeholder="A brief summary that will appear in listings..."
              />
            </div>

            {/* Rich Text Content Editor */}
            <div>
              <label className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                Content *
              </label>
              
              {/* Editor Toolbar */}
              {editor && (
                <div className="border-2 border-gray-200 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                  {/* Text Formatting */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Bold"
                  >
                    <Bold size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Italic"
                  >
                    <Italic size={18} />
                  </button>
                  
                  <div className="w-px h-8 bg-gray-300 mx-1"></div>
                  
                  {/* Headings */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Heading 1"
                  >
                    <Heading1 size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Heading 2"
                  >
                    <Heading2 size={18} />
                  </button>
                  
                  <div className="w-px h-8 bg-gray-300 mx-1"></div>
                  
                  {/* Lists */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Bullet List"
                  >
                    <List size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Numbered List"
                  >
                    <ListOrdered size={18} />
                  </button>
                  
                  <div className="w-px h-8 bg-gray-300 mx-1"></div>
                  
                  {/* Alignment */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Align Left"
                  >
                    <AlignLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Align Center"
                  >
                    <AlignCenter size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Align Right"
                  >
                    <AlignRight size={18} />
                  </button>
                  
                  <div className="w-px h-8 bg-gray-300 mx-1"></div>
                  
                  {/* Quote */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('blockquote') ? 'bg-[var(--color-green-2)]' : ''}`}
                    title="Quote"
                  >
                    <Quote size={18} />
                  </button>
                  
                  <div className="w-px h-8 bg-gray-300 mx-1"></div>
                  
                  {/* Image */}
                  <button
                    type="button"
                    onClick={addImageToEditor}
                    className="p-2 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                    title="Insert Image"
                  >
                    <ImageIcon size={18} />
                    <span className="text-xs hidden sm:inline">Image</span>
                  </button>
                  
                  <div className="w-px h-8 bg-gray-300 mx-1"></div>
                  
                  {/* Undo/Redo */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30"
                    title="Undo"
                  >
                    <Undo size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30"
                    title="Redo"
                  >
                    <Redo size={18} />
                  </button>
                </div>
              )}
              
              {/* Editor Content Area */}
              <div className="border-2 border-t-0 border-gray-200 rounded-b-lg">
                <EditorContent 
                  editor={editor} 
                  className="prose max-w-none p-4 min-h-[400px] focus:outline-none"
                />
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Use the toolbar to format text, add headings, lists, quotes, and images
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200">
              <Link
                to="/admin/blog"
                className="px-6 py-3 text-gray-600 hover:text-[var(--color-text-main)] transition-colors"
              >
                Cancel
              </Link>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  onClick={() => setFormData({ ...formData, status: 'draft' })}
                  className="px-6 py-3 border-2 border-[var(--color-green-5)] text-[var(--color-green-5)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors font-bold"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  onClick={() => setFormData({ ...formData, status: 'published' })}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--color-green-5)] text-white rounded-lg hover:bg-[var(--color-green-4)] transition-colors font-bold"
                >
                  <Save size={18} />
                  Publish
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
