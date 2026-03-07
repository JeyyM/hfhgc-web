import { motion } from 'motion/react';
import { FileText, Download, Calendar, Bell } from 'lucide-react';

export default function HomiesCenter() {
  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6"
          >
            Homie&apos;s Center
          </motion.h1>
          <p className="text-xl text-[var(--color-text-main)] max-w-3xl mx-auto">
            Welcome to the dedicated space for HFHGC members. Access resources, stay updated on news, and manage your volunteer journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Announcements */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-4)] flex items-center gap-3">
              <Bell className="text-[var(--color-green-4)]" /> Latest News
            </h2>
            
            {[1, 2, 3].map((news) => (
              <div key={news} className="bg-white p-6 rounded-2xl scrapbook-border scrapbook-shadow flex flex-col sm:flex-row gap-6">
                <div className="sm:w-1/3">
                  <img 
                    src={`https://picsum.photos/seed/news${news}/400/300`} 
                    alt="News thumbnail" 
                    className="w-full h-40 object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="sm:w-2/3 flex flex-col justify-center">
                  <span className="text-sm font-bold text-[var(--color-green-5)] mb-2">March {news + 10}, 2025</span>
                  <h3 className="text-xl font-heading font-bold text-[var(--color-text-main)] mb-3">General Assembly Meeting Updates</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    Thank you to everyone who attended our GA! Here&apos;s a quick recap of what was discussed regarding our upcoming build in Laguna and the new committee assignments.
                  </p>
                  <a href="#" className="text-[var(--color-green-4)] font-bold hover:underline self-start">Read Full Update</a>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Resources */}
          <div className="space-y-8">
            <div className="bg-[var(--color-green-1)] p-8 rounded-2xl scrapbook-shadow">
              <h2 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-6 flex items-center gap-3">
                <Calendar className="text-[var(--color-green-5)]" /> Upcoming Events
              </h2>
              <ul className="space-y-4">
                <li className="bg-white p-4 rounded-xl">
                  <p className="text-sm font-bold text-[var(--color-green-4)]">April 5, 2025</p>
                  <p className="font-bold text-[var(--color-text-main)]">Volunteer Orientation</p>
                  <p className="text-sm text-gray-600">Yuchengco Hall, DLSU</p>
                </li>
                <li className="bg-white p-4 rounded-xl">
                  <p className="text-sm font-bold text-[var(--color-green-4)]">April 12-13, 2025</p>
                  <p className="font-bold text-[var(--color-text-main)]">Laguna Build Weekend</p>
                  <p className="text-sm text-gray-600">Calauan, Laguna</p>
                </li>
              </ul>
            </div>

            <div className="bg-[var(--color-green-3)] p-8 rounded-2xl scrapbook-shadow text-white">
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                <FileText /> Resources
              </h2>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center justify-between bg-white/20 p-3 rounded-lg hover:bg-white/30 transition-colors">
                    <span>Volunteer Manual 2025</span>
                    <Download size={18} />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between bg-white/20 p-3 rounded-lg hover:bg-white/30 transition-colors">
                    <span>Waiver Form</span>
                    <Download size={18} />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between bg-white/20 p-3 rounded-lg hover:bg-white/30 transition-colors">
                    <span>Brand Guidelines</span>
                    <Download size={18} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
