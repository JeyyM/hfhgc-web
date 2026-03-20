import { motion } from 'motion/react';
import { Mail, Linkedin, Facebook, Users } from 'lucide-react';

const executiveBoard = [
  {
    name: 'Maria Santos',
    position: 'President',
    course: '4th Year Management',
    image: 'https://i.pravatar.cc/400?img=1',
    email: 'maria.santos@dlsu.edu.ph',
    bio: 'Leading HFHGC with passion for community development and sustainable housing solutions.',
    linkedin: '#',
    facebook: '#'
  },
  {
    name: 'Carlos Rivera',
    position: 'Vice President for Internal Affairs',
    course: '3rd Year Civil Engineering',
    image: 'https://i.pravatar.cc/400?img=12',
    email: 'carlos.rivera@dlsu.edu.ph',
    bio: 'Coordinating internal operations and ensuring smooth execution of all chapter activities.',
    linkedin: '#',
    facebook: '#'
  },
  {
    name: 'Anna Chen',
    position: 'Vice President for External Affairs',
    course: '4th Year Marketing',
    image: 'https://i.pravatar.cc/400?img=5',
    email: 'anna.chen@dlsu.edu.ph',
    bio: 'Building partnerships and managing relationships with external stakeholders and sponsors.',
    linkedin: '#',
    facebook: '#'
  },
  {
    name: 'Miguel Reyes',
    position: 'Secretary',
    course: '3rd Year Political Science',
    image: 'https://i.pravatar.cc/400?img=14',
    email: 'miguel.reyes@dlsu.edu.ph',
    bio: 'Maintaining records, documentation, and communications for the organization.',
    linkedin: '#',
    facebook: '#'
  },
  {
    name: 'Patricia Lim',
    position: 'Treasurer',
    course: '4th Year Accountancy',
    image: 'https://i.pravatar.cc/400?img=9',
    email: 'patricia.lim@dlsu.edu.ph',
    bio: 'Managing finances, budgets, and ensuring transparent fund allocation for all projects.',
    linkedin: '#',
    facebook: '#'
  }
];

const committeeHeads = [
  {
    name: 'Roberto Cruz',
    position: 'Build Projects Head',
    course: '4th Year Civil Engineering',
    image: 'https://i.pravatar.cc/400?img=13',
    email: 'roberto.cruz@dlsu.edu.ph'
  },
  {
    name: 'Lisa Gonzales',
    position: 'Volunteer Management Head',
    course: '3rd Year Psychology',
    image: 'https://i.pravatar.cc/400?img=10',
    email: 'lisa.gonzales@dlsu.edu.ph'
  },
  {
    name: 'Mark Tan',
    position: 'Communications & Marketing Head',
    course: '4th Year Communication',
    image: 'https://i.pravatar.cc/400?img=15',
    email: 'mark.tan@dlsu.edu.ph'
  },
  {
    name: 'Sarah Rodriguez',
    position: 'Fundraising & Events Head',
    course: '3rd Year Business Management',
    image: 'https://i.pravatar.cc/400?img=20',
    email: 'sarah.rodriguez@dlsu.edu.ph'
  },
  {
    name: 'James Villanueva',
    position: 'Sustainability Head',
    course: '4th Year Environmental Science',
    image: 'https://i.pravatar.cc/400?img=18',
    email: 'james.villanueva@dlsu.edu.ph'
  },
  {
    name: 'Nicole Torres',
    position: 'Training & Development Head',
    course: '3rd Year Education',
    image: 'https://i.pravatar.cc/400?img=23',
    email: 'nicole.torres@dlsu.edu.ph'
  }
];

const advisors = [
  {
    name: 'Dr. Emmanuel Garcia',
    position: 'Faculty Advisor',
    department: 'College of Liberal Arts',
    image: 'https://i.pravatar.cc/400?img=33',
    email: 'emmanuel.garcia@dlsu.edu.ph',
    bio: 'Guiding HFHGC students in community engagement and social development initiatives for over 10 years.'
  },
  {
    name: 'Engr. Rosa Martinez',
    position: 'Technical Advisor',
    department: 'Gokongwei College of Engineering',
    image: 'https://i.pravatar.cc/400?img=38',
    email: 'rosa.martinez@dlsu.edu.ph',
    bio: 'Providing technical expertise in construction methods and sustainable building practices.'
  }
];

