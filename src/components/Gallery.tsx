import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';

interface GalleryItem {
  id: number;
  category: string;
  categoryLabel: string;
  title: string;
  client: string;
  action: string;
  image: string;
  size: 'tall' | 'wide' | 'large' | 'standard';
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "Corporate",
    categoryLabel: "CORPORATE EXCELLENCE",
    title: "Corporate Excellence",
    client: "Apex Annual Awards Dinner",
    action: "View Project",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    size: "tall"
  },
  {
    id: 2,
    category: "Weddings",
    categoryLabel: "LUXURY WEDDINGS",
    title: "Luxury Weddings",
    client: "The Royal Wedding Reception",
    action: "Explore Story",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    size: "wide"
  },
  {
    id: 3,
    category: "Fashion & Music",
    categoryLabel: "FASHION RUNWAY",
    title: "Vision In Motion",
    client: "Elite Fashion Week Paris",
    action: "See Experience",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
    size: "tall"
  },
  {
    id: 4,
    category: "Fashion & Music",
    categoryLabel: "MUSIC FESTIVAL",
    title: "Feel The Energy",
    client: "Aura Electronic Music Festival",
    action: "See Experience",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
    size: "large"
  },
  {
    id: 5,
    category: "Experiential",
    categoryLabel: "PRIVATE SOIRÉE",
    title: "Elegant Experiences",
    client: "Whispering Pines Estate",
    action: "Explore Story",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop",
    size: "standard"
  },
  {
    id: 6,
    category: "Weddings",
    categoryLabel: "ANNIVERSARY GALA",
    title: "Timeless Moments",
    client: "Grand Horizon Diamond Banquet",
    action: "View Project",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1964&auto=format&fit=crop",
    size: "tall"
  },
  {
    id: 7,
    category: "Corporate",
    categoryLabel: "PRODUCT LAUNCH",
    title: "Crafted To Impress",
    client: "Vanguard EV Global Unveiling",
    action: "Explore Story",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop",
    size: "wide"
  },
  {
    id: 8,
    category: "Experiential",
    categoryLabel: "EXHIBITION DESIGN",
    title: "Beyond Celebration",
    client: "Lumina Art Museum Installation",
    action: "See Experience",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    size: "standard"
  },
  {
    id: 9,
    category: "Experiential",
    categoryLabel: "VIP RECEPTION",
    title: "Designed With Passion",
    client: "Sovereign Executive Lounge Launch",
    action: "View Project",
    image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=2070&auto=format&fit=crop",
    size: "wide"
  }
];

const filters = ["ALL", "CORPORATE", "WEDDINGS", "FASHION & MUSIC", "EXPERIENTIAL"];

interface CardProps {
  item: GalleryItem;
}

function GalleryCard({ item }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalize coordinates to -0.5 to 0.5 range
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Map card sizes to grid rows & cols for a beautiful visual rhythm
  let gridClasses = "";
  if (item.size === 'tall') {
    gridClasses = "lg:col-span-4 lg:row-span-2 md:col-span-1 md:row-span-2 h-[450px] lg:h-full";
  } else if (item.size === 'wide') {
    gridClasses = "lg:col-span-8 lg:row-span-1 md:col-span-2 md:row-span-1 h-[280px] lg:h-full";
  } else if (item.size === 'large') {
    gridClasses = "lg:col-span-8 lg:row-span-2 md:col-span-2 md:row-span-2 h-[450px] lg:h-full";
  } else {
    // standard
    gridClasses = "lg:col-span-4 lg:row-span-1 md:col-span-1 md:row-span-1 h-[280px] lg:h-full";
  }

  // Calculate 3D tilt angles & image translations
  const rotateX = isHovered ? coords.y * -8 : 0; // Subtle tilt max 8 degrees
  const rotateY = isHovered ? coords.x * 8 : 0;
  const imgX = isHovered ? coords.x * -12 : 0; // Parallax translation
  const imgY = isHovered ? coords.y * -12 : 0;
  
  // Spotlight position
  const shineX = isHovered ? (coords.x + 0.5) * 100 : 50;
  const shineY = isHovered ? (coords.y + 0.5) * 100 : 50;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-lg overflow-hidden cursor-pointer group/card border border-white/5 transition-all duration-500 ease-out flex flex-col justify-end ${gridClasses}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.15)' 
          : 'none',
        borderColor: isHovered ? 'rgba(229, 193, 88, 0.35)' : 'rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Background Image with parallax movement & scale */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: `scale(${isHovered ? 1.1 : 1.02}) translate3d(${imgX}px, ${imgY}px, 0)`,
          }}
          loading="lazy"
        />
      </div>

      {/* Dark gradient overlay + backdrop blur */}
      <div 
        className="absolute inset-0 transition-all duration-500 bg-gradient-to-t from-black via-black/35 to-transparent pointer-events-none" 
        style={{
          backdropFilter: isHovered ? 'blur(4px)' : 'blur(0px)',
          backgroundColor: isHovered ? 'rgba(7, 7, 7, 0.6)' : 'rgba(7, 7, 7, 0.15)',
        }}
      />

      {/* Golden spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(circle 250px at ${shineX}% ${shineY}%, rgba(229, 193, 88, 0.12), transparent 80%)`,
        }}
      />

      {/* Content details */}
      <div className="relative z-10 p-6 md:p-8 w-full flex flex-col justify-end h-full pointer-events-none">
        
        {/* Category Tag */}
        <span 
          className="uppercase tracking-[0.25em] text-[10px] font-semibold text-gold-400 mb-2.5 block transform transition-all duration-500 ease-out"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          {item.categoryLabel}
        </span>

        {/* Cinematic Title */}
        <h3 
          className="font-display tracking-[0.05em] uppercase text-3xl lg:text-4xl text-white mb-2 transform transition-all duration-500 ease-out origin-left"
          style={{
            transform: isHovered ? 'translateY(0) scale(1.02)' : 'translateY(4px)',
            textShadow: isHovered ? '0 0 15px rgba(212, 175, 55, 0.2)' : 'none',
          }}
        >
          {item.title}
        </h3>

        {/* Client / Event details */}
        <p 
          className="text-xs tracking-wider text-gray-400 font-light transform transition-all duration-500 delay-[50ms] ease-out"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            opacity: isHovered ? 1 : 0,
          }}
        >
          {item.client}
        </p>

        {/* Interactive CTA Link */}
        <div 
          className="mt-5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 border-b border-transparent pb-0.5 w-fit transform transition-all duration-500 delay-[100ms] ease-out"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
            opacity: isHovered ? 1 : 0,
          }}
        >
          <span>{item.action}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
        </div>
      </div>

      {/* Glowing Gold Corners */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold-500/0 group-hover/card:border-gold-400/40 transition-all duration-500" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-gold-500/0 group-hover/card:border-gold-400/40 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-gold-500/0 group-hover/card:border-gold-400/40 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold-500/0 group-hover/card:border-gold-400/40 transition-all duration-500" />
    </motion.div>
  );
}

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredItems = activeFilter === "ALL" 
    ? galleryItems 
    : galleryItems.filter(item => item.category.toUpperCase() === activeFilter);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-matte-black relative border-t border-white/5 overflow-hidden">
      
      {/* Background visual element */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            <span className="uppercase tracking-[0.25em] text-gold-500 text-xs font-semibold block">
              Curated Event Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display tracking-[0.05em] text-white">
            CINEMATIC <span className="text-gradient">MOMENTS</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg tracking-wider font-light mt-3 leading-relaxed">
            A luxury showcase of our custom stage designs, high-end gala productions, private weddings, and experiential digital installations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs tracking-wider uppercase font-semibold">
            <Filter className="w-3.5 h-3.5 text-gold-500" />
            <span>Filter By:</span>
          </div>
          <div className="bg-charcoal-900/60 backdrop-blur-md border border-white/10 p-1.5 rounded-md flex flex-wrap gap-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 rounded cursor-pointer z-10 ${
                  activeFilter === filter ? 'text-black font-extrabold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{filter}</span>
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilterIndicator"
                    className="absolute inset-0 bg-gold-400 rounded z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[280px] lg:auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 text-center">
        <a 
          href="#contact" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-900 hover:bg-charcoal-800 border border-gold-500/20 hover:border-gold-400/60 text-xs font-bold uppercase tracking-[0.25em] text-white hover:text-gold-400 rounded-sm transition-all duration-300 box-glow-hover"
        >
          <span>Begin Your Collaboration</span>
          <ArrowUpRight className="w-4 h-4 text-gold-400" />
        </a>
      </div>
    </section>
  );
}
