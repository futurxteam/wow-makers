import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  img: string;
  num: string;
  hoverText: string;
  size: 'featured' | 'standard';
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: 'Luxury Weddings',
    desc: 'Curated timeless celebrations with absolute cinematic grandeur and meticulous planning.',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
    num: '01',
    hoverText: 'EXPLORE',
    size: 'featured'
  },
  {
    id: 2,
    title: 'Corporate Events',
    desc: 'Experiences built for ambitious brands, high-profile galas, summits, and launches.',
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    num: '02',
    hoverText: 'VIEW EXPERIENCE',
    size: 'standard'
  },
  {
    id: 3,
    title: 'Artist Management',
    desc: 'Where talent meets the spotlight. A-list celebrity bookings and theatrical show running.',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop',
    num: '03',
    hoverText: 'ENTER',
    size: 'standard'
  },
  {
    id: 4,
    title: 'Destination Weddings',
    desc: 'Bespoke romantic experiences crafted across breathtaking, sun-kissed locations.',
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1964&auto=format&fit=crop',
    num: '04',
    hoverText: 'DISCOVER',
    size: 'standard'
  },
  {
    id: 5,
    title: 'Stage & Sound',
    desc: 'Immersive production experiences, high-fidelity sound, and custom laser array rigs.',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop',
    num: '05',
    hoverText: 'DISCOVER',
    size: 'standard'
  },
  {
    id: 6,
    title: 'Brand Activations',
    desc: 'Designed to leave lasting impressions and deeply connect premium products to customers.',
    img: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=2070&auto=format&fit=crop',
    num: '06',
    hoverText: 'ENTER',
    size: 'standard'
  }
];


interface CardProps {
  service: ServiceItem;
  index: number;
  onHover: (text: string | null) => void;
  onHoverIndex: (index: number | null) => void;
}

function ServicesCard({ service, index, onHover, onHoverIndex }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(service.hoverText);
    onHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
    onHoverIndex(null);
    setCoords({ x: 0, y: 0 });
  };

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const showDetails = isHovered || isTouchDevice;

  // Dynamic grid column and height definitions for an editorial asymmetrical rhythm
  let gridClasses = "";
  if (service.size === 'featured') {
    gridClasses = "lg:col-span-8 lg:row-span-2 md:col-span-2 md:row-span-2 aspect-[4/5] sm:aspect-square md:aspect-auto md:h-full";
  } else {
    gridClasses = "lg:col-span-4 lg:row-span-1 md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto md:h-full";
  }

  // 3D tilt coordinates
  const rotateX = !isTouchDevice && isHovered ? coords.y * -8 : 0;
  const rotateY = !isTouchDevice && isHovered ? coords.x * 8 : 0;
  const imgX = !isTouchDevice && isHovered ? coords.x * -10 : 0;
  const imgY = !isTouchDevice && isHovered ? coords.y * -10 : 0;
  const glowX = isHovered ? (coords.x + 0.5) * 100 : 50;
  const glowY = isHovered ? (coords.y + 0.5) * 100 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-lg overflow-hidden border border-white/5 cursor-none group transition-all duration-500 ease-out flex flex-col justify-end ${gridClasses}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
        boxShadow: isHovered 
          ? '0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 55, 0.18)' 
          : 'none',
        borderColor: isHovered ? 'rgba(229, 193, 88, 0.4)' : 'rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Background image scale/parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: `scale(${!isTouchDevice && isHovered ? 1.12 : 1.02}) translate3d(${imgX}px, ${imgY}px, 0)`,
          }}
          loading="lazy"
        />
      </div>

      {/* Dark Blur Overlay - tuned gradient and opacity to preserve image visibility */}
      <div
        className="absolute inset-0 transition-all duration-500 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"
        style={{
          backdropFilter: showDetails ? 'blur(5px)' : 'blur(0px)',
          backgroundColor: showDetails ? 'rgba(7, 7, 7, 0.45)' : 'rgba(7, 7, 7, 0.1)',
        }}
      />

      {/* Spotlight Effect */}
      <div
        className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(circle 250px at ${glowX}% ${glowY}%, rgba(229, 193, 88, 0.14), transparent 80%)`,
        }}
      />

      {/* Big Outline Number in Background */}
      <div
        className="absolute top-1.5 right-4 text-[100px] md:text-[120px] font-display text-transparent select-none pointer-events-none transition-all duration-700 ease-out origin-right transform"
        style={{
          WebkitTextStroke: isHovered 
            ? '1px rgba(229, 193, 88, 0.35)' 
            : '1px rgba(255, 255, 255, 0.06)',
          transform: isHovered ? 'scale(1.1) translateY(-6px)' : 'scale(1) translateY(0)',
        }}
      >
        {service.num}
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 p-5 md:p-8 w-full flex flex-col justify-end pointer-events-none transition-all duration-500 h-full">
        
        {/* Animated Line Reveal */}
        <div 
          className="h-[1.5px] bg-gradient-to-r from-gold-500/70 to-transparent mb-3 md:mb-4.5 transition-all duration-700 ease-out" 
          style={{
            width: showDetails ? '100%' : '35%',
          }}
        />

        {/* Cinematic Title */}
        <h3 
          className="font-display tracking-[0.05em] uppercase text-2xl sm:text-3xl lg:text-4xl text-white mb-1.5 transform transition-all duration-500 ease-out"
          style={{
            transform: showDetails ? 'translateY(0)' : 'translateY(4px)',
            textShadow: showDetails ? '0 0 15px rgba(212, 175, 55, 0.25)' : 'none',
          }}
        >
          {service.title}
        </h3>

        {/* Text Description Reveal */}
        <p
          className="text-xs lg:text-sm tracking-wider text-gray-300 font-light overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: showDetails ? '90px' : '0px',
            opacity: showDetails ? 1 : 0,
            transform: showDetails ? 'translateY(0)' : 'translateY(12px)',
            marginTop: showDetails ? '8px' : '0px',
          }}
        >
          {service.desc}
        </p>

        {/* Animated Arrow Circle */}
        <div 
          className="mt-4 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border bg-black/50 backdrop-blur-md transition-all duration-500 ease-out"
          style={{
            borderColor: showDetails ? 'rgba(229, 193, 88, 0.6)' : 'rgba(255, 255, 255, 0.1)',
            transform: showDetails ? 'translateX(6px) scale(1.05)' : 'translateX(0) scale(1)',
          }}
        >
          <ArrowUpRight 
            className="w-3.5 h-3.5 transition-all duration-500" 
            style={{
              color: showDetails ? '#E5C158' : '#ffffff',
            }}
          />
        </div>
      </div>

      {/* Gold Border Highlights */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold-500/0 group-hover:border-gold-400/40 transition-all duration-500" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-gold-500/0 group-hover:border-gold-400/40 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-gold-500/0 group-hover:border-gold-400/40 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold-500/0 group-hover:border-gold-400/40 transition-all duration-500" />
    </motion.div>
  );
}

export function Services() {
  const [hoveredCardText, setHoveredCardText] = useState<string | null>(null);
  const [activeBgIndex, setActiveBgIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="py-24 md:py-32 bg-matte-black relative overflow-hidden select-none"
    >
      {/* Infinite Scrolling Ticker (Text Marquee) */}
      <div className="w-full overflow-hidden bg-charcoal-900/40 border-y border-white/5 py-4 mb-20 relative z-10">
        <div className="flex whitespace-nowrap gap-8 animate-marquee">
          {Array(4).fill([
            "LUXURY WEDDINGS", "CORPORATE GALAS", "ARTIST MANAGEMENT", "DESTINATION PRODUCTIONS", "STAGE & SOUND DESIGN", "BRAND ACTIVATIONS"
          ]).flat().map((text, idx) => (
            <div key={idx} className="flex items-center gap-4 text-[10px] tracking-[0.3em] text-gray-500 font-semibold uppercase">
              <span>{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40"></span>
            </div>
          ))}
        </div>
      </div>

      {/* State-Triggered Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {services.map((_, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: activeBgIndex === idx ? 0.08 : 0,
              background: `radial-gradient(circle at ${idx % 2 === 0 ? '25%' : '75%'} ${idx < 3 ? '30%' : '70%'}, rgba(229, 193, 88, 0.4), transparent 60%)`,
            }}
          />
        ))}
      </div>

      {/* Dynamic Cursor Overlays */}
      <motion.div
        className="hidden lg:flex pointer-events-none absolute z-50 rounded-full border border-gold-500/35 bg-black/85 backdrop-blur-md px-5 py-2.5 items-center justify-center shadow-[0_0_20px_rgba(229,193,88,0.25)]"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: hoveredCardText ? 1 : 0,
          scale: hoveredCardText ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30, mass: 0.15 }}
      >
        <span className="text-[9px] tracking-[0.3em] text-gold-400 font-extrabold uppercase whitespace-nowrap">
          {hoveredCardText}
        </span>
      </motion.div>

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            <span className="uppercase tracking-[0.25em] text-gold-500 text-xs font-semibold block">
              Our Creative Domains
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-[0.05em] text-white">
            SIGNATURE <span className="text-gradient">SERVICES</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg tracking-wider font-light mt-3 leading-relaxed">
            We deliver exceptional events across six dedicated segments, each marked by striking custom scenography, robust production, and global expertise.
          </p>
        </div>
      </div>

      {/* Asymmetrical Grid Services Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[260px]">
          {services.map((service, index) => (
            <ServicesCard
              key={service.id}
              service={service}
              index={index}
              onHover={setHoveredCardText}
              onHoverIndex={setActiveBgIndex}
            />
          ))}
        </div>
      </div>

      {/* Ticker Animation CSS styles injection */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
