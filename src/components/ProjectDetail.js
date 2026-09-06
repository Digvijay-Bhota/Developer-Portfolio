import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="project-detail-404">
        <div className="container">
          <h1>Project not found</h1>
          <p>Sorry, we couldn't find that project.</p>
          <button className="btn-back" onClick={() => navigate('/#projects')}>
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="project-detail">
      <button className="btn-back-fixed" onClick={() => navigate('/#projects')} title="Back to projects">
        ← Back
      </button>

      <header className="project-detail-header">
        <div className="container">
          <div className="project-detail-hero">
            <img src={project.image} alt={project.title} className="project-detail-image" />
            <div className="project-detail-intro">
              <span className="project-category">{project.category}</span>
              <h1 className="project-detail-title">{project.title}</h1>
              <p className="project-detail-summary">{project.summary}</p>

              <div className="project-detail-links">
                {project.link !== '#' && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-btn">
                    Visit Site →
                  </a>
                )}
                {project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn secondary">
                    View Code →
                  </a>
                )}
              </div>

              <div className="project-tech">
                <strong>Tech Stack:</strong>
                <div className="tech-tags">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="project-detail-content">
        <div className="container">
          {/* Problem Section */}
          <section className="detail-section">
            <h2 className="section-title">The Problem</h2>
            <p className="section-text">{project.problem}</p>
          </section>

          {/* Approach Section */}
          <section className="detail-section">
            <h2 className="section-title">My Approach</h2>
            <p className="section-text">{project.approach}</p>
          </section>

          {/* Outcome Section */}
          <section className="detail-section">
            <h2 className="section-title">The Outcome</h2>
            <p className="section-text">{project.outcome}</p>
          </section>

          {/* Key Decisions */}
          {project.keyDecisions.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Key Decisions</h2>
              <ul className="decisions-list">
                {project.keyDecisions.map((decision, i) => (
                  <li key={i} className="decision-item">
                    {decision}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Challenges Solved */}
          {project.challenges.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Challenges & Solutions</h2>
              <div className="challenges-grid">
                {project.challenges.map((ch, i) => (
                  <div key={i} className="challenge-card card">
                    <h3 className="challenge-label">{ch.label}</h3>
                    <p className="challenge-solution">{ch.solution}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Metrics */}
          {project.metrics.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Results & Metrics</h2>
              <div className="metrics-grid">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="metric-card card">
                    <div className="metric-number">{metric.label}</div>
                    <div className="metric-description">{metric.value}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Lesson Learned */}
          <section className="detail-section detail-section-last">
            <h2 className="section-title">What I Learned</h2>
            <blockquote className="lesson-blockquote">
              "{project.lessonLearned}"
            </blockquote>
          </section>
        </div>
      </main>

      {/* CTA to next section */}
      <section className="project-detail-cta">
        <div className="container">
          <h2>Want to work together?</h2>
          <p>Let's build something great. Reach out via email or connect on LinkedIn.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn-primary">Get In Touch</a>
          </div>
        </div>
      </section>
    </article>
  );
}
