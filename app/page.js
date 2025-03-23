"use client";
import { useState, useEffect } from "react";
import questionsData from "./data/questions.json"; // Ensure this file is present
import Timer from "./components/Timer";
import ScoreDisplay from "./components/ScoreDisplay";
import StartPage from "./components/StartPage";
import QuestionPage from "./components/QuestionPage";
import ResultsPage from "./components/ResultsPage";

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

  const handleRestart = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setTimer(30);
    setStartQuiz(true);
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (timer / 30) * circumference;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className="absolute w-3/4 h-3/4 bg-cover bg-center rounded-lg shadow-lg"
        style={{ backgroundImage: "url('/space.jpeg')" }} // Update your background image path
      ></div>
      <div className="relative w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg text-center">
        {startQuiz && !showResults && (
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            <Timer timer={timer} strokeDashoffset={strokeDashoffset} />
            <ScoreDisplay score={score} />
          </div>
        )}

        {!startQuiz && !showResults ? (
          <StartPage onStart={() => setStartQuiz(true)} />
        ) : startQuiz ? (
          <QuestionPage
            question={questionsData[currentQuestion].question}
            options={questionsData[currentQuestion].options}
            answer={questionsData[currentQuestion].answer}
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
            handleNext={handleNext}
          />
        ) : (
          <ResultsPage
            score={score}
            totalQuestions={questionsData.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}