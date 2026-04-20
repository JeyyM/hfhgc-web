import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const svgClass = "w-5 h-5 text-white";

const TikTokIcon = ({ className = svgClass }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-2.65-.78v-4.25h2.65z"/></svg>
);

const ThreadsIcon = ({ className = svgClass }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.773.777c-1.005-3.594-3.407-5.416-7.14-5.416h-.01c-2.6.017-4.6.87-5.94 2.536C5.432 7.11 4.756 9.27 4.733 12c.023 2.73.7 4.89 2.013 6.422 1.34 1.567 3.34 2.42 5.94 2.436h.01c2.2-.017 3.94-.627 5.17-1.814.95-.92 1.57-2.12 1.84-3.567-.66.1-1.35.15-2.06.15-4.24 0-7.24-2.37-7.73-6.1-.27-2.03.27-3.87 1.52-5.18 1.26-1.32 3.06-2.05 5.07-2.05 2.28 0 4.14.87 5.23 2.45.54.78.91 1.7 1.1 2.73l.03.17v4.06c-.01 3.58-.86 6.43-2.51 8.48-1.85 2.3-4.6 3.48-8.18 3.51z"/></svg>
);

export const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: ({ className }) => <Facebook className={className || "h-5 w-5"} />,
  instagram: ({ className }) => <Instagram className={className || "h-5 w-5"} />,
  twitter: ({ className }) => <Twitter className={className || "h-5 w-5"} />,
  linkedin: ({ className }) => <Linkedin className={className || "h-5 w-5"} />,
  youtube: ({ className }) => <Youtube className={className || "h-5 w-5"} />,
  tiktok: TikTokIcon,
  threads: ThreadsIcon,
};

export const PLATFORM_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter / X',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  threads: 'Threads',
};

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  sort_order: number;
}

// Use: useFetch<SocialLink>('social_links', { order: { column: 'sort_order' } })
