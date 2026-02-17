'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  initial?: object;
  animate?: object;
  transition?: object;
}

export function Card({ children, className, hover = false, ...motionProps }: CardProps) {
  return (
    <motion.div
      className={clsx(
        'card relative overflow-hidden',
        hover && 'transition-all duration-300 hover:border-white/10',
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
