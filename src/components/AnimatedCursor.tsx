import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; }[]>([]);

  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      setTrail(prev => [...prev.slice(-5), newPosition]);
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
    <>
      {/* Cursor Trail */}
      {trail.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[99] mix-blend-difference"
          initial={{ opacity: 0.5 }}
          animate={{
            x: pos.x - 16,
            y: pos.y - 16,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "linear",
          }}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="4" fill="white" opacity="0.2" />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* Main Cursor */}
      <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.1 : 1,
      }}
      transition={{
        type: 'tween',
        ease: "linear",
        duration: 0.05,
      }}
    >
      <motion.div
        className="relative w-8 h-8 flex items-center justify-center"
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
          <circle cx="16" cy="16" r="8" fill="white" />
          <circle cx="16" cy="16" r="4" fill="white" opacity="0.5" />
        </svg>
      </motion.div>
    </motion.div>
    </>
  );
};

export default AnimatedCursor;
