import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Home,
  Info,
  Users,
  FolderKanban,
  Handshake,
  MessageSquare,
  Settings,
  ArrowRight,
} from 'lucide-react';

const sections = [
  { label: 'Site Settings', desc: 'Email, phone, social links, org name', path: '/admin/settings', icon: Settings, color: 'bg-gray-600' },
  { label: 'Home Page', desc: 'Hero, mission cards, impact stats', path: '/admin/home', icon: Home, color: 'bg-emerald-600' },
  { label: 'About Page', desc: 'Story section, core values', path: '/admin/about', icon: Info, color: 'bg-blue-600' },
  { label: 'Team', desc: 'Executive, committee, alumni', path: '/admin/team', icon: Users, color: 'bg-purple-600' },
  { label: 'Projects', desc: 'Upcoming events & completed builds', path: '/admin/projects', icon: FolderKanban, color: 'bg-teal-600' },
  { label: 'Partnerships', desc: 'Partners, tiers, testimonials', path: '/admin/partnerships', icon: Handshake, color: 'bg-rose-600' },
  { label: 'Homie Center', desc: 'Testimonials, announcements, FAQs', path: '/admin/homie-center', icon: MessageSquare, color: 'bg-indigo-600' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-[var(--color-green-5)]">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage all content across your HFHGC website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {sections.map((s, i) => (
          <motion.div
            key={s.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={s.path}
              className="group block bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-[var(--color-green-3)] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`${s.color} w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <s.icon className="text-white" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-gray-900 group-hover:text-[var(--color-green-5)] transition-colors">
                    {s.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">{s.desc}</p>
                </div>
                <ArrowRight size={18} className="text-gray-300 group-hover:text-[var(--color-green-5)] transition-colors mt-1" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
