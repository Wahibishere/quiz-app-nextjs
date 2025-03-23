import React from 'react';

const Timer = ({ timer, strokeDashoffset }) => {
  return (
    <div className="relative w-12 h-12">
      <svg width="50" height="50" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="lightgray"
          strokeWidth="5"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="red"
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={2 * Math.PI * 45}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
        {timer}
      </span>
    </div>
  );
};

export default Timer;