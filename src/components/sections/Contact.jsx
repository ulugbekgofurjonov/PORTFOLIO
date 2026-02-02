import React, { useState, useCallback, useMemo } from 'react';
import { Mail, MapPin, Phone, Send, Github, MessageSquare, CheckCircle2, Instagram, SendHorizontal, Sparkles, Zap, Clock, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';
import FadeIn from '../animations/FadeIn';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants';

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
      await emailjs.send(
        'ugportfolio',
        'template_i5kpekq',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'K9FIW4k4QlagLrC4'
      );
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Xabar yuborishda xatolik:', error);
      setSubmitError(true);
      
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
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Faqat RadialGradientBackground qoldirildi */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Premium Header */}
        <FadeIn delay={0}>
          <header className="text-center mb-16 sm:mb-20 lg:mb-24">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-full shadow-lg shadow-cyan-500/10">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-bold tracking-wider uppercase">
                Bog'laning
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>

            {/* Main Title - KO'K RANGLI */}
            <h2 
              id="contact-heading"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight"
            >
              <span className="inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Aloqaga Chiqing
              </span>
            </h2>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <Zap className="w-6 h-6 text-cyan-400" />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Loyiha g'oyangiz bormi? 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold"> Keling, birga </span>
              muhokama qilaylik va g'oyalaringizni 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-bold"> hayotga tatbiq etaylik</span>
            </p>
          </header>
        </FadeIn>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            
            {/* Contact Form - Left Side */}
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

            {/* Contact Info - Right Side */}
            <FadeIn delay={200}>
              <div className="space-y-6 lg:space-y-8">
                
                {/* Contact Information Card */}
                <ContactInfoCard
                  contactInfo={contactInfo}
                  copiedPhone={copiedPhone}
                />

                {/* Social Links Card */}
                <SocialLinksCard socialLinks={socialLinks} />

                {/* Quick Info Cards Row */}
                <div className="grid grid-cols-2 gap-4">
                  <QuickResponseCard />
                  <AvailabilityCard />
                </div>

              </div>
            </FadeIn>

          </div>
        </div>

      </div>
    </section>
  );
};

// Premium Contact Form Component
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
    <div className="relative group h-full">
      {/* Static gradient border effect */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-300"
      />
      
      {/* Main card */}
      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-xl border border-slate-800 group-hover:border-cyan-500/30 rounded-3xl p-8 sm:p-10 lg:p-12 transition-colors duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 h-full flex flex-col overflow-hidden">
        
        {/* Static background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl">
                <Send className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Xabar Yuborish
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Quyidagi formani to'ldiring va men sizga tez orada javob beraman
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-5 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-400/30 rounded-2xl backdrop-blur-xl shadow-lg shadow-green-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-green-400 font-bold text-lg">✅ Muvaffaqiyatli yuborildi!</p>
                  <p className="text-green-300 text-sm">Tez orada javob beraman</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-5 bg-gradient-to-r from-red-500/10 via-rose-500/10 to-red-500/10 border border-red-400/30 rounded-2xl backdrop-blur-xl shadow-lg shadow-red-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-xl">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <p className="text-red-400 font-bold text-lg">Xatolik yuz berdi</p>
                  <p className="text-red-300 text-sm">Iltimos, qaytadan urinib ko'ring</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6 flex-grow flex flex-col">
            <PremiumFormInput
              id="name"
              name="name"
              type="text"
              label="Ismingiz"
              value={formData.name}
              onChange={onChange}
              placeholder="Ismingizni kiriting"
              icon={<span className="text-2xl">👤</span>}
              required
              isFocused={focusedField === 'name'}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />

            <PremiumFormInput
              id="email"
              name="email"
              type="email"
              label="Email Manzilingiz"
              value={formData.email}
              onChange={onChange}
              placeholder="your.email@example.com"
              icon={<Mail className="w-5 h-5" />}
              required
              isFocused={focusedField === 'email'}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />

            <PremiumFormTextarea
              id="message"
              name="message"
              label="Xabaringiz"
              value={formData.message}
              onChange={onChange}
              placeholder="Loyihangiz yoki taklifingiz haqida batafsil yozing..."
              icon={<MessageSquare className="w-5 h-5" />}
              required
              isFocused={focusedField === 'message'}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
            />

            <PremiumSubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

// Premium Form Input Component
const PremiumFormInput = React.memo(({ 
  id, name, type, label, value, onChange, placeholder, icon, required, isFocused, onFocus, onBlur 
}) => (
  <div className="group/input relative">
    <label 
      htmlFor={id} 
      className={`block text-sm font-bold mb-3 transition-all duration-200 flex items-center gap-2 ${
        isFocused ? 'text-cyan-400' : 'text-gray-400'
      }`}
    >
      {icon}
      <span>{label}</span>
      {required && <span className="text-cyan-400">*</span>}
    </label>
    
    <div className="relative">
      {/* Static glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 blur transition-opacity duration-200 ${
        isFocused ? 'opacity-30' : 'group-hover/input:opacity-15'
      }`} />
      
      {/* Input */}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        className={`relative w-full px-5 py-4 bg-slate-800/50 border-2 rounded-xl text-white placeholder-gray-500 
          transition-all duration-200 focus:outline-none backdrop-blur-xl
          ${isFocused 
            ? 'border-cyan-400 bg-slate-800/70 shadow-lg shadow-cyan-500/10' 
            : 'border-slate-700 hover:border-slate-600'
          }`}
      />
      
      {/* Character count for focused state */}
      {isFocused && value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cyan-400 font-mono">
          {value.length}
        </div>
      )}
    </div>
  </div>
));

