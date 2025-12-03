import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Menu from './components/Menu';
import Controls from './components/Controls';
import Gallery from './components/Gallery';
import ProjectDetail from './components/ProjectDetail';
import PageDetail from './components/PageDetail';
import { PROJECTS, INDEX_PAGE } from './data';
import { Project, NavigationItem } from './types';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPage, setSelectedPage] = useState<NavigationItem | null>(null);

  const handleMenuClick = (item: NavigationItem) => {
    if (item.type === 'page') {
      setSelectedPage(item);
    } else {
      console.log("Navigating to", item.href);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white text-gray-900">
      {/* Clean, high-key background for art gallery feel */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-transparent to-gray-100 opacity-60" />
      
      <Menu onItemClick={handleMenuClick} />
      
      <main className="w-full h-full relative z-10">
        <Gallery 
          projects={PROJECTS} 
          onSelect={(project) => setSelectedProject(project)} 
        />
      </main>

      <Controls onIndexClick={() => setSelectedPage(INDEX_PAGE)} />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPage && (
          <PageDetail 
            page={selectedPage} 
            onClose={() => setSelectedPage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;