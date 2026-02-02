import React from "react";
import { FaGithub, FaTelegram, FaEnvelope, FaMapMarkerAlt, FaPhone, FaDownload, FaCode, FaRocket } from "react-icons/fa";
import { Instagram } from "lucide-react";
import { FiArrowRight, FiCoffee } from "react-icons/fi";
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from "../../utils/constants";

const Footer = () => {
  // Ijtimoiy tarmoq ikonkalari
  const socialIcons = {
    github: <FaGithub size={20} />,
    telegram: <FaTelegram size={20} />,
    instagram: <Instagram size={20} />,
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white pt-16 pb-8 px-4 md:px-8 lg:px-16 mt-20 border-t border-blue-800/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-14">
          
          {/* Brand & Contact Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-lg font-medium text-blue-200">
                {PERSONAL_INFO.title}
              </p>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {PERSONAL_INFO.tagline}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 pt-4">
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="mr-4 p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300 border border-blue-700/30">
                  <FaEnvelope className="text-blue-300" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {PERSONAL_INFO.email}
                </span>
              </a>
              
              <a 
                href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`}
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="mr-4 p-2 bg-blue-900/30 rounded-lg group-hover:bg-green-500/30 transition-colors duration-300 border border-blue-700/30">
                  <FaPhone className="text-green-300" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {PERSONAL_INFO.phone}
                </span>
              </a>
              
              <div className="flex items-center text-gray-300 group">
                <div className="mr-4 p-2 bg-blue-900/30 rounded-lg border border-blue-700/30">
                  <FaMapMarkerAlt className="text-purple-300" />
                </div>
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 pb-2 border-b-2 border-blue-400/40 inline-block text-blue-100">
              Tezkor Havolalar
            </h3>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`}
                    className="flex items-center text-gray-300 hover:text-blue-300 transition-all duration-300 group py-2"
                  >
                    <FiArrowRight className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Download CV Button */}
            <div className="mt-10 pt-6 border-t border-blue-800/30">
              <a 
                href={PERSONAL_INFO.resume}
                download
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 w-full md:w-auto"
              >
                <FaDownload className="mr-3" />
                Resumeni yuklab olish
              </a>
            </div>
          </div>

          {/* Social & Connect Section */}
          <div>
            <h3 className="text-xl font-bold mb-8 pb-2 border-b-2 border-cyan-400/40 inline-block text-blue-100">
              Ijtimoiy Tarmoqlar
            </h3>
            
            <p className="text-gray-300 mb-8">
              Loyihalarim va yangilanishlarim bilan tanishish uchun ijtimoiy tarmoqlarda kuzatib boring
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mb-10">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-xl border
                    ${platform === 'github' ? 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600' : 
                      platform === 'telegram' ? 'bg-blue-600/50 hover:bg-blue-600 border-blue-500' : 
                      'bg-gradient-to-r from-pink-600/50 to-purple-600/50 hover:from-pink-600 hover:to-purple-600 border-pink-500'}`}
                  aria-label={platform}
                >
                  {socialIcons[platform]}
                </a>
              ))}
            </div>
            
            {/* Tech Badge */}
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-700/40 rounded-xl p-5 backdrop-blur-sm">
              <div className="flex items-center mb-3">
                <FaCode className="text-blue-300 mr-3" />
                <h4 className="font-bold text-white">Texnologiyalar</h4>
              </div>
              <p className="text-gray-300 text-sm">
                React.js, Next.js, TypeScript, Tailwind CSS va boshqa zamonaviy texnologiyalar
              </p>
            </div>
          </div>
        </div>

        {/* Divider with Design */}
        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-blue-700/40"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-6 bg-slate-900 flex items-center space-x-2">
              <FaRocket className="text-blue-400 animate-pulse" />
              <span className="text-blue-500 text-sm">•</span>
              <FiCoffee className="text-amber-400" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-6 lg:mb-0 text-center lg:text-left">
            <p className="text-gray-300">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. Barcha huquqlar himoyalangan.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Frontend dasturchi
            </p>
          </div>
          
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1.5 bg-blue-900/40 hover:bg-blue-800/50 rounded-full text-xs font-medium text-gray-200 transition-colors duration-300 border border-blue-700/40">
              React.js
            </span>
            <span className="px-3 py-1.5 bg-blue-900/40 hover:bg-blue-800/50 rounded-full text-xs font-medium text-gray-200 transition-colors duration-300 border border-blue-700/40">
              Next.js
            </span>
            <span className="px-3 py-1.5 bg-blue-900/40 hover:bg-blue-800/50 rounded-full text-xs font-medium text-gray-200 transition-colors duration-300 border border-blue-700/40">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;