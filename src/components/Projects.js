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
  link: "https://github.com/Digvijay-Bhota/chanshal-camping-and-trekking",
  featured: true,
},
  {
  id: 2,
  title: "Developer Portfolio",
  category: "Frontend",
  desc: "A responsive personal portfolio showcasing projects, skills, resume, and contact form.",
  tech: ["React", "CSS", "JavaScript"],
  emoji: "💼",
  color: "#3b82f6",
  link: "https://github.com/Digvijay-Bhota/developer-portfolio",
  featured: true,
},
  {
  id: 3,
  title: "Todo App",
  category: "Frontend",
  desc: "Task management application with add, edit, delete, and mark-complete features.",
  tech: ["HTML", "CSS", "JavaScript"],
  emoji: "✅",
  color: "#f59e0b",
  link: "https://todo-app-sandy-two.vercel.app",
  featured: false,
},
  {
    id: 4,
    title: 'Image-Based Auth System',
    category: 'Security / Backend',
    desc: 'A secure authentication system using image-based string generation and encryption techniques, providing a visually intuitive and highly secure user auth method.',
    tech: ['Python', 'Cryptography', 'Flask', 'PIL', 'SQLite'],
    emoji: '🔐',
    color: '#ec4899',
    link: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Weather App',
    category: 'Frontend / API',
    desc: 'Real-time weather app with current conditions and forecasts using the OpenWeather API. Built with HTML, CSS, and JavaScript with full responsiveness.',
    tech: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    emoji: '🌦',
    color: '#3b82f6',
    link: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'FoodMunch App',
    category: 'Frontend / UI',
    desc: 'A mouth-watering food delivery UI with smooth animations, category filters, and a fully responsive design showcasing advanced CSS and React skills.',
    tech: ['React', 'CSS3', 'JavaScript', 'Bootstrap'],
    emoji: '🍔',
    color: '#f97316',
    link: '#',
    featured: false,
  },
];

const FILTERS = ['All', 'AI / Full Stack', 'EdTech / Web App', 'Travel / Full Stack', 'Security / Backend', 'Frontend / API', 'Frontend / UI'];

export default function Projects() {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects-header reveal">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="projects-subtitle">
            A selection of projects that demonstrate my skills across the full stack.
          </p>
        </div>

        {/* Filter pills */}
        <div className="filter-row reveal">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p, i) => (
            <div
              className={`project-card reveal ${p.featured ? 'featured' : ''}`}
              key={p.id}
              style={{ '--card-color': p.color, animationDelay: `${i * 0.1}s` }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {p.featured && <div className="featured-badge">Featured</div>}

              <div className="project-emoji-wrap" style={{ background: `${p.color}15` }}>
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
                <a href={p.link} className="project-link-btn">View Project →</a>
              </div>

              {/* Glow border on hover */}
              <div className="card-glow" style={{ background: `radial-gradient(circle at center, ${p.color}20, transparent 70%)` }} />
            </div>
          ))}
        </div>

        <div className="projects-cta reveal">
          <p>Want to see more?</p>
          <a href="https://github.com/Digvijay-Bhota" target="_blank" rel="noreferrer" className="btn-outline">
            ⭐ View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
