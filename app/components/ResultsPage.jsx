import React from 'react';

const ResultsPage = ({ score, totalQuestions, onRestart }) => {
  const percentage = (score / totalQuestions) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl font-bold mb-4 text-blue-800">Quiz Completed!</h1>
      <div className="relative w-24 h-24 mb-4">
        <svg width="100" height="100" viewBox="0 0 100 100">
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
            stroke="blue"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
          {Math.round(percentage)}%
        </span>
      </div>
      <p className="text-lg font-semibold text-blue-800">
        Your Score: {score} / {totalQuestions}
      </p>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultsPage;