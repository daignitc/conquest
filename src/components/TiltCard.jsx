import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "", style = {}, maxTilt = 12, glowColor = "#5EE0FF" }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          transformStyle: "preserve-3d",
          ...style,
        }}
        className={`relative overflow-hidden ${className}`}
      >
        {/* Dynamic Specular Light Follower */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: glowPos.opacity,
            background: `radial-gradient(circle 280px at ${glowPos.x}% ${glowPos.y}%, ${glowColor}25, transparent 75%)`,
          }}
        />
        {/* Card Content with 3D Depth Layer */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-20 h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
