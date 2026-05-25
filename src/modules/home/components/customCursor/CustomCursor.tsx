import { useEffect } from "react";
import "./custom-cursor.css";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector<HTMLDivElement>(".cursor");
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const hoverTargets = document.querySelectorAll(
      "a, button, .cta-button, .carousel-drag, .cursor-grab"
    );

    const addHover = () => cursor.classList.add("hover");
    const removeHover = () => cursor.classList.remove("hover");

    document.addEventListener("mousemove", moveCursor);
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return <div className="cursor hidden md:block"></div>;
}
