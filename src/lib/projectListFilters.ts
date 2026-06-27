export const PROJECT_PAGE_SIZE = 10;

export type ProjectSortKey = 'newest' | 'oldest' | 'az' | 'za';

export const PROJECT_SORT_OPTIONS: { value: ProjectSortKey; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az', label: 'Title A → Z' },
  { value: 'za', label: 'Title Z → A' },
];

export function sortProjects(list: any[], key: ProjectSortKey): any[] {
  return [...list].sort((a, b) => {
    switch (key) {
      case 'newest':
        return (
          new Date(b.published_at || b.created_at || 0).getTime() -
          new Date(a.published_at || a.created_at || 0).getTime()
        );
      case 'oldest':
        return (
          new Date(a.published_at || a.created_at || 0).getTime() -
          new Date(b.published_at || b.created_at || 0).getTime()
        );
      case 'az':
        return (a.title || '').localeCompare(b.title || '');
      case 'za':
        return (b.title || '').localeCompare(a.title || '');
      default:
        return 0;
    }
  });
}

export function filterProjectsBySearch(list: any[], search: string): any[] {
  const q = search.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p: any) =>
    (p.title || '').toLowerCase().includes(q) ||
    (p.excerpt || '').toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q) ||
    (p.location || '').toLowerCase().includes(q) ||
    (p.author || '').toLowerCase().includes(q) ||
    (p.tags || []).some((t: string) => t.toLowerCase().includes(q))
  );
}
