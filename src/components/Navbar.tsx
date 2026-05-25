import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-matte-black/90 backdrop-blur-md py-4 shadow-lg shadow-black/50 border-b border-gold-500/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <a href="#home" className="inline-block relative z-50">
          <Logo variant="navbar" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm tracking-widest uppercase text-gray-300 hover:text-gold-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="border border-gold-500 text-gold-500 px-6 py-2 uppercase text-xs tracking-widest hover:bg-gold-500 hover:text-black transition-all box-glow-hover"
          >
            Inquire Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-full left-0 w-full bg-charcoal-900/95 backdrop-blur-xl border-t border-gold-500/20 overflow-hidden md:hidden flex flex-col"
            style={{ top: '72px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-2xl sm:text-3xl font-display tracking-[0.2em] uppercase text-white hover:text-gold-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                className="mt-4 border border-gold-500 text-gold-500 px-8 py-3 uppercase text-sm tracking-widest hover:bg-gold-500 hover:text-black transition-all box-glow-hover"
              >
                Inquire Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
