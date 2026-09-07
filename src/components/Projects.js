import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData as projects } from '../data/projects';
import './Projects.css';

// Filter options matching project categories
const FILTERS = ['All', 'Full-Stack', 'Frontend', 'Backend'];

export default function Projects() {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('All');
  

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
                  {p.summary}
                </p>
              </div>

              <div className="project-tech">
                {p.tech.map(t => (
                  <span className="tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {p.slug && (
                  <Link
                    to={`/project/${p.slug}`}
                    className="project-link-btn"
                  >
                    Case Study →
                  </Link>
                )}

                {p.link && p.link !== '#' && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn-secondary"
                  >
                    Live Demo ↗
                  </a>
                )}

                {p.github && p.github !== '#' && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn-secondary"
                  >
                    GitHub ↗
                  </a>
                )}
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
