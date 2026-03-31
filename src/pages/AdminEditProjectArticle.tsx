import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Calendar, Tag, User } from 'lucide-react';
import { useFetch, useUpsert } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import RichTextEditor from '../components/RichTextEditor';
import ImageGalleryModal from '../components/ImageGallery';

export default function AdminEditProjectArticle() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const { data: projects, loading } = useFetch<any>('projects', { 
    eq: isNew ? undefined : [['id', id]],
    cache: false  // Don't cache in admin panel
  });
  const { upsert, loading: saving } = useUpsert('projects');

  const [showCoverGallery, setShowCoverGallery] = useState(false);
  const [msg, setMsg] = useState('');
  const [project, setProject] = useState<any>({
    title: '',
    excerpt: '',
    category: 'Build',
    status: 'upcoming',
    cover_image_url: '',
    cover_image_caption: '',
    content_json: { type: 'doc', content: [] },
    author: '',
    published_at: new Date().toISOString().split('T')[0],
    tags: [],
    date_display: '',
    time_display: '',
    location: '',
    participants: '',
    spots_left: null,
    registration_link: '',
    is_visible: true,
    sort_order: 0,
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!isNew && projects && projects.length > 0) {
      const p = projects[0];
      console.log('Loaded project from database:', p);
      console.log('Tags:', p.tags);
      console.log('Content JSON:', p.content_json);
      setProject({
        ...p,
        tags: p.tags || [],
        content_json: p.content_json || { type: 'doc', content: [] },
        published_at: p.published_at ? new Date(p.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
    }
  }, [projects, isNew]);

  const handleSave = async () => {
    setMsg('');
    
    // Validation
    if (!project.title.trim()) {
      setMsg('Error: Title is required');
      return;
    }
    if (!project.category.trim()) {
      setMsg('Error: Category is required');
      return;
    }

    try {
      const dataToSave = {
        ...project,
        published_at: project.published_at ? new Date(project.published_at).toISOString() : null,
        // Ensure tags is an array
        tags: Array.isArray(project.tags) ? project.tags : [],
        // Ensure content_json is valid JSONB
        content_json: project.content_json || { type: 'doc', content: [] },
      };

      console.log('Saving project data:', dataToSave);

      const result = await upsert(dataToSave);
      if (result) {
        setMsg('Saved successfully!');
        console.log('Save result:', result);
        if (isNew) {
          // Navigate to the edit page for the new project
          setTimeout(() => navigate(`/admin/projects/edit/${result.id}`), 1000);
        }
      } else {
        setMsg('Error: Failed to save project');
      }
    } catch (error: any) {
      console.error('Save error:', error);
      setMsg(`Error: ${error.message || 'Failed to save'}`);
    }

    setTimeout(() => setMsg(''), 3000);
  };

  const addTag = () => {
    if (tagInput.trim() && !project.tags.includes(tagInput.trim())) {
      setProject({ ...project, tags: [...project.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setProject({ ...project, tags: project.tags.filter((t: string) => t !== tag) });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/projects')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Back to Projects"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              {isNew ? 'Create New Project' : 'Edit Project'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isNew ? 'Create a new project article with rich content' : 'Edit project article content'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </div>

      {/* Status Message */}
      {msg && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm font-semibold ${
            msg.includes('Error')
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}
        >
          {msg}
        </div>
      )}

      {/* Main Form */}
      <div className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
          
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              placeholder="Enter project title"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
            />
          </div>

          {/* Excerpt */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Excerpt / Summary
            </label>
            <textarea
              value={project.excerpt}
              onChange={(e) => setProject({ ...project, excerpt: e.target.value })}
              placeholder="Short summary for project listings"
              rows={3}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors resize-none"
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={project.category}
                onChange={(e) => setProject({ ...project, category: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
              >
                <option value="Build">Build</option>
                <option value="Workshop">Workshop</option>
                <option value="Fundraiser">Fundraiser</option>
                <option value="Community Service">Community Service</option>
                <option value="Advocacy">Advocacy</option>
                <option value="Training">Training</option>
                <option value="Outreach">Outreach</option>
                <option value="Partnership">Partnership</option>
                <option value="Volunteer Drive">Volunteer Drive</option>
                <option value="Awareness Campaign">Awareness Campaign</option>
                <option value="General Assembly">General Assembly</option>
                <option value="Seminar">Seminar</option>
                <option value="Team Building">Team Building</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
              <select
                value={project.status}
                onChange={(e) => setProject({ ...project, status: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} /> Author
              </label>
              <input
                type="text"
                value={project.author}
                onChange={(e) => setProject({ ...project, author: e.target.value })}
                placeholder="Author name"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
              />
            </div>

            {/* Published Date */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} /> Published Date
              </label>
              <input
                type="date"
                value={project.published_at}
                onChange={(e) => setProject({ ...project, published_at: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
              />
            </div>
          </div>

          {/* Event Information Section */}
          <div className="mb-4 pt-4 border-t-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Event Information</h3>
            <p className="text-sm text-gray-600 mb-4">Optional details for events (leave blank if not applicable)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Date Display */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Date</label>
                <input
                  type="text"
                  value={project.date_display}
                  onChange={(e) => setProject({ ...project, date_display: e.target.value })}
                  placeholder="e.g., March 15-16, 2026"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                />
              </div>

              {/* Time Display */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Time</label>
                <input
                  type="text"
                  value={project.time_display}
                  onChange={(e) => setProject({ ...project, time_display: e.target.value })}
                  placeholder="e.g., 8:00 AM - 5:00 PM"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Event Location</label>
              <input
                type="text"
                value={project.location}
                onChange={(e) => setProject({ ...project, location: e.target.value })}
                placeholder="Event location"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Registration Link</label>
              <input
                type="url"
                value={project.registration_link}
                onChange={(e) => setProject({ ...project, registration_link: e.target.value })}
                placeholder="https://forms.google.com/..."
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4 pt-4 border-t-2 border-gray-100">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Tag size={16} /> Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add a tag and press Enter"
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-[var(--color-green-5)] text-white rounded-lg hover:bg-[var(--color-green-4)] transition-colors"
              >
                Add
              </button>
            </div>
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-green-1)] text-[var(--color-green-5)] rounded-full text-sm font-semibold"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-[var(--color-green-4)]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Display Settings */}
          <div className="mb-4 pt-4 border-t-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Display Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sort Order */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sort Order</label>
                <input
                  type="number"
                  value={project.sort_order}
                  onChange={(e) => setProject({ ...project, sort_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              {/* Visibility Toggle */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Visibility</label>
                <div className="flex items-center gap-3 h-[42px]">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={project.is_visible}
                      onChange={(e) => setProject({ ...project, is_visible: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-green-5)]"></div>
                  </label>
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Eye size={16} /> Visible to Public
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image Card */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cover Image</h2>
          
          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
            {project.cover_image_url && (
              <img
                src={project.cover_image_url}
                alt="Cover"
                className="w-full max-w-md h-48 object-cover rounded-lg mb-2 border-2 border-gray-200"
              />
            )}
            <button
              type="button"
              onClick={() => setShowCoverGallery(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              {project.cover_image_url ? 'Change Cover Image' : 'Select Cover Image'}
            </button>
          </div>

          {/* Cover Image Caption */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Cover Image Caption
            </label>
            <input
              type="text"
              value={project.cover_image_caption}
              onChange={(e) => setProject({ ...project, cover_image_caption: e.target.value })}
              placeholder="Optional caption for the cover image"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
            />
          </div>
        </div>

        {/* Rich Text Content Card */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Article Content</h2>
          <RichTextEditor
            content={project.content_json}
            onChange={(content) => setProject({ ...project, content_json: content })}
            placeholder="Write your project article content here..."
          />
        </div>
      </div>

      {/* Cover Image Gallery Modal */}
      {showCoverGallery && (
        <ImageGalleryModal
          isOpen={showCoverGallery}
          onClose={() => setShowCoverGallery(false)}
          onSelectImage={(url) => {
            setProject({ ...project, cover_image_url: url });
            setShowCoverGallery(false);
          }}
          currentImageUrl={project.cover_image_url}
        />
      )}
    </div>
  );
}
