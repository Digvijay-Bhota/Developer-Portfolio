import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: "DocuMind — AI Document Scanner",
    slug: "documind-ai-scanner",
    category: "Full Stack",
    desc: "A production-ready AI document processing platform that securely uploads documents, extracts text with OCR, and generates concise AI-powered summaries. Includes JWT authentication, protected file access, PostgreSQL persistence, and production-grade security controls.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Tesseract OCR",
      "Gemini AI"
    ],
    emoji: "🤖",
    color: "#6366f1",
    link: "https://ai-doc-scanner-chi.vercel.app/",
    github: "https://github.com/Digvijay-Bhota/ai-doc-scanner",
    featured: true,
  },
  {
    id: 2,
    title: "Chanshal Camping & Trekking",
    slug: "chanshal-camping",
    category: "Full Stack",
    desc: "A full-stack outdoor travel platform designed for discovering camping and trekking experiences, with responsive interfaces, booking workflows, and a modern React-based user experience.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "JavaScript"
    ],
    emoji: "🏕️",
    color: "#22c55e",
    link: "https://chanshal-camping-and-trekking-six.vercel.app/",
    github: "https://github.com/Digvijay-Bhota/chanshal-camping-and-trekking",
    featured: true,
  },
  {
    id: 3,
    title: "ChopalOrchard — E-commerce Platform",
    slug: "chopal-orchards",
    category: "Full Stack",
    desc: "A modern full-stack e-commerce application featuring user authentication, dynamic data handling, interactive dashboards, and RESTful API integration for a responsive shopping experience.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS"
    ],
    emoji: "🛒",
    color: "#8b5cf6",
    link: "https://chopal-orchard-website-complete.vercel.app/",
    github: "https://github.com/Digvijay-Bhota/chopal-orchard-website-complete",
    featured: true,
  },
  {
    id: 4,
    title: "Developer Portfolio",
    category: "Frontend",
    desc: "A responsive developer portfolio designed to showcase projects, technical skills, experience, and professional work through a clean interface, interactive sections, and smooth animations.",
    tech: [
      "React",
      "CSS3",
      "JavaScript",
      "Framer Motion"
    ],
    emoji: "💼",
    color: "#3b82f6",
    github: "https://github.com/Digvijay-Bhota/developer-portfolio",
    featured: true,
  },
  {
    id: 5,
    title: "Todo App",
    category: "Frontend",
    desc: "A lightweight task management application with task creation, editing, deletion, priority organization, and persistent browser storage for a simple productivity workflow.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Local Storage"
    ],
    emoji: "✅",
    color: "#f59e0b",
    link: "https://todo-app-sandy-two.vercel.app",
    github: "https://github.com/Digvijay-Bhota/todo-app",
    featured: false,
  },
  {
    id: 6,
    title: "Image-Based Authentication System",
    category: "Security",
    desc: "An experimental authentication system exploring visual password generation and cryptographic techniques to provide an alternative approach to traditional text-based authentication.",
    tech: [
      "Python",
      "Flask",
      "Cryptography",
      "PIL",
      "SQLite"
    ],
    emoji: "🔐",
    color: "#ec4899",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 7,
    title: "Weather App",
    category: "Frontend",
    desc: "A responsive weather application that retrieves real-time weather information and multi-day forecasts through the OpenWeather API with a clean, accessible interface.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "OpenWeather API"
    ],
    emoji: "🌦️",
    color: "#06b6d4",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 8,
    title: "FoodMunch App",
    category: "Frontend",
    desc: "A responsive food delivery interface featuring category-based navigation, interactive components, smooth user interactions, and a mobile-first design approach.",
    tech: [
      "React",
      "CSS3",
      "JavaScript",
      "Bootstrap"
    ],
    emoji: "🍔",
    color: "#f97316",
    link: "#",
    github: "#",
    featured: false,
  },
];

// Filter options matching project categories
const FILTERS = ['All', 'Full Stack', 'Frontend', 'Security'];

export default function Projects() {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p =>
        p.category.toLowerCase().includes(filter.toLowerCase())
      );

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
    <section
      className="section projects-section"
      id="projects"
      ref={sectionRef}
    >
      <div className="container">
        <div className="projects-header reveal">
          <p className="section-label">Selected Work</p>

          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <p className="projects-subtitle">
            A selection of full-stack applications, AI-powered tools, and
            responsive web experiences built with modern technologies.
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
              className={`project-card card reveal ${
                p.featured ? 'featured' : ''
              }`}
              key={p.id}
              style={{
                '--card-color': p.color,
                animationDelay: `${i * 0.08}s`
              }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {p.featured && (
                <div className="featured-badge">
                  Featured
                </div>
              )}

              <div
                className="project-emoji-wrap"
                style={{ backgroundColor: `${p.color}15` }}
              >
                <span className="project-emoji">
                  {p.emoji}
                </span>
              </div>

              <div className="project-meta">
                <span className="project-cat">
                  {p.category}
                </span>

                <h3 className="project-title">
                  {p.title}
                </h3>

                <p className="project-desc">
                  {p.desc}
                </p>
              </div>

              <div className="project-tech">
                {p.tech.map(t => (
                  <span className="tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div
                className={`project-overlay ${
                  hovered === p.id ? 'visible' : ''
                }`}
              >
                <div className="project-links">
                  {p.slug && (
                    <Link
                      to={`/project/${p.slug}`}
                      className="project-link-btn"
                    >
                      Read Case Study →
                    </Link>
                  )}

                  {p.link && p.link !== '#' && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      Live Demo ↗
                    </a>
                  )}

                  {p.github && p.github !== '#' && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn secondary"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Radial glow background */}
              <div
                className="card-glow"
                style={{
                  background: `radial-gradient(circle at center, ${p.color}25, transparent 70%)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Call To Action */}
        <div className="projects-cta reveal">
          <p>
            Interested in exploring more of my work and source code?
          </p>

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
