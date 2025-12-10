import React, { useEffect, useRef } from 'react';

export const WireframeCore = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    // 3D Points for a sphere/icosahedron approximation
    const points: { x: number; y: number; z: number }[] = [];
    const numPoints = 40;
    const radius = Math.min(width, height) * 0.35;

    // Fibonacci sphere algorithm for even distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      points.push({ x: x * radius, y: y * radius, z: z * radius });
    }

    // Connections
    const connections: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y, points[i].z - points[j].z);
        if (d < radius * 0.8) { // Connect close points
          connections.push([i, j]);
        }
      }
    }

    let angleX = 0;
    let angleY = 0;

    const rotate = (p: { x: number; y: number; z: number }, ax: number, ay: number) => {
      // Rotate Y
      let x = p.x * Math.cos(ay) - p.z * Math.sin(ay);
      let z = p.x * Math.sin(ay) + p.z * Math.cos(ay);
      let y = p.y;

      // Rotate X
      let y2 = y * Math.cos(ax) - z * Math.sin(ax);
      let z2 = y * Math.sin(ax) + z * Math.cos(ax);
      
      return { x, y: y2, z: z2 };
    };

    const draw = () => {
      if (!ctx) return;
      
      // Clear
      ctx.clearRect(0, 0, width, height);
      
      // Center
      const cx = width / 2;
      const cy = height / 2;

      ctx.strokeStyle = '#5DADE2'; // Sky Blue
      ctx.fillStyle = '#5DADE2';
      
      // Update angles
      angleX += 0.005;
      angleY += 0.008;

      // Draw connections
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      for (let [i, j] of connections) {
        const p1 = rotate(points[i], angleX, angleY);
        const p2 = rotate(points[j], angleX, angleY);
        
        // Simple perspective
        const scale1 = 400 / (400 + p1.z);
        const scale2 = 400 / (400 + p2.z);

        ctx.moveTo(cx + p1.x * scale1, cy + p1.y * scale1);
        ctx.lineTo(cx + p2.x * scale2, cy + p2.y * scale2);
      }
      ctx.stroke();

      // Draw points
      ctx.globalAlpha = 1;
      for (let p of points) {
        const pr = rotate(p, angleX, angleY);
        const scale = 400 / (400 + pr.z);
        const size = 2 * scale;

        ctx.beginPath();
        ctx.arc(cx + pr.x * scale, cy + pr.y * scale, size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 300;
      height = canvas.height = canvas.parentElement?.clientHeight || 300;
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
      className={`w-full h-full absolute inset-0 ${className || ""}`}
    />
  );
};
