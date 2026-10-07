import { ArrowRight } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="group border-b border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-brand-surface-alt transition-colors px-6 -mx-6 cursor-pointer">
      <div className="mb-4 md:mb-0">
        <h3 className="font-serif text-2xl text-brand-text mb-2 group-hover:text-brand-accent transition-colors">{job.title}</h3>
        <div className="flex items-center text-sm text-brand-muted space-x-4">
          <span className="uppercase tracking-widest text-[10px] font-semibold">{job.department}</span>
          <span>&bull;</span>
          <span>{job.location}</span>
        </div>
      </div>
      <div>
        <button className="flex items-center text-brand-text font-semibold uppercase tracking-widest text-xs group-hover:text-brand-accent transition-colors">
          Apply <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
