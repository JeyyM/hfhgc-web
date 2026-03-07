import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Users, 
  Image, 
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
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

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, action: 'Blog post published', item: 'March Build Success', time: '2 hours ago' },
    { id: 2, action: 'Event created', item: 'Spring Fundraiser Gala', time: '5 hours ago' },
    { id: 3, action: 'Project updated', item: 'Project Hope 3', time: '1 day ago' },
    { id: 4, action: 'Team member added', item: 'John Dela Cruz', time: '2 days ago' },
  ];

  // Mock statistics
  const stats = [
    { label: 'Total Blog Posts', value: '24', icon: FileText, color: 'bg-blue-500' },
    { label: 'Upcoming Events', value: '6', icon: Calendar, color: 'bg-green-500' },
    { label: 'Active Volunteers', value: '142', icon: Users, color: 'bg-purple-500' },
    { label: 'Gallery Images', value: '389', icon: Image, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-green-1)]">
      {/* Admin Header */}
      <header className="bg-white border-b-2 border-[var(--color-green-3)] scrapbook-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                <LayoutDashboard className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-[var(--color-green-5)]">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {adminEmail}</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 scrapbook-border scrapbook-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <span className="text-3xl font-heading font-bold text-[var(--color-green-5)]">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl p-6 scrapbook-border scrapbook-shadow"
          >
            <h2 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/admin/activities/new"
                className="flex items-center gap-4 p-4 border-2 border-[var(--color-green-3)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors group"
              >
                <div className="w-12 h-12 bg-[var(--color-green-5)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-main)]">New Activity</h3>
                  <p className="text-sm text-gray-600">Create blog post or project</p>
                </div>
              </Link>

              <Link
                to="/admin/events/new"
                className="flex items-center gap-4 p-4 border-2 border-[var(--color-green-3)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-main)]">Schedule Event</h3>
                  <p className="text-sm text-gray-600">Add upcoming event</p>
                </div>
              </Link>

              <Link
                to="/admin/content"
                className="flex items-center gap-4 p-4 border-2 border-[var(--color-green-3)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors group"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Edit className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-main)]">Edit Content</h3>
                  <p className="text-sm text-gray-600">Manage all site content</p>
                </div>
              </Link>

              <Link
                to="/admin/settings"
                className="flex items-center gap-4 p-4 border-2 border-[var(--color-green-3)] rounded-lg hover:bg-[var(--color-green-1)] transition-colors group"
              >
                <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-main)]">Settings</h3>
                  <p className="text-sm text-gray-600">Configure site settings</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 scrapbook-border scrapbook-shadow"
          >
            <h2 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-4">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0">
                  <div className="w-2 h-2 bg-[var(--color-green-5)] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--color-text-main)]">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.item}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Content Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-xl p-6 scrapbook-border scrapbook-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-[var(--color-green-5)]">Recent Posts & Projects</h2>
            <Link
              to="/admin/content"
              className="text-sm text-[var(--color-green-5)] hover:text-[var(--color-green-4)] font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[var(--color-green-3)]">
                  <th className="text-left py-3 px-4 text-sm font-bold text-[var(--color-text-main)]">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-[var(--color-text-main)]">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-[var(--color-text-main)]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-[var(--color-text-main)]">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-[var(--color-text-main)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: 'March Build Success', type: 'Blog', status: 'Published', date: 'Mar 5, 2026' },
                  { title: 'Project Hope 3', type: 'Project', status: 'Active', date: 'Mar 3, 2026' },
                  { title: 'Volunteer Orientation', type: 'Blog', status: 'Draft', date: 'Mar 1, 2026' },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-[var(--color-green-1)] transition-colors">
                    <td className="py-3 px-4 text-sm font-semibold text-[var(--color-text-main)]">{item.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs font-bold bg-[var(--color-green-2)] text-[var(--color-green-5)] rounded-full">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        item.status === 'Published' ? 'bg-green-100 text-green-700' :
                        item.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 text-blue-500 hover:bg-blue-100 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-500 hover:bg-red-100 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
