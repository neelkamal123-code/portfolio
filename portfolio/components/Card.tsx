import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

type CardProps = HTMLMotionProps<'div'> & {
  hover?: boolean;
};

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
