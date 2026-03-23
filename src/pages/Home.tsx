import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Home as HomeIcon, Users, Mail, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-[var(--color-green-5)] leading-tight mb-6">
                Building <span className="text-[var(--color-green-4)]">Homes</span>,<br />
                Building <span className="text-[var(--color-green-2)]">Hope</span>.
              </h1>
              <p className="text-xl text-[var(--color-text-main)] mb-8 max-w-lg">
                Habitat for Humanity Green Chapter in De La Salle University Manila is dedicated to creating sustainable communities and empowering families.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow">
                  Our Projects
                </Link>
                <Link to="/contact" className="bg-[var(--color-green-2)] hover:bg-[var(--color-green-4)] text-[var(--color-text-main)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow flex items-center gap-2">
                  Get Involved <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="polaroid rotate-3 z-20 relative">
                <img 
                  src="https://picsum.photos/seed/habitat/600/400" 
                  alt="Volunteers building a home" 
                  className="w-full h-auto object-cover rounded-sm"
                  referrerPolicy="no-referrer"
                />
                <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">Together we build!</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-green-4)] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-green-1)] rounded-full opacity-30 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission/Vision Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <HomeIcon className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/90">
                A world where everyone has a decent place to live. We envision communities where families thrive in safe, affordable homes.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/90">
                Seeking to put God&apos;s love into action, Habitat for Humanity brings people together to build homes, communities and hope.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Our Community</h3>
              <p className="text-white/90">
                Driven by passionate DLSU students, we are a family of volunteers dedicated to making a tangible difference in society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Our Impact</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Real numbers, real change. See the difference we're making together in communities across Metro Manila.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="text-white" size={32} />
              </div>
              <p className="text-5xl font-heading font-bold text-white mb-2">50+</p>
              <p className="text-white/90 font-semibold">Homes Built</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <p className="text-5xl font-heading font-bold text-white mb-2">200+</p>
              <p className="text-white/90 font-semibold">Families Helped</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <p className="text-5xl font-heading font-bold text-white mb-2">1,500+</p>
              <p className="text-white/90 font-semibold">Volunteers</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="text-white" size={32} />
              </div>
              <p className="text-5xl font-heading font-bold text-white mb-2">10K+</p>
              <p className="text-white/90 font-semibold">Volunteer Hours</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 bg-[var(--color-green-1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Recent Projects</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Take a look at what we&apos;ve been working on recently. Every project is a step towards a better future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden scrapbook-shadow transition-transform hover:-translate-y-2">
                <img 
                  src={`https://picsum.photos/seed/project${item}/400/300`} 
                  alt={`Project ${item}`} 
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6">
                  <span className="text-xs font-bold text-[var(--color-green-4)] uppercase tracking-wider">Community Build</span>
                  <h3 className="text-xl font-heading font-bold text-[var(--color-text-main)] mt-2 mb-3">Project Hope {item}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    A collaborative effort to build sustainable housing for families in need.
                  </p>
                  <Link to="/projects" className="text-[var(--color-green-5)] font-bold flex items-center gap-1 hover:text-[var(--color-green-4)] transition-colors">
                    Read more <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/projects" className="inline-block bg-white text-[var(--color-green-5)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-[3px_3px_0px_rgba(0,0,0,0.12)] border-2 border-[var(--color-green-5)]">
              View All Projects
            </Link>
          </div>
        </div>
        </section>

      {/* Contact Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-[var(--color-text-main)] max-w-2xl mx-auto mb-10">
              Whether you want to volunteer, partner with us, or just learn more about what we do — we'd love to hear from you. Every conversation is the start of something meaningful.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block bg-[var(--color-green-5)] text-white font-bold py-4 px-10 rounded-full hover:bg-[var(--color-green-4)] transition-all hover:scale-105 scrapbook-shadow text-lg"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="inline-block bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)] font-bold py-4 px-10 rounded-full hover:bg-[var(--color-green-1)] transition-all hover:scale-105 text-lg shadow-[3px_3px_0px_rgba(0,0,0,0.12)]"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Email Us</h3>
                <p className="text-white/80 text-sm mb-3">We reply within 24 hours on school days.</p>
                <a href="mailto:hfhgcdlsu@gmail.com" className="text-white font-semibold hover:underline">
                  hfhgcdlsu@gmail.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Find Us</h3>
                <p className="text-white/80 text-sm mb-3">Based at the heart of Manila's premier university.</p>
                <p className="text-white font-semibold">De La Salle University, Taft Ave, Manila</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-[var(--color-green-5)] p-8 rounded-2xl scrapbook-shadow"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Follow Us</h3>
                <p className="text-white/80 text-sm mb-3">Stay updated on our latest builds and events.</p>
                <a href="https://facebook.com/hfhgcdlsu" target="_blank" rel="noreferrer" className="text-white font-semibold hover:underline">
                  @hfhgcdlsu
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}