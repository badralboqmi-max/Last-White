import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionSection } from './components/CollectionSection';
import { ContactSection } from './components/ContactSection';
import { Cart } from './components/Cart';
import { Product } from './components/ProductCard';
import { LanguageProvider, useLanguage } from './LanguageContext';

/**
 * White Rose - Elegant E-Commerce Tailoring Center
 * 
 * Features:
 * - Poetic design with blush and coral tones
 * - Unique pill-shaped product cards that mimic rose petals
 * - Scroll-triggered animations with blooming effects
 * - WhatsApp ordering integration
 * - Smooth background color transitions between sections
 * - Slide-out cart with elegant animations
 * - Hover effects that gently lift elements
 * - Responsive and airy botanical aesthetic
 * - Bilingual support (English/Arabic) with RTL layout
 */

// Mock product data
const weddingDresses: Product[] = [
  {
    id: 'w1',
    name: 'A-Line Lace Gown',
    price: '$1,290',
    image: 'https://images.unsplash.com/photo-1764269722929-d4a7f4aa6060?w=800&q=80'
  },
  {
    id: 'w2',
    name: 'Satin Bias Dress',
    price: '$980',
    image: 'https://images.unsplash.com/photo-1771254240510-9d2cce0ac892?w=800&q=80'
  },
  {
    id: 'w3',
    name: 'Floral Appliqué Train',
    price: '$1,590',
    image: 'https://images.unsplash.com/photo-1767050400384-3e2c733e5dba?w=800&q=80'
  }
];

const eveningDresses: Product[] = [
  {
    id: 'e1',
    name: 'Coral Silk Gown',
    price: '$850',
    image: 'https://images.unsplash.com/photo-1737953600058-e7c5eeafb4f1?w=800&q=80'
  },
  {
    id: 'e2',
    name: 'Sequin Evening Dress',
    price: '$920',
    image: 'https://images.unsplash.com/photo-1770344327399-0f5bb1f93756?w=800&q=80'
  },
  {
    id: 'e3',
    name: 'Elegant Silk Dress',
    price: '$780',
    image: 'https://images.unsplash.com/photo-1764265148862-7ee72a4fb367?w=800&q=80'
  }
];

const childrenDresses: Product[] = [
  {
    id: 'c1',
    name: 'Flower Girl Dress',
    price: '$280',
    image: 'https://images.unsplash.com/photo-1601133699325-bb4179ac4a07?w=800&q=80'
  },
  {
    id: 'c2',
    name: 'Tulle Party Dress',
    price: '$320',
    image: 'https://images.unsplash.com/photo-1694083884221-d23d8b1a83b5?w=800&q=80'
  },
  {
    id: 'c3',
    name: 'Pink Celebration Dress',
    price: '$250',
    image: 'https://images.unsplash.com/photo-1769673312629-4f2a3007c4df?w=800&q=80'
  }
];

function AppContent() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLanguage();

  // Handle scroll for background animation
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = scrolled / documentHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      // Check if item already exists
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
    // Brief cart preview
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 2000);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cartItems.map(item => `${item.name} - ${item.price}`).join('\n');
    const message = t.whatsAppOrderMessage.replace('{items}', itemsList);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Animated background gradient based on scroll */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(251, 207, 232, ${0.3 - scrollProgress * 0.3}),
            rgba(255, 228, 230, ${0.2 + scrollProgress * 0.2}),
            rgba(255, 237, 213, ${scrollProgress * 0.3})
          )`,
          zIndex: -1
        }}
      />

      <Header 
        onCartOpen={() => setIsCartOpen(true)} 
        cartItemsCount={cartItems.length}
      />

      <main className="pt-16">
        <Hero />

        <CollectionSection
          id="wedding"
          title={t.weddingTitle}
          products={weddingDresses}
          backgroundColor="rgba(252, 231, 243, 0.5)"
          onAddToCart={handleAddToCart}
        />

        <CollectionSection
          id="evening"
          title={t.eveningTitle}
          subtitle={t.eveningSubtitle}
          products={eveningDresses}
          backgroundColor="rgba(255, 228, 217, 0.5)"
          onAddToCart={handleAddToCart}
        />

        <CollectionSection
          id="children"
          title={t.childrenTitle}
          subtitle={t.childrenSubtitle}
          products={childrenDresses}
          backgroundColor="rgba(251, 233, 243, 0.5)"
          onAddToCart={handleAddToCart}
        />

        <div id="process" className="py-20 px-6 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] text-rose-600 uppercase mb-3">
              {t.processSubtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-['Ovo'] text-rose-950 mb-8">
              {t.processTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="w-16 h-16 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-['Ovo'] text-rose-800">
                  1
                </div>
                <h3 className="font-['Ovo'] text-xl text-rose-950 mb-2">{t.processStep1Title}</h3>
                <p className="text-rose-800/70 text-sm">
                  {t.processStep1Desc}
                </p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-['Ovo'] text-rose-800">
                  2
                </div>
                <h3 className="font-['Ovo'] text-xl text-rose-950 mb-2">{t.processStep2Title}</h3>
                <p className="text-rose-800/70 text-sm">
                  {t.processStep2Desc}
                </p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-['Ovo'] text-rose-800">
                  3
                </div>
                <h3 className="font-['Ovo'] text-xl text-rose-950 mb-2">{t.processStep3Title}</h3>
                <p className="text-rose-800/70 text-sm">
                  {t.processStep3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ContactSection />

        {/* Footer */}
        <footer className="py-12 px-6 bg-rose-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-2xl font-['Ovo'] mb-4">{t.headerTitle}</h3>
            <p className="text-rose-200 mb-6">{t.footerSubtitle}</p>
            <p className="text-rose-300 text-sm">
              {t.footerDescription}
            </p>
            <div className="mt-8 text-rose-400 text-xs">
              {t.footerCopyright}
            </div>
          </div>
        </footer>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onWhatsAppOrder={handleWhatsAppOrder}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}