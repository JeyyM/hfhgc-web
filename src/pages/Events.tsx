import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, Users, Tag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: 'Weekend Build - Laguna Project',
    date: '2026-03-15',
    dateDisplay: 'March 15-16, 2026',
    time: '7:00 AM - 4:00 PM',
    location: 'Barangay San Jose, Laguna',
    category: 'Build',
    participants: '30 volunteers',
    spotsLeft: 15,
    description: 'Join us for a two-day community build helping three families construct their homes. All skill levels welcome!',
    image: 'https://picsum.photos/seed/event1/800/500',
    status: 'upcoming',
    registrationLink: '/contact'
  },
  {
    id: 2,
    title: 'General Assembly Meeting',
    date: '2026-03-20',
    dateDisplay: 'March 20, 2026',
    time: '6:00 PM - 8:00 PM',
    location: 'DLSU Yuchengco Hall',
    category: 'Meeting',
    participants: 'All members',
    spotsLeft: null,
    description: 'Monthly GA for all HFHGC members. Discussion of upcoming projects, committee updates, and planning sessions.',
    image: 'https://picsum.photos/seed/event2/800/500',
    status: 'upcoming',
    registrationLink: null
  },
  {
    id: 3,
    title: 'Youth Leadership Summit',
    date: '2026-03-22',
    dateDisplay: 'March 22, 2026',
    time: '9:00 AM - 5:00 PM',
    location: 'DLSU Campus',
    category: 'Workshop',
    participants: '100 participants',
    spotsLeft: 25,
    description: 'Full-day summit featuring workshops on community organizing, housing advocacy, and leadership development.',
    image: 'https://picsum.photos/seed/event3/800/500',
    status: 'upcoming',
    registrationLink: '/contact'
  },
  {
    id: 4,
    title: 'Fundraising Gala Night',
    date: '2026-03-28',
    dateDisplay: 'March 28, 2026',
    time: '6:00 PM - 10:00 PM',
    location: 'Shangri-La at the Fort',
    category: 'Fundraiser',
    participants: '200 guests',
    spotsLeft: 50,
    description: 'Annual charity gala featuring dinner, live entertainment, and silent auction to raise funds for our builds.',
    image: 'https://picsum.photos/seed/event4/800/500',
    status: 'upcoming',
    registrationLink: '/contact'
  },
  {
    id: 5,
    title: 'Community Build - Tondo',
    date: '2026-04-05',
    dateDisplay: 'April 5-7, 2026',
    time: '8:00 AM - 5:00 PM',
    location: 'Tondo, Manila',
    category: 'Build',
    participants: '40 volunteers',
    spotsLeft: 20,
    description: 'Three-day intensive build project. Perfect for volunteers seeking deep immersion and team bonding.',
    image: 'https://picsum.photos/seed/event5/800/500',
    status: 'upcoming',
    registrationLink: '/contact'
  },
  {
    id: 6,
    title: 'Volunteer Orientation',
    date: '2026-04-10',
    dateDisplay: 'April 10, 2026',
    time: '5:00 PM - 7:00 PM',
    location: 'DLSU St. La Salle Hall',
    category: 'Training',
    participants: 'New volunteers',
    spotsLeft: null,
    description: 'Mandatory orientation for all new volunteers. Learn about HFHGC, safety protocols, and what to expect.',
    image: 'https://picsum.photos/seed/event6/800/500',
    status: 'upcoming',
    registrationLink: '/contact'
  },
  {
    id: 7,
    title: 'Santos Family Home Completion',
    date: '2026-02-28',
    dateDisplay: 'February 28, 2026',
    time: '10:00 AM - 2:00 PM',
    location: 'Tondo, Manila',
    category: 'Build',
    participants: '50 volunteers',
    spotsLeft: null,
    description: 'Celebrated the completion of the Santos family home with a turnover ceremony and community celebration.',
    image: 'https://picsum.photos/seed/blog1/800/500',
    status: 'past',
    blogPostId: 1
  },
  {
    id: 8,
    title: 'Green Building Workshop',
    date: '2026-02-15',
    dateDisplay: 'February 15, 2026',
    time: '2:00 PM - 5:00 PM',
    location: 'DLSU Engineering Building',
    category: 'Workshop',
    participants: '60 participants',
    spotsLeft: null,
    description: 'Workshop on sustainable building practices, featuring bamboo construction and solar panel installation.',
    image: 'https://picsum.photos/seed/blog2/800/500',
    status: 'past',
    blogPostId: 2
  }
];

const categories = ['All', 'Build', 'Meeting', 'Workshop', 'Fundraiser', 'Training'];

const categoryColors: Record<string, string> = {
  Build: 'bg-[var(--color-green-3)] text-white',
  Meeting: 'bg-[var(--color-green-2)] text-[var(--color-text-main)]',
  Workshop: 'bg-[var(--color-green-4)] text-white',
  Fundraiser: 'bg-[var(--color-green-5)] text-white',
  Training: 'bg-[var(--color-green-1)] text-[var(--color-text-main)]'
};

export default function Events() {
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'upcoming' | 'past'>('upcoming');

  const filteredEvents = events.filter(event => {
    const categoryMatch = filter === 'All' || event.category === filter;
    const statusMatch = event.status === viewMode;
    return categoryMatch && statusMatch;
  });

  const upcomingCount = events.filter(e => e.status === 'upcoming').length;
  const pastCount = events.filter(e => e.status === 'past').length;

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6">
              Upcoming Projects
            </h1>
            <p className="text-xl text-[var(--color-green-1)] max-w-3xl mx-auto">
              Stay updated with our upcoming builds, meetings, workshops, and community projects. Join us in making a difference!
            </p>
          </motion.div>
        </div>
      </section>

      {/* View Toggle & Filters */}
      <section className="py-12 bg-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View Mode Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setViewMode('upcoming')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                viewMode === 'upcoming'
                  ? 'bg-[var(--color-green-5)] text-white scrapbook-shadow scale-105'
                  : 'bg-gray-100 text-[var(--color-text-main)] hover:bg-gray-200'
              }`}
            >
              Upcoming ({upcomingCount})
            </button>
            <button
              onClick={() => setViewMode('past')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                viewMode === 'past'
                  ? 'bg-[var(--color-green-5)] text-white scrapbook-shadow scale-105'
                  : 'bg-gray-100 text-[var(--color-text-main)] hover:bg-gray-200'
              }`}
            >
              Past Projects ({pastCount})
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
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
        </div>
      </section>

      {/* Events List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <CalendarIcon className="mx-auto mb-4 text-gray-300" size={64} />
              <h3 className="text-2xl font-heading font-bold text-gray-400 mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later for new projects.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden scrapbook-border scrapbook-shadow hover:scale-[1.02] transition-transform"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${categoryColors[event.category]}`}>
                        {event.category}
                      </span>
                    </div>
                    {event.spotsLeft && event.spotsLeft <= 10 && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Only {event.spotsLeft} spots left!
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-3">
                      {event.title}
                    </h3>
                    <p className="text-[var(--color-text-main)] mb-4">
                      {event.description}
                    </p>

                    {/* Event Meta */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                        <CalendarIcon className="text-[var(--color-green-4)]" size={18} />
                        <span className="font-semibold">{event.dateDisplay}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                        <Clock className="text-[var(--color-green-4)]" size={18} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                        <MapPin className="text-[var(--color-green-4)]" size={18} />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                        <Users className="text-[var(--color-green-4)]" size={18} />
                        <span>{event.participants}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {event.status === 'upcoming' && event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          className="flex-1 bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-6 rounded-full transition-transform hover:scale-105 scrapbook-shadow text-center"
                        >
                          Register Now
                        </a>
                      )}
                      {event.status === 'past' && event.blogPostId && (
                        <Link
                          to={`/blog/${event.blogPostId}`}
                          className="flex-1 bg-[var(--color-green-4)] hover:bg-[var(--color-green-3)] text-white font-bold py-3 px-6 rounded-full transition-transform hover:scale-105 scrapbook-shadow text-center inline-flex items-center justify-center gap-2"
                        >
                          Read Story <ArrowRight size={18} />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe to Calendar */}
      <section className="py-16 bg-[var(--color-green-1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
            Never Miss an Event
          </h2>
          <p className="text-lg text-[var(--color-text-main)] mb-8">
            Subscribe to our newsletter to get event updates and reminders delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-full bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-green-5)]"
            />
            <button
              type="submit"
              className="bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
            Want to Organize an Event?
          </h2>
          <p className="text-lg text-[var(--color-text-main)] mb-8">
            If you're interested in hosting a corporate build, workshop, or partnering with us for an event, we'd love to hear from you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/partnerships"
              className="bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
            >
              Partner With Us
            </Link>
            <Link
              to="/contact"
              className="bg-[var(--color-green-2)] hover:bg-[var(--color-green-4)] text-[var(--color-text-main)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
