import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
}

export function HolographicCard({ children, className = '' }: HolographicCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['25deg', '-25deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-25deg', '25deg']);
  const brightness = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [1.5, 1, 1.5]
  );
  const backgroundOpacity = useTransform(
    mouseYSpring,
    [-0.5, 0, 0.5],
    [0.3, 0.2, 0.3]
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${className}`}
    >
      <motion.div
        style={{
          filter: `brightness(${brightness})`,
          background: `linear-gradient(
            135deg,
            rgba(255,255,255,${backgroundOpacity}),
            rgba(120,120,255,${backgroundOpacity})
          )`,
        }}
        className="absolute inset-0 rounded-xl backdrop-blur-sm"
      />
      <div
        style={{ transform: 'translateZ(50px)' }}
        className="relative backdrop-blur-sm rounded-xl"
      >
        {children}
      </div>
    </motion.div>
  );
}