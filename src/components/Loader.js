import React, { useEffect, useState } from 'react';
import './Loader.css';

// Single source of truth for how long the loader runs — App.js imports this
// same constant so the "100%" moment and the actual reveal always line up.
export const LOADER_DURATION_MS = 1400;

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / LOADER_DURATION_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-logo">DB</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader-text">
          <span className="loader-mono">{Math.round(progress)}%</span>
          &nbsp;Initializing...
        </p>
      </div>
    </div>
  );
}
