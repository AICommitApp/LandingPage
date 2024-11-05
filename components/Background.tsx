// components/Background.tsx
import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const Background = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Base dark background */}
      <div className="fixed inset-0 bg-[#21252f]" />

      {/* Mesh gradient overlay */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(800px circle at 100% 100%, rgba(222, 209, 79, 0.12), transparent 40%),
              radial-gradient(600px circle at 0% 0%, rgba(222, 209, 79, 0.1), transparent 40%),
              radial-gradient(800px circle at 100% 0%, rgba(222, 209, 79, 0.08), transparent 40%),
              radial-gradient(600px circle at 0% 100%, rgba(222, 209, 79, 0.08), transparent 40%),
              radial-gradient(1200px circle at 50% 50%, rgba(222, 209, 79, 0.05), transparent 60%)
            `,
            backdropFilter: 'blur(120px)',
            WebkitBackdropFilter: 'blur(120px)'
          }}
        />
      </div>

      {/* Animated glow effect */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              conic-gradient(
                from 230.29deg at 51.63% 52.16%,
                rgba(222, 209, 79, 0.2) 0deg,
                transparent 67.5deg,
                transparent 292.5deg,
                rgba(222, 209, 79, 0.2) 360deg
              )
            `
          }}
        />
      </div>

      {/* Mouse follow effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: mousePosition.x > 0 || mousePosition.y > 0 
            ? `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(222, 209, 79, 0.08), transparent 70%)`
            : 'none',
          transition: 'background 0.3s ease'
        }}
      />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise" />

      <style jsx global>{`
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};