const TeamCard = ({ member, onClick }) => {
  return (
    <div className="group cursor-pointer text-center" onClick={onClick}>
      <div className="relative mb-6 overflow-hidden aspect-[3/4] bg-gray-200">
        <img 
          src={member.image} 
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <h3 className="font-serif text-2xl text-brand-text mb-1">{member.name}</h3>
      <p className="text-brand-accent text-xs uppercase tracking-widest font-semibold mb-4">{member.title}</p>
      <p className="text-brand-muted text-sm leading-relaxed px-4 hidden md:block">
        {member.bio}
      </p>
    </div>
  );
};

export default TeamCard;
