import React, { useEffect, useRef } from 'react';
import './Skills.css';

const skills = [
  { name: 'Python', level: 90, color: '#3776ab', icon: '🐍' },
  { name: 'React JS', level: 88, color: '#61dafb', icon: '⚛' },
  { name: 'JavaScript', level: 85, color: '#f7df1e', icon: '⚡' },
  { name: 'HTML5', level: 95, color: '#e34f26', icon: '🏗' },
  { name: 'CSS3', level: 92, color: '#264de4', icon: '🎨' },
  { name: 'GitHub', level: 80, color: '#000000', icon: '🐙' },
  { name: 'Node.js', level: 75, color: '#339933', icon: '🟢' },
  { name: 'MySQL', level: 78, color: '#4479a1', icon: '🗄' },
];

const tools = [
  'Git', 'GitHub', 'VS Code', 'Figma', 'Docker', 'Bootstrap',
  'Django', 'REST APIs', 'Responsive Design', 'Problem Solving'
];

export default function Skills() {
  const sectionRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 80);
            });
            // Animate skill bars
            barsRef.current.forEach((bar, i) => {
              if (bar) {
                setTimeout(() => {
                  bar.style.width = bar.dataset.level + '%';
                }, 200 + i * 80);
              }
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
    <section className="section skills-section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="skills-header reveal">
          <p className="section-label">Expertise</p>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="skills-subtitle">
            A curated set of tools and technologies I use to build robust, scalable applications.
          </p>
        </div>

        <div className="skills-grid">
          {/* Skill bars */}
          <div className="skills-bars reveal-left">
            <h3 className="skills-sub-title">Core Skills</h3>
            {skills.map((s, i) => (
              <div className="skill-item" key={s.name}>
                <div className="skill-meta">
                  <span className="skill-name">
                    <span className="skill-icon">{s.icon}</span>
                    {s.name}
                  </span>
                  <span className="skill-level">{s.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div
                    className="skill-bar-fill"
                    ref={el => barsRef.current[i] = el}
                    data-level={s.level}
                    style={{ background: `linear-gradient(90deg, #7c3aed, ${s.color})`, width: 0 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Technologies */}
          <div className="skills-tools reveal-right">
            <h3 className="skills-sub-title">Tools & Technologies</h3>
            <div className="tools-cloud">
              {tools.map((t, i) => (
                <span
                  className="tool-chip"
                  key={t}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* DSA Trophy */}
            <div className="dsa-card reveal">
              <div className="dsa-icon">🏆</div>
              <div>
                <h4>Competitive Programming</h4>
                <p>Solved <strong>70+</strong> DSA problems across LeetCode, GFG & HackerRank</p>
                <div className="dsa-badges">
                  <span> 148 – TechGig 2022</span>
                  <span> 35 – TG3 Coding 2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
