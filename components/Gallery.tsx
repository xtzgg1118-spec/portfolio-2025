import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';

interface GalleryProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

// "Bookshelf" / Archive Constants
const CARD_WIDTH = 180; 
const CARD_HEIGHT = 260; 
const GAP_X = 110;  // Reduced from 130
const GAP_Y = 45;   // Reduced from 80 to flatten the diagonal
const Z_DEPTH = 120; 

const Gallery: React.FC<GalleryProps> = ({ projects, onSelect }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const xDrag = useMotionValue(0);
  
  // Smooth physics
  const springConfig = { stiffness: 150, damping: 20, mass: 0.8 };
  const smoothIndex = useSpring(0, springConfig);

  useEffect(() => {
    smoothIndex.set(index);
  }, [index, smoothIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Scroll Down/Right -> Next Content
      const delta = e.deltaY * 0.002;
      setIndex((prev) => prev + delta);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (el) el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleDragEnd = () => {
    const x = xDrag.get();
    // Invert drag physics: Drag Left (-x) -> Add to index -> Move content Left
    const velocity = x * -0.005; 
    setIndex(prev => prev + velocity);
    xDrag.set(0);
  };

  const getCircularProject = (i: number) => {
    const n = projects.length;
    const circularIndex = ((Math.floor(i) % n) + n) % n;
    return projects[circularIndex];
  };

  // Wider range to render far cards
  const visibleRange = [-3, 10]; 
  
  const renderIndices = [];
  const baseIndex = Math.floor(index);
  for (let i = visibleRange[0]; i <= visibleRange[1]; i++) {
    renderIndices.push(baseIndex + i);
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: '2000px' }} 
    >
      {/* Invisible Drag Overlay - z-0 */}
      <motion.div
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.01}
        style={{ x: xDrag }}
        onDrag={(e, info) => {
             // Drag Left (Negative) -> Move forward in list (Index Increase)
             setIndex(prev => prev - (info.delta.x * 0.003));
        }}
        onDragEnd={handleDragEnd}
      />

      {/* 3D Scene Container - z-10 ensures it is above drag layer for clicks */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center transform-style-3d pointer-events-none"
        style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
      >
        {renderIndices.map((virtualIndex) => {
          const project = getCircularProject(virtualIndex);
          if (!project) return null;

          return (
            <GalleryCard
              key={`card-${virtualIndex}`}
              virtualIndex={virtualIndex}
              currentIndex={smoothIndex}
              project={project}
              onSelect={() => onSelect(project)}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

const GalleryCard: React.FC<{
  virtualIndex: number;
  currentIndex: any;
  project: Project;
  onSelect: () => void;
}> = ({ virtualIndex, currentIndex, project, onSelect }) => {
  
  const i = useTransform(currentIndex, (v: number) => virtualIndex - v);

  // Layout logic
  const x = useTransform(i, (val) => val * GAP_X);
  const y = useTransform(i, (val) => -val * GAP_Y); 
  const z = useTransform(i, (val) => -val * Z_DEPTH); 
  
  // Perspective: Vertical (0deg X), Angled side (-25deg Y)
  const rotateX = useTransform(i, () => 0); 
  const rotateY = useTransform(i, () => -25);

  const opacity = useTransform(i, (val) => {
    if (val < -4 || val > 12) return 0;
    return 1 - (Math.abs(val - 4) * 0.05); 
  });

  // Z-index needs to be high enough to catch events
  // We offset it largely so it overrides any container defaults
  const zIndex = Math.round(1000 - virtualIndex);
  
  const [isHovered, setHovered] = useState(false);

  return (
    <motion.div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        x,
        y,
        z,
        rotateX,
        rotateY,
        opacity,
        zIndex,
        position: 'absolute',
        transformStyle: 'preserve-3d',
      }}
      className="group pointer-events-auto" // Crucial: Re-enable clicks
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          // Pull Out Effect:
          // Move towards camera (Z)
          // Move outward from stack (X)
          x: isHovered ? 40 : 0, 
          z: isHovered ? 80 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="
          w-full h-full 
          relative
          bg-white/20 backdrop-blur-md
          border border-white/40
          shadow-lg
          transition-all duration-300
        "
        style={{
            boxShadow: isHovered 
                ? '30px 10px 60px rgba(0,0,0,0.2)' 
                : '10px 5px 20px rgba(0,0,0,0.1)',
        }}
      >
        {/* Content */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
             <img 
                src={project.coverImage} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                draggable={false}
             />
             
             {/* Gloss Reflection */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-black/10 pointer-events-none mix-blend-overlay" />
        </div>

        {/* Spine Label */}
        <div className="absolute top-4 -right-1 translate-x-full rotate-90 origin-top-left pointer-events-none">
             <h3 className="text-[10px] font-bold tracking-widest text-gray-800 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {project.title}
             </h3>
        </div>
        
      </motion.div>
    </motion.div>
  );
};

export default Gallery;