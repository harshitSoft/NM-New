const SectionHeading = ({ heading, subtext, centered = true }) => {
  return (
    <div className={`mb-10 lg:mb-16 ${centered ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      <h2 className="font-serif text-3xl md:text-5xl text-brand-text mb-6">
        {heading}
      </h2>
      {subtext && (
        <p className="text-brand-muted text-lg font-light leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
