import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar as CalendarIcon, MapPin, Clock, Users, Layers } from 'lucide-react';

// ─── Past / Completed Projects ────────────────────────────────────────────────
const completedProjects = [
  {
    id: 1,
    title: 'Project Hope Build',
    category: 'Build',
    date: 'March 2025',
    image: 'https://picsum.photos/seed/build1/600/400',
    description: 'A weekend build helping construct 5 new homes for families in Laguna.',
    blogPostId: 1
  },
  {
    id: 2,
    title: 'Green Earth Initiative',
    category: 'Community',
    date: 'January 2025',
    image: 'https://picsum.photos/seed/build2/600/400',
    description: 'Tree planting and community garden setup in our partner communities.',
    blogPostId: 2
  },
  {
    id: 3,
    title: 'Youth Empowerment Seminar',
    category: 'Education',
    date: 'November 2024',
    image: 'https://picsum.photos/seed/build3/600/400',
    description: 'Workshops focused on leadership and community building for local youth.',
    blogPostId: 5
  },
  {
    id: 4,
    title: 'Disaster Relief Pack Drive',
    category: 'Relief',
    date: 'September 2024',
    image: 'https://picsum.photos/seed/build4/600/400',
    description: 'Packing and distributing essential goods to typhoon-affected areas.',
    blogPostId: null
  },
  {
    id: 5,
    title: 'Paint a Smile',
    category: 'Community',
    date: 'July 2024',
    image: 'https://picsum.photos/seed/build5/600/400',
    description: 'Repainting and refurbishing a local public school.',
    blogPostId: 3
  },
  {
    id: 6,
    title: 'Fundraising Gala',
    category: 'Fundraiser',
    date: 'May 2024',
    image: 'https://picsum.photos/seed/build6/600/400',
    description: 'Annual gala dinner to raise funds for upcoming construction projects.',
    blogPostId: 4
  }
];

// ─── Upcoming Events / Projects ───────────────────────────────────────────────
const upcomingEvents = [
  {
    id: 1,
    title: 'Weekend Build - Laguna Project',
    date: '2026-03-15',
    dateDisplay: 'March 15–16, 2026',
    time: '7:00 AM – 4:00 PM',
    location: 'Barangay San Jose, Laguna',
    category: 'Build',
    participants: '30 volunteers',
    spotsLeft: 15,
    description: 'Join us for a two-day community build helping three families construct their homes. All skill levels welcome!',
    image: 'https://picsum.photos/seed/event1/800/500',
    registrationLink: '/contact'
  },
  {
    id: 2,
    title: 'General Assembly Meeting',
    date: '2026-03-20',
    dateDisplay: 'March 20, 2026',
    time: '6:00 PM – 8:00 PM',
    location: 'DLSU Yuchengco Hall',
    category: 'Meeting',
    participants: 'All members',
    spotsLeft: null,
    description: 'Monthly GA for all HFHGC members. Discussion of upcoming projects, committee updates, and planning sessions.',
    image: 'https://picsum.photos/seed/event2/800/500',
    registrationLink: null
  },
  {
    id: 3,
    title: 'Youth Leadership Summit',
    date: '2026-03-22',
    dateDisplay: 'March 22, 2026',
    time: '9:00 AM – 5:00 PM',
    location: 'DLSU Campus',
    category: 'Workshop',
    participants: '100 participants',
    spotsLeft: 25,
    description: 'Full-day summit featuring workshops on community organizing, housing advocacy, and leadership development.',
    image: 'https://picsum.photos/seed/event3/800/500',
    registrationLink: '/contact'
  },
  {
    id: 4,
    title: 'Fundraising Gala Night',
    date: '2026-03-28',
    dateDisplay: 'March 28, 2026',
    time: '6:00 PM – 10:00 PM',
    location: 'Shangri-La at the Fort',
    category: 'Fundraiser',
    participants: '200 guests',
    spotsLeft: 50,
    description: 'Annual charity gala featuring dinner, live entertainment, and silent auction to raise funds for our builds.',
    image: 'https://picsum.photos/seed/event4/800/500',
    registrationLink: '/contact'
  },
  {
    id: 5,
    title: 'Community Build - Tondo',
    date: '2026-04-05',
    dateDisplay: 'April 5–7, 2026',
    time: '8:00 AM – 5:00 PM',
    location: 'Tondo, Manila',
    category: 'Build',
    participants: '40 volunteers',
    spotsLeft: 20,
    description: 'Three-day intensive build project. Perfect for volunteers seeking deep immersion and team bonding.',
    image: 'https://picsum.photos/seed/event5/800/500',
    registrationLink: '/contact'
  },
  {
    id: 6,
    title: 'Volunteer Orientation',
    date: '2026-04-10',
    dateDisplay: 'April 10, 2026',
    time: '5:00 PM – 7:00 PM',
    location: 'DLSU St. La Salle Hall',
    category: 'Training',
    participants: 'New volunteers',
    spotsLeft: null,
    description: 'Mandatory orientation for all new volunteers. Learn about HFHGC, safety protocols, and what to expect.',
    image: 'https://picsum.photos/seed/event6/800/500',
    registrationLink: '/contact'
  }
];

const categories = ['All', 'Build', 'Workshop', 'Fundraiser', 'Community', 'Education', 'Relief', 'Training', 'Meeting'];

