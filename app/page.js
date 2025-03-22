"use client";
import { useState, useEffect } from "react";
import questionsData from "./data/questions.json"; // Ensure this file is present

export default function Home() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(30);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (startQuiz && timer > 0 && selectedOption === null) {
      const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    }
    if (timer === 0) {
      handleNext();
    }
  }, [timer, startQuiz, selectedOption]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === questionsData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setTimer(30);
    } else {
      setShowResults(true);
      setStartQuiz(false);
    }
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (timer / 30) * circumference;

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/space.jpeg')" }} // Update your background image path
    >
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg text-center relative">
        {/* Timer and Score Section */}
        {startQuiz && !showResults && (
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            {/* Circular Timer */}
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

            {/* Score Display */}
            <div className="text-lg font-bold text-blue-700">
              Score: {score}
            </div>
          </div>
        )}

        {/* Start Page */}
        {!startQuiz && !showResults ? (
          <>
            <h1 className="text-xl font-bold mb-4 text-blue-800">Welcome to the Quiz</h1>
            <button
              onClick={() => setStartQuiz(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Start
            </button>
          </>
        ) : startQuiz ? (
          <>
            {/* Question */}
            <h2 className="text-lg font-semibold text-blue-800">
              {questionsData[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {questionsData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`relative block w-full p-3 rounded-lg transition-all border-2 ${
                    selectedOption
                      ? option === questionsData[currentQuestion].answer
                        ? "border-green-500 text-green-500"
                        : option === selectedOption
                        ? "border-red-500 text-red-500"
                        : "border-gray-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={!!selectedOption}
                >
                  {option}
                  {/* Tick or Cross Icon */}
                  {selectedOption && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl">
                      {option === questionsData[currentQuestion].answer ? "✅" : option === selectedOption ? "❌" : ""}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
              disabled={!selectedOption}
            >
              Next
            </button>
          </>
        ) : (
          <>
            {/* Results Page */}
            <h1 className="text-xl font-bold mb-4 text-blue-800">Quiz Completed!</h1>
            <p className="text-lg font-semibold text-blue-800">
              Your Score: {score} / {questionsData.length}
            </p>
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setScore(0);
                setSelectedOption(null);
                setTimer(30);
                setStartQuiz(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
            >
              Restart Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
