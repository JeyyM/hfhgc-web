import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-green-5)] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/HFHGC Logo White.png"
                alt="HFHGC Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[var(--color-green-1)] mb-6">
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
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-[var(--color-green-2)]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/team" className="hover:underline">Our Team</Link></li>
              <li><Link to="/portfolio" className="hover:underline">Projects</Link></li>
              <li><Link to="/events" className="hover:underline">Upcoming Projects</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/partnerships" className="hover:underline">Partnerships</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link to="/login" className="hover:underline text-[var(--color-green-2)]">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-[var(--color-green-2)]">Newsletter</h3>
            <p className="text-sm text-[var(--color-green-1)] mb-4">Subscribe to our newsletter for updates on our projects and events.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 w-full rounded-l-md bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-green-2)]"
              />
              <button 
                type="submit" 
                className="bg-[var(--color-green-4)] hover:bg-[var(--color-green-5)] px-4 py-2 rounded-r-md font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#3a8237] text-center text-sm text-[var(--color-green-2)]">
          <p>&copy; {new Date().getFullYear()} Habitat for Humanity Green Chapter DLSU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
