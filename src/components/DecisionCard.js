import React from 'react';
import './DecisionCard.css';

export default function DecisionCard({ index, decision }) {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div className="decision-card card">
      <div className="decision-header">
        <span className="decision-index" aria-hidden="true">{formattedIndex}</span>
        <h3 className="decision-label">TECHNICAL DECISION</h3>
      </div>
      <p className="decision-text">{decision}</p>
    </div>
  );
}
