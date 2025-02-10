import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 12),
        y: mousePosition.y - (isHovering ? 24 : 12),
        rotate: 45,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: 'tween',
        duration: 0.05,
      }}
    >
      <motion.div
        className="w-6 h-6 bg-dashboard-accent opacity-30"
        style={{
          clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
      />
      <motion.div
        className="w-2 h-2 bg-dashboard-accent absolute top-1.5 left-1.5 rounded-full"
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
      />
    </motion.div>
  );
};

export default AnimatedCursor;
