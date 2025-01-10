import React from 'react';

export function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M12 4v16M8 8h8M7 12h10" />
    </svg>
  );
}