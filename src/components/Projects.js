import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: "Chanshal Camping & Trekking",
    category: "Full Stack",
    desc: "A full-stack camping and trekking booking platform with responsive UI, booking management, and modern React frontend.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JavaScript"],
    emoji: "🏕️",
    color: "#22c55e",
    link: "https://chanshal-camping-and-trekking-six.vercel.app/",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "/ChopalOrchard e-commerce Web Application",
    category: "Full Stack",
    desc: "A modern dynamic web application featuring user authentication, real-time data processing, interactive dashboard analytics, and RESTful API integrations.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    emoji: "⚡",
    color: "#8b5cf6",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Developer Portfolio",
    category: "Frontend",
    desc: "A responsive personal portfolio showcasing projects, skills, resume, and interactive contact form built with sleek animations.",
    tech: ["React", "CSS3", "JavaScript", "Framer Motion"],
    emoji: "💼",
    color: "#3b82f6",
    link: "https://github.com/Digvijay-Bhota/developer-portfolio",
    github: "https://github.com/Digvijay-Bhota/developer-portfolio",
    featured: true,
  },
  {
    id: 4,
    title: "Todo App",
    category: "Frontend",
    desc: "Task management application with add, edit, delete, priority sorting, and local storage state persistence.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    emoji: "✅",
    color: "#f59e0b",
    link: "https://todo-app-sandy-two.vercel.app",
    github: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Image-Based Auth System",
    category: "Security",
    desc: "A secure authentication system using image-based string generation and encryption techniques for intuitive visual authentication.",
    tech: ["Python", "Cryptography", "Flask", "PIL", "SQLite"],
    emoji: "🔐",
    color: "#ec4899",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Weather App",
    category: "Frontend",
    desc: "Real-time weather application displaying current weather metrics and multi-day forecasts using OpenWeather API.",
    tech: ["HTML5", "CSS3", "JavaScript", "OpenWeather API"],
    emoji: "🌦️",
    color: "#06b6d4",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 7,
    title: "FoodMunch App",
    category: "Frontend",
    desc: "Food delivery interface featuring smooth interactions, category filters, and mobile-first responsive design.",
    tech: ["React", "CSS3", "JavaScript", "Bootstrap"],
    emoji: "🍔",
    color: "#f97316",
    link: "#",
    github: "#",
    featured: false,
  },
];

// Unified filter labels matching categories present in data
const FILTERS = ['All', 'Full Stack', 'Frontend', 'Security'];

export default function Projects() {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

  // Trigger reveal effects when section enters viewport or filter changes
  useEffect(() => {
    if (!sectionRef.current) return;

    const revealElements = sectionRef.current.querySelectorAll('.reveal');
    revealElements.forEach((el, i) => {
      el.classList.remove('revealed');
      setTimeout(() => el.classList.add('revealed'), i * 60);
    });
  }, [filter]);

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects-header reveal">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="projects-subtitle">
            A showcase of web applications, full-stack architectures, and frontend interfaces I've built.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-row reveal">
          {FILTERS.map(f => (
            <button
              key={f}
              type="button"
              className={`filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filtered.map((p, i) => (
            <div
              className={`project-card reveal ${p.featured ? 'featured' : ''}`}
              key={p.id}
              style={{ '--card-color': p.color, animationDelay: `${i * 0.08}s` }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {p.featured && <div className="featured-badge">Featured</div>}

              <div className="project-emoji-wrap" style={{ backgroundColor: `${p.color}15` }}>
                <span className="project-emoji">{p.emoji}</span>
              </div>

              <div className="project-meta">
                <span className="project-cat">{p.category}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
              </div>

              <div className="project-tech">
                {p.tech.map(t => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
              </div>

              <div className={`project-overlay ${hovered === p.id ? 'visible' : ''}`}>
                <div className="project-links">
                  {p.link && p.link !== '#' && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                      Live Demo ↗
                    </a>
                  )}
                  {p.github && p.github !== '#' && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn secondary">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Radial glow background */}
              <div 
                className="card-glow" 
                style={{ background: `radial-gradient(circle at center, ${p.color}25, transparent 70%)` }} 
              />
            </div>
          ))}
        </div>

        {/* Call To Action */}
        <div className="projects-cta reveal">
          <p>Interested in seeing more of my source code?</p>
          <a 
            href="https://github.com/Digvijay-Bhota" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-outline"
          >
            ⭐ Explore GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
