import React from 'react';

const StartPage = ({ onStart }) => {
  return (
    <div className="flex flex-col justify-center h-full px-10 py-1">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">Welcome to the Quiz-Next-App</h1>
      <p className="text-lg mb-8 text-gray-700">Test your knowledge about space</p>
      <button
        onClick={onStart}
        className="bg-blue-500 text-white px-20 py-3 rounded-lg hover:bg-blue-700 text-xl"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartPage;