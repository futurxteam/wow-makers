import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  variant?: 'navbar' | 'footer';
}

export function Logo({ className = '', variant = 'navbar' }: LogoProps) {
  // Variations based on usage
  const scale = variant === 'navbar' ? 'scale-75 md:scale-100' : 'scale-100 md:scale-[1.2]';
  const textOpacity = variant === 'navbar' ? 'opacity-90' : 'opacity-100';

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative group flex flex-col items-center justify-center cursor-pointer ${scale} ${className}`}
    >
      {/* Subtle hover glow effect behind logo */}
      <div className="absolute inset-0 bg-gold-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full" />
      
      {/* Logo SVG (Recreated Shards) */}
      <svg
        width="80"
        height="38"
        viewBox="0 0 100 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white group-hover:text-gold-400 transition-colors duration-500"
      >
        {/* Abstract "W" & "M" Shards */}
        <g fill="currentColor">
          {/* 1. Leftmost small right-leaning shard */}
          <polygon points="12,10 18,28 14,30 8,12" />
          {/* 2. Left-mid right-leaning shard */}
          <polygon points="26,18 30,35 24,40 20,24" />
          {/* 3. Mid-left left-leaning shard */}
          <polygon points="34,14 42,28 38,32 30,18" />
          {/* 4. Center large left-leaning shard */}
          <polygon points="60,4 52,35 44,45 50,15" />
          {/* 5. Mid-right left-leaning shard */}
          <polygon points="66,16 70,33 64,36 60,18" />
          {/* 6. Right-mid right-leaning shard */}
          <polygon points="76,10 82,24 78,28 72,16" />
          {/* 7. Rightmost small left-leaning shard */}
          <polygon points="86,22 94,36 88,40 82,28" />
        </g>
      </svg>

      {/* Logo Text */}
      <span className={`font-sans font-bold tracking-[0.08em] text-[15px] lowercase mt-1 text-white group-hover:text-gold-400 transition-colors duration-500 ${textOpacity}`}>
        wow makers
      </span>
    </motion.div>
  );
}
