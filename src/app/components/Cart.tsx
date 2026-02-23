import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from './ProductCard';
import { useLanguage } from '../LanguageContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (id: string) => void;
  onWhatsAppOrder: () => void;
}

export function Cart({ isOpen, onClose, items, onRemoveItem, onWhatsAppOrder }: CartProps) {
  const { t } = useLanguage();
  
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return sum + price;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-rose-100 flex items-center justify-between">
              <h2 className="text-2xl font-['Ovo'] text-rose-950">{t.cartTitle}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-rose-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-rose-900" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-rose-200 mb-4" />
                  <p className="text-rose-400">{t.cartEmpty}</p>
                  <p className="text-sm text-rose-300 mt-2">{t.cartEmptyDesc}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 bg-rose-50 rounded-2xl"
                    >
                      <div 
                        className="w-20 h-24 bg-rose-100 overflow-hidden flex-shrink-0 rounded-full"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-['Ovo'] text-rose-950 mb-1">{item.name}</h3>
                        <p className="text-rose-500 font-medium">{item.price}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-rose-400 hover:text-rose-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-rose-100 space-y-4">
                <button
                  onClick={onWhatsAppOrder}
                  className="w-full py-4 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t.cartOrderButton}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