const testimonials = [
  {
    name: 'David Santos',
    year: 'Alumni - Class of 2024',
    image: 'https://i.pravatar.cc/400?img=60',
    quote: "HFHGC was life-changing. I went from not knowing how to hold a hammer to leading build teams. The friendships and skills I gained here shaped who I am today.",
    currentRole: 'Project Engineer at BuildPH'
  },
  {
    name: 'Isabel Cruz',
    year: 'Alumni - Class of 2023',
    image: 'https://i.pravatar.cc/400?img=47',
    quote: "Being part of HFHGC taught me that real leadership is about service. The families we helped and the community we built will always hold a special place in my heart.",
    currentRole: 'Community Development Officer'
  }
];

export default function Team() {
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
              Meet Our Team
            </h1>
            <p className="text-xl text-[var(--color-green-1)] max-w-3xl mx-auto">
              Passionate students dedicated to building homes, communities, and hope. Get to know the leaders behind HFHGC.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Executive Board */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Executive Board AY 2025-2026
            </h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Our executive board leads the organization with vision, dedication, and a commitment to service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveBoard.map((member, index) => (
              <motion.div
                key={member.email}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--color-bg-main)] rounded-2xl overflow-hidden scrapbook-border scrapbook-shadow hover:scale-105 transition-transform"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-heading font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-[var(--color-green-1)] text-sm">{member.course}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[var(--color-green-5)] font-bold mb-3">{member.position}</p>
                  <p className="text-sm text-[var(--color-text-main)] mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 bg-[var(--color-green-1)] rounded-full hover:bg-[var(--color-green-2)] transition-colors"
                      title="Email"
                    >
                      <Mail className="text-[var(--color-green-5)]" size={18} />
                    </a>
                    <a
                      href={member.linkedin}
                      className="p-2 bg-[var(--color-green-1)] rounded-full hover:bg-[var(--color-green-2)] transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="text-[var(--color-green-5)]" size={18} />
                    </a>
                    <a
                      href={member.facebook}
                      className="p-2 bg-[var(--color-green-1)] rounded-full hover:bg-[var(--color-green-2)] transition-colors"
                      title="Facebook"
                    >
                      <Facebook className="text-[var(--color-green-5)]" size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Heads */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Committee Heads
            </h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Leading specialized teams that drive our mission forward in their respective areas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {committeeHeads.map((head, index) => (
              <motion.div
                key={head.email}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white p-4 rounded-2xl scrapbook-border scrapbook-shadow hover:scale-105 transition-transform">
                  <img
                    src={head.image}
                    alt={head.name}
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-[var(--color-green-5)]"
                  />
                  <h3 className="font-heading font-bold text-[var(--color-green-5)] text-sm mb-1">
                    {head.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-main)] mb-2 font-semibold">
                    {head.position}
                  </p>
                  <p className="text-xs text-gray-600 mb-3">{head.course}</p>
                  <a
                    href={`mailto:${head.email}`}
                    className="inline-block p-2 bg-[var(--color-green-1)] rounded-full hover:bg-[var(--color-green-2)] transition-colors"
                  >
                    <Mail className="text-[var(--color-green-5)]" size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Faculty Advisors
            </h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Experienced faculty members who provide guidance and mentorship to our organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.email}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[var(--color-bg-main)] p-6 rounded-2xl scrapbook-border scrapbook-shadow"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[var(--color-green-5)] flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-1">
                      {advisor.name}
                    </h3>
                    <p className="text-[var(--color-green-4)] font-semibold mb-1">
                      {advisor.position}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">{advisor.department}</p>
                    <p className="text-sm text-[var(--color-text-main)] mb-3">{advisor.bio}</p>
                    <a
                      href={`mailto:${advisor.email}`}
                      className="text-[var(--color-green-5)] hover:underline text-sm font-semibold"
                    >
                      {advisor.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Testimonials */}
      <section className="py-16 bg-[var(--color-green-1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Alumni Voices
            </h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Hear from former members about their HFHGC experience and where they are now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl scrapbook-border scrapbook-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[var(--color-green-5)]"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-[var(--color-green-5)]">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.year}</p>
                  </div>
                </div>
                <blockquote className="text-[var(--color-text-main)] italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <p className="text-sm font-semibold text-[var(--color-green-4)]">
                  {testimonial.currentRole}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-16 bg-[var(--color-green-5)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="mx-auto mb-6 text-[var(--color-green-1)]" size={64} />
          <h2 className="text-4xl font-heading font-bold mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-[var(--color-green-1)] mb-8">
            We're always looking for passionate students who want to make a difference. Start your journey with us today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-[var(--color-green-5)] hover:bg-[var(--color-green-1)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
