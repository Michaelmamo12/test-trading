import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface TimeWarpProps {
  children: ReactNode;
  isVisible: boolean;
  onExitComplete?: () => void;
}

export function TimeWarp({ children, isVisible, onExitComplete }: TimeWarpProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 1.2,
            filter: 'blur(20px)',
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}