const categoryColors: Record<string, string> = {
  Build:      'bg-[var(--color-green-5)] text-white',
  Workshop:   'bg-[var(--color-green-4)] text-white',
  Fundraiser: 'bg-orange-500 text-white',
  Community:  'bg-[var(--color-green-3)] text-white',
  Education:  'bg-[var(--color-green-2)] text-[var(--color-text-main)]',
  Relief:     'bg-red-500 text-white',
  Training:   'bg-[var(--color-green-1)] text-[var(--color-text-main)]',
  Meeting:    'bg-gray-500 text-white',
};

export default function Projects() {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [filter, setFilter] = useState('All');

  const displayedUpcoming = upcomingEvents.filter(
    e => filter === 'All' || e.category === filter
  );
  const displayedCompleted = completedProjects.filter(
    p => filter === 'All' || p.category === filter
  );

  const handleTabSwitch = (newTab: 'upcoming' | 'completed') => {
    setTab(newTab);
    setFilter('All');
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">

      {/* Hero */}
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Layers className="text-white" size={36} />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6">Projects</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From upcoming builds and community events to completed milestones — explore everything HFHGC has been working on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Bar + Filters — sticky */}
      <section className="py-8 bg-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab Toggle */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleTabSwitch('upcoming')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                tab === 'upcoming'
                  ? 'bg-[var(--color-green-5)] text-white scrapbook-shadow scale-105'
                  : 'bg-gray-100 text-[var(--color-text-main)] hover:bg-gray-200'
              }`}
            >
              Upcoming ({upcomingEvents.length})
            </button>
            <button
              onClick={() => handleTabSwitch('completed')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                tab === 'completed'
                  ? 'bg-[var(--color-green-5)] text-white scrapbook-shadow scale-105'
                  : 'bg-gray-100 text-[var(--color-text-main)] hover:bg-gray-200'
              }`}
            >
              Completed ({completedProjects.length})
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-bold transition-all text-sm ${
                  filter === cat
                    ? 'bg-[var(--color-green-4)] text-white scrapbook-shadow scale-105'
                    : 'bg-white text-[var(--color-text-main)] border-2 border-[var(--color-text-main)] hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Tab ─────────────────────────────────────────────────────── */}
      {tab === 'upcoming' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {displayedUpcoming.length === 0 ? (
              <div className="text-center py-20">
                <CalendarIcon className="mx-auto mb-4 text-gray-300" size={64} />
                <h3 className="text-2xl font-heading font-bold text-gray-400 mb-2">No Projects Found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {displayedUpcoming.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-white rounded-2xl overflow-hidden scrapbook-border scrapbook-shadow hover:scale-[1.02] transition-transform"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${categoryColors[event.category] ?? 'bg-gray-200 text-gray-800'}`}>
                          {event.category}
                        </span>
                      </div>
                      {event.spotsLeft !== null && event.spotsLeft <= 15 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Only {event.spotsLeft} spots left!
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-2">
                        {event.title}
                      </h3>
                      <p className="text-[var(--color-text-main)] mb-4">{event.description}</p>

                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                          <CalendarIcon className="text-[var(--color-green-4)]" size={16} />
                          <span className="font-semibold">{event.dateDisplay}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                          <Clock className="text-[var(--color-green-4)]" size={16} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                          <MapPin className="text-[var(--color-green-4)]" size={16} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                          <Users className="text-[var(--color-green-4)]" size={16} />
                          <span>{event.participants}</span>
                        </div>
                      </div>

                      {event.registrationLink && (
                        <Link
                          to={event.registrationLink}
                          className="inline-block bg-[var(--color-green-5)] hover:bg-[var(--color-green-4)] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 scrapbook-shadow"
                        >
                          Register Now
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Completed Tab ─────────────────────────────────────────────────────── */}
      {tab === 'completed' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {displayedCompleted.length === 0 ? (
              <div className="text-center py-20">
                <Layers className="mx-auto mb-4 text-gray-300" size={64} />
                <h3 className="text-2xl font-heading font-bold text-gray-400 mb-2">No Projects Found</h3>
                <p className="text-gray-500">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedCompleted.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="bg-white rounded-xl overflow-hidden scrapbook-border scrapbook-shadow group hover:-translate-y-1 transition-transform"
                  >
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[project.category] ?? 'bg-gray-200 text-gray-800'}`}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-[var(--color-green-5)] font-bold mb-1">{project.date}</p>
                      <h3 className="text-xl font-heading font-bold text-[var(--color-text-main)] mb-3">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                      {project.blogPostId && (
                        <Link
                          to={`/blog/${project.blogPostId}`}
                          className="inline-flex items-center gap-2 text-[var(--color-green-5)] hover:text-[var(--color-green-4)] font-semibold transition-colors text-sm"
                        >
                          Read the Story <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
            Want to Get Involved?
          </h2>
          <p className="text-lg text-[var(--color-text-main)] mb-8">
            Whether you want to join a build, partner with us, or organize an event — we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-[var(--color-green-5)] hover:bg-[var(--color-green-4)] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 scrapbook-shadow"
            >
              Contact Us
            </Link>
            <Link
              to="/partnerships"
              className="bg-white border-2 border-[var(--color-green-5)] text-[var(--color-green-5)] font-bold py-3 px-8 rounded-full transition-all hover:bg-[var(--color-green-1)] hover:scale-105"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
