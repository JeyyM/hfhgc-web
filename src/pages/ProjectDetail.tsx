import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, MapPin, User, Tag, ExternalLink, Share2, Check } from 'lucide-react';
import { useFetch } from '../hooks/useSupabase';
import { LoadingSpinner } from '../components/StatusIndicators';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: projects, loading } = useFetch<any>('projects', { 
    eq: [['id', id]],
    cache: true,
    cacheTTL: 5 * 60 * 1000 // 5 minutes
  });
  const [copied, setCopied] = useState(false);

  const project = projects?.[0];

  // Read-only editor to display the rich text content
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-[var(--color-green-5)] underline hover:text-[var(--color-green-4)]',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editable: false,
    content: project?.content_json || { type: 'doc', content: [] },
  });

  // Update editor content when project loads
  useEffect(() => {
    if (editor && project?.content_json) {
      editor.commands.setContent(project.content_json);
    }
  }, [editor, project]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Hide after 3 seconds
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <SEO title={project.title} description={project.description || `Learn about ${project.title} — a project by Habitat for Humanity Green Chapter DLSU.`} path={`/projects/${id}`} image={project.cover_image_url} />
      {/* Hero Section with Cover Image */}
      {project.cover_image_url && (
        <div className="relative h-96 overflow-hidden bg-gradient-to-br from-[var(--color-green-2)] to-[var(--color-green-3)]">
          <img 
            src={project.cover_image_url} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <button
            onClick={() => navigate('/projects')}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg font-semibold hover:bg-white transition-all shadow-lg"
          >
            <ArrowLeft size={18} />
            <span>Back to Projects</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className={`absolute top-6 right-6 flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-lg font-semibold transition-all shadow-lg ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-white/90 text-gray-900 hover:bg-white'
            }`}
          >
            {copied ? (
              <>
                <Check size={18} />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={18} />
                <span>Share</span>
              </>
            )}
          </button>

          {/* Category & Status Badges */}
          <div className="absolute bottom-6 left-6 flex gap-3">
            <span className="inline-block text-sm font-bold px-4 py-2 rounded-full bg-white text-[var(--color-green-5)] shadow-lg">
              {project.category}
            </span>
            <span className={`inline-block text-sm font-bold px-4 py-2 rounded-full shadow-lg ${
              project.status === 'upcoming' 
                ? 'bg-blue-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {project.status === 'upcoming' ? 'Upcoming' : 'Completed'}
            </span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title & Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--color-green-5)] mb-4">
            {project.title}
          </h1>

          {/* Excerpt */}
          {project.excerpt && (
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              {project.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            {project.author && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>By {project.author}</span>
              </div>
            )}
            {project.published_at && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(project.published_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag: string, idx: number) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Event Information Card */}
        {(project.date_display || project.time_display || project.location || project.registration_link) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 mb-8 border-2 border-blue-200"
          >
            <h2 className="text-2xl font-heading font-bold text-blue-900 mb-4">
              Event Details
            </h2>
            <div className="space-y-3">
              {project.date_display && (
                <div className="flex items-center gap-3 text-blue-900">
                  <Calendar size={20} className="flex-shrink-0" />
                  <span className="font-semibold text-lg">{project.date_display}</span>
                </div>
              )}
              {project.time_display && (
                <div className="flex items-center gap-3 text-blue-800">
                  <Clock size={20} className="flex-shrink-0" />
                  <span className="text-lg">{project.time_display}</span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-3 text-blue-800">
                  <MapPin size={20} className="flex-shrink-0" />
                  <span className="text-lg">{project.location}</span>
                </div>
              )}
              {project.participants && (
                <div className="flex items-center gap-3 text-blue-800">
                  <User size={20} className="flex-shrink-0" />
                  <span className="text-lg">
                    {project.participants} participants
                    {project.spots_left != null && (
                      <span className="ml-2 text-[var(--color-green-5)] font-bold">
                        ({project.spots_left} spots available)
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Registration Button */}
            {project.registration_link && project.status === 'upcoming' && (
              <a
                href={project.registration_link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-green-5)] text-white rounded-xl font-bold hover:bg-[var(--color-green-4)] transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink size={18} />
                Register Now
              </a>
            )}
          </motion.div>
        )}

        {/* Rich Text Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            About This Project
          </h2>
          
          {editor ? (
            <div className="prose prose-lg max-w-none">
              <EditorContent editor={editor} />
            </div>
          ) : (
            <p className="text-gray-600">Loading content...</p>
          )}

          {project.cover_image_caption && (
            <p className="text-sm text-gray-500 italic mt-6 text-center">
              {project.cover_image_caption}
            </p>
          )}
        </motion.div>

        {/* Back to Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            <ArrowLeft size={18} />
            Back to All Projects
          </button>
        </motion.div>
      </div>
    </div>
  );
}
