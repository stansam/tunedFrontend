"use client";

const PARTICLES: ReadonlyArray<{
  readonly left: number;
  readonly top: number;
  readonly size: number;
  readonly duration: number;
  readonly delay: number;
  readonly opacity: number;
}> = [
  { left: 3,  top: 12, size: 3, duration: 6,  delay: 0,   opacity: 40 },
  { left: 8,  top: 35, size: 2, duration: 8,  delay: 1,   opacity: 25 },
  { left: 15, top: 68, size: 4, duration: 7,  delay: 2,   opacity: 50 },
  { left: 22, top: 20, size: 2, duration: 9,  delay: 0.5, opacity: 35 },
  { left: 28, top: 80, size: 3, duration: 6,  delay: 3,   opacity: 30 },
  { left: 35, top: 45, size: 2, duration: 11, delay: 1.5, opacity: 35 },
  { left: 42, top: 10, size: 3, duration: 8,  delay: 4,   opacity: 45 },
  { left: 48, top: 72, size: 2, duration: 7,  delay: 0.8, opacity: 25 },
  { left: 55, top: 30, size: 4, duration: 9,  delay: 2.5, opacity: 40 },
  { left: 62, top: 88, size: 2, duration: 6,  delay: 1.2, opacity: 30 },
  { left: 68, top: 55, size: 3, duration: 10, delay: 3.5, opacity: 45 },
  { left: 75, top: 15, size: 2, duration: 7,  delay: 0.3, opacity: 30 },
  { left: 82, top: 42, size: 4, duration: 8,  delay: 4.5, opacity: 35 },
  { left: 88, top: 78, size: 3, duration: 9,  delay: 1.8, opacity: 40 },
  { left: 92, top: 25, size: 2, duration: 6,  delay: 2.2, opacity: 25 },
  { left: 97, top: 60, size: 3, duration: 11, delay: 0.7, opacity: 40 },
  { left: 5,  top: 90, size: 2, duration: 8,  delay: 3.8, opacity: 30 },
  { left: 18, top: 5,  size: 3, duration: 7,  delay: 1.1, opacity: 45 },
  { left: 33, top: 62, size: 2, duration: 9,  delay: 4.2, opacity: 30 },
  { left: 50, top: 50, size: 4, duration: 6,  delay: 2.8, opacity: 35 },
  { left: 65, top: 95, size: 2, duration: 8,  delay: 0.9, opacity: 25 },
  { left: 78, top: 8,  size: 3, duration: 10, delay: 3.2, opacity: 40 },
  { left: 90, top: 38, size: 2, duration: 7,  delay: 1.6, opacity: 30 },
  { left: 12, top: 52, size: 4, duration: 6,  delay: 4.8, opacity: 40 },
  { left: 45, top: 85, size: 3, duration: 9,  delay: 0.4, opacity: 45 },
];

export function SnowParticles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden z-10"
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-slate-500 ${i > 12 ? 'hidden md:block' : ''}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity / 100,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            willChange: "transform",
          }}
        />
      ))}

      <style>{`
        @keyframes floatParticle {
          0%   { transform: translateY(0px)   scale(1);   }
          50%  { transform: translateY(-8px)  scale(1.1); }
          100% { transform: translateY(-16px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}