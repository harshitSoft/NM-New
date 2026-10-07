const StatBar = ({ stats }) => {
  return (
    <div className="bg-brand-surface text-brand-text py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-10 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <span className="font-serif text-5xl md:text-6xl text-brand-accent mb-4">{stat.number}</span>
              <span className="uppercase tracking-widest text-xs font-semibold text-brand-text opacity-70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatBar;
