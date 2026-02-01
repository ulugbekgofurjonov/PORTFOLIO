import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import FadeIn from '../animations/FadeIn';
import RadialGradientBackground from '../backgrounds/RadialGradientBackground';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      // EmailJS ga xabar yuborish
      await emailjs.send(
        'ugportfolio',           // Service ID
        'template_i5kpekq',      // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'K9FIW4k4QlagLrC4'       // Public Key
      );
      
      // Muvaffaqiyatli yuborildi
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // 5 soniyadan keyin success message'ni yashirish
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Xabar yuborishda xatolik:', error);
      setSubmitError(true);
      
      // 5 soniyadan keyin error message'ni yashirish
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+998 90 123 45 67');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alex@timetoprogram.com',
      href: 'mailto:alex@timetoprogram.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      label: 'Telefon raqam',
      value: '+998 90 123 45 67',
      onClick: copyPhoneNumber,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Joylashuv',
      value: 'Buxoro, Uzbekiston',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/yourusername',
      label: 'GitHub',
      color: 'hover:text-white'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/yourusername',
      label: 'Twitter',
      color: 'hover:text-sky-400'
    }
  ];

  return (
    <section id="contact" className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <RadialGradientBackground variant="contact" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90 font-semibold tracking-wider uppercase">
                Aloqa
              </span>
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                Bog'lanish
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Loyiha g'oyangiz bormi? Keling, birga muhokama qilaylik va g'oyalaringizni hayotga tatbiq etaylik
            </p>
          </div>
        </FadeIn>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Form */}
            <FadeIn delay={100}>
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-blue-400/30 transition-all duration-500">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                    Xabar Yuborish
                  </h3>

                  {/* Success Message */}
                  {submitSuccess && (
                    <div className="mb-6 p-4 backdrop-blur-xl bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <p className="text-green-400 text-sm sm:text-base">
                        ✅ Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beraman.
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitError && (
                    <div className="mb-6 p-4 backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                      <div className="w-5 h-5 text-red-400 flex-shrink-0">⚠️</div>
                      <p className="text-red-400 text-sm sm:text-base">
                        Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring yoki to'g'ridan-to'g'ri email yuboring.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="group/input">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Ismingiz
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ismingizni kiriting"
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="group/input">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div className="group/input">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                        Xabar
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Loyihangiz haqida gapirib bering..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn relative w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Yuborilmoqda...
                          </>
                        ) : (
                          <>
                            Xabar Yuborish
                            <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </form>
                </div>
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={200}>
              <div className="space-y-8">
                
                {/* Info Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-purple-400/30 transition-all duration-500">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      Bog'lanish Ma'lumotlari
                    </h3>
                    <p className="text-gray-400 mb-8">
                      Men har doim yangi loyihalar, ijodiy g'oyalar yoki hamkorlik imkoniyatlari haqida gaplashishga tayyorman. Aloqaga chiqing!
                    </p>

                    <div className="space-y-4">
                      {contactInfo.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={index}
                            onClick={item.onClick}
                            className={`group/item flex items-start gap-4 p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 ${item.onClick ? 'cursor-pointer' : ''}`}
                          >
                            <div className={`p-3 bg-gradient-to-br ${item.color} rounded-lg flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                              {item.href ? (
                                <a
                                  href={item.href}
                                  className="text-white hover:text-blue-400 transition-colors font-medium break-all"
                                >
                                  {item.value}
                                </a>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <p className="text-white font-medium">{item.value}</p>
                                  {item.onClick && (
                                    <span className="text-xs text-gray-500">
                                      {copiedPhone ? '✓ Nusxalandi' : '(bosing)'}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-cyan-400/30 transition-all duration-500">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Ijtimoiy Tarmoqlar
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/social flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105"
                            aria-label={social.label}
                          >
                            <Icon className={`w-5 h-5 text-gray-400 transition-colors ${social.color}`} />
                            <span className="text-sm font-medium text-gray-300 group-hover/social:text-white transition-colors">
                              {social.label}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Quick Response Time */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-green-400/30 transition-all duration-500">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">
                          Tez Javob Beraman
                        </h4>
                        <p className="text-sm text-gray-400">
                          Odatda 24 soat ichida javob beraman
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </FadeIn>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;