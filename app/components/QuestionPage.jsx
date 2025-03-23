import React from 'react';

const QuestionPage = ({ question, options, answer, selectedOption, handleOptionClick, handleNext }) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-blue-800">
        {question}
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`relative block w-full p-3 rounded-lg transition-all border-2 text-black ${
              selectedOption
                ? option === answer
                  ? "border-green-500 text-green-500"
                  : option === selectedOption
                  ? "border-red-500 text-red-500 animate-shake"
                  : "border-gray-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption}
          >
            {option}
            {selectedOption && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl">
                {option === answer ? "✅" : option === selectedOption ? "❌" : ""}
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
        disabled={!selectedOption}
      >
        Next
      </button>
    </>
  );
};

export default QuestionPage;