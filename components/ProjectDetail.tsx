import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { X } from 'lucide-react';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
      >
        <X size={24} className="text-gray-900" />
      </button>

      <div className="min-h-screen w-full max-w-7xl mx-auto px-6 py-20 md:py-32">
        
        {/* Header Section */}
        <motion.div 
           initial={{ y: 30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.5 }}
           className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20"
        >
           <div className="md:col-span-8">
              <span className="block text-xs font-bold tracking-[0.2em] text-gray-400 mb-6 uppercase">
                {project.category} — {project.year}
              </span>
              <h1 className="text-5xl md:text-8xl font-thin text-gray-900 leading-none tracking-tight mb-8">
                {project.title}
              </h1>
           </div>
           
           <div className="md:col-span-4 flex flex-col justify-end">
              <div className="space-y-6 text-sm text-gray-600 font-light leading-relaxed">
                 <p>{project.description}</p>
                 <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Client</div>
                        <div>{project.client || "Undisclosed"}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Year</div>
                        <div>{project.year}</div>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="w-full h-[60vh] md:h-[80vh] bg-gray-50 mb-8 overflow-hidden"
        >
            <img src={project.coverImage} alt="Cover" className="w-full h-full object-cover" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img, idx) => (
                (img !== project.coverImage) && (
                <motion.div
                    key={idx}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className={`
                        w-full bg-gray-50
                        ${idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}
                    `}
                >
                    <img src={img} alt={`Detail ${idx}`} className="w-full h-full object-cover" />
                </motion.div>
                )
            ))}
        </div>
        
      </div>
    </motion.div>
  );
};

export default ProjectDetail;