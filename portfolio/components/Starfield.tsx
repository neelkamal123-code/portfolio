'use client';

import { useEffect, useRef } from 'react';

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    interface Star {
      x: number; y: number; r: number;
      a: number; da: number; vx: number; vy: number;
    }

    let W = 0, H = 0;
    let stars: Star[] = [];
    let rafId: number;

    function mkStar(): Star {
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.1,
        a: Math.random() * 0.7 + 0.05,
        da: (Math.random() - 0.5) * 0.003,
        vx: (Math.random() - 0.5) * 0.015,
        vy: (Math.random() - 0.5) * 0.012,
      };
    }

    function init() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      const n = Math.floor((W * H) / 6000);
      stars = Array.from({ length: n }, mkStar);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy; s.a += s.da;
        if (s.a > 0.75 || s.a < 0.03) s.da *= -1;
        if (s.x < -2) s.x = W + 2;
        if (s.x > W + 2) s.x = -2;
        if (s.y < -2) s.y = H + 2;
        if (s.y > H + 2) s.y = -2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${s.a.toFixed(2)})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', init);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
