import { motion } from 'motion/react';
import { Handshake, Heart, Building, Users } from 'lucide-react';

export default function Partnerships() {
  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6"
          >
            Partnerships & Sponsors
          </motion.h1>
          <p className="text-xl text-[var(--color-text-main)] max-w-3xl mx-auto">
            We believe that building homes is a collaborative effort. Join us in making a lasting impact on communities.
          </p>
        </div>

        {/* Why Partner With Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-8 rounded-2xl scrapbook-border scrapbook-shadow">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-4)] mb-6">Why Partner With Us?</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-[var(--color-green-1)] p-3 rounded-full text-[var(--color-green-5)]">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-main)]">Direct Impact</h3>
                  <p className="text-gray-600">Your support goes directly to funding materials, logistics, and community development programs.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-[var(--color-green-2)] p-3 rounded-full text-[var(--color-green-4)]">
                  <Building size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-main)]">Brand Visibility</h3>
                  <p className="text-gray-600">Gain exposure among the DLSU community and our wider network of volunteers and supporters.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-[var(--color-green-3)] p-3 rounded-full text-white">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-main)]">Employee Engagement</h3>
                  <p className="text-gray-600">Opportunities for your team to participate in corporate builds and volunteer activities.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="polaroid rotate-2">
            <img 
              src="https://picsum.photos/seed/partner/600/500" 
              alt="Corporate Build" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">Corporate Build 2024</p>
          </div>
        </div>

        {/* Previous Partners */}
        <div className="mb-24">
          <h2 className="text-3xl font-heading font-bold text-center text-[var(--color-green-5)] mb-12">Our Previous Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
              <div key={partner} className="bg-white aspect-video rounded-xl flex items-center justify-center p-6 scrapbook-border grayscale hover:grayscale-0 transition-all duration-300">
                <img 
                  src={`https://picsum.photos/seed/logo${partner}/200/100`} 
                  alt={`Partner ${partner}`}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--color-green-1)] rounded-3xl p-12 text-center scrapbook-shadow">
          <Handshake className="mx-auto text-[var(--color-green-5)] mb-6" size={64} />
          <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-6">Ready to Collaborate?</h2>
          <p className="text-xl text-[var(--color-text-main)] max-w-2xl mx-auto mb-8">
            Whether you&apos;re a corporation, a local business, or another student organization, we&apos;d love to work with you.
          </p>
          <a href="/contact" className="inline-block bg-[var(--color-green-4)] hover:bg-[var(--color-green-5)] text-white font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 scrapbook-shadow text-lg">
            Become a Partner
          </a>
        </div>

      </div>
    </div>
  );
}
