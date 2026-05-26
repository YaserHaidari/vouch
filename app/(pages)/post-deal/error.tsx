"use client";

import "./error.css";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="error-wrapper">
      <div className="error-card">
        <span className="error-code">{error.name}</span>
        <div className="error-divider" />
        <h1 className="error-message">{error.message}</h1>
        <button className="error-btn" onClick={reset}>
          Try again
        </button>
      </div>
    </div>
  );
}