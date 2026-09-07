import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData as projects } from '../data/projects';
import './Projects.css';

// Filter options matching project categories
const FILTERS = ['All', 'Full-Stack', 'AI / ML', 'Backend / Infrastructure', 'Frontend'];

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

        {/* Tier A - Selected Work */}
        {filtered.filter(p => p.tier === 'A').length > 0 && (
          <div className="projects-tier">
            <h3 className="tier-title reveal">Selected Work</h3>
            <div className="projects-grid">
              {filtered.filter(p => p.tier === 'A').map((p, i) => (
                <div
                  className={`project-card card reveal ${p.featured ? 'featured' : ''}`}
                  key={p.id}
                  style={{ '--card-color': p.color, animationDelay: `${i * 0.08}s` }}
                >
                  {p.featured && <div className="featured-badge">Featured</div>}
                  {p.primaryImage ? (
                    <div className="project-image-wrap">
                      <img src={p.primaryImage} alt={p.title} loading="lazy" />
                    </div>
                  ) : (
                    <div className="project-emoji-wrap" style={{ backgroundColor: `${p.color}15` }}>
                      <span className="project-emoji">{p.emoji}</span>
                    </div>
                  )}
                  <div className="project-meta">
                    <span className="project-cat">{p.category} • {p.status}</span>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.summary}</p>
                  </div>
                  <div className="project-tech">
                    {p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    <Link to={`/project/${p.slug}`} className="project-link-btn">Case Study →</Link>
                    {p.link && p.link !== '#' && <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link-btn-secondary">Live Demo ↗</a>}
                    {p.github && p.github !== '#' && <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn-secondary">GitHub ↗</a>}
                  </div>
                  <div className="card-glow" style={{ background: `radial-gradient(circle at center, ${p.color}25, transparent 70%)` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier B - Engineering Infrastructure */}
        {filtered.filter(p => p.tier === 'B').length > 0 && (
          <div className="projects-tier tier-infra">
            <h3 className="tier-title reveal">Engineering Infrastructure</h3>
            <div className="projects-grid infra-grid">
              {filtered.filter(p => p.tier === 'B').map((p, i) => (
                <div
                  className="project-card card infra-card reveal"
                  key={p.id}
                  style={{ '--card-color': p.color, animationDelay: `${i * 0.08}s` }}
                >
                  <div className="project-meta">
                    <span className="project-cat font-mono">{p.category} • {p.status}</span>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.summary}</p>
                  </div>
                  <div className="project-tech font-mono">
                    {p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    <Link to={`/project/${p.slug}`} className="project-link-btn">Architecture →</Link>
                    {p.github && p.github !== '#' && <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn-secondary">Repository ↗</a>}
                  </div>
                  <div className="card-glow" style={{ background: `radial-gradient(circle at center, ${p.color}25, transparent 70%)` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier C - Supporting Projects */}
        {filtered.filter(p => p.tier === 'C').length > 0 && (
          <div className="projects-tier tier-supporting">
            <h3 className="tier-title reveal">Supporting Projects</h3>
            <div className="projects-grid supporting-grid">
              {filtered.filter(p => p.tier === 'C').map((p, i) => (
                <div
                  className="project-card card supporting-card reveal"
                  key={p.id}
                  style={{ '--card-color': p.color, animationDelay: `${i * 0.08}s` }}
                >
                  <div className="project-meta">
                    <h3 className="project-title">{p.title}</h3>
                    <span className="project-cat">{p.tech.slice(0, 3).join(', ')}</span>
                  </div>
                  <div className="project-links">
                    {p.github && p.github !== '#' && <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn-secondary">GitHub ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