PremiumFormInput.displayName = 'PremiumFormInput';

// Premium Form Textarea Component
const PremiumFormTextarea = React.memo(({ 
  id, name, label, value, onChange, placeholder, icon, required, isFocused, onFocus, onBlur 
}) => (
  <div className="group/input relative flex-grow flex flex-col">
    <label 
      htmlFor={id} 
      className={`block text-sm font-bold mb-3 transition-all duration-200 flex items-center gap-2 ${
        isFocused ? 'text-cyan-400' : 'text-gray-400'
      }`}
    >
      {icon}
      <span>{label}</span>
      {required && <span className="text-cyan-400">*</span>}
    </label>
    
    <div className="relative flex-grow flex">
      {/* Static glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 blur transition-opacity duration-200 ${
        isFocused ? 'opacity-30' : 'group-hover/input:opacity-15'
      }`} />
      
      {/* Textarea */}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        rows="6"
        placeholder={placeholder}
        className={`relative w-full flex-grow px-5 py-4 bg-slate-800/50 border-2 rounded-xl text-white placeholder-gray-500 
          transition-all duration-200 focus:outline-none resize-none backdrop-blur-xl
          ${isFocused 
            ? 'border-cyan-400 bg-slate-800/70 shadow-lg shadow-cyan-500/10' 
            : 'border-slate-700 hover:border-slate-600'
          }`}
      />
      
      {/* Character count */}
      {isFocused && (
        <div className="absolute right-3 bottom-3 text-xs text-cyan-400 font-mono bg-slate-900/80 px-2 py-1 rounded">
          {value.length} / 500
        </div>
      )}
    </div>
  </div>
));

PremiumFormTextarea.displayName = 'PremiumFormTextarea';

