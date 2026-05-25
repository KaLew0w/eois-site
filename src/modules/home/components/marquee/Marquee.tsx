import { useEffect, useRef, useState } from "react";
import "./marquee.css";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(0.5);
  let position = 0;
  let animationFrame: number;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      position -= speed;
      if (position <= -track.offsetWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [speed]);

  return (
    <div
      className="marquee-wrapper"
      onMouseEnter={() => setSpeed(0.1)}
      onMouseLeave={() => setSpeed(0.5)}
    >
      <div className="marquee-track" ref={trackRef}>
        <span>
          theonetheonetheonetheonetheonetheonetheonetheonetheonetheonetheonetheone
        </span>
      </div>
    </div>
  );
}
