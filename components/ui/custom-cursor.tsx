"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      );
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-maroon/30 pointer-events-none z-[9999] transition-transform duration-150 ease-out mix-blend-difference"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1}) ${isClicking ? "scale(0.8)" : ""}`,
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-maroon pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
        }}
      />
    </>
  );
}
