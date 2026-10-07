const TestimonialCard = ({ quote, rating, author, dark = false }) => {
  return (
    <div className={`p-6 md:p-10 ${dark ? 'bg-brand-surface text-brand-text' : 'bg-brand-surface-alt text-brand-text'}`}>
      <div className="flex space-x-1 mb-8">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-brand-accent text-lg">★</span>
        ))}
      </div>
      <p className={`font-serif italic text-2xl leading-relaxed mb-8 ${dark ? 'text-brand-text opacity-80' : 'text-brand-text'}`}>
        "{quote}"
      </p>
      <p className={`text-xs uppercase tracking-widest font-semibold ${dark ? 'text-brand-text opacity-70' : 'text-brand-muted-light'}`}>
        {author}
      </p>
    </div>
  );
};

export default TestimonialCard;
