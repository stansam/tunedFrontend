"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

class Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  wind: number;
  opacity: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.8 + this.radius * 0.4;
    this.wind = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.4 + 0.2;
  }

  update(w: number, h: number) {
    this.y += this.speedY;
    this.x += this.wind;

    if (this.y > h) {
      this.y = -10;
      this.x = Math.random() * w;
    }
    if (this.x > w) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = w;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(148, 163, 184, ${this.opacity})`; // slate-400
    context.fill();
    context.closePath();
  }
}

function useSnowEngine(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    function init() {
      if (!canvas) return;
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx?.scale(ratio, ratio);

      particles = [];
      const count = window.innerWidth < 768 ? 40 : 100;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(width, height));
      }
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.update(width, height);
        p.draw(ctx);
      }
      animationFrameId = requestAnimationFrame(render);
    }

    init();
    render();

    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
}

export function SnowParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useSnowEngine(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 block motion-reduce:hidden",
        className
      )}
    />
  );
}