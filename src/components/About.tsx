import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ─── Floating Glassmorphism Badge ─── */
interface BadgeProps {
  label: string;
  sub: string;
  delay: number;
  className: string;
}
function GlassBadge({ label, sub, delay, className }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      animate={{ y: [0, -8, 0] }}
      className={`absolute z-30 backdrop-blur-md bg-black/55 border border-gold-500/30 rounded-lg px-4 py-3 shadow-[0_0_20px_rgba(212,175,55,0.12)] ${className}`}
      style={{ animation: `float-badge ${3.5 + delay}s ease-in-out infinite` }}
    >
      <p className="text-gold-400 font-display tracking-[0.1em] text-lg leading-none">{label}</p>
      <p className="text-gray-400 text-[10px] tracking-[0.25em] uppercase mt-1">{sub}</p>
    </motion.div>
  );
}

/* ─── Stat Item with animated counter ─── */
interface StatProps { value: number; suffix: string; label: string; delay: number; }
function StatItem({ value, suffix, label, delay }: StatProps) {
  const { count, ref } = useCounter(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-start"
    >
      {/* Gold underline that expands on hover */}
      <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-gradient-to-r from-gold-400 to-transparent transition-all duration-500 group-hover:w-full" />
      <div
        className="text-4xl md:text-5xl font-display tracking-wide text-white pb-1 transition-all duration-300"
        style={{ textShadow: '0 0 0 transparent' }}
        onMouseEnter={e => (e.currentTarget.style.textShadow = '0 0 25px rgba(212,175,55,0.35)')}
        onMouseLeave={e => (e.currentTarget.style.textShadow = '0 0 0 transparent')}
      >
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-gold-500/80 mt-1 font-semibold">{label}</div>
    </motion.div>
  );
}

/* ─── Ghost BG Word ─── */
function GhostWord({ word, className }: { word: string; className: string }) {
  return (
    <div
      className={`absolute select-none pointer-events-none font-display leading-none ${className}`}
      style={{ WebkitTextStroke: '1px rgba(229,193,88,0.06)', color: 'transparent' }}
    >
      {word}
    </div>
  );
}

