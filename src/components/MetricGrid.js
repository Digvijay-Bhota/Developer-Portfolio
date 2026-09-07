import React from 'react';
import './MetricGrid.css';

export default function MetricGrid({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="detail-section metric-grid-section">
      <div className="metrics-grid">
        {metrics.map((metric, i) => (
          <div key={i} className="metric-card card">
            <div className="metric-number">{metric.label}</div>
            <div className="metric-description">{metric.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
