// Removed framer-motion import

const MarqueeTicker = () => {
  const items = [
    "ARCHITECTURAL DESIGN",
    "•",
    "URBAN PLANNING",
    "•",
    "COMMUNITY BUILDING",
    "•",
    "SUSTAINABLE DEVELOPMENT",
    "•",
    "LUXURY RESIDENCES",
    "•",
    "COMMERCIAL SPACES",
    "•"
  ];

  return (
    <div className="w-full bg-brand-accent py-4 overflow-hidden flex border-y border-brand-text group">
      <div 
        className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]"
      >
        {/* Double the items to create a seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span 
            key={index} 
            className="text-brand-base font-mono font-bold text-sm tracking-[0.2em] px-4"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
