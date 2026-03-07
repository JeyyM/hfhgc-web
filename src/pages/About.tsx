import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--color-text-main)] max-w-3xl mx-auto"
          >
            We are the Habitat for Humanity Green Chapter, a student organization based in De La Salle University Manila.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="polaroid -rotate-2">
            <img 
              src="https://picsum.photos/seed/team/600/500" 
              alt="Our Team" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">The Green Chapter Family</p>
          </div>
          
          <div>
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-4)] mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-[var(--color-text-main)]">
              <p>
                Founded by passionate Lasallians, the Habitat for Humanity Green Chapter (HFHGC) serves as the university arm of Habitat for Humanity Philippines.
              </p>
              <p>
                We believe that every family deserves a decent and safe place to live. Through volunteerism, advocacy, and fundraising, we mobilize the youth to address the housing crisis in the Philippines.
              </p>
              <p>
                Our core values are rooted in faith, community, and service. We don&apos;t just build houses; we build homes, communities, and hope.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-heading font-bold text-center text-[var(--color-green-5)] mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Service', color: 'bg-[var(--color-green-4)]', desc: 'Selfless dedication to helping others.' },
              { title: 'Community', color: 'bg-[var(--color-green-2)]', desc: 'Fostering strong bonds and teamwork.' },
              { title: 'Sustainability', color: 'bg-[var(--color-green-3)]', desc: 'Creating lasting impact for the future.' },
              { title: 'Empathy', color: 'bg-[var(--color-green-3)]', desc: 'Understanding and sharing the feelings of others.' }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`${value.color} p-6 rounded-xl text-white scrapbook-shadow transform rotate-${idx % 2 === 0 ? '1' : '-1'}`}
              >
                <h3 className="text-2xl font-heading font-bold mb-3">{value.title}</h3>
                <p className="text-white/90">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive Board */}
        <div>
          <h2 className="text-3xl font-heading font-bold text-center text-[var(--color-green-5)] mb-12">Meet the Executive Board</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 border-4 border-[var(--color-green-1)]">
                  <img 
                    src={`https://picsum.photos/seed/person${member}/200/200`} 
                    alt={`Board Member ${member}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-[var(--color-text-main)]">Jane Doe</h3>
                <p className="text-[var(--color-green-4)] font-medium">President</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
