import React, { useMemo } from 'react';

export default function Starfield() {
  // Generate random stable stars with various depths, colors, and twinkling timings
  const stars = useMemo(() => {
    const starList = [];
    const colors = ['#ffffff', '#f8fafc', '#bae6fd', '#fed7aa', '#fbcfe8', '#ddd6fe'];

    for (let i = 0; i < 280; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() < 0.15 ? Math.random() * 2 + 1.8 : Math.random() * 1.5 + 0.8;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 4 + 2;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.7 + 0.3;

      starList.push({
        id: i,
        x,
        y,
        size,
        color,
        duration,
        delay,
        opacity,
        isBright: size > 2.5
      });
    }
    return starList;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden starfield-layer">
      {/* Cosmic Nebula Clouds */}
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />

      {/* Render Star Field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.isBright ? 'star-bright' : ''}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: star.isBright ? `0 0 8px ${star.color}, 0 0 14px ${star.color}` : 'none',
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity
          }}
        />
      ))}

      {/* Shooting Stars / Meteors */}
      <div className="meteor meteor-1" />
      <div className="meteor meteor-2" />
      <div className="meteor meteor-3" />
    </div>
  );
}
