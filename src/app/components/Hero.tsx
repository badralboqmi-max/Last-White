import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <div className="relative w-full max-w-md mx-auto">
            <div 
              className="relative overflow-hidden rounded-full"
              style={{
                aspectRatio: '1/1.2'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1599681906814-a04375f61af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYnJpZGUlMjB3ZWRkaW5nJTIwZHJlc3N8ZW58MXx8fHwxNzcxODUxMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="White Rose Bride" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="order-1 md:order-2"
        >
          <p className="text-xs tracking-[0.3em] text-rose-600 uppercase mb-4">
            {t.heroSubtitle}
          </p>
          <h2 className="text-5xl md:text-6xl font-['Ovo'] text-rose-950 mb-6">
            {t.heroTitle}
          </h2>
          <p className="text-lg text-rose-800/80 mb-8 leading-relaxed">
            {t.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('wedding')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {t.heroExplore}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(t.whatsAppDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white border-2 border-rose-300 text-rose-600 rounded-full hover:bg-rose-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {t.heroWhatsApp}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating floral decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-20 right-20 w-32 h-32 bg-rose-300 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
        className="absolute bottom-32 left-20 w-40 h-40 bg-pink-300 rounded-full blur-3xl"
      />
    </section>
  );
}