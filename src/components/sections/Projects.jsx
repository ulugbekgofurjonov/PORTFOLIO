import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { projects, categories } from '../../data/projects';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

const PROJECTS_PER_PAGE = 6;

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  // Filter projects
  useEffect(() => {
    const filtered = activeCategory === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeCategory);
    
    setFilteredProjects(filtered);
    setCurrentPage(1);
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
      const yOffset = -80;
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
      className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Simple Radial Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-slate-950 to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        
        <header className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 
            id="projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Mening Loyihalarim
            </span>
          </h2>
          
          <div 
            className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full"
            aria-hidden="true"
          />
          
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Zamonaviy texnologiyalar va innovatsion yechimlar bilan yaratilgan professional loyihalar
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-12 sm:mb-16">
              {currentProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
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

      {/* Minimal Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

// FilterButtons component
const FilterButtons = React.memo(({ categories, activeCategory, onCategoryChange }) => {
  return (
    <nav 
      className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 md:mb-14 px-4"
      aria-label="Loyiha filtrlari"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          aria-pressed={activeCategory === category}
          className={`
            relative px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base
            transition-all duration-300
            ${activeCategory === category
              ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }
          `}
        >
          <span className="relative z-10 whitespace-nowrap">{category}</span>
        </button>
      ))}
    </nav>
  );
});

FilterButtons.displayName = 'FilterButtons';

// ProjectCard component
const ProjectCard = React.memo(({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <article
      className="group relative h-full flex flex-col"
      style={{ animation: `fadeIn 0.4s ease-out ${index * 0.05}s both` }}
    >
      <div className="relative h-full flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
        
        {/* Card Content */}
        <div className="relative bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col border border-slate-800 hover:border-cyan-500/50 transition-colors duration-300">
          
          {/* Image Container */}
          <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden flex-shrink-0 bg-slate-800">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-slate-800 animate-pulse" />
            )}
            
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
            
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"
              aria-hidden="true"
            />
            
            {/* Action buttons */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center gap-2">
              <ActionButton
                href={project.demoUrl}
                icon={<ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />}
                label="Demo"
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

          {/* Content Section */}
          <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
            {/* Category badge */}
            <div className="mb-3">
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold rounded-full uppercase tracking-wide">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight leading-tight group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-400 mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-grow">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <TechBadge key={techIndex} tech={tech} />
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 sm:px-2.5 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs font-medium">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Action Button Component
const ActionButton = ({ href, icon, label, variant }) => {
  const baseClasses = "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300";
  
  const variantClasses = variant === 'primary'
    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50"
    : "bg-slate-800 text-white border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${baseClasses} ${variantClasses}`}
      aria-label={`${label} - ${variant === 'primary' ? 'Live demo' : 'Source code'}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
};

// Tech Badge Component
const TechBadge = React.memo(({ tech }) => (
  <span className="px-2 sm:px-2.5 md:px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-700 hover:text-cyan-400 transition-all duration-300 cursor-default border border-slate-700/50">
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
  const getPageNumbers = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxVisible = isMobile ? 3 : 5;
    const pages = [];
    
    if (totalPages <= maxVisible + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    pages.push(1);
    
    let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages - 1, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(2, end - maxVisible + 1);
    }
    
    if (start > 2) pages.push('...');
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
    
    return pages;
  };

  return (
    <nav aria-label="Loyiha sahifalari" className="px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Page Info */}
        <div className="text-center text-slate-400 text-xs sm:text-sm order-1 sm:order-2" role="status">
          <span className="font-medium text-cyan-400">{indexOfFirstProject + 1}-{Math.min(indexOfLastProject, totalProjects)}</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-300">{totalProjects}</span>
          <span className="ml-2">loyiha</span>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 order-2 sm:order-1">
          {/* Previous Button */}
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            aria-label="Oldingi sahifa"
            className={`
              flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm
              transition-all duration-300
              ${currentPage === 1
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Oldingi</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 sm:gap-2">
            {getPageNumbers().map((pageNumber, index) => {
              if (pageNumber === '...') {
                return (
                  <span 
                    key={`ellipsis-${index}`}
                    className="px-2 text-slate-500 text-sm"
                    aria-hidden="true"
                  >
                    ...
                  </span>
                );
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  aria-label={`Sahifa ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                  className={`
                    w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full font-bold text-xs sm:text-sm md:text-base
                    transition-all duration-300
                    ${currentPage === pageNumber
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
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
              flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm
              transition-all duration-300
              ${currentPage === totalPages
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
              }
            `}
          >
            <span className="hidden sm:inline">Keyingi</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
});

Pagination.displayName = 'Pagination';

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-20 sm:py-24 md:py-32 px-4" role="status">
    <div className="text-6xl sm:text-7xl md:text-8xl mb-6" aria-hidden="true">
      🔍
    </div>
    
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
      Hech qanday loyiha topilmadi
    </h3>
    
    <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-md mx-auto">
      Boshqa kategoriyani tanlang yoki barcha loyihalarni ko'rish uchun "All" tugmasini bosing
    </p>
  </div>
);

export default Projects;