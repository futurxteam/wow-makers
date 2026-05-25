export function Clients() {
  // Using generic luxury client names/placeholders to convey corporate audience
  const clients = [
    "ACME CORP.", "GLOBAL SYNERGY", "NEXUS ENTERPRISE", 
    "AURA FASHION", "ZENITH TECH", "LUMINA HOLDINGS",
    "VELOCITY MOTORS", "OMEGA PARTNERS"
  ];

  return (
    <section className="py-20 bg-charcoal-900 overflow-hidden flex flex-col items-center">
      <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12 text-center">
        Trusted by Industry Leaders
      </h3>
      
      <div className="w-full relative flex overflow-hidden">
        {/* Left/Right fading gradients */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-charcoal-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-charcoal-900 to-transparent z-10" />

        <div className="flex animate-[slide_30s_linear_infinite] whitespace-nowrap">
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={index} 
              className="mx-12 text-2xl md:text-3xl font-display tracking-widest text-white/20 hover:text-white/60 transition-colors duration-300"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
