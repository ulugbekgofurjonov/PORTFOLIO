import React, { useState, useCallback, useMemo, useRef, useEffect, memo } from 'react';
import {
  Mail, MapPin, Phone, Send,
  CheckCircle2, Instagram, SendHorizontal,
  ArrowUpRight, Copy, Check, Github,
  Zap, Sparkles,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants';
import { useLanguage } from '../../contexts/LanguageContext';

const EMAILJS_CONFIG = {
  serviceId:  'ugportfolio',
  templateId: 'template_i5kpekq',
  publicKey:  'tX0l0WVq0Lj210y6K',
};

/* ─────────────────────────────────────
   Scroll Reveal hook
───────────────────────────────────── */
const useReveal = () => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on];
};

const Reveal = memo(({ children, delay = 0, className = '' }) => {
  const [ref, on] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 1,
        transform: on ? 'translateY(0)' : 'translateY(28px)',
        transition: `transform .72s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
});
Reveal.displayName = 'Reveal';

/* ═════════════════════════════════════════════
   MAIN EXPORT
═════════════════════════════════════════════ */
const Contact = () => {
  const { language }   = useLanguage();
  const personalInfo   = PERSONAL_INFO[language];
  const t = (u, e)     => language === 'uz' ? u : e;

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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        { from_name: formData.name, from_email: formData.email, message: formData.message },
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

  const copyPhone = useCallback(() => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  }, [personalInfo.phone]);

  const contactItems = useMemo(() => [
    { Icon: Mail,   label: 'Email',               value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
    { Icon: Phone,  label: t('Telefon', 'Phone'),  value: personalInfo.phone,   onClick: copyPhone, copied: copiedPhone },
    { Icon: MapPin, label: t('Manzil', 'Location'),value: personalInfo.location },
  ], [personalInfo, copyPhone, copiedPhone, language]);

  const socialItems = useMemo(() => [
    { Icon: Github,         href: SOCIAL_LINKS.github,    label: 'GitHub',    sub: t("Loyihalar", 'Projects') },
    { Icon: SendHorizontal, href: SOCIAL_LINKS.telegram,  label: 'Telegram',  sub: t("Yozing", 'Message') },
    { Icon: Instagram,      href: SOCIAL_LINKS.instagram, label: 'Instagram', sub: t("Kuzating", 'Follow') },
  ], [language]);

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#faf9f6]"
      aria-labelledby="contact-heading"
    >
      {/* ── Ambient glows ── */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.14) 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.09) 0%, transparent 65%)' }}
      />
      {/* ── Dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: 'radial-gradient(circle, #c8a96e 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32">

        {/* ═══ HEADER ═══ */}
        <Reveal className="mb-12 sm:mb-16 lg:mb-20 text-center">
          <div className="mb-4 sm:mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c8a96e]" />
            <span
              className="ct-mono inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8a96e]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8a96e] ct-pulse" />
              {t("Bog'lanish", 'Contact')}
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c8a96e]" />
          </div>

          <h2
            id="contact-heading"
            className="ct-sans mb-4 sm:mb-5"
            style={{
              fontSize: 'clamp(1.9rem, 5vw, 4.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#0f0f0f',
            }}
          >
            {language === 'en' ? (
              <>{"Let's "}<GoldText>Connect</GoldText></>
            ) : (
              <>{"Aloqaga "}<GoldText>Chiqing</GoldText></>
            )}
          </h2>

          <p className="ct-sans mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#6b6b6b]">
            {t(
              "Loyiha g'oyangiz bormi? Keling, birga muhokama qilaylik va g'oyalaringizni hayotga tatbiq etaylik.",
              "Have a project idea? Let's discuss it together and bring your ideas to life.",
            )}
          </p>
        </Reveal>

        {/* ═══ MAIN GRID ═══
            mobile  : single column (form → info)
            tablet  : single column, wider padding
            desktop : 2 col [form | info]
        */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 xl:gap-12">

          {/* ── FORM ── */}
          <Reveal delay={80} className="w-full min-w-0">
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
          </Reveal>

          {/* ── RIGHT STACK ── */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">

            {/* Contact info */}
            <Reveal delay={130} className="w-full min-w-0">
              <ContactInfoCard items={contactItems} language={language} />
            </Reveal>

            {/* Social */}
            <Reveal delay={190} className="w-full min-w-0">
              <SocialLinksCard items={socialItems} language={language} />
            </Reveal>

            {/* Quick stats */}
            <Reveal delay={250} className="w-full min-w-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <QuickCard
                  label={t('Tez Javob', 'Quick Reply')}
                  sub={t('24 soat ichida', 'Within 24 hours')}
                  Icon={Zap}
                />
                <QuickCard
                  label={t('Mavjud', 'Available')}
                  sub={t('Yangi loyihalar', 'New projects')}
                  Icon={Sparkles}
                  gold
                />
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .ct-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .ct-mono { font-family: 'DM Mono', monospace; }

        @keyframes ct-fadein {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ct-fadein { animation: ct-fadein .35s ease-out forwards; }

        @keyframes ct-spin { to { transform: rotate(360deg); } }
        .ct-spin { animation: ct-spin .75s linear infinite; }

        @keyframes ct-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.5; transform:scale(.75); }
        }
        .ct-pulse { animation: ct-pulse 2s ease-in-out infinite; }

        /* Shimmer sweep on submit button */
        .ct-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.22) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: none;
        }
        .ct-shimmer:hover::after {
          transform: translateX(100%);
          transition: transform .65s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
        }
      `}</style>
    </section>
  );
};

