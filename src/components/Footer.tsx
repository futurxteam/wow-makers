import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-matte-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 font-sans md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="md:col-span-2">
          <a href="#home" className="inline-block mb-8">
            <Logo variant="footer" />
          </a>
          <p className="text-gray-400 font-light max-w-sm mb-8">
            The global vanguard of premium event management. We architect reality into unforgettable cinematic experiences.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-display tracking-widest uppercase mb-6 border-b border-white/10 pb-2">Menu</h4>
          <ul className="space-y-4">
            {['Home', 'About Portfolio', 'Services', 'Gallery', 'Contact'].map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase().split(' ')[0]}`} className="text-gray-400 hover:text-gold-500 transition-colors uppercase tracking-wider text-xs">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-display tracking-widest uppercase mb-6 border-b border-white/10 pb-2">Legal</h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors uppercase tracking-wider text-xs">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors uppercase tracking-wider text-xs">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors uppercase tracking-wider text-xs">Cookie Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
        <p className="text-gray-600 text-xs uppercase tracking-widest mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Wow Makers. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs uppercase tracking-widest">
          Designed for Excellence
        </p>
      </div>
    </footer>
  );
}
