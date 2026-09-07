import React from 'react';
import './ArchitectureBlock.css';

export default function ArchitectureBlock({ diagramDef }) {
  if (diagramDef === undefined || diagramDef === null) return null;

  return (
    <div className="architecture-block">
      {diagramDef ? (
        <div className="architecture-diagram-content">
          {/* Future diagram rendering (e.g. mermaid) */}
          <pre><code>{diagramDef}</code></pre>
        </div>
      ) : (
        <div className="architecture-placeholder">
          <span className="placeholder-text">Architecture diagram to be added</span>
        </div>
      )}
    </div>
  );
}
