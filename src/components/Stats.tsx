import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const stats = [
  { id: 1, text: 'Exclusive Events', value: 250, suffix: '+' },
  { id: 2, text: 'Corporate Partners', value: 40, suffix: '+' },
  { id: 3, text: 'Global Cities', value: 12, suffix: '' },
  { id: 4, text: 'Years Experience', value: 5, suffix: '+' },
];

export function Stats() {
  const [inView, setInView] = useState(false);

  return (
    <section className="py-20 border-y border-white/10 bg-gradient-to-b from-charcoal-900 to-matte-black relative overflow-hidden">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-1/2 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/5 relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setInView(true)}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center border-none"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 flex items-baseline">
              <span>{stat.value}</span>
              <span className="text-gold-500 text-3xl md:text-4xl">{stat.suffix}</span>
            </div>
            <p className="text-xs md:text-sm uppercase tracking-widest text-gray-400">
              {stat.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
