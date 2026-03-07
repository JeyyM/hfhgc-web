import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Project Hope Build',
    category: 'Construction',
    date: 'March 2025',
    image: 'https://picsum.photos/seed/build1/600/400',
    description: 'A weekend build helping construct 5 new homes for families in Laguna.',
    blogPostId: 1 // Links to "Building Dreams" blog post
  },
  {
    id: 2,
    title: 'Green Earth Initiative',
    category: 'Sustainability',
    date: 'January 2025',
    image: 'https://picsum.photos/seed/build2/600/400',
    description: 'Tree planting and community garden setup in our partner communities.',
    blogPostId: 2 // Links to "Sustainability in Action" blog post
  },
  {
    id: 3,
    title: 'Youth Empowerment Seminar',
    category: 'Education',
    date: 'November 2024',
    image: 'https://picsum.photos/seed/build3/600/400',
    description: 'Workshops focused on leadership and community building for local youth.',
    blogPostId: 5 // Links to "Construction 101" blog post
  },
  {
    id: 4,
    title: 'Disaster Relief Pack Drive',
    category: 'Relief',
    date: 'September 2024',
    image: 'https://picsum.photos/seed/build4/600/400',
    description: 'Packing and distributing essential goods to typhoon-affected areas.',
    blogPostId: null // No blog post yet
  },
  {
    id: 5,
    title: 'Paint a Smile',
    category: 'Community',
    date: 'July 2024',
    image: 'https://picsum.photos/seed/build5/600/400',
    description: 'Repainting and refurbishing a local public school.',
    blogPostId: 3 // Links to "Volunteer Spotlight" blog post
  },
  {
    id: 6,
    title: 'Fundraising Gala',
    category: 'Fundraiser',
    date: 'May 2024',
    image: 'https://picsum.photos/seed/build6/600/400',
    description: 'Annual gala dinner to raise funds for upcoming construction projects.',
    blogPostId: 4 // Links to "Partnership Announcement" blog post
  }
];

const categories = ['All', 'Construction', 'Sustainability', 'Education', 'Relief', 'Community', 'Fundraiser'];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6"
          >
            Project Portfolio
          </motion.h1>
          <p className="text-xl text-[var(--color-text-main)] max-w-2xl mx-auto">
            Explore our ongoing and completed projects. See how we&apos;re making a difference, one community at a time.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === cat 
                  ? 'bg-[var(--color-green-4)] text-white scrapbook-shadow transform scale-105' 
                  : 'bg-white text-[var(--color-text-main)] border-2 border-[var(--color-text-main)] hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden scrapbook-border scrapbook-shadow group"
            >
              <div className="relative overflow-hidden h-56">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-[var(--color-green-2)] text-[var(--color-text-main)] text-xs font-bold px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[var(--color-green-5)] font-bold mb-2">{project.date}</p>
                <h3 className="text-2xl font-heading font-bold text-[var(--color-text-main)] mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                {project.blogPostId && (
                  <Link 
                    to={`/blog/${project.blogPostId}`}
                    className="inline-flex items-center gap-2 text-[var(--color-green-5)] hover:text-[var(--color-green-4)] font-semibold transition-colors"
                  >
                    Read the Story <ArrowRight size={18} />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
