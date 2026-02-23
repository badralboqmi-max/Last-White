import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../LanguageContext';

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  delay?: number;
}

export function ProductCard({ product, onAddToCart, delay = 0 }: ProductCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className="group cursor-pointer"
    >
      <div className="relative mb-6 overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
        <div 
          className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-rose-100 rounded-full"
          style={{
            aspectRatio: '3/4'
          }}
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Hover overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-rose-900/20 backdrop-blur-[2px] flex items-center justify-center rounded-full"
        >
          <button
            onClick={() => onAddToCart(product)}
            className="px-6 py-3 bg-white text-rose-900 rounded-full hover:bg-rose-50 transition-colors shadow-lg"
          >
            {t.addToCart}
          </button>
        </motion.div>
      </div>

      <div className="text-center">
        <h3 className="font-['Ovo'] text-xl text-rose-950 mb-2">{product.name}</h3>
        <p className="text-rose-500 font-medium">{product.price}</p>
      </div>
    </motion.div>
  );
}