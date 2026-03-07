import { motion } from 'motion/react';
import { Users, Calendar, Clock, CheckCircle, Heart, Hammer, BookOpen, Smile } from 'lucide-react';
import { useState, FormEvent } from 'react';

const volunteerBenefits = [
  {
    icon: Heart,
    title: 'Make Real Impact',
    description: 'Help families achieve their dream of homeownership'
  },
  {
    icon: Users,
    title: 'Build Community',
    description: 'Meet like-minded students and create lasting friendships'
  },
  {
    icon: Hammer,
    title: 'Learn New Skills',
    description: 'Gain hands-on construction and leadership experience'
  },
  {
    icon: BookOpen,
    title: 'Earn Service Hours',
    description: 'Get NSTP or community service credit hours'
  }
];

const upcomingBuilds = [
  {
    id: 1,
    title: 'Weekend Build in Laguna',
    date: 'March 15-16, 2026',
    location: 'Barangay San Jose, Laguna',
    slots: '15 spots remaining',
    time: '7:00 AM - 4:00 PM',
    description: 'Help build homes for three families in partnership with the local community.'
  },
  {
    id: 2,
    title: 'Youth Summit Facilitation',
    date: 'March 22, 2026',
    location: 'DLSU Campus',
    slots: '5 facilitators needed',
    time: '9:00 AM - 5:00 PM',
    description: 'Lead workshops on community building and housing advocacy for high school students.'
  },
  {
    id: 3,
    title: 'Community Build in Tondo',
    date: 'April 5-7, 2026',
    location: 'Tondo, Manila',
    slots: '20 spots remaining',
    time: '8:00 AM - 5:00 PM',
    description: 'Three-day intensive build project. Perfect for those seeking deep immersion experience.'
  }
];

const requirements = [
  'Must be at least 18 years old (or 16 with parental consent)',
  'Physically able to perform construction work',
  'Attend mandatory orientation session',
  'Commit to the full duration of the volunteer activity',
  'Willing to work as part of a team',
  'No prior construction experience necessary'
];

