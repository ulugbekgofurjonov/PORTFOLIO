import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // LocalStorage'dan tilni olish yoki default 'uz'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'uz';
  });

  // Til o'zgarganda LocalStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Tilni o'zgartirish funksiyasi
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'uz' ? 'en' : 'uz');
  };

  // Tilni to'g'ridan-to'g'ri o'rnatish
  const setLanguageDirectly = (lang) => {
    if (lang === 'uz' || lang === 'en') {
      setLanguage(lang);
    }
  };

  const value = {
    language,
    setLanguage: setLanguageDirectly,
    toggleLanguage,
    isUzbek: language === 'uz',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;