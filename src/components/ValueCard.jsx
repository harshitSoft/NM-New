const ValueCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-brand-surface-alt p-6 md:p-10 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-brand-accent bg-opacity-20 flex items-center justify-center mb-6 text-brand-accent">
        {Icon && <Icon size={32} />}
      </div>
      <h3 className="font-serif text-2xl text-brand-text mb-4">{title}</h3>
      <p className="text-brand-muted text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ValueCard;
