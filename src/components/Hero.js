import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const ROLES = [
  'Full Stack Developer',
  'React Specialist',
  'Python Engineer',
  'UI/UX Enthusiast',
];

export default function Hero() {
  const canvasRef = useRef(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout;
    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx((roleIdx + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  // Animated particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    const PARTICLE_COUNT = 80;
    const particles = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '#7c3aed' : '#22d3ee';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <canvas className="hero-canvas" ref={canvasRef} />

      {/* Glowing orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for work
        </div>

        <h1 className="hero-title">
          Hi, I'm{' '}
          <span className="hero-name">Digvijay Bhota</span>
        </h1>

        <h2 className="hero-role">
          <span className="role-prefix">a </span>
          <span className="role-text">{displayed}</span>
          <span className="cursor-blink">|</span>
        </h2>

        <p className="hero-desc">
          I craft <strong>high-performance web applications</strong> with clean code
          and beautiful interfaces. Skilled in Python, React, and full-stack development
          — I turn ideas into digital experiences.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">10+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">700+</span>
            <span className="stat-label">DSA Solved</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">AIR 35</span>
            <span className="stat-label">TG3 Coding 2022</span>
          </div>
        </div>

        <div className="hero-actions">
          <a
            href="/Digvijay_Bhota_Resume.pdf"
            className="btn-primary"
            download
          >
            <span>⬇ Download CV</span>
          </a>
          <button
            className="btn-outline"
            onClick={() => scrollToSection('projects')}
          >
            View Projects →
          </button>
        </div>

        <div className="hero-scroll-hint" onClick={() => scrollToSection('about')}>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* Floating code snippet */}
      <div className="hero-code-block">
        <div className="code-dot-row">
          <span className="code-dot red" />
          <span className="code-dot yellow" />
          <span className="code-dot green" />
        </div>
        <pre className="code-content">
{`const digvijay = {
  role: "Full Stack Dev",
  skills: ["React", "Python", 
           "Node.js", "Flask"],
  passion: "Building great UX",
  available: true 🚀
}`}
        </pre>
      </div>
    </section>
  );
}
