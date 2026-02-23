import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ProductCard, Product } from './ProductCard';

interface CollectionSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
  backgroundColor: string;
  onAddToCart: (product: Product) => void;
}

export function CollectionSection({
  id,
  title,
  subtitle,
  products,
  backgroundColor,
  onAddToCart
}: CollectionSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id={id}
      ref={ref}
      className="min-h-screen py-20 px-6 transition-colors duration-1000"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          {subtitle && (
            <p className="text-xs tracking-[0.3em] text-rose-600 uppercase mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-['Ovo'] text-rose-950">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Floating bloom effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute left-10 top-1/4 w-64 h-64 bg-rose-300 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute right-10 bottom-1/4 w-72 h-72 bg-pink-300 rounded-full blur-3xl pointer-events-none"
        />
      </div>
    </section>
  );
}