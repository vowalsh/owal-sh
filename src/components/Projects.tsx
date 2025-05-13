
import React from "react";

const Projects: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="project">
        <h3 className="text-terminal-accent font-bold">CodeCrafter</h3>
        <p className="text-sm">
          An interactive code learning platform built with React, TypeScript, and Node.js.
          Features code challenges, real-time feedback, and collaborative coding rooms.
        </p>
        <a 
          href="https://github.com/vowalsh/codecrafter" 
          className="text-xs text-terminal-accent hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Project →
        </a>
      </div>
      <div className="project">
        <h3 className="text-terminal-accent font-bold">DataViz Dashboard</h3>
        <p className="text-sm">
          A data visualization dashboard created with D3.js and React.
          Transforms complex datasets into intuitive, interactive charts.
        </p>
        <a 
          href="https://github.com/vowalsh/dataviz-dashboard" 
          className="text-xs text-terminal-accent hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Project →
        </a>
      </div>
      <div className="project">
        <h3 className="text-terminal-accent font-bold">EcoTracker</h3>
        <p className="text-sm">
          A mobile-first web application for tracking personal carbon footprint.
          Built with React Native and Firebase.
        </p>
        <a 
          href="https://github.com/vowalsh/ecotracker" 
          className="text-xs text-terminal-accent hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Project →
        </a>
      </div>
    </div>
  );
};

export default Projects;
