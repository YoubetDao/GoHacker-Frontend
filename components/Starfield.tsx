"use client";
import { useEffect, useRef } from "react";

export interface StarfieldProps {
  /** Total number of stars on screen */
  starCount?: number;
  /** Base speed of star movement (pixels per frame). Each star adds a small random offset. */
  speed?: number;
  /** Optional additional Tailwind classes for the canvas element */
  className?: string;
}

/**
 * Starfield – a full-screen animated star background using Canvas.
 *
 * Usage:
 * ```tsx
 * <Starfield starCount={300} speed={1} />
 * ```
 * Place it as the first child of a relative/absolute container or let it float
 * globally with `fixed` positioning (default).
 */
export default function Starfield({
  starCount = 200,
  speed = 0.5,
  className = "",
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    type Star = {
      x: number;
      y: number;
      size: number;
      velocity: number;
      angle: number;
      distance: number;
      reachedCenter: boolean;
      centerTime: number;
    };

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 从边缘生成新星星的函数
    const createStarFromEdge = (): Star => {
      const side = Math.floor(Math.random() * 4); // 0: 上, 1: 右, 2: 下, 3: 左
      let x = 0;
      let y = 0;
      
      switch (side) {
        case 0: // 上边
          x = Math.random() * canvas.width;
          y = -10;
          break;
        case 1: // 右边
          x = canvas.width + 10;
          y = Math.random() * canvas.height;
          break;
        case 2: // 下边
          x = Math.random() * canvas.width;
          y = canvas.height + 10;
          break;
        case 3: // 左边
          x = -10;
          y = Math.random() * canvas.height;
          break;
      }

      return {
        x,
        y,
        size: Math.random() * 1 + 0.2,
        velocity: speed + Math.random() * speed * 0.5,
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 100 + 50,
        reachedCenter: false,
        centerTime: 0,
      };
    };

    // 创建随机位置的星星
    const createRandomStar = (): Star => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 0.2,
        velocity: speed + Math.random() * speed * 0.5,
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 100 + 50,
        reachedCenter: false,
        centerTime: 0,
      };
    };

    // 初始化时创建一些随机位置的星星
    const stars: Star[] = Array.from({ length: 50 }, createRandomStar);
    let lastStarTime = 0;
    const starInterval = 100; // 每100ms生成一个新星星

    let frameId: number;
    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 生成新星星
      if (timestamp - lastStarTime > starInterval) {
        stars.push(createStarFromEdge());
        lastStarTime = timestamp;
      }

      ctx.fillStyle = "#ffffff";
      stars.forEach((star, index) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // 计算到中心的距离
        const dx = centerX - star.x;
        const dy = centerY - star.y;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);

        // 如果距离目标距离还很远，继续向中心移动
        if (currentDistance > star.distance) {
          star.x += (dx / currentDistance) * star.velocity;
          star.y += (dy / currentDistance) * star.velocity;
        } else {
          // 如果刚到达中心点，记录时间
          if (!star.reachedCenter) {
            star.reachedCenter = true;
            star.centerTime = timestamp;
          }
          
          // 到达目标距离后，围绕中心点旋转
          star.angle += 0.001 * star.velocity;
          star.x = centerX + Math.cos(star.angle) * star.distance;
          star.y = centerY + Math.sin(star.angle) * star.distance;

          // 如果到达中心点超过2秒，移除星星
          if (timestamp - star.centerTime > 2000) {
            stars.splice(index, 1);
          }
        }

        // 如果星星移出画布，从数组中移除
        if (
          star.x < -20 ||
          star.x > canvas.width + 20 ||
          star.y < -20 ||
          star.y > canvas.height + 20
        ) {
          stars.splice(index, 1);
        }
      });

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