/* ── Tiny helper ── */
const GoldText = ({ children }) => (
  <span style={{ background: 'linear-gradient(135deg,#c8a96e,#e8c880,#a8824a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
    {children}
  </span>
);

/* ═════════════════════════════════════════════
   CONTACT FORM
═════════════════════════════════════════════ */
const ContactForm = memo(({
  formData, isSubmitting, submitSuccess, submitError,
  onSubmit, onChange, focusedField, setFocusedField, language,
}) => {
  const t = (u, e) => language === 'uz' ? u : e;

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white"
      style={{
        border: '1px solid rgba(220,214,203,0.9)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)',
      }}
    >
      {/* Gold top bar */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{ background: 'linear-gradient(90deg,#c8a96e 0%,#e8c880 40%,#a8824a 75%,rgba(200,169,110,.15) 100%)' }}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">

        {/* ── Header ── */}
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="ct-sans mb-1 text-lg sm:text-xl lg:text-2xl font-bold text-[#0f0f0f] leading-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              {t('Xabar Yuborish', 'Send a Message')}
            </h3>
            <p className="ct-sans text-xs sm:text-sm text-[#888]">
              {t("Formani to'ldiring — tez orada javob beraman", "Fill out the form — I'll reply soon")}
            </p>
          </div>
          <div
            className="flex-shrink-0 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl"
            style={{
              background: 'linear-gradient(135deg,rgba(200,169,110,.12),rgba(168,130,74,.07))',
              border: '1px solid rgba(200,169,110,.22)',
            }}
          >
            <Send size={16} strokeWidth={1.8} style={{ color: '#c8a96e' }} />
          </div>
        </div>

        {/* ── Alerts ── */}
        {submitSuccess && (
          <div
            className="ct-fadein mb-5 flex items-start gap-3 rounded-xl p-3.5 sm:p-4"
            style={{ background:'rgba(34,197,94,.06)', border:'1.5px solid rgba(34,197,94,.25)' }}
          >
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg" style={{ background:'rgba(34,197,94,.1)' }}>
              <CheckCircle2 size={15} style={{ color:'#16a34a' }} />
            </div>
            <div>
              <p className="ct-sans text-sm font-semibold" style={{ color:'#15803d' }}>{t('Muvaffaqiyatli yuborildi!','Successfully sent!')}</p>
              <p className="ct-sans text-xs mt-0.5" style={{ color:'#4ade80' }}>{t("Tez orada javob beraman","I'll reply soon")}</p>
            </div>
          </div>
        )}
        {submitError && (
          <div
            className="ct-fadein mb-5 flex items-start gap-3 rounded-xl p-3.5 sm:p-4"
            style={{ background:'rgba(239,68,68,.06)', border:'1.5px solid rgba(239,68,68,.25)' }}
          >
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg text-sm" style={{ background:'rgba(239,68,68,.1)' }}>⚠️</div>
            <div>
              <p className="ct-sans text-sm font-semibold text-red-700">{t('Xatolik yuz berdi','An error occurred')}</p>
              <p className="ct-sans text-xs mt-0.5 text-red-500">{t("Qaytadan urinib ko'ring","Please try again")}</p>
            </div>
          </div>
        )}

        {/* ── Form fields ── */}
        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-4 sm:gap-5">

          {/* Name + Email — side by side on sm+ */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
            <FormField
              id="name" name="name" type="text"
              label={t('Ismingiz','Your Name')}
              placeholder={t('Ismingizni kiriting','Enter your name')}
              value={formData.name} onChange={onChange}
              focused={focusedField === 'name'}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
            <FormField
              id="email" name="email" type="email"
              label="Email"
              placeholder="your@email.com"
              value={formData.email} onChange={onChange}
              focused={focusedField === 'email'}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {/* Message */}
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="message" className="ct-mono flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a9a9a]">
              {t('Xabar','Message')} <span style={{ color:'#c8a96e' }}>*</span>
            </label>
            <textarea
              id="message" name="message" required
              rows={5}
              value={formData.message}
              onChange={onChange}
              placeholder={t("Loyihangiz haqida batafsil yozing...","Write in detail about your project...")}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className="ct-sans flex-1 resize-none rounded-xl px-4 py-3 text-sm text-[#0f0f0f] placeholder-[#bbb] outline-none transition-all duration-200"
              style={{
                background: focusedField === 'message' ? '#fff' : '#f9f7f4',
                border: `1.5px solid ${focusedField === 'message' ? '#c8a96e' : 'rgba(220,214,203,.9)'}`,
                boxShadow: focusedField === 'message' ? '0 0 0 3.5px rgba(200,169,110,.11),0 2px 8px rgba(0,0,0,.04)' : '0 1px 3px rgba(0,0,0,.02)',
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="ct-sans ct-shimmer group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3.5 sm:py-4 text-sm font-bold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.012] active:scale-[0.988]"
            style={{
              background: 'linear-gradient(135deg,#c8a96e 0%,#d4b478 35%,#a8824a 70%,#b8924e 100%)',
              boxShadow: '0 4px 22px rgba(200,169,110,.4), 0 1px 0 rgba(255,255,255,.15) inset',
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="ct-spin h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span>{t('Yuborilmoqda...','Sending...')}</span>
              </>
            ) : (
              <>
                <Send size={15} strokeWidth={2.5} className="flex-shrink-0" />
                <span>{t('Xabar Yuborish','Send Message')}</span>
                <ArrowUpRight
                  size={15} strokeWidth={2.5}
                  className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
});
ContactForm.displayName = 'ContactForm';

/* ── Single form field ── */
const FormField = memo(({ id, name, type, label, placeholder, value, onChange, focused, onFocus, onBlur }) => (
  <div className="flex flex-col gap-1.5 min-w-0">
    <label htmlFor={id} className="ct-mono flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a9a9a]">
      {label} <span style={{ color:'#c8a96e' }}>*</span>
    </label>
    <input
      type={type} id={id} name={name} required
      value={value} onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus} onBlur={onBlur}
      className="ct-sans w-full min-w-0 rounded-xl px-4 py-3 text-sm text-[#0f0f0f] placeholder-[#bbb] outline-none transition-all duration-200"
      style={{
        background: focused ? '#fff' : '#f9f7f4',
        border: `1.5px solid ${focused ? '#c8a96e' : 'rgba(220,214,203,.9)'}`,
        boxShadow: focused ? '0 0 0 3.5px rgba(200,169,110,.11),0 2px 8px rgba(0,0,0,.04)' : '0 1px 3px rgba(0,0,0,.02)',
      }}
    />
  </div>
));
FormField.displayName = 'FormField';

/* ═════════════════════════════════════════════
   CONTACT INFO CARD
═════════════════════════════════════════════ */
const ContactInfoCard = memo(({ items, language }) => {
  const t = (u, e) => language === 'uz' ? u : e;
  return (
    <div
      className="w-full overflow-hidden rounded-2xl bg-white"
      style={{ border:'1px solid rgba(220,214,203,.9)', boxShadow:'0 2px 20px rgba(0,0,0,.05)' }}
    >
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="ct-sans text-base sm:text-lg font-bold text-[#0f0f0f] leading-tight" style={{ letterSpacing:'-0.02em' }}>
              {t("Aloqa Ma'lumotlari",'Contact Info')}
            </h3>
            <p className="ct-sans mt-0.5 text-xs text-[#888]">
              {t('Yangi loyihalar uchun tayyorman','Ready for new projects')}
            </p>
          </div>
          <div
            className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background:'linear-gradient(135deg,rgba(200,169,110,.12),rgba(168,130,74,.07))', border:'1px solid rgba(200,169,110,.2)' }}
          >
            <Mail size={14} strokeWidth={1.8} style={{ color:'#c8a96e' }} />
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {items.map((item, i) => <ContactInfoItem key={i} item={item} />)}
        </div>
      </div>
    </div>
  );
});
ContactInfoCard.displayName = 'ContactInfoCard';

const ContactInfoItem = memo(({ item }) => {
  const { Icon, label, value, href, onClick, copied } = item;
  const [hov, setHov] = useState(false);

  const inner = (
    <div
      className="flex items-center gap-3 sm:gap-3.5 rounded-xl p-3 sm:p-3.5 transition-all duration-200"
      style={{
        background: hov ? 'linear-gradient(135deg,#f7f3ec,#f4efe5)' : '#f9f7f4',
        border: `1.5px solid ${hov ? 'rgba(200,169,110,.38)' : 'rgba(220,214,203,.6)'}`,
        boxShadow: hov ? '0 3px 14px rgba(200,169,110,.1)' : 'none',
        transform: hov ? 'translateX(3px)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl transition-all duration-200"
        style={{
          background: hov
            ? 'linear-gradient(135deg,#c8a96e,#a8824a)'
            : 'linear-gradient(135deg,rgba(200,169,110,.14),rgba(168,130,74,.09))',
          border: '1px solid rgba(200,169,110,.22)',
          boxShadow: hov ? '0 3px 12px rgba(200,169,110,.3)' : 'none',
        }}
      >
        <Icon size={14} strokeWidth={2} style={{ color: hov ? '#fff' : '#c8a96e' }} />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="ct-mono mb-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.13em] text-[#aaa]">{label}</p>
        <p className="ct-sans truncate text-xs sm:text-[13px] font-semibold text-[#0f0f0f]">{value}</p>
      </div>

      {/* Trailing icon */}
      {href && (
        <ArrowUpRight
          size={13} strokeWidth={2}
          className="flex-shrink-0 transition-all duration-200"
          style={{ color: hov ? '#c8a96e' : '#ccc', transform: hov ? 'translate(2px,-2px)' : 'none' }}
        />
      )}
      {onClick && (
        <div
          className="flex-shrink-0 flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-lg transition-all duration-200"
          style={{
            background: copied ? 'rgba(34,197,94,.12)' : 'rgba(200,169,110,.1)',
            border: `1px solid ${copied ? 'rgba(34,197,94,.3)' : 'rgba(200,169,110,.25)'}`,
          }}
        >
          {copied
            ? <Check size={11} strokeWidth={2.5} style={{ color:'#16a34a' }} />
            : <Copy size={11} strokeWidth={2} style={{ color:'#c8a96e' }} />}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto') ? undefined : '_blank'}
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="block"
      >
        {inner}
      </a>
    );
  }
  return <div className={onClick ? 'cursor-pointer' : ''}>{inner}</div>;
});
ContactInfoItem.displayName = 'ContactInfoItem';

/* ═════════════════════════════════════════════
   SOCIAL LINKS CARD
═════════════════════════════════════════════ */
const SocialLinksCard = memo(({ items, language }) => {
  const t = (u, e) => language === 'uz' ? u : e;
  return (
    <div
      className="w-full overflow-hidden rounded-2xl bg-white"
      style={{ border:'1px solid rgba(220,214,203,.9)', boxShadow:'0 2px 20px rgba(0,0,0,.05)' }}
    >
      <div className="p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="ct-sans text-base sm:text-lg font-bold text-[#0f0f0f] leading-tight" style={{ letterSpacing:'-0.02em' }}>
            {t('Ijtimoiy Tarmoqlar','Social Media')}
          </h3>
          <p className="ct-sans mt-0.5 text-xs text-[#888]">
            {t('Meni kuzatib boring','Follow me online')}
          </p>
        </div>

        {/* 3-col grid — always */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {items.map((item, i) => <SocialBtn key={i} item={item} />)}
        </div>
      </div>
    </div>
  );
});
SocialLinksCard.displayName = 'SocialLinksCard';

const SocialBtn = memo(({ item }) => {
  const { Icon, href, label, sub } = item;
  const [hov, setHov] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group flex flex-col items-center gap-1.5 sm:gap-2 rounded-xl p-3 sm:p-3.5 text-center transition-all duration-250"
      style={{
        background: hov ? 'linear-gradient(135deg,rgba(200,169,110,.12),rgba(168,130,74,.07))' : '#f9f7f4',
        border: `1.5px solid ${hov ? 'rgba(200,169,110,.4)' : 'rgba(220,214,203,.65)'}`,
        boxShadow: hov ? '0 5px 18px rgba(200,169,110,.14)' : 'none',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}
    >
      <div
        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all duration-200"
        style={{
          background: hov ? 'linear-gradient(135deg,#c8a96e,#a8824a)' : 'linear-gradient(135deg,rgba(200,169,110,.1),rgba(168,130,74,.06))',
          border: '1px solid rgba(200,169,110,.2)',
          boxShadow: hov ? '0 4px 14px rgba(200,169,110,.32)' : 'none',
        }}
      >
        <Icon size={15} strokeWidth={1.8} style={{ color: hov ? '#fff' : '#c8a96e' }} className="transition-transform duration-200 group-hover:scale-110" />
      </div>
      <div>
        <p className="ct-sans text-[11px] sm:text-xs font-bold text-[#0f0f0f] leading-tight">{label}</p>
        <p className="ct-mono text-[8px] sm:text-[9px] text-[#aaa] mt-0.5">{sub}</p>
      </div>
    </a>
  );
});
SocialBtn.displayName = 'SocialBtn';

/* ═════════════════════════════════════════════
   QUICK CARDS
═════════════════════════════════════════════ */
const QuickCard = memo(({ label, sub, Icon, gold }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex flex-col justify-between rounded-xl p-4 sm:p-5 transition-all duration-200 cursor-default"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: gold
          ? (hov ? 'linear-gradient(135deg,rgba(200,169,110,.18),rgba(168,130,74,.11))' : 'linear-gradient(135deg,rgba(200,169,110,.1),rgba(168,130,74,.06))')
          : (hov ? '#f7f3ec' : '#f9f7f4'),
        border: `1.5px solid ${hov ? 'rgba(200,169,110,.42)' : 'rgba(220,214,203,.75)'}`,
        boxShadow: hov ? '0 4px 16px rgba(200,169,110,.1)' : 'none',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div
        className="mb-2.5 sm:mb-3 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl"
        style={{ background:'rgba(200,169,110,.1)', border:'1px solid rgba(200,169,110,.2)' }}
      >
        <Icon size={15} strokeWidth={2} style={{ color:'#c8a96e' }} />
      </div>
      <div>
        <p className="ct-sans text-xs sm:text-sm font-bold text-[#0f0f0f] leading-tight" style={{ letterSpacing:'-0.01em' }}>{label}</p>
        <p className="ct-sans mt-0.5 text-[11px] sm:text-xs text-[#888]">{sub}</p>
      </div>
    </div>
  );
});
QuickCard.displayName = 'QuickCard';

export default Contact;