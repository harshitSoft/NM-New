import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative overflow-hidden bg-brand-base cursor-pointer block hover:shadow-xl transition-shadow duration-500">
      <div className="relative h-[22rem] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <div className="flex justify-between items-center mb-4 text-[10px] uppercase tracking-widest font-bold">
          <span className="text-brand-accent">{project.category}</span>
          <span className="text-brand-muted-light">{project.status}</span>
        </div>
        <h3 className="font-serif text-2xl text-brand-text mb-4 group-hover:text-brand-accent transition-colors">
          {project.name}
        </h3>
        <p className="text-brand-muted-light text-sm flex items-center justify-between">
          <span>{project.location}</span>
          <span className="text-brand-text font-bold group-hover:text-brand-accent transition-colors">Explore &rarr;</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
