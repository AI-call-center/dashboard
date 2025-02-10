import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = 'none';

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
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 1.1 : 1,
      }}
      transition={{
        type: 'tween',
        duration: 0,
      }}
    >
      <motion.div
        className="relative w-8 h-8"
        style={{
          filter: isHovering ? 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))' : 'none',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White outline */}
          <path
            d="M6 2L6 23L11 18L14 26L18 24L15 16L22 16L6 2Z"
            stroke="white"
            strokeWidth="2"
          />
          {/* Black fill */}
          <path
            d="M6 2L6 23L11 18L14 26L18 24L15 16L22 16L6 2Z"
            fill="black"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCursor;
