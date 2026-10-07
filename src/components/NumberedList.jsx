export const NumberedList = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col">
          <div className="flex items-baseline mb-3">
            <span className="font-serif text-brand-accent italic text-2xl mr-4">{String(idx + 1).padStart(2, '0')}</span>
            <span className="uppercase tracking-widest text-sm font-semibold text-brand-text">{item.title}</span>
          </div>
          {item.description && (
            <p className="text-brand-muted-light text-sm leading-relaxed pl-10 font-light">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
