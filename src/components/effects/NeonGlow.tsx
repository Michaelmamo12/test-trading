import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonGlowProps {
  children: ReactNode;
  color?: string;
  pulseSpeed?: number;
  className?: string;
}

export function NeonGlow({
  children,
  color = '#4f46e5',
  pulseSpeed = 2,
  className = '',
}: NeonGlowProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: [
            `0 0 20px ${color}50`,
            `0 0 60px ${color}30`,
            `0 0 20px ${color}50`,
          ],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {children}
    </motion.div>
  );
}