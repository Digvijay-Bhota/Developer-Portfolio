import React, { useEffect, useRef } from 'react';
import './About.css';

const highlights = [
  { icon: '🚀', label: 'Projects Delivered', value: '10+' },
  { icon: '💡', label: 'DSA Problems Solved', value: '700+' },
  { icon: '🏆', label: 'Hackathon Rank (AIR)', value: '35' },
  { icon: '📚', label: 'Tech Stack', value: '8+' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">

          {/* Left: Visual */}
          <div className="about-visual reveal-left">
            <div className="about-avatar-wrap">
              <div className="avatar-ring" />
              <div className="avatar-ring ring-2" />
              <div className="avatar-placeholder">
                <span>VT</span>
              </div>
              {/* Floating badges */}
              <div className="float-badge badge-react">⚛ React</div>
              <div className="float-badge badge-python">🐍 Python</div>
              <div className="float-badge badge-flask">🔥 Flask</div>
            </div>

            <div className="about-highlights">
              {highlights.map((h) => (
                <div className="highlight-card" key={h.label}>
                  <span className="h-icon">{h.icon}</span>
                  <div>
                    <span className="h-value">{h.value}</span>
                    <span className="h-label">{h.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="about-content">
            <p className="section-label reveal">Who I Am</p>
            <h2 className="section-title reveal">
              Passionate developer,<br />
              <span className="gradient-text">problem solver.</span>
            </h2>

            <p className="about-text reveal">
              Hello! I'm <strong>Digvijay Bhota</strong>, a Full Stack Web Developer based in
              mohali, India. I discovered my love for coding and problem-solving a while back,
              and since then I've been on an exciting journey of learning and building.
            </p>

            <p className="about-text reveal">
              I specialize in crafting <strong>dynamic, responsive web applications</strong> using
              JavaScript, Python, React, HTML, and CSS. With a strong foundation in both front-end and back-end,
              I'm passionate about delivering elegant solutions to complex problems.
            </p>

            <div className="about-pillars reveal">
              <div className="pillar">
                <div className="pillar-icon">🧩</div>
                <h4>Problem Solver</h4>
                <p>Complex problems broken into elegant, maintainable solutions</p>
              </div>
              <div className="pillar">
                <div className="pillar-icon">🎨</div>
                <h4>UX First</h4>
                <p>Every interface prioritizes intuitive, enjoyable user experiences</p>
              </div>
              <div className="pillar">
                <div className="pillar-icon">⚡</div>
                <h4>Always Learning</h4>
                <p>Self-driven to stay current with industry trends and technologies</p>
              </div>
            </div>

            <div className="about-actions reveal">
              <a href="/Digvijay_Bhota_Resume.pdf" download className="btn-primary">
                <span>⬇ Download Resume</span>
              </a>
              <a href="mailto:digvijaybhota777@gmail.com" className="btn-outline">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
