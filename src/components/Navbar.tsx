import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Projects', path: '/portfolio' },
  { name: 'Upcoming Projects', path: '/events' },
  { name: 'Homie Center', path: '/blog' },
  { name: 'Partnerships', path: '/partnerships' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-bg-main)] border-b-4 border-[var(--color-green-5)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img
                src="/HFHGC Logo Black Nav.png"
                alt="HFHGC Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors text-[var(--color-text-main)]',
                  location.pathname === link.path
                    ? 'bg-[var(--color-green-1)]'
                    : 'hover:bg-[var(--color-green-3)]'
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-green-5)] text-white rounded-full hover:bg-[var(--color-green-4)] transition-all font-semibold"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-text-main)] hover:bg-[var(--color-green-1)] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-bg-main)] border-b-4 border-[var(--color-green-5)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-main)]',
                  location.pathname === link.path
                    ? 'bg-[var(--color-green-1)]'
                    : 'hover:bg-[var(--color-green-3)]'
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Admin Login Button */}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mx-2 mt-4 px-4 py-3 bg-[var(--color-green-5)] text-white rounded-full hover:bg-[var(--color-green-4)] transition-all font-semibold"
            >
              <LogIn size={18} />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
