import React, { useState, useCallback, useMemo } from 'react';
import { Mail, MapPin, Phone, Send, Github, MessageSquare, CheckCircle2, Instagram, SendHorizontal, Sparkles, Zap, Clock, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';
import FadeIn from '../animations/FadeIn';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants';

// EmailJS konfiguratsiyasi
const EMAILJS_CONFIG = {
  serviceId: 'ugportfolio',
  templateId: 'template_i5kpekq',
  publicKey: 'tX0l0WVq0Lj210y6K'
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      // EmailJS ga xabar yuborish
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Portfolio Owner', // EmailJS template uchun
        },
        EMAILJS_CONFIG.publicKey
      );
      
      console.log('EmailJS Success:', result);
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Success message ni 5 sekunddan keyin yashirish
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError(true);
      
      // Error message ni 5 sekunddan keyin yashirish
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const copyPhoneNumber = useCallback(() => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  }, []);

  // Memoized contact info
  const contactInfo = useMemo(() => [
    {
      icon: Mail,
      label: 'Email',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      gradient: 'from-blue-500 via-cyan-500 to-blue-500',
      iconColor: 'text-cyan-400'
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: PERSONAL_INFO.phone,
      onClick: copyPhoneNumber,
      gradient: 'from-green-500 via-emerald-500 to-green-500',
      iconColor: 'text-green-400'
    },
    {
      icon: MapPin,
      label: 'Manzil',
      value: PERSONAL_INFO.location,
      gradient: 'from-purple-500 via-pink-500 to-purple-500',
      iconColor: 'text-purple-400'
    }
  ], [copyPhoneNumber]);

  // Memoized social links
  const socialLinks = useMemo(() => [
    {
      icon: Github,
      href: SOCIAL_LINKS.github,
      label: 'GitHub',
      gradient: 'from-gray-700 to-gray-900',
      hoverGradient: 'group-hover:from-gray-600 group-hover:to-gray-800'
    },
    {
      icon: SendHorizontal,
      href: SOCIAL_LINKS.telegram,
      label: 'Telegram',
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'group-hover:from-blue-400 group-hover:to-blue-500'
    },
    {
      icon: Instagram,
      href: SOCIAL_LINKS.instagram,
      label: 'Instagram',
      gradient: 'from-pink-500 via-purple-500 to-pink-500',
      hoverGradient: 'group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-pink-400'
    }
  ], []);

  return (
    <section 
      id="contact" 
      className="relative py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Simple Radial Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-slate-950 to-black" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn delay={0}>
          <header className="text-center mb-12 sm:mb-16 lg:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-full shadow-lg shadow-cyan-500/10">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              <span className="text-xs sm:text-sm text-cyan-300 font-bold tracking-wider uppercase">
                Bog'laning
              </span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            </div>

            {/* Main Title */}
            <h2 
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Aloqaga Chiqing
              </span>
            </h2>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="h-px w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400" />
              <div className="h-px w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
              Loyiha g'oyangiz bormi? 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold sm:font-bold"> Keling, birga </span>
              muhokama qilaylik va g'oyalaringizni 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-semibold sm:font-bold"> hayotga tatbiq etaylik</span>
            </p>
          </header>
        </FadeIn>

        <div className="max-w-6xl lg:max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            
            {/* Contact Form */}
            <FadeIn delay={100}>
              <ContactForm
                formData={formData}
                isSubmitting={isSubmitting}
                submitSuccess={submitSuccess}
                submitError={submitError}
                onSubmit={handleSubmit}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={200}>
              <div className="space-y-6 sm:space-y-8">
                
                {/* Contact Information Card */}
                <ContactInfoCard
                  contactInfo={contactInfo}
                  copiedPhone={copiedPhone}
                />

                {/* Social Links Card */}
                <SocialLinksCard socialLinks={socialLinks} />

                {/* Quick Info Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <QuickResponseCard />
                  <AvailabilityCard />
                </div>

              </div>
            </FadeIn>

          </div>
        </div>

      </div>

      {/* Background gradient style */}
      <style>{`
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

// Contact Form Component
const ContactForm = React.memo(({ 
  formData, 
  isSubmitting, 
  submitSuccess, 
  submitError, 
  onSubmit, 
  onChange,
  focusedField,
  setFocusedField
}) => {
  return (
    <div className="relative h-full">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 xl:p-10 h-full flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Xabar Yuborish
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Quyidagi formani to'ldiring va men sizga tez orada javob beraman
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl sm:rounded-2xl shadow-lg shadow-green-500/10 animate-fadeIn">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg sm:rounded-xl">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-green-400 font-semibold text-sm sm:text-base lg:text-lg">✅ Muvaffaqiyatli yuborildi!</p>
                  <p className="text-green-300 text-xs sm:text-sm">Tez orada javob beraman</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-400/30 rounded-xl sm:rounded-2xl shadow-lg shadow-red-500/10 animate-fadeIn">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-red-500/20 rounded-lg sm:rounded-xl">
                  <span className="text-lg sm:text-xl">⚠️</span>
                </div>
                <div>
                  <p className="text-red-400 font-semibold text-sm sm:text-base lg:text-lg">Xatolik yuz berdi</p>
                  <p className="text-red-300 text-xs sm:text-sm">Iltimos, qaytadan urinib ko'ring</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6 flex-grow flex flex-col">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-gray-400">
                Ismingiz *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                placeholder="Ismingizni kiriting"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-800/50 border-2 border-slate-700 rounded-lg sm:rounded-xl text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:border-cyan-500 transition-colors duration-200"
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-gray-400">
                Email Manzilingiz *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                placeholder="your.email@example.com"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-800/50 border-2 border-slate-700 rounded-lg sm:rounded-xl text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:border-cyan-500 transition-colors duration-200"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="space-y-2 flex-grow flex flex-col">
              <label htmlFor="message" className="block text-xs sm:text-sm font-bold text-gray-400">
                Xabaringiz *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                required
                rows="4"
                placeholder="Loyihangiz yoki taklifingiz haqida batafsil yozing..."
                className="w-full flex-grow px-4 sm:px-5 py-3 sm:py-4 bg-slate-800/50 border-2 border-slate-700 rounded-lg sm:rounded-xl text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:border-cyan-500 resize-none transition-colors duration-200"
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base sm:text-lg rounded-lg sm:rounded-xl 
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-sm sm:text-base">Yuborilmoqda...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <span className="text-sm sm:text-base">Xabar Yuborish</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

// Contact Info Card Component
const ContactInfoCard = React.memo(({ contactInfo, copiedPhone }) => (
  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" />
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white">
          Aloqa Ma'lumotlari
        </h3>
      </div>

      <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 leading-relaxed">
        Yangi loyihalar, ijodiy g'oyalar yoki hamkorlik haqida gaplashishga tayyorman
      </p>

      {/* Contact items */}
      <div className="space-y-3 sm:space-y-4">
        {contactInfo.map((item, index) => (
          <ContactInfoItem 
            key={index} 
            item={item} 
            copiedPhone={copiedPhone}
          />
        ))}
      </div>
    </div>
  </div>
));

ContactInfoCard.displayName = 'ContactInfoCard';

// Contact Info Item Component
const ContactInfoItem = React.memo(({ item, copiedPhone }) => {
  const Icon = item.icon;
  
  return (
    <div
      onClick={item.onClick}
      className={`group/item ${item.onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 bg-slate-800/50 border border-slate-700 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-slate-800/70 hover:border-slate-600">
        
        {/* Icon */}
        <div className={`p-2 sm:p-3 lg:p-4 bg-slate-700/50 rounded-lg sm:rounded-xl flex-shrink-0`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${item.iconColor}`} />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider truncate">
            {item.label}
          </p>
          {item.href ? (
            <a
              href={item.href}
              className="text-sm sm:text-base text-white hover:text-cyan-300 transition-colors duration-300 font-semibold break-all hover:underline line-clamp-1"
            >
              {item.value}
            </a>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <p className="text-sm sm:text-base text-white font-semibold truncate">
                {item.value}
              </p>
              {item.onClick && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full transition-all duration-300 inline-flex items-center justify-center w-fit ${
                  copiedPhone 
                    ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20'
                }`}>
                  {copiedPhone ? '✓ Nusxalandi' : 'Nusxalash'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Arrow indicator */}
        {item.href && (
          <div className="text-gray-600 group-hover/item:text-cyan-400 transition-colors duration-300 flex-shrink-0">
            →
          </div>
        )}
      </div>
    </div>
  );
});

