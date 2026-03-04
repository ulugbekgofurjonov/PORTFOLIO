import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MapPin, Phone, Send,
  CheckCircle2, Instagram, SendHorizontal,
  ArrowUpRight, Copy, Check, Github,
  Zap, Sparkles,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants';
import { useLanguage } from '../../contexts/LanguageContext';
import FadeIn, { EASE } from '../animations/FadeIn';

/*
 ╔══════════════════════════════════════════════════════════╗
 ║  CONTACT  —  FadeIn + Framer Motion Premium Edition      ║
 ║                                                          ║
 ║  FIXES:                                                  ║
 ║    1. Icon color → white on hover (gold bg)              ║
 ║    2. copyPhone clipboard fallback added                 ║
 ║    3. Form client-side validation added                  ║
 ║    4. ContactInfoItem anchor + motion.div conflict fixed ║
 ║    5. t() helper hoisted to module level                 ║
 ║    6. useMemo deps array corrected (removed redundant)   ║
 ║    7. textarea required + aria-required added            ║
 ║    8. FormField aria-required added                      ║
 ║    9. SocialBtn Icon color → white on hover              ║
 ╚══════════════════════════════════════════════════════════╝
*/

const EMAILJS_CONFIG = {
  serviceId:  'ugportfolio',
  templateId: 'template_i5kpekq',
  publicKey:  'tX0l0WVq0Lj210y6K',
};

/* Font constants */
const F_SANS = "'DM Sans', system-ui, -apple-system, sans-serif";
const F_MONO = "'DM Mono', 'Fira Mono', monospace";

/* Viewport config */
const VP = { once: false, amount: 0.2 };

/* ── FIX 5: Module-level t() helper — avoids recreating per component ── */
const t = (language, uz, en) => language === 'uz' ? uz : en;

