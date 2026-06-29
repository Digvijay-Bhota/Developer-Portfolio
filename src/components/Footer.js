import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        <a className="footer-logo" href="#home">
          <span className="footer-bracket">&lt;</span>VT<span className="footer-bracket">/&gt;</span>
        </a>
        <p className="footer-text">
          Crafted with <span className="heart">♥</span> by Digvijay Bhota · {year}
        </p>
        <p className="footer-mono">*/ Built with React & passion*/</p>
      </div>
    </footer>
  );
}
