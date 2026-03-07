import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6"
          >
            Contact Us
          </motion.h1>
          <p className="text-xl text-[var(--color-text-main)] max-w-3xl mx-auto">
            Have questions about our projects, want to partner with us, or just want to say hi? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl scrapbook-border scrapbook-shadow">
              <h2 className="text-2xl font-heading font-bold text-[var(--color-green-4)] mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-green-1)] p-3 rounded-full text-[var(--color-green-5)]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-main)]">Address</h3>
                    <p className="text-gray-600">De La Salle University<br />2401 Taft Ave, Malate<br />Manila, 1004 Metro Manila</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-green-2)] p-3 rounded-full text-[var(--color-green-4)]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-main)]">Email</h3>
                    <p className="text-gray-600">hfhgc@dlsu.edu.ph</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-green-3)] p-3 rounded-full text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-main)]">Phone</h3>
                    <p className="text-gray-600">+63 912 345 6789</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="polaroid -rotate-2">
              <img 
                src="https://picsum.photos/seed/contact/600/400" 
                alt="Our Office" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">Drop by and say hi!</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl scrapbook-border scrapbook-shadow">
            <h2 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-green-5)] focus:ring-0 transition-colors"
                  placeholder="Juan Dela Cruz"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-green-5)] focus:ring-0 transition-colors"
                  placeholder="juan@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">Subject</label>
                <select 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-green-5)] focus:ring-0 transition-colors bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Partnership</option>
                  <option>Volunteering</option>
                  <option>Donation</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-green-5)] focus:ring-0 transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-4 px-8 rounded-xl transition-transform hover:scale-[1.02] scrapbook-shadow flex items-center justify-center gap-2 text-lg"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
