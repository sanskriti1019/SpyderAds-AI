"use client";

import { useEffect, useRef } from "react";

export function OrbBackground() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      // Very slow, elegant time increment
      time += 0.0015;
      
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      
      // Organic physics-based floating motion
      const x1 = Math.sin(time) * (width * 0.35) + Math.cos(time * 0.7) * (width * 0.1);
      const y1 = Math.cos(time * 0.8) * (height * 0.3) + Math.sin(time * 0.5) * (height * 0.1);
      const scale1 = 1 + Math.sin(time * 0.3) * 0.1;

      const x2 = -x1 * 0.4 + Math.sin(time * 0.4) * (width * 0.15);
      const y2 = -y1 * 0.5 + Math.cos(time * 0.6) * (height * 0.15);
      const scale2 = 1 + Math.cos(time * 0.4) * 0.15;

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate3d(${x1}px, ${y1}px, 0) scale(${scale1})`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate3d(${x2}px, ${y2}px, 0) scale(${scale2})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      {/* Primary Maroon Orb */}
      <div
        ref={orb1Ref}
        className="absolute top-1/2 left-1/2 rounded-full mix-blend-multiply opacity-50"
        style={{
          width: "900px",
          height: "900px",
          marginLeft: "-450px",
          marginTop: "-450px",
          background: "radial-gradient(circle at center, rgba(160, 90, 90, 0.35) 0%, rgba(110, 44, 44, 0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      {/* Secondary Pastel Beige Orb */}
      <div
        ref={orb2Ref}
        className="absolute top-1/2 left-1/2 rounded-full mix-blend-multiply opacity-60"
        style={{
          width: "700px",
          height: "700px",
          marginLeft: "-350px",
          marginTop: "-350px",
          background: "radial-gradient(circle at center, rgba(216, 210, 198, 0.5) 0%, rgba(237, 227, 213, 0.2) 40%, transparent 80%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
