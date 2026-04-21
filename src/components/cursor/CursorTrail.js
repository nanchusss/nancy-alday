import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const isActive = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e) => {
      if (!isActive.current) return;

      points.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
      });

      if (points.current.length > 50) {
        points.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      for (let i = 0; i < points.current.length - 1; i++) {
        const p1 = points.current[i];
        const p2 = points.current[i + 1];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // 🎯 color más alineado contigo (no negro puro)
        ctx.strokeStyle = `rgba(90, 70, 50, ${p1.life})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        p1.life -= 0.025;
      }

      points.current = points.current.filter((p) => p.life > 0);

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    //time
    setTimeout(() => {
      isActive.current = false;
    }, 6500);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9998, // debajo del cursor
      }}
    />
  );
}

