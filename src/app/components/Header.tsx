import { ShoppingBag, Languages } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeaderProps {
  onCartOpen: () => void;
  cartItemsCount: number;
}

export function Header({ onCartOpen, cartItemsCount }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-['Ovo'] text-rose-900">{t.headerTitle}</h1>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('wedding')}
            className="text-sm text-rose-800/70 hover:text-rose-900 transition-colors"
          >
            {t.navWedding}
          </button>
          <button 
            onClick={() => scrollToSection('evening')}
            className="text-sm text-rose-800/70 hover:text-rose-900 transition-colors"
          >
            {t.navEvening}
          </button>
          <button 
            onClick={() => scrollToSection('children')}
            className="text-sm text-rose-800/70 hover:text-rose-900 transition-colors"
          >
            {t.navChildren}
          </button>
          <button 
            onClick={() => scrollToSection('process')}
            className="text-sm text-rose-800/70 hover:text-rose-900 transition-colors"
          >
            {t.navProcess}
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-sm text-rose-800/70 hover:text-rose-900 transition-colors"
          >
            {t.navContact}
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 text-sm text-rose-800 hover:text-rose-900 hover:bg-rose-50 rounded-full transition-colors"
          >
            <Languages className="w-4 h-4" />
            <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button 
            onClick={onCartOpen}
            className="relative p-2 hover:bg-rose-50 rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-rose-900" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
