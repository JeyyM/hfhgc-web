import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Clock,
  User,
  Tag,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import { useFetch, useDelete } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import {
  PROJECT_PAGE_SIZE,
  PROJECT_SORT_OPTIONS,
  type ProjectSortKey,
  filterProjectsBySearch,
  sortProjects,
} from '../lib/projectListFilters';

export default function AdminEditProjects() {
  const navigate = useNavigate();
  const { data: projects, loading, refetch } = useFetch<any>('projects', {
    order: { column: 'sort_order' },
    cache: false,
  });
  const { remove } = useDelete('projects');

  const [msg, setMsg] = useState('');
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<ProjectSortKey>('newest');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [tab, search, sort]);

  const byTab = useMemo(
    () => projects.filter((p: any) => p.status === tab),
    [projects, tab],
  );
  const filtered = useMemo(() => filterProjectsBySearch(byTab, search), [byTab, search]);
  const sorted = useMemo(() => sortProjects(filtered, sort), [filtered, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PROJECT_PAGE_SIZE));
  const paginated = useMemo(
    () => sorted.slice((page - 1) * PROJECT_PAGE_SIZE, page * PROJECT_PAGE_SIZE),
    [sorted, page],
  );

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const success = await remove(id);
      if (success) {
        setMsg('Project deleted successfully');
        await refetch(true);
      } else {
        setMsg('Error deleting project');
      }
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleTabChange = (next: 'upcoming' | 'completed') => {
    setTab(next);
    setSearch('');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
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

      {/* Tab switcher */}
      <div className="flex justify-center sm:justify-start gap-3 mb-6">
        <button
          type="button"
          onClick={() => handleTabChange('upcoming')}
          className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${
            tab === 'upcoming'
              ? 'bg-[var(--color-green-5)] text-white'
              : 'bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)]'
          }`}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('completed')}
          className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${
            tab === 'completed'
              ? 'bg-[var(--color-green-5)] text-white'
              : 'bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)]'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-row gap-3 mb-4">
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category, location, author, tags…"
            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-green-5)] transition-colors bg-white"
          />
        </div>
        <div className="relative flex-shrink-0">
          <ArrowUpDown size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as ProjectSortKey)}
            className="pl-9 pr-8 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-green-5)] transition-colors bg-white appearance-none cursor-pointer font-medium text-gray-700"
          >
            {PROJECT_SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {search.trim() && (
        <p className="text-sm text-gray-500 mb-4">
          {sorted.length} result{sorted.length !== 1 ? 's' : ''} for{' '}
          <span className="font-semibold text-gray-700">&quot;{search.trim()}&quot;</span>
        </p>
      )}

      {/* Projects List */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-gray-200 text-center py-12">
          <p className="text-gray-500 mb-4">
            {search.trim()
              ? 'No projects match your search.'
              : tab === 'upcoming'
                ? 'No upcoming projects yet'
                : 'No completed projects yet'}
          </p>
          {!search.trim() && (
            <button
              type="button"
              onClick={() => navigate('/admin/projects/edit/new')}
              className="text-[var(--color-green-5)] font-semibold hover:underline"
            >
              Create your first project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paginated.map((project: any) => (
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
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                        project.status === 'upcoming'
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {project.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>
                  {/* Visibility Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                        project.is_visible
                          ? 'bg-white/90 text-green-600'
                          : 'bg-black/70 text-white'
                      }`}
                    >
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
                      <span>
                        Published{' '}
                        {new Date(project.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Tag size={14} className="flex-shrink-0 mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
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
                    type="button"
                    onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors"
                  >
                    <Edit size={16} />
                    Edit Project
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id, project.title)}
                    className="px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors border-2 border-red-200 hover:border-red-300"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8 flex-wrap">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
            const show = n === 1 || n === totalPages || Math.abs(n - page) <= 1;
            const isEllipsisBefore = n === page - 2 && page - 2 > 1;
            const isEllipsisAfter = n === page + 2 && page + 2 < totalPages;
            if (!show) {
              if (isEllipsisBefore || isEllipsisAfter) {
                return (
                  <span key={n} className="px-1 text-gray-400 select-none">…</span>
                );
              }
              return null;
            }
            return (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 font-bold text-sm transition-colors ${
                  n === page
                    ? 'bg-[var(--color-green-5)] border-[var(--color-green-5)] text-white'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)]'
                }`}
              >
                {n}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:border-[var(--color-green-5)] hover:text-[var(--color-green-5)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          <span className="ml-2 text-sm text-gray-500">
            Page {page} of {totalPages} · {sorted.length} item{sorted.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}
