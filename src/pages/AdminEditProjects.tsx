import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, MapPin, Clock, User, Tag } from 'lucide-react';
import { useFetch, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';

export default function AdminEditProjects() {
  const navigate = useNavigate();
  const { data: projects, loading, refetch } = useFetch<any>('projects', { 
    order: { column: 'sort_order' },
    cache: false 
  });
  const { remove } = useDelete('projects');

  const [msg, setMsg] = useState('');

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const success = await remove(id);
      if (success) {
        setMsg('Project deleted successfully');
        await refetch(true); // Force refresh
      } else {
        setMsg('Error deleting project');
      }
      setTimeout(() => setMsg(''), 3000);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage project articles and events</p>
        </div>
        <button
          onClick={() => navigate('/admin/projects/edit/new')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors"
        >
          <Plus size={18} />
          Create New Project
        </button>
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

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border-2 border-gray-200 text-center py-12">
            <p className="text-gray-500 mb-4">No projects yet</p>
            <button
              onClick={() => navigate('/admin/projects/edit/new')}
              className="text-[var(--color-green-5)] font-semibold hover:underline"
            >
              Create your first project
            </button>
          </div>
        ) : (
          projects.map((project: any) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Cover Image */}
              {project.cover_image_url && (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Status Badge Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                      project.status === 'upcoming' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}>
                      {project.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>
                  {/* Visibility Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                      project.is_visible 
                        ? 'bg-white/90 text-green-600' 
                        : 'bg-black/70 text-white'
                    }`}>
                      {project.is_visible ? (
                        <>
                          <Eye size={14} /> Visible
                        </>
                      ) : (
                        <>
                          <EyeOff size={14} /> Hidden
                        </>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-green-1)] text-[var(--color-green-5)] rounded-full text-xs font-bold">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {project.title}
                </h3>

                {/* Excerpt */}
                {project.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 min-h-[3.75rem]">
                    {project.excerpt}
                  </p>
                )}

                {/* Event Details */}
                {(project.date_display || project.time_display || project.location) && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg space-y-2">
                    {project.date_display && (
                      <div className="flex items-center gap-2 text-sm text-blue-900">
                        <Calendar size={16} className="flex-shrink-0" />
                        <span className="font-semibold">{project.date_display}</span>
                      </div>
                    )}
                    {project.time_display && (
                      <div className="flex items-center gap-2 text-sm text-blue-900">
                        <Clock size={16} className="flex-shrink-0" />
                        <span>{project.time_display}</span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-center gap-2 text-sm text-blue-900">
                        <MapPin size={16} className="flex-shrink-0" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Meta Information */}
                <div className="space-y-2 mb-4 text-xs text-gray-500">
                  {project.author && (
                    <div className="flex items-center gap-2">
                      <User size={14} className="flex-shrink-0" />
                      <span>By {project.author}</span>
                    </div>
                  )}
                  {project.published_at && (
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="flex-shrink-0" />
                      <span>Published {new Date(project.published_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Tag size={14} className="flex-shrink-0 mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag: string, idx: number) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors"
                  >
                    <Edit size={16} />
                    Edit Project
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors border-2 border-red-200 hover:border-red-300"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
