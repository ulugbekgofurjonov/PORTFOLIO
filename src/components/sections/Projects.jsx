import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { projects, categories } from '../../data/projects';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

const PROJECTS_PER_PAGE = 6;

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [hoveredId, setHoveredId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  // Filter projects based on active category
  useEffect(() => {
    const filtered = activeCategory === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeCategory);
    
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when category changes
  }, [activeCategory]);

  // Memoize pagination calculations
  const paginationData = useMemo(() => {
    const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
    const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

    return {
      currentProjects,
      totalPages,
      indexOfFirstProject,
      indexOfLastProject
    };
  }, [currentPage, filteredProjects]);

  // Handlers
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const scrollToSection = useCallback(() => {
    if (sectionRef.current) {
      const yOffset = -100;
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToSection();
  }, [scrollToSection]);

  const nextPage = useCallback(() => {
    if (currentPage < paginationData.totalPages) {
      paginate(currentPage + 1);
    }
  }, [currentPage, paginationData.totalPages, paginate]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  }, [currentPage, paginate]);

  const { currentProjects, totalPages, indexOfFirstProject, indexOfLastProject } = paginationData;

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Premium Clean Background - No Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-transparent">
        {/* Floating gradient orbs only */}
        <div 
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%)',
            animation: 'float-slow 20s ease-in-out infinite'
          }}
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)',
            animation: 'float-slow 25s ease-in-out infinite reverse'
          }}
          aria-hidden="true"
        />
        
        {/* Soft ambient glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 
            id="projects-heading"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Loyihalarim
            </span>
          </h2>
          <div 
            className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 mx-auto mb-4 sm:mb-6 rounded-full shadow-lg shadow-cyan-500/50"
            aria-hidden="true"
          />
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Zamonaviy texnologiyalar yordamida yaratilgan loyihalarim
          </p>
        </header>

        {/* Filter Buttons */}
        <FilterButtons 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Projects Grid */}
        {currentProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12">
              {currentProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isHovered={hoveredId === project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
                onPrevPage={prevPage}
                onNextPage={nextPage}
                indexOfFirstProject={indexOfFirstProject}
                indexOfLastProject={indexOfLastProject}
                totalProjects={filteredProjects.length}
              />
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Animations */}
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

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }
      `}</style>
    </section>
  );
};

// Separate FilterButtons component
const FilterButtons = React.memo(({ categories, activeCategory, onCategoryChange }) => {
  return (
    <nav 
      className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
      aria-label="Loyiha filtrlari"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          aria-pressed={activeCategory === category}
          className={`
            group relative px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base
            transition-all duration-300 overflow-hidden
            ${activeCategory === category
              ? 'text-white shadow-lg shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white'
            }
          `}
        >
          {/* Background gradient effect */}
          <span className={`
            absolute inset-0 rounded-full transition-all duration-500
            ${activeCategory === category
              ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500'
              : 'bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-600 group-hover:to-cyan-500'
            }
          `} aria-hidden="true" />
          
          {/* Border effect */}
          <span 
            className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-cyan-400/30"
            aria-hidden="true"
          />
          
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </nav>
  );
});

FilterButtons.displayName = 'FilterButtons';

// Separate ProjectCard component
const ProjectCard = React.memo(({ project, index, isHovered, onMouseEnter, onMouseLeave }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80';
  };

  return (
    <article
      className="group relative h-full flex flex-col"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Card Container */}
      <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col border border-slate-800 hover:border-cyan-500/50">
        
        {/* Gradient border effect */}
        <div 
          className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"
          aria-hidden="true"
        />
        
        {/* Inner card */}
        <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl overflow-hidden h-full flex flex-col">
          
          {/* Image Container */}
          <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden flex-shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={handleImageError}
              loading="lazy"
            />
            
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"
              aria-hidden="true"
            />
            
            {/* Overlay buttons */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ActionButton
                href={project.demoUrl}
                icon={<ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Live"
                variant="primary"
              />
              
              <ActionButton
                href={project.githubUrl}
                icon={<Github className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Code"
                variant="secondary"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-grow">
            {/* Category badge */}
            <div className="mb-3 sm:mb-4">
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold rounded-full tracking-wide uppercase shadow-lg shadow-cyan-500/30">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight leading-tight group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-5 leading-relaxed line-clamp-2 flex-grow">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map((tech, techIndex) => (
                <TechBadge key={techIndex} tech={tech} />
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <div 
            className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Action Button Component
const ActionButton = ({ href, icon, label, variant }) => {
  const baseClasses = "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-lg transform hover:scale-105 transition-all duration-300";
  
  const variantClasses = variant === 'primary'
    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:shadow-cyan-500/50"
    : "bg-slate-800/80 backdrop-blur-sm text-white border-2 border-cyan-500/50 hover:border-cyan-400";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${baseClasses} ${variantClasses}`}
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
};

// Tech Badge Component
const TechBadge = React.memo(({ tech }) => (
  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800 text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-600/20 hover:text-cyan-400 transition-all duration-300 cursor-default border border-slate-700 hover:border-cyan-500/50">
    {tech}
  </span>
));

TechBadge.displayName = 'TechBadge';

// Pagination Component
const Pagination = React.memo(({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  onPrevPage, 
  onNextPage,
  indexOfFirstProject,
  indexOfLastProject,
  totalProjects
}) => {
  return (
    <nav aria-label="Loyiha sahifalari">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12">
        {/* Previous Button */}
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          aria-label="Oldingi sahifa"
          className={`
            group flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm
            transition-all duration-300 border-2
            ${currentPage === 1
              ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white border-transparent hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105'
            }
          `}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Oldingi</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                aria-label={`Sahifa ${pageNumber}`}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-sm sm:text-base
                  transition-all duration-300 border-2
                  ${currentPage === pageNumber
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-cyan-500/50 scale-110'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 hover:scale-105'
                  }
                `}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          aria-label="Keyingi sahifa"
          className={`
            group flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm
            transition-all duration-300 border-2
            ${currentPage === totalPages
              ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white border-transparent hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105'
            }
          `}
        >
          <span>Keyingi</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center mt-6 text-slate-400 text-sm" role="status">
        {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, totalProjects)} / {totalProjects} loyiha
      </div>
    </nav>
  );
});

Pagination.displayName = 'Pagination';

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-16 sm:py-20 lg:py-24" role="status">
    <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6" aria-hidden="true">🔍</div>
    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
      Hech qanday loyiha topilmadi
    </h3>
    <p className="text-base sm:text-lg text-slate-400">
      Boshqa toifani tanlashga harakat qiling
    </p>
  </div>
);

export default Projects;