import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Info,
  Users,
  FolderKanban,
  Handshake,
  MessageSquare,
  Settings,
  LogOut,
  Eye,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  { label: 'Home Page', path: '/admin/home', icon: Home },
  { label: 'About Page', path: '/admin/about', icon: Info },
  { label: 'Team', path: '/admin/team', icon: Users },
  { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { label: 'Partnerships', path: '/admin/partnerships', icon: Handshake },
  { label: 'Homie Center', path: '/admin/homie-center', icon: MessageSquare },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('hfhgc_admin_token');
    const email = localStorage.getItem('hfhgc_admin_email');
    if (!token) {
      navigate('/login');
      return;
    }
    if (email) setAdminEmail(email);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hfhgc_admin_token');
    localStorage.removeItem('hfhgc_admin_email');
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r-2 border-gray-200 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-green-5)] rounded-lg flex items-center justify-center">
              <LayoutDashboard className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-heading font-bold text-[var(--color-green-5)] text-lg leading-tight">
                HFHGC Admin
              </h1>
              <p className="text-xs text-gray-500 truncate max-w-[150px]">{adminEmail}</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-[var(--color-green-5)] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-gray-200 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Eye size={18} />
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <span className="font-heading font-bold text-[var(--color-green-5)]">HFHGC Admin</span>
          <div className="w-10" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