// Premium Submit Button Component
const PremiumSubmitButton = React.memo(({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="group/btn relative w-full px-8 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-lg rounded-xl 
      transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden 
      shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:brightness-110 active:scale-[0.98]"
  >
    {/* Static shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
    
    {/* Content */}
    <span className="relative z-10 flex items-center justify-center gap-3">
      {isSubmitting ? (
        <>
          <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="tracking-wide">Yuborilmoqda...</span>
        </>
      ) : (
        <>
          <Zap className="w-6 h-6 group-hover/btn:scale-110 transition-transform duration-200" />
          <span className="tracking-wide">Xabar Yuborish</span>
          <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </>
      )}
    </span>
  </button>
));

PremiumSubmitButton.displayName = 'PremiumSubmitButton';

// Contact Info Card Component
const ContactInfoCard = React.memo(({ contactInfo, copiedPhone }) => (
  <div className="relative group">
    {/* Static gradient border */}
    <div 
      className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-300"
    />
    
    <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-xl border border-slate-800 group-hover:border-cyan-500/30 rounded-3xl p-8 transition-colors duration-300 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden">
      
      {/* Static background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
            <Phone className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Aloqa Ma'lumotlari
          </h3>
        </div>

        <p className="text-gray-400 mb-8 leading-relaxed">
          Yangi loyihalar, ijodiy g'oyalar yoki hamkorlik haqida gaplashishga tayyorman
        </p>

        {/* Contact items */}
        <div className="space-y-4">
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
  </div>
));

ContactInfoCard.displayName = 'ContactInfoCard';

// Contact Info Item Component
const ContactInfoItem = React.memo(({ item, copiedPhone }) => {
  const Icon = item.icon;
  
  return (
    <div
      onClick={item.onClick}
      className={`group/item relative overflow-hidden ${item.onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Static gradient border */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover/item:opacity-20 blur transition-opacity duration-300`} />
      
      <div className="relative flex items-center gap-4 p-5 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl border border-slate-700 group-hover/item:border-slate-600 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
        
        {/* Icon */}
        <div className={`p-4 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl shadow-inner`}>
          <Icon className={`w-6 h-6 ${item.iconColor} transition-transform duration-300 group-hover/item:scale-110`} />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-500 group-hover/item:text-cyan-400 mb-1 transition-colors duration-300 uppercase tracking-wider">
            {item.label}
          </p>
          {item.href ? (
            <a
              href={item.href}
              className="text-white group-hover/item:text-cyan-300 transition-colors duration-300 font-semibold break-all hover:underline"
            >
              {item.value}
            </a>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-white group-hover/item:text-cyan-300 font-semibold transition-colors duration-300">
                {item.value}
              </p>
              {item.onClick && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full transition-all duration-300 ${
                  copiedPhone 
                    ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 group-hover/item:bg-cyan-500/20'
                }`}>
                  {copiedPhone ? '✓ Nusxalandi' : 'Nusxalash'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Arrow indicator */}
        {item.href && (
          <div className="text-gray-600 group-hover/item:text-cyan-400 transition-colors duration-300">
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
  <div className="relative group">
    {/* Static gradient border */}
    <div 
      className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-300"
    />
    
    <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-xl border border-slate-800 group-hover:border-purple-500/30 rounded-3xl p-8 transition-colors duration-300 hover:shadow-xl hover:shadow-purple-500/10 overflow-hidden">
      
      {/* Static background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
            <Globe className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Ijtimoiy Tarmoqlar
          </h3>
        </div>

        {/* Social links grid */}
        <div className="grid grid-cols-1 gap-4">
          {socialLinks.map((social, index) => (
            <SocialLink key={index} social={social} />
          ))}
        </div>
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
      className="group/social relative block overflow-hidden"
      aria-label={social.label}
    >
      {/* Static gradient border */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${social.gradient} rounded-2xl opacity-0 group-hover/social:opacity-20 blur transition-opacity duration-300`} />
      
      <div className={`relative flex items-center gap-4 p-5 bg-gradient-to-r ${social.gradient} ${social.hoverGradient} rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl`}>
        
        {/* Icon */}
        <div className="p-3 bg-white/10 backdrop-blur-xl rounded-xl group-hover/social:bg-white/15 transition-all duration-300">
          <Icon className="w-6 h-6 text-white group-hover/social:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <p className="text-white font-bold text-lg">{social.label}</p>
          <p className="text-white/70 text-sm">Kuzatib boring</p>
        </div>

        {/* Arrow */}
        <div className="text-white/70 group-hover/social:text-white transition-colors duration-300">
          →
        </div>
      </div>
    </a>
  );
});

SocialLink.displayName = 'SocialLink';

// Quick Response Card Component
const QuickResponseCard = React.memo(() => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-15 blur transition-opacity duration-300" />
    
    <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-900/90 backdrop-blur-xl border border-slate-800 group-hover:border-green-500/30 rounded-2xl p-6 transition-colors duration-300 shadow-lg hover:shadow-xl">
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <h4 className="text-lg font-black text-white">Tez Javob</h4>
        </div>
        <p className="text-sm text-gray-400 group-hover:text-green-300 transition-colors duration-300">
          24 soat ichida javob beraman
        </p>
      </div>
    </div>
  </div>
));

QuickResponseCard.displayName = 'QuickResponseCard';

// Availability Card Component
const AvailabilityCard = React.memo(() => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-15 blur transition-opacity duration-300" />
    
    <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-900/90 backdrop-blur-xl border border-slate-800 group-hover:border-blue-500/30 rounded-2xl p-6 transition-colors duration-300 shadow-lg hover:shadow-xl">
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
          </div>
          <h4 className="text-lg font-black text-white">Mavjud</h4>
        </div>
        <p className="text-sm text-gray-400 group-hover:text-blue-300 transition-colors duration-300">
          Yangi loyihalar uchun ochiq
        </p>
      </div>
    </div>
  </div>
));

AvailabilityCard.displayName = 'AvailabilityCard';

export default Contact;