ContactInfoItem.displayName = 'ContactInfoItem';

// Social Links Card Component
const SocialLinksCard = React.memo(({ socialLinks }) => (
  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400" />
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
          Ijtimoiy Tarmoqlar
        </h3>
      </div>

      {/* Social links grid */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {socialLinks.map((social, index) => (
          <SocialLink key={index} social={social} />
        ))}
      </div>
    </div>
  </div>
));

SocialLinksCard.displayName = 'SocialLinksCard';

// Social Link Component
const SocialLink = React.memo(({ social }) => {
  const Icon = social.icon;
  
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group/social"
      aria-label={social.label}
    >
      <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 bg-gradient-to-r ${social.gradient} rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg`}>
        
        {/* Icon */}
        <div className="p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl group-hover/social:bg-white/15 transition-all duration-300 flex-shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white group-hover/social:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <p className="text-base sm:text-lg font-bold text-white">{social.label}</p>
          <p className="text-white/70 text-xs sm:text-sm">Kuzatib boring</p>
        </div>

        {/* Arrow */}
        <div className="text-white/70 group-hover/social:text-white transition-colors duration-300 flex-shrink-0">
          →
        </div>
      </div>
    </a>
  );
});

SocialLink.displayName = 'SocialLink';

// Quick Response Card Component
const QuickResponseCard = React.memo(() => (
  <div className="bg-slate-900/80 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative z-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
        </div>
        <h4 className="text-base sm:text-lg font-bold text-white">Tez Javob</h4>
      </div>
      <p className="text-xs sm:text-sm text-gray-400">
        24 soat ichida javob beraman
      </p>
    </div>
  </div>
));

QuickResponseCard.displayName = 'QuickResponseCard';

// Availability Card Component
const AvailabilityCard = React.memo(() => (
  <div className="bg-slate-900/80 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative z-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg sm:rounded-xl">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
        </div>
        <h4 className="text-base sm:text-lg font-bold text-white">Mavjud</h4>
      </div>
      <p className="text-xs sm:text-sm text-gray-400">
        Yangi loyihalar uchun ochiq
      </p>
    </div>
  </div>
));

AvailabilityCard.displayName = 'AvailabilityCard';

export default Contact;