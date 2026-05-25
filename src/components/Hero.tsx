import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-matte-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
          alt="Luxury Event"
          className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-block mb-4"
        >
          <span className="text-gold-500 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
            Premium Event Management
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display tracking-wide leading-[0.9] text-white mb-8"
        >
          WE DON'T ORGANIZE EVENTS. <br />
          <span className="text-gradient">WE CREATE EXPERIENCES.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a
            href="#contact"
            className="flex items-center space-x-2 bg-gold-500 text-black px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-white transition-colors duration-300 box-glow"
          >
            <span>Book Consultation</span>
            <ChevronRight size={18} />
          </a>
          <a
            href="#about"
            className="flex items-center space-x-2 border border-white/30 hover:border-gold-500 bg-black/20 backdrop-blur-sm text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:text-gold-500 transition-colors duration-300"
          >
            <span>Explore Events</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Scroll to discover</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-1/2 bg-gold-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
