import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Partnerships', path: '/partnerships' },
  { name: 'Homie Center', path: '/homies-center' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--color-bg-main)] border-b-4 border-[var(--color-green-5)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button - Left Side */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[var(--color-text-main)] hover:bg-[var(--color-green-1)] focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" />
              </button>

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
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Slides from Left */}
      <div
        className={clsx(
          'fixed top-0 left-0 h-full w-80 bg-[var(--color-bg-main)] shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b-2 border-gray-200">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <img
                src="/HFHGC Logo Black Nav.png"
                alt="HFHGC Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-[var(--color-text-main)] hover:bg-[var(--color-green-1)]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-4 py-3 rounded-md text-base font-medium transition-colors text-[var(--color-text-main)]',
                  location.pathname === link.path
                    ? 'bg-[var(--color-green-1)]'
                    : 'hover:bg-[var(--color-green-3)]'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
