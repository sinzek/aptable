"use client";

import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  originalX: number;
  originalY: number;
  brightness: number;
}

const Starfield: React.FC<{
  className?: string;
  starCount?: number;
  repulsionRadius?: number;
  repulsionStrength?: number;
  returnSpeed?: number;
  height?: string;
  topHalfOnly?: boolean;
}> = ({
  className,
  starCount = 300,
  repulsionRadius = 100,
  repulsionStrength = 0.05,
  returnSpeed = 0.05,
  height = "100vh",
  topHalfOnly = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const mousePosRef = useRef({ x: -100, y: -100 });
    const animationFrameRef = useRef<number>(0);
    const isVisibleRef = useRef(false);

    const generateStars = (width: number, height: number): Star[] => {
      const newStars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        const clusterCenterX = Math.random() * width;

        const clusterCenterY = topHalfOnly
          ? Math.random() * (height * 0.5)
          : Math.random() * height;

        const clusterOffsetX = (Math.random() - 0.5) * 50;

        const clusterOffsetY = topHalfOnly
          ? Math.min((Math.random() - 0.5) * 50, height * 0.5 - clusterCenterY)
          : (Math.random() - 0.5) * 50;

        const x = clusterCenterX + clusterOffsetX;
        const y = clusterCenterY + clusterOffsetY;
        const size = (Math.random() * 0.8) * 2;
        const brightness = Math.random() * 0.5 + 0.5;

        newStars.push({
          id: i,
          x,
          y,
          size,
          originalX: x,
          originalY: y,
          brightness,
        });
      }
      return newStars;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !isVisibleRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();

      if (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      ) {
        mousePosRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        mousePosRef.current = { x: -1000, y: -1000 };
      }
    };

    const checkVisibility = () => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();

      isVisibleRef.current =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;
    };

    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const canvas = canvasRef.current;

      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;

      starsRef.current = generateStars(canvas.width, canvas.height);
      checkVisibility();
    };

    const animate = () => {
      if (!canvasRef.current || !isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        // distance from mouse
        const dx = mousePosRef.current.x - star.x;
        const dy = mousePosRef.current.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius) { // if mouse is close, push star away
          const angle = Math.atan2(dy, dx);
          const force = (repulsionRadius - distance) * repulsionStrength;
          star.x -= Math.cos(angle) * force;
          star.y -= Math.sin(angle) * force;

          if (topHalfOnly && star.y > canvas.height * 0.5) { // if topHalfOnly, constrain stars to top half
            star.y = canvas.height * 0.5;
          }
        }

        star.x += (star.originalX - star.x) * returnSpeed; // gradually returns to original position
        star.y += (star.originalY - star.y) * returnSpeed;

        ctx.beginPath(); // draws star
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
      if (!canvasRef.current || !containerRef.current) return;

      handleResize();
      checkVisibility();

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", checkVisibility);

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", checkVisibility);
        cancelAnimationFrame(animationFrameRef.current);
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={twMerge(
          "relative w-full",
          className
        )}
        style={{ height }}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-[0]"
        />
      </div>
    );
  };

export default Starfield;