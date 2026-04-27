'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
};

export function MotionSection({ children, className, id, delay = 0 }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

export function MotionItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
