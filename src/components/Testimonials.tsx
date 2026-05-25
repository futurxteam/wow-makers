import { motion } from 'motion/react';

const testimonials = [
  {
    quote: "Wow Makers redefined what a corporate summit could be. The execution was flawless, the aesthetics were pure luxury.",
    author: "Sarah Jenkins",
    role: "CMO, Nexus Enterprise"
  },
  {
    quote: "Our destination wedding in Tuscany was an absolute dream. Every single detail was meticulously crafted.",
    author: "Elena & Marcus",
    role: "Private Clients"
  },
  {
    quote: "The only agency we trust for our global brand launches. Their attention to lighting and sound is revolutionary.",
    author: "David Chen",
    role: "Director of Events, Aura Fashion"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-matte-black relative overflow-hidden">
      <div className="absolute -right-64 -top-64 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display tracking-widest text-white">
            CLIENT <span className="text-gold-500">VOICES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-charcoal-900 border border-white/5 p-8 rounded-sm hover:border-gold-500/30 transition-all duration-300 relative group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-6xl text-gold-500 group-hover:opacity-30 transition-opacity">
                "
              </div>
              <p className="text-gray-300 font-light leading-relaxed mb-8 h-32 relative z-10">
                "{t.quote}"
              </p>
              <div className="flex items-center space-x-4 border-t border-white/10 pt-6">
                <div className="w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center border border-gold-500/20">
                  <span className="text-gold-500 font-display text-lg">{t.author[0]}</span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm tracking-wide">{t.author}</h4>
                  <p className="text-gold-500/80 text-xs uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
