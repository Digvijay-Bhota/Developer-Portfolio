import React, { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 18 + 4;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-logo">VT</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <p className="loader-text">
          <span className="loader-mono">{Math.min(Math.round(progress), 100)}%</span>
          &nbsp;Initializing...
        </p>
      </div>
    </div>
  );
}
