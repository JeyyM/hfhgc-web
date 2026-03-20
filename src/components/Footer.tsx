import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-green-5)] text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-8">

          {/* Logo + Info */}
          <div className="flex-shrink-0">
            <img
              src="/HFHGC Logo White.png"
              alt="HFHGC Logo"
              className="h-24 w-auto object-contain mb-3"
            />
            <p className="text-sm text-white mb-4">
              De La Salle University Manila<br />
              Building homes, building hope.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[var(--color-green-2)] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[var(--color-green-2)] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[var(--color-green-2)] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@hfhgc.org" className="text-white hover:text-[var(--color-green-2)] transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links — horizontal wrap */}
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/team" className="hover:underline">Our Team</Link></li>
              <li><Link to="/portfolio" className="hover:underline">Projects</Link></li>
              <li><Link to="/events" className="hover:underline">Upcoming Projects</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/partnerships" className="hover:underline">Partnerships</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link to="/login" className="hover:underline text-white font-bold">Admin Login</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-[#3a8237] text-center text-sm text-white">
          <p>&copy; {new Date().getFullYear()} Habitat for Humanity Green Chapter DLSU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

