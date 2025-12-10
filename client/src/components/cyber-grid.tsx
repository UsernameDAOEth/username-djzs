import React, { useEffect, useRef } from 'react';

export const CyberGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Grid parameters
    const gridSize = 40;
    let offset = 0;
    const speed = 0.5;

    const draw = () => {
      if (!ctx) return;
      
      // Clear with trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fade out
      ctx.fillRect(0, 0, width, height);
      
      ctx.strokeStyle = '#E8A838'; // Cosmic Amber/Gold
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.12;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines (moving down)
      for (let y = offset; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      offset = (offset + speed) % gridSize;

      // Random glitch artifacts - cosmic teal and amber
      if (Math.random() > 0.95) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        const rw = Math.random() * 100;
        const rh = Math.random() * 5;
        
        ctx.fillStyle = Math.random() > 0.5 ? '#E8A838' : '#14B8A6';
        ctx.globalAlpha = 0.25;
        ctx.fillRect(rx, ry, rw, rh);
      }

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
