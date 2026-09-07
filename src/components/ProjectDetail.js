import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';
import MetricGrid from './MetricGrid';
import DecisionCard from './DecisionCard';
import ArchitectureBlock from './ArchitectureBlock';
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
            {project.primaryImage ? (
              <img src={project.primaryImage} alt={`${project.title} screenshot`} className="project-detail-image" />
            ) : (
              <div className="project-detail-image-placeholder" style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                <span className="project-emoji-large">{project.emoji}</span>
              </div>
            )}
            
            <div className="project-detail-intro">
              <span className="project-category font-mono">
                {project.category} • {project.status}
              </span>
              <h1 className="project-detail-title">{project.title}</h1>
              <p className="project-detail-summary">{project.summary}</p>

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
          {/* Outcomes / Metrics */}
          {(project.outcome || (project.metrics && project.metrics.length > 0)) && (
            <section className="detail-section outcome-section">
              <h2 className="section-title">The Outcome</h2>
              {project.outcome && <p className="section-text">{project.outcome}</p>}
              <MetricGrid metrics={project.metrics} />
            </section>
          )}

          {/* Problem Section */}
          {project.problem && (
            <section className="detail-section problem-section">
              <h2 className="section-title">The Problem</h2>
              <div className="problem-card" style={{ '--accent-color': project.color }}>
                <p className="section-text">{project.problem}</p>
              </div>
            </section>
          )}

          {/* Approach Section */}
          {project.approach && (
            <section className="detail-section approach-section">
              <h2 className="section-title">Engineering Approach</h2>
              <div className="approach-content">
                <p className="section-text">{project.approach}</p>
              </div>
            </section>
          )}

          {/* Architecture Visual */}
          <section className="detail-section">
            <h2 className="section-title">Architecture</h2>
            <ArchitectureBlock diagramDef={project.architectureDiagramDef} />
          </section>

          {/* Key Decisions */}
          {project.keyDecisions && project.keyDecisions.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Key Technical Decisions</h2>
              <div className="decisions-grid">
                {project.keyDecisions.map((decision, i) => (
                  <DecisionCard key={i} index={i} decision={decision} />
                ))}
              </div>
            </section>
          )}

          {/* Challenges Solved */}
          {project.challenges && project.challenges.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Challenges Overcome</h2>
              <div className="challenges-grid">
                {project.challenges.map((ch, i) => (
                  <div key={i} className="challenge-card card">
                    <div className="challenge-header">CHALLENGE</div>
                    <h3 className="challenge-label">{ch.label}</h3>
                    <div className="challenge-header solution-header">SOLUTION</div>
                    <p className="challenge-solution">{ch.solution}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Secondary Visuals / Gallery */}
          {project.secondaryImages && project.secondaryImages.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Gallery</h2>
              <div className="secondary-gallery">
                {project.secondaryImages.map((img, i) => (
                  <img key={i} src={img} alt={`Screenshot ${i + 1} for ${project.title}`} className="gallery-image" loading="lazy" decoding="async" />
                ))}
              </div>
            </section>
          )}

          {/* Lesson Learned */}
          {project.lessonLearned && (
            <section className="detail-section">
              <h2 className="section-title">Retrospective</h2>
              <blockquote className="lesson-blockquote">
                “{project.lessonLearned}”
              </blockquote>
            </section>
          )}
        </div>
      </main>

      {/* GitHub / Live Project */}
      <section className="project-detail-cta detail-section-last">
        <div className="container">
          <h2 className="cta-title">Explore the Project</h2>
          <div className="cta-buttons">
            {project.link && project.link !== '#' && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Live Demo ↗
              </a>
            )}
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
                GitHub Repository ↗
              </a>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
