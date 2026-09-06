import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip entirely on touch devices, and for anyone who prefers reduced motion -
    // no listeners, no RAF loop, nothing running in the background either way.
    const hoverCapable = window.matchMedia('(hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hoverCapable || reducedMotion) return;
    setEnabled(true);

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // Event delegation instead of querySelectorAll-at-mount: this correctly
    // catches cards that are added/removed later (e.g. the Projects filter
    // re-rendering its grid), not just whatever existed when Cursor first mounted.
    const onOver = (e) => {
      if (e.target.closest && e.target.closest('a, button, .card')) {
        dotRef.current?.classList.add('cursor-hover');
        ringRef.current?.classList.add('cursor-hover');
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest('a, button, .card')) {
        dotRef.current?.classList.remove('cursor-hover');
        ringRef.current?.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