/* ─── Particle field ─── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  dur: Math.random() * 10 + 7,
  delay: Math.random() * 5,
}));

/* ─── Main About Component ─── */
export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-28 md:py-36 bg-matte-black relative overflow-hidden"
    >
      {/* ── Ghost background typography ── */}
      <GhostWord word="WOW"        className="text-[22vw] top-[-4%]  left-[-3%]   opacity-100" />
      <GhostWord word="LUXURY"     className="text-[14vw] bottom-[5%] right-[-2%]  opacity-100" />
      <GhostWord word="CINEMATIC"  className="text-[9vw]  top-[42%]  left-[30%]   opacity-100" />

      {/* ── Ambient gold bloom ── */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-gold-500/4 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Mouse-follow golden glow ── */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full pointer-events-none z-[1]"
        style={{
          left: glowX,
          top: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold-400"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.18 }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.22, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── Gold diagonal light streak ── */}
      <div
        className="absolute top-0 right-[18%] w-[1px] h-[45%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.25), transparent)' }}
      />

      {/* ════════════════════════════════════════════ */}
      {/*  MAIN GRID                                  */}
      {/* ════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

        {/* ── LEFT: Cinematic layered image stack ── */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[680px]">

          {/* Main tall image — slight CCW tilt, expands on hover */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ scale: 1.03, rotate: -1, zIndex: 25 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-[68%] h-[75%] rounded-lg overflow-hidden border border-white/8 shadow-2xl z-10 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury Wedding Setup"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          {/* Secondary square image — CW tilt, bottom-right overlap */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ scale: 1.04, rotate: 2, zIndex: 25 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 right-0 w-[58%] h-[55%] rounded-lg overflow-hidden border-2 border-matte-black shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-20 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
              alt="Corporate Gala"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-black/55 to-transparent" />
          </motion.div>

          {/* Mini embedded luxury image clip — top-right accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 25 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[8%] right-[-2%] w-[36%] h-[34%] rounded-lg overflow-hidden border border-gold-500/25 shadow-[0_0_25px_rgba(212,175,55,0.15)] z-15 cursor-pointer"
          >
            {/* Animated high-quality image replacing the video */}
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
              alt="Live Event"
              className="w-full h-full object-cover animate-[pulse_10s_ease-in-out_infinite_alternate]"
              style={{ filter: 'brightness(0.8) saturate(1.2)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
            {/* "LIVE" badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-gold-500/25 rounded px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-[8px] tracking-[0.25em] text-gold-400 font-bold uppercase">Live Events</span>
            </div>
          </motion.div>

          {/* Floating glass badges */}
          <GlassBadge label="500+" sub="Events Executed" delay={0.4} className="bottom-[18%] sm:bottom-[28%] left-0 sm:left-[-8%]" />
          <GlassBadge label="VIP" sub="Experiences" delay={0.55} className="top-[50%] right-0 sm:right-[-6%]" />

          {/* Vertical gold accent line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[10%] left-[-28px] w-[1.5px] h-[55%] origin-top"
            style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)' }}
          />

          {/* Decorative corner bracket */}
          <div className="absolute top-[-10px] left-[-10px] w-8 h-8 border-t-2 border-l-2 border-gold-500/50 rounded-tl" />
          <div className="absolute bottom-[-10px] right-[-10px] w-8 h-8 border-b-2 border-r-2 border-gold-500/50 rounded-br" />
        </div>

        {/* ── RIGHT: Text content ── */}
        <div className="relative">

          {/* Eyebrow line reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[1.5px] w-10 origin-left bg-gradient-to-r from-gold-500 to-gold-400"
            />
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span className="uppercase tracking-[0.28em] text-gold-500 text-[11px] font-bold">
              About WOW MAKERS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-display tracking-[0.04em] leading-[1.1] md:leading-[0.95] mb-6 md:mb-8"
          >
            <span className="text-white block">ELEVATING MOMENTS</span>
            <span className="text-white block">INTO</span>
            <span
              className="text-gradient block mt-1"
              style={{ textShadow: '0 0 45px rgba(212,175,55,0.2)' }}
            >
              TIMELESS MEMORIES.
            </span>
          </motion.h2>

          {/* Horizontal gold animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left h-[1px] w-full mb-8"
            style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.5), transparent)' }}
          />

          {/* Body copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 md:space-y-5 text-gray-400 text-sm md:text-base leading-relaxed font-light"
          >
            <p>
              At <span className="text-gold-400 font-semibold tracking-wide">WOW MAKERS</span>, we don't just plan events — we architect multi-sensory experiences that transcend expectation. With over a decade of mastery across the globe's most prestigious luxury weddings, corporate summits, and exclusive VIP gatherings, we guarantee execution that is nothing short of flawless.
            </p>
            <p>
              Our philosophy pairs relentless attention to detail with avant-garde design thinking — every venue we touch becomes a cinematic masterpiece. We work exclusively with brands and individuals who demand absolute perfection.
            </p>
          </motion.div>

          {/* Two floating badges inline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {['Luxury Weddings', 'Corporate Excellence', 'Artist Management', 'Experiential Design'].map(tag => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.22em] uppercase font-semibold text-gray-400 border border-white/10 backdrop-blur-sm bg-white/3 px-3 py-1.5 rounded-sm hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* ── Animated stats row ── */}
          <div className="mt-10 md:mt-12 pt-8 border-t border-white/8 flex items-start gap-8 md:gap-10 flex-wrap">
            <StatItem value={10}  suffix="+"  label="Years Legacy"     delay={0.45} />
            <StatItem value={500} suffix="+"  label="Events Executed"  delay={0.55} />
            <StatItem value={15}  suffix=""   label="Global Cities"    delay={0.65} />
            <StatItem value={98}  suffix="%"  label="Client Retention" delay={0.75} />
          </div>

          {/* CTA */}
          <motion.a
            href="#services"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="group inline-flex items-center justify-center w-full sm:w-auto gap-2.5 mt-10 px-7 py-3.5 border border-gold-500/30 hover:border-gold-400/70 bg-black/30 backdrop-blur-sm text-xs font-bold uppercase tracking-[0.25em] text-white hover:text-gold-400 rounded-sm transition-all duration-300 box-glow-hover"
          >
            <span>Discover Our Services</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold-400" />
          </motion.a>
        </div>

      </div>

      {/* ── Floating badge animation keyframes ── */}
      <style>{`
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
