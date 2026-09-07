import React, { useEffect, useRef } from 'react';
import './Skills.css';

const skillGroups = [
  {
    title: 'Frontend Development',
    icon: '💻',
    skills: ['React', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Tailwind CSS', 'Bootstrap', 'Framer Motion']
  },
  {
    title: 'Backend Engineering',
    icon: '⚙️',
    skills: ['Node.js', 'Express.js', 'Python', 'Django', 'RESTful APIs', 'JWT Auth']
  },
  {
    title: 'Database & Cloud',
    icon: '🗄️',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'AWS S3', 'SQLite']
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    skills: ['Git & GitHub', 'Docker', 'VS Code', 'Figma', 'Tesseract OCR', 'Gemini AI']
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 80);
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

        <div className="bento-grid">
          {skillGroups.map((group, index) => (
            <div className={`bento-card reveal bento-delay-${index}`} key={group.title}>
              <div className="bento-icon-wrap">{group.icon}</div>
              <h3 className="bento-title">{group.title}</h3>
              <div className="bento-skills">
                {group.skills.map(skill => (
                  <span className="bento-skill-tag" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}

          <div className="bento-card dsa-bento reveal bento-delay-4">
            <div className="dsa-content">
              <div className="bento-icon-wrap">🏆</div>
              <div>
                <h3 className="bento-title">Competitive Programming</h3>
                <p className="bento-desc">Solved <strong>70+</strong> DSA problems across platforms.</p>
                <div className="dsa-badges">
                  <span>TechGig 2022: Rank 148</span>
                  <span>TG3 Coding: Rank 35</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
