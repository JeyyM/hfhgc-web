import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LogOut,
  Plus,
  FileText,
  Calendar,
  Eye
} from 'lucide-react';

export default function AdminContent() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('hfhgc_admin_token');
    const email = localStorage.getItem('hfhgc_admin_email');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (email) {
      setAdminEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hfhgc_admin_token');
    localStorage.removeItem('hfhgc_admin_email');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-green-1)] via-white to-[var(--color-green-2)]">
      {/* Header */}
      <header className="bg-white border-b-2 border-[var(--color-green-3)] scrapbook-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-[var(--color-green-5)]">Content Management</h1>
                <p className="text-sm text-gray-600">Logged in as {adminEmail}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-main)] hover:text-[var(--color-green-5)] transition-colors"
              >
                <Eye size={18} />
                <span className="hidden sm:inline">View Site</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
            What would you like to create?
          </h2>
          <p className="text-lg text-[var(--color-text-main)]">
            Choose an option below to add new content to the website
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Project */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/admin/activities/new"
              className="block bg-white rounded-2xl p-8 scrapbook-border scrapbook-shadow hover:scale-105 transition-transform group"
            >
              <div className="w-20 h-20 bg-[var(--color-green-5)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-green-4)] transition-colors">
                <FileText className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-3">
                Create Project
              </h3>
              <p className="text-[var(--color-text-main)] mb-6">
                Document a project or share a story. Add images, content, and details from your builds, events, and community work.
              </p>
              <div className="flex items-center gap-2 text-[var(--color-green-5)] font-bold group-hover:gap-4 transition-all">
                <span>Get Started</span>
                <Plus size={20} />
              </div>
            </Link>
          </motion.div>

          {/* Create Event */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/admin/events/new"
              className="block bg-white rounded-2xl p-8 scrapbook-border scrapbook-shadow hover:scale-105 transition-transform group"
            >
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Calendar className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-3">
                Schedule Event
              </h3>
              <p className="text-[var(--color-text-main)] mb-6">
                Add a new event to the calendar. Set dates, locations, and details for upcoming builds, meetings, or workshops.
              </p>
              <div className="flex items-center gap-2 text-blue-500 font-bold group-hover:gap-4 transition-all">
                <span>Get Started</span>
                <Plus size={20} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl p-6 scrapbook-border"
        >
          <h4 className="font-heading font-bold text-[var(--color-green-5)] mb-3 text-lg">
            💡 Quick Tips
          </h4>
          <ul className="space-y-2 text-sm text-[var(--color-text-main)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-green-5)] font-bold">•</span>
              <span>Use high-quality images (at least 800px wide) for better visual impact</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-green-5)] font-bold">•</span>
              <span>Write compelling titles that capture the essence of your story</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-green-5)] font-bold">•</span>
              <span>Include details like dates, locations, and participant counts for events</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-green-5)] font-bold">•</span>
              <span>You can use HTML tags in content for formatting (headings, lists, bold text, etc.)</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
