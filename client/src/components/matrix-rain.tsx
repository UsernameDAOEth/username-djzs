import React, { useEffect, useRef } from 'react';

export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    const columns = Math.floor(width / 10);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start above canvas
    }

    const chars = "01日二三四五六七八九ABCDEF";
    
    const draw = () => {
      if (!ctx) return;

      // Fade out
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#E8A838'; // Cosmic Amber/Gold
      ctx.font = '10px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 10;
        const y = drops[i] * 10;

        // Randomly skip drawing to make it look more sparse/glitchy
        if (Math.random() > 0.1) {
            ctx.globalAlpha = Math.random() * 0.5 + 0.1; // Varying opacity
            ctx.fillText(text, x, y);
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      requestAnimationFrame(draw);
    };

    const handleResize = () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none opacity-20"
    />
  );
};
