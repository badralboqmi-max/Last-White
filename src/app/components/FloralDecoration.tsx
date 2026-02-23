import { motion } from 'motion/react';

interface FloralDecorationProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
  color: string;
}

export function FloralDecoration({ position, delay = 0, color }: FloralDecorationProps) {
  const positions = {
    'top-left': 'top-20 left-10',
    'top-right': 'top-20 right-10',
    'bottom-left': 'bottom-20 left-10',
    'bottom-right': 'bottom-20 right-10'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
      transition={{ duration: 2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${positions[position]} w-64 h-64 rounded-full blur-3xl pointer-events-none`}
      style={{ backgroundColor: color }}
    />
  );
}
