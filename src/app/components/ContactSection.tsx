import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = t.whatsAppContactMessage
      .replace('{name}', formData.name)
      .replace('{email}', formData.email)
      .replace('{date}', formData.date)
      .replace('{message}', formData.message);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWhatsAppDirect = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(t.whatsAppDefaultMessage)}`, '_blank');
  };

  return (
    <section 
      id="contact"
      ref={ref}
      className="min-h-screen py-20 px-6 relative"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1594882645126-14020914d58d?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/85 via-pink-900/80 to-rose-800/85 backdrop-blur-sm" />

      {/* Content */}
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] text-rose-200 uppercase mb-3">
            {t.contactSubtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-['Ovo'] text-white mb-4">
            {t.contactTitle}
          </h2>
          <p className="text-rose-100 max-w-2xl mx-auto">
            {t.contactDescription}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleWhatsAppSubmit}
          className="space-y-6 bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20"
        >
          <div>
            <label className="block text-sm text-rose-100 mb-2">{t.contactNameLabel}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.contactNamePlaceholder}
              required
              className="w-full px-6 py-3 bg-white/90 border border-rose-200 rounded-full focus:outline-none focus:border-rose-400 focus:bg-white transition-colors text-rose-900 placeholder:text-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm text-rose-100 mb-2">{t.contactEmailLabel}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.contactEmailPlaceholder}
              required
              className="w-full px-6 py-3 bg-white/90 border border-rose-200 rounded-full focus:outline-none focus:border-rose-400 focus:bg-white transition-colors text-rose-900 placeholder:text-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm text-rose-100 mb-2">{t.contactDateLabel}</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-6 py-3 bg-white/90 border border-rose-200 rounded-full focus:outline-none focus:border-rose-400 focus:bg-white transition-colors text-rose-900"
            />
          </div>

          <div>
            <label className="block text-sm text-rose-100 mb-2">{t.contactMessageLabel}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t.contactMessagePlaceholder}
              rows={5}
              className="w-full px-6 py-3 bg-white/90 border border-rose-200 rounded-3xl focus:outline-none focus:border-rose-400 focus:bg-white transition-colors resize-none text-rose-900 placeholder:text-rose-400"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white text-rose-900 rounded-full hover:bg-rose-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              {t.contactSendButton}
            </button>
            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              {t.contactWhatsAppButton}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
