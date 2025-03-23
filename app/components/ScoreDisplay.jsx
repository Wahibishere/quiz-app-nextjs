import React from 'react';

const ScoreDisplay = ({ score }) => {
  return (
    <div className="text-lg font-bold text-blue-700">
      Score: {score}
    </div>
  );
};

export default ScoreDisplay;