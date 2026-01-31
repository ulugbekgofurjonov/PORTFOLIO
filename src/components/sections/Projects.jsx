import { useState, useEffect } from 'react';
import { projects, categories } from '../../data/projects';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.category === activeCategory)
      );
    }
  }, [activeCategory]);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Featured
            </span>{' '}
            <span className="text-slate-900 dark:text-white">Work</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with precision and creativity
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                group relative px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base
                transition-all duration-300 overflow-hidden
                ${activeCategory === category
                  ? 'text-white shadow-lg shadow-cyan-500/30'
                  : 'text-slate-700 dark:text-slate-300 hover:text-white'
                }
              `}
            >
              {/* Background gradient effect */}
              <span className={`
                absolute inset-0 rounded-full transition-all duration-500
                ${activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500'
                  : 'bg-slate-200 dark:bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-600 group-hover:to-cyan-500'
                }
              `}></span>
              
              {/* Border effect */}
              <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-cyan-400/30"></span>
              
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative h-full flex flex-col"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Card Container */}
                <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                  
                  {/* Inner card */}
                  <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden h-full flex flex-col">
                    
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80';
                        }}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                      
                      {/* Overlay buttons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-slate-900 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="hidden sm:inline">Live</span>
                        </a>
                        
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-900/80 backdrop-blur-sm text-white rounded-full font-semibold text-sm sm:text-base border-2 border-white/20 hover:border-white/40 shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="hidden sm:inline">Code</span>
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-grow">
                      {/* Category badge */}
                      <div className="mb-3 sm:mb-4">
                        <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold rounded-full tracking-wide uppercase shadow-lg">
                          {project.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 tracking-tight leading-tight group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-5 leading-relaxed line-clamp-2 flex-grow">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-slate-700 dark:hover:to-slate-700 hover:text-cyan-700 dark:hover:text-cyan-400 transition-all duration-300 cursor-default border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 sm:py-20 lg:py-24">
            <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">🔍</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
              No Projects Found
            </h3>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;