export default function Volunteer() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

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
              Become a Volunteer
            </h1>
            <p className="text-xl text-[var(--color-green-1)] max-w-3xl mx-auto mb-8">
              Join hundreds of DLSU students making a difference in communities across Metro Manila. No experience needed—just bring your enthusiasm and willingness to help!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#signup"
                className="bg-white text-[var(--color-green-5)] hover:bg-[var(--color-green-1)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
              >
                Sign Up Now
              </a>
              <a
                href="#opportunities"
                className="bg-[var(--color-green-4)] hover:bg-[var(--color-green-3)] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
              >
                View Opportunities
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Why Volunteer With Us?
            </h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Volunteering with HFHGC is more than just construction work—it's a transformative experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteerBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--color-bg-main)] p-6 rounded-2xl scrapbook-border scrapbook-shadow text-center hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 bg-[var(--color-green-1)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-[var(--color-green-5)]" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[var(--color-text-main)]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Opportunities */}
      <section id="opportunities" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Upcoming Volunteer Opportunities
            </h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Choose from our scheduled builds and events. All volunteers receive training and supervision.
            </p>
          </div>

          <div className="space-y-6">
            {upcomingBuilds.map((build, index) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl scrapbook-border scrapbook-shadow hover:scale-[1.02] transition-transform"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-3">
                      {build.title}
                    </h3>
                    <p className="text-[var(--color-text-main)] mb-4">{build.description}</p>
                    <div className="space-y-2 text-sm text-[var(--color-text-main)]">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-[var(--color-green-4)]" size={18} />
                        <span className="font-semibold">{build.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-[var(--color-green-4)]" size={18} />
                        <span>{build.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="text-[var(--color-green-4)]" size={18} />
                        <span className="text-[var(--color-green-5)] font-bold">{build.slots}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start">
                    <a
                      href="#signup"
                      className="bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow whitespace-nowrap"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-[var(--color-green-1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Volunteer Requirements
            </h2>
            <p className="text-lg text-[var(--color-text-main)]">
              Before signing up, please review these requirements
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl scrapbook-border scrapbook-shadow">
            <ul className="space-y-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--color-green-5)] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[var(--color-text-main)]">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Volunteer Registration Form */}
      <section id="signup" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--color-bg-main)] p-8 md:p-12 rounded-2xl scrapbook-border scrapbook-shadow"
          >
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-8 text-center">
              Volunteer Registration Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  required
                  min="16"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                />
              </div>

              {/* DLSU Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="idNumber" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                    DLSU ID Number
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    placeholder="e.g., 12012345"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="college" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                    College/Department
                  </label>
                  <select
                    id="college"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                  >
                    <option value="">Select College</option>
                    <option value="COS">College of Science</option>
                    <option value="GCOE">Gokongwei College of Engineering</option>
                    <option value="RVRCOB">Ramon V. del Rosario College of Business</option>
                    <option value="CLA">College of Liberal Arts</option>
                    <option value="CED">College of Education</option>
                    <option value="BAGCED">Br. Andrew Gonzalez College of Education</option>
                    <option value="SOE">School of Economics</option>
                    <option value="COL">College of Law</option>
                    <option value="other">Other/Non-DLSU</option>
                  </select>
                </div>
              </div>

              {/* Volunteer Preferences */}
              <div>
                <label htmlFor="event" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Which event are you interested in? *
                </label>
                <select
                  id="event"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                >
                  <option value="">Select an event</option>
                  {upcomingBuilds.map((build) => (
                    <option key={build.id} value={build.id}>
                      {build.title} - {build.date}
                    </option>
                  ))}
                  <option value="general">General volunteer pool (notify me of opportunities)</option>
                </select>
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Special Skills or Experience
                </label>
                <textarea
                  id="skills"
                  rows={4}
                  placeholder="E.g., carpentry, electrical work, photography, social media, event planning, etc."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Why do you want to volunteer with HFHGC? *
                </label>
                <textarea
                  id="motivation"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                ></textarea>
              </div>

              {/* Emergency Contact */}
              <div className="bg-[var(--color-green-1)] p-6 rounded-xl">
                <h3 className="text-lg font-bold text-[var(--color-green-5)] mb-4">Emergency Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emergencyName" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="emergencyName"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyPhone" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="w-5 h-5 text-[var(--color-green-5)] border-gray-300 rounded focus:ring-[var(--color-green-4)] mt-1"
                  />
                  <label htmlFor="consent" className="text-sm text-[var(--color-text-main)]">
                    I consent to participate in HFHGC volunteer activities and understand the physical nature of the work involved. *
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="waiver"
                    required
                    className="w-5 h-5 text-[var(--color-green-5)] border-gray-300 rounded focus:ring-[var(--color-green-4)] mt-1"
                  />
                  <label htmlFor="waiver" className="text-sm text-[var(--color-text-main)]">
                    I agree to the liability waiver and will follow all safety protocols provided during orientation. *
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="photos"
                    className="w-5 h-5 text-[var(--color-green-5)] border-gray-300 rounded focus:ring-[var(--color-green-4)] mt-1"
                  />
                  <label htmlFor="photos" className="text-sm text-[var(--color-text-main)]">
                    I allow HFHGC to use photos/videos of me for promotional purposes.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow flex items-center justify-center gap-2 text-lg"
              >
                <Smile size={24} />
                Submit Registration
              </button>
            </form>

            {/* Success Message */}
            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 bg-[var(--color-green-1)] p-6 rounded-2xl border-4 border-[var(--color-green-5)] text-center"
              >
                <CheckCircle className="mx-auto mb-4 text-[var(--color-green-5)]" size={48} />
                <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-2">
                  Registration Successful!
                </h3>
                <p className="text-[var(--color-text-main)]">
                  Thank you for signing up! We'll send you a confirmation email with orientation details within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[var(--color-green-5)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Questions About Volunteering?
          </h2>
          <p className="text-xl text-[var(--color-green-1)] mb-8">
            We're here to help! Reach out to our Volunteer Coordinator for any questions or concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:volunteers@hfhgc.org"
              className="bg-white text-[var(--color-green-5)] hover:bg-[var(--color-green-1)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
            >
              Email Us
            </a>
            <a
              href="/contact"
              className="bg-[var(--color-green-4)] hover:bg-[var(--color-green-3)] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
            >
              Contact Page
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