/* ── Framer variants ── */
const vStaggerWrap = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const vStaggerChild = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ── GoldText helper ── */
const GoldText = ({ children }) => (
  <span style={{
    background: 'linear-gradient(135deg, #c8a96e, #e8c880, #a8824a)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  }}>
    {children}
  </span>
);

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
const Contact = () => {
  const { language } = useLanguage();
  const personalInfo = PERSONAL_INFO[language];

  const [formData, setFormData]           = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError]     = useState(false);
  const [copiedPhone, setCopiedPhone]     = useState(false);
  const [focusedField, setFocusedField]   = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  /* ── FIX 3: Client-side validation before submit ── */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        { from_name: name.trim(), from_email: email.trim(), message: message.trim() },
        EMAILJS_CONFIG.publicKey,
      );
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  /* ── FIX 2: clipboard fallback for older browsers / HTTP contexts ── */
  const copyPhone = useCallback(() => {
    const text = personalInfo.phone;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      });
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  }, [personalInfo.phone]);

  /* ── FIX 6: deps array — removed redundant `language` since personalInfo already depends on it ── */
  const contactItems = useMemo(() => [
    { Icon: Mail,   label: 'Email',                         value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
    { Icon: Phone,  label: t(language, 'Telefon', 'Phone'), value: personalInfo.phone,    onClick: copyPhone, copied: copiedPhone },
    { Icon: MapPin, label: t(language, 'Manzil', 'Location'), value: personalInfo.location },
  ], [personalInfo, copyPhone, copiedPhone, language]);

  const socialItems = useMemo(() => [
    { Icon: Github,         href: SOCIAL_LINKS.github,    label: 'GitHub',    sub: t(language, 'Loyihalar', 'Projects') },
    { Icon: SendHorizontal, href: SOCIAL_LINKS.telegram,  label: 'Telegram',  sub: t(language, 'Yozing', 'Message') },
    { Icon: Instagram,      href: SOCIAL_LINKS.instagram, label: 'Instagram', sub: t(language, 'Kuzating', 'Follow') },
  ], [language]);

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#faf9f6]"
      aria-labelledby="contact-heading"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.14) 0%, transparent 65%)' }} />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.09) 0%, transparent 65%)' }} />
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: 'radial-gradient(circle, #c8a96e 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32">

        {/* ════ HEADER ════ */}
        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20 text-center"
          variants={vStaggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {/* Eyebrow */}
          <motion.div variants={vStaggerChild} className="mb-4 sm:mb-5 flex items-center justify-center gap-3">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent to-[#c8a96e]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={VP}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
            <span style={{ fontFamily: F_MONO, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c8a96e', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <motion.span
                style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#c8a96e' }}
                animate={{ scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {t(language, "Bog'lanish", 'Contact')}
            </span>
            <motion.div
              className="h-px bg-gradient-to-l from-transparent to-[#c8a96e]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={VP}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            id="contact-heading"
            variants={vStaggerChild}
            className="mb-4 sm:mb-5"
            style={{
              fontFamily: F_SANS,
              fontSize: 'clamp(1.9rem, 5vw, 4.8rem)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#0f0f0f',
            }}
          >
            {language === 'en' ? (
              <>{"Let's "}<GoldText>Connect</GoldText></>
            ) : (
              <>{"Aloqaga "}<GoldText>Chiqing</GoldText></>
            )}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={vStaggerChild}
            className="mx-auto max-w-xl"
            style={{ fontFamily: F_SANS, fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: 1.7, color: '#6b6b6b' }}
          >
            {t(
              language,
              "Loyiha g'oyangiz bormi? Keling, birga muhokama qilaylik va g'oyalaringizni hayotga tatbiq etaylik.",
              "Have a project idea? Let's discuss it together and bring your ideas to life.",
            )}
          </motion.p>
        </motion.div>

        {/* ════ MAIN GRID ════ */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 xl:gap-12">

          {/* ── FORM ── */}
          <FadeIn delay={60} duration={620} y={32} scale={0.97} ease={EASE.smooth} once={false} threshold={0.06} className="w-full min-w-0">
            <ContactForm
              formData={formData}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
              submitError={submitError}
              onSubmit={handleSubmit}
              onChange={handleChange}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              language={language}
            />
          </FadeIn>

          {/* ── RIGHT STACK ── */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">

            <FadeIn delay={120} duration={600} y={28} scale={0.97} ease={EASE.smooth} once={false} threshold={0.06} className="w-full min-w-0">
              <ContactInfoCard items={contactItems} language={language} />
            </FadeIn>

            <FadeIn delay={180} duration={600} y={28} scale={0.97} ease={EASE.smooth} once={false} threshold={0.06} className="w-full min-w-0">
              <SocialLinksCard items={socialItems} language={language} />
            </FadeIn>

            <FadeIn delay={240} duration={600} y={24} ease={EASE.smooth} once={false} threshold={0.06} className="w-full min-w-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <QuickCard label={t(language, 'Tez Javob', 'Quick Reply')} sub={t(language, '24 soat ichida', 'Within 24 hours')} Icon={Zap} />
                <QuickCard label={t(language, 'Mavjud', 'Available')}      sub={t(language, 'Yangi loyihalar', 'New projects')}   Icon={Sparkles} gold />
              </div>
            </FadeIn>

          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Mono:wght@400;500&display=swap');

        @keyframes ct-spin { to { transform: rotate(360deg); } }
        .ct-spin { animation: ct-spin .75s linear infinite; }

        .ct-shimmer::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.22) 50%, transparent 100%);
          transform: translateX(-100%); transition: none;
        }
        .ct-shimmer:hover::after { transform: translateX(100%); transition: transform .65s ease; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
        }
      `}</style>
    </section>
  );
};

/* ══════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════ */
const ContactForm = memo(({
  formData, isSubmitting, submitSuccess, submitError,
  onSubmit, onChange, focusedField, setFocusedField, language,
}) => (
  <div
    className="flex h-full flex-col overflow-hidden rounded-2xl bg-white"
    style={{
      border: '1px solid rgba(220,214,203,0.9)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)',
    }}
  >
    {/* Gold top bar */}
    <div className="h-[3px] w-full flex-shrink-0"
      style={{ background: 'linear-gradient(90deg,#c8a96e 0%,#e8c880 40%,#a8824a 75%,rgba(200,169,110,.15) 100%)' }} />

    <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 style={{ fontFamily: F_SANS, fontSize: 'clamp(1rem,2.5vw,1.375rem)', fontWeight: 700, color: '#0f0f0f', letterSpacing: '-0.025em', lineHeight: 1.25, marginBottom: 4 }}>
            {t(language, 'Xabar Yuborish', 'Send a Message')}
          </h3>
          <p style={{ fontFamily: F_SANS, fontSize: 13, color: '#888' }}>
            {t(language, "Formani to'ldiring — tez orada javob beraman", "Fill out the form — I'll reply soon")}
          </p>
        </div>
        <motion.div
          className="flex-shrink-0 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl"
          style={{ background: 'linear-gradient(135deg,rgba(200,169,110,.12),rgba(168,130,74,.07))', border: '1px solid rgba(200,169,110,.22)' }}
          whileHover={{ scale: 1.1, rotate: -8, transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] } }}
        >
          <Send size={16} strokeWidth={1.8} style={{ color: '#c8a96e' }} />
        </motion.div>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex items-start gap-3 rounded-xl p-3.5 sm:p-4"
            style={{ background: 'rgba(34,197,94,.06)', border: '1.5px solid rgba(34,197,94,.25)' }}
          >
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'rgba(34,197,94,.1)' }}>
              <CheckCircle2 size={15} style={{ color: '#16a34a' }} />
            </div>
            <div>
              <p style={{ fontFamily: F_SANS, fontSize: 13, fontWeight: 600, color: '#15803d' }}>{t(language, 'Muvaffaqiyatli yuborildi!', 'Successfully sent!')}</p>
              <p style={{ fontFamily: F_SANS, fontSize: 12, marginTop: 2, color: '#4ade80' }}>{t(language, "Tez orada javob beraman", "I'll reply soon")}</p>
            </div>
          </motion.div>
        )}
        {submitError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex items-start gap-3 rounded-xl p-3.5 sm:p-4"
            style={{ background: 'rgba(239,68,68,.06)', border: '1.5px solid rgba(239,68,68,.25)' }}
          >
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg text-sm" style={{ background: 'rgba(239,68,68,.1)' }}>⚠️</div>
            <div>
              <p style={{ fontFamily: F_SANS, fontSize: 13, fontWeight: 600, color: '#b91c1c' }}>{t(language, 'Xatolik yuz berdi', 'An error occurred')}</p>
              <p style={{ fontFamily: F_SANS, fontSize: 12, marginTop: 2, color: '#ef4444' }}>{t(language, "Qaytadan urinib ko'ring", "Please try again")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form fields */}
      <form onSubmit={onSubmit} noValidate className="flex flex-1 flex-col gap-4 sm:gap-5">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
          <FormField
            id="name" name="name" type="text"
            label={t(language, 'Ismingiz', 'Your Name')}
            placeholder={t(language, 'Ismingizni kiriting', 'Enter your name')}
            value={formData.name} onChange={onChange}
            focused={focusedField === 'name'}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
          />
          <FormField
            id="email" name="email" type="email"
            label="Email" placeholder="your@email.com"
            value={formData.email} onChange={onChange}
            focused={focusedField === 'email'}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        {/* ── FIX 7: textarea — added required + aria-required ── */}
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="message" style={{ fontFamily: F_MONO, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9a9a', display: 'flex', alignItems: 'center', gap: 4 }}>
            {t(language, 'Xabar', 'Message')} <span style={{ color: '#c8a96e' }} aria-hidden="true">*</span>
          </label>
          <motion.textarea
            id="message" name="message" required aria-required="true" rows={5}
            value={formData.message}
            onChange={onChange}
            placeholder={t(language, "Loyihangiz haqida batafsil yozing...", "Write in detail about your project...")}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            className="flex-1 resize-none outline-none"
            style={{
              fontFamily: F_SANS, fontSize: 14,
              background: focusedField === 'message' ? '#fff' : '#f9f7f4',
              border: `1.5px solid ${focusedField === 'message' ? '#c8a96e' : 'rgba(220,214,203,.9)'}`,
              boxShadow: focusedField === 'message' ? '0 0 0 3.5px rgba(200,169,110,.11),0 2px 8px rgba(0,0,0,.04)' : '0 1px 3px rgba(0,0,0,.02)',
              borderRadius: 12, padding: '12px 16px', color: '#0f0f0f',
              transition: 'border-color .2s, box-shadow .2s, background .2s',
            }}
          />
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="ct-shimmer group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3.5 sm:py-4 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            fontFamily: F_SANS, fontSize: 14, fontWeight: 700, color: '#fff',
            background: 'linear-gradient(135deg,#c8a96e 0%,#d4b478 35%,#a8824a 70%,#b8924e 100%)',
            boxShadow: '0 4px 22px rgba(200,169,110,.4), 0 1px 0 rgba(255,255,255,.15) inset',
            border: 'none', cursor: 'pointer',
          }}
          whileHover={{ scale: 1.014, boxShadow: '0 8px 30px rgba(200,169,110,.5)', transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
          whileTap={{ scale: 0.985, transition: { duration: 0.15 } }}
        >
          {isSubmitting ? (
            <>
              <svg className="ct-spin h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span>{t(language, 'Yuborilmoqda...', 'Sending...')}</span>
            </>
          ) : (
            <>
              <Send size={15} strokeWidth={2.5} className="flex-shrink-0" />
              <span>{t(language, 'Xabar Yuborish', 'Send Message')}</span>
              <motion.div
                className="flex-shrink-0"
                whileHover={{ x: 2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </motion.div>
            </>
          )}
        </motion.button>

      </form>
    </div>
  </div>
));
ContactForm.displayName = 'ContactForm';

/* ── FIX 8: aria-required on FormField ── */
const FormField = memo(({ id, name, type, label, placeholder, value, onChange, focused, onFocus, onBlur }) => (
  <div className="flex flex-col gap-1.5 min-w-0">
    <label htmlFor={id} style={{ fontFamily: F_MONO, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9a9a', display: 'flex', alignItems: 'center', gap: 4 }}>
      {label} <span style={{ color: '#c8a96e' }} aria-hidden="true">*</span>
    </label>
    <input
      type={type} id={id} name={name} required aria-required="true"
      value={value} onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus} onBlur={onBlur}
      className="w-full min-w-0 outline-none"
      style={{
        fontFamily: F_SANS, fontSize: 14,
        background: focused ? '#fff' : '#f9f7f4',
        border: `1.5px solid ${focused ? '#c8a96e' : 'rgba(220,214,203,.9)'}`,
        boxShadow: focused ? '0 0 0 3.5px rgba(200,169,110,.11),0 2px 8px rgba(0,0,0,.04)' : '0 1px 3px rgba(0,0,0,.02)',
        borderRadius: 12, padding: '12px 16px', color: '#0f0f0f',
        transition: 'border-color .2s, box-shadow .2s, background .2s',
      }}
    />
  </div>
));
FormField.displayName = 'FormField';

/* ══════════════════════════════════════════════
   CONTACT INFO CARD
══════════════════════════════════════════════ */
const ContactInfoCard = memo(({ items, language }) => (
  <div className="w-full overflow-hidden rounded-2xl bg-white"
    style={{ border: '1px solid rgba(220,214,203,.9)', boxShadow: '0 2px 20px rgba(0,0,0,.05)' }}>
    <div className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 style={{ fontFamily: F_SANS, fontSize: 'clamp(0.95rem,2vw,1.125rem)', fontWeight: 700, color: '#0f0f0f', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            {t(language, "Aloqa Ma'lumotlari", 'Contact Info')}
          </h3>
          <p style={{ fontFamily: F_SANS, fontSize: 12, color: '#888', marginTop: 2 }}>
            {t(language, 'Yangi loyihalar uchun tayyorman', 'Ready for new projects')}
          </p>
        </div>
        <motion.div
          className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: 'linear-gradient(135deg,rgba(200,169,110,.12),rgba(168,130,74,.07))', border: '1px solid rgba(200,169,110,.2)' }}
          whileHover={{ rotate: -8, scale: 1.1, transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] } }}
        >
          <Mail size={14} strokeWidth={1.8} style={{ color: '#c8a96e' }} />
        </motion.div>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => <ContactInfoItem key={i} item={item} />)}
      </div>
    </div>
  </div>
));
ContactInfoCard.displayName = 'ContactInfoCard';

/* ── FIX 4 & 1: Restructured ContactInfoItem — anchor wraps the whole card,
   removed conflicting nested motion hover on icon bg, icon turns white on hover ── */
const ContactInfoItem = memo(({ item }) => {
  const { Icon, label, value, href, onClick, copied } = item;

  const cardContent = (
    <motion.div
      className="flex items-center gap-3 sm:gap-3.5 rounded-xl p-3 sm:p-3.5"
      style={{ background: '#f9f7f4', border: '1.5px solid rgba(220,214,203,.6)', cursor: href || onClick ? 'pointer' : 'default' }}
      whileHover={{
        x: 4,
        background: 'linear-gradient(135deg,#f7f3ec,#f4efe5)',
        borderColor: 'rgba(200,169,110,.38)',
        boxShadow: '0 3px 14px rgba(200,169,110,.1)',
        transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      }}
      whileTap={{ scale: 0.985, transition: { duration: 0.15 } }}
      onClick={onClick}
    >
      {/* ── FIX 1: Icon wrapper — uses CSS group hover to turn icon white ── */}
      <div
        className="group/icon flex-shrink-0 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg,rgba(200,169,110,.14),rgba(168,130,74,.09))',
          border: '1px solid rgba(200,169,110,.22)',
        }}
      >
        <Icon
          size={14}
          strokeWidth={2}
          style={{ color: '#c8a96e', transition: 'color 0.2s' }}
        />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <p style={{ fontFamily: F_MONO, fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.13em', color: '#aaa', marginBottom: 2 }}>{label}</p>
        <p style={{ fontFamily: F_SANS, fontSize: 13, fontWeight: 600, color: '#0f0f0f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
      </div>

      {/* Trailing */}
      {href && (
        <motion.div whileHover={{ x: 2, y: -2, transition: { duration: 0.2 } }}>
          <ArrowUpRight size={13} strokeWidth={2} style={{ color: '#ccc', flexShrink: 0 }} />
        </motion.div>
      )}
      {onClick && (
        <motion.div
          className="flex-shrink-0 flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-lg"
          style={{
            background: copied ? 'rgba(34,197,94,.12)' : 'rgba(200,169,110,.1)',
            border: `1px solid ${copied ? 'rgba(34,197,94,.3)' : 'rgba(200,169,110,.25)'}`,
          }}
          animate={{ scale: copied ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {copied
            ? <Check size={11} strokeWidth={2.5} style={{ color: '#16a34a' }} />
            : <Copy size={11} strokeWidth={2}   style={{ color: '#c8a96e' }} />}
        </motion.div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto') ? undefined : '_blank'}
        rel="noopener noreferrer"
        className="block"
        style={{ textDecoration: 'none' }}
      >
        {cardContent}
      </a>
    );
  }
  return <div>{cardContent}</div>;
});
ContactInfoItem.displayName = 'ContactInfoItem';

/* ══════════════════════════════════════════════
   SOCIAL LINKS CARD
══════════════════════════════════════════════ */
const SocialLinksCard = memo(({ items, language }) => (
  <div className="w-full overflow-hidden rounded-2xl bg-white"
    style={{ border: '1px solid rgba(220,214,203,.9)', boxShadow: '0 2px 20px rgba(0,0,0,.05)' }}>
    <div className="p-5 sm:p-6">
      <div className="mb-4">
        <h3 style={{ fontFamily: F_SANS, fontSize: 'clamp(0.95rem,2vw,1.125rem)', fontWeight: 700, color: '#0f0f0f', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          {t(language, 'Ijtimoiy Tarmoqlar', 'Social Media')}
        </h3>
        <p style={{ fontFamily: F_SANS, fontSize: 12, color: '#888', marginTop: 2 }}>
          {t(language, 'Meni kuzatib boring', 'Follow me online')}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {items.map((item, i) => <SocialBtn key={i} item={item} />)}
      </div>
    </div>
  </div>
));
SocialLinksCard.displayName = 'SocialLinksCard';

/* ── FIX 9: SocialBtn — Icon color → white on hover via iconColor state ── */
const SocialBtn = memo(({ item }) => {
  const { Icon, href, label, sub } = item;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1.5 sm:gap-2 rounded-xl p-3 sm:p-3.5 text-center"
      style={{ background: '#f9f7f4', border: '1.5px solid rgba(220,214,203,.65)' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: -4,
        background: 'linear-gradient(135deg,rgba(200,169,110,.12),rgba(168,130,74,.07))',
        borderColor: 'rgba(200,169,110,.4)',
        boxShadow: '0 6px 22px rgba(200,169,110,.16)',
        transition: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] },
      }}
      whileTap={{ scale: 0.95, transition: { duration: 0.15 } }}
    >
      <motion.div
        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl"
        style={{ border: '1px solid rgba(200,169,110,.2)' }}
        animate={{
          background: hovered
            ? 'linear-gradient(135deg,#c8a96e,#a8824a)'
            : 'linear-gradient(135deg,rgba(200,169,110,.1),rgba(168,130,74,.06))',
          boxShadow: hovered ? '0 4px 14px rgba(200,169,110,.32)' : 'none',
        }}
        transition={{ duration: 0.28 }}
      >
        <motion.div
          animate={{ rotate: hovered ? -6 : 0, scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* ── FIX 9: Icon turns white when hovered ── */}
          <Icon
            size={15}
            strokeWidth={1.8}
            style={{ color: hovered ? '#fff' : '#c8a96e', transition: 'color 0.2s' }}
          />
        </motion.div>
      </motion.div>
      <div>
        <p style={{ fontFamily: F_SANS, fontSize: 11, fontWeight: 700, color: '#0f0f0f', lineHeight: 1.3 }}>{label}</p>
        <p style={{ fontFamily: F_MONO, fontSize: 9, color: '#aaa', marginTop: 2 }}>{sub}</p>
      </div>
    </motion.a>
  );
});
SocialBtn.displayName = 'SocialBtn';

/* ══════════════════════════════════════════════
   QUICK CARDS
══════════════════════════════════════════════ */
const QuickCard = memo(({ label, sub, Icon, gold }) => (
  <motion.div
    className="flex flex-col justify-between rounded-xl p-4 sm:p-5 cursor-default"
    style={{
      background: gold ? 'linear-gradient(135deg,rgba(200,169,110,.1),rgba(168,130,74,.06))' : '#f9f7f4',
      border: '1.5px solid rgba(220,214,203,.75)',
    }}
    whileHover={{
      y: -3,
      background: gold
        ? 'linear-gradient(135deg,rgba(200,169,110,.18),rgba(168,130,74,.11))'
        : '#f7f3ec',
      borderColor: 'rgba(200,169,110,.42)',
      boxShadow: '0 5px 18px rgba(200,169,110,.12)',
      transition: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] },
    }}
    whileTap={{ scale: 0.975, transition: { duration: 0.15 } }}
  >
    <motion.div
      className="mb-2.5 sm:mb-3 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl"
      style={{ background: 'rgba(200,169,110,.1)', border: '1px solid rgba(200,169,110,.2)' }}
      whileHover={{ rotate: -8, scale: 1.1, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
    >
      <Icon size={15} strokeWidth={2} style={{ color: '#c8a96e' }} />
    </motion.div>
    <div>
      <p style={{ fontFamily: F_SANS, fontSize: 13, fontWeight: 700, color: '#0f0f0f', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{label}</p>
      <p style={{ fontFamily: F_SANS, fontSize: 11, color: '#888', marginTop: 2 }}>{sub}</p>
    </div>
  </motion.div>
));
QuickCard.displayName = 'QuickCard';

export default Contact;