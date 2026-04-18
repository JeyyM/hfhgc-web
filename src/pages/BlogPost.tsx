import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import DOMPurify from 'dompurify';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data: posts, loading } = useFetch<any>('blog_posts', { eq: [['slug', id]] });

  if (loading) return <LoadingSpinner />;
  const post = posts[0];
  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-[var(--color-green-5)] hover:underline">Back to Blog</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[var(--color-green-5)] hover:underline mb-8">
          <ArrowLeft size={18} />Back to Blog
        </Link>
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-80 object-cover rounded-2xl mb-8 scrapbook-shadow" />}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-bold text-[var(--color-green-5)] bg-[var(--color-green-1)] px-3 py-1 rounded-full">{post.category}</span>
            {(post.tags || []).map((t: string) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{t}</span>
            ))}
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-200 pb-6">
            <span className="flex items-center gap-1"><User size={14} />{post.author_name}{post.author_role && (' - ' + post.author_role)}</span>
            <span className="flex items-center gap-1"><Calendar size={14} />{new Date(post.published_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Clock size={14} />{post.read_time}</span>
          </div>
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[var(--color-green-5)] prose-a:text-[var(--color-green-5)]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || '', { ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','br','strong','em','u','s','a','ul','ol','li','blockquote','img','span','div','table','thead','tbody','tr','th','td','hr','pre','code'], ALLOWED_ATTR: ['href','src','alt','class','style','target','rel','width','height'] }) }} />
        </motion.article>
      </div>
    </div>
  );
}
