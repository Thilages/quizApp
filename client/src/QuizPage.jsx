import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { quizQuestions } from "./constants";

const QuizPage = () => {
  const [quizQuestion, setquizQuestions] = useState(quizQuestions);
  const navigate = useNavigate();
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [selectedAnswer, setselectedAnswer] = useState(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [background, setbackground] = useState("#2D3748");
  const [showAnswer, setshowAnswer] = useState(false);
  const [score, setscore] = useState(0);

  useEffect(() => {
    // Backend integration, check if there are questions to display
    if (quizQuestion.length < 1) {
      navigate("/");
    }
  }, [quizQuestion, navigate]);

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer");
      return;
    }
    if (selectedAnswer === quizQuestion[currentQuestion].correctAnswer) {
      setbackground("#399918");
      setscore(score + 1);
    } else {
      setbackground("#FFAAAA");
    }
    setshowAnswer(true);

    setTimeout(() => {
      setbackground("#2D3748");
      setshowAnswer(false);

      if (currentQuestion < quizQuestion.length - 1) {
        setcurrentQuestion(currentQuestion + 1);
        setselectedAnswer(null);
      } else {
        setIsQuizComplete(true);
      }
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: background }}>
      <div className="h-[100vh] w-[30vw] m-auto p-5 py-20">
        {/* Check if quiz is completed */}
        {isQuizComplete ? (
          <>
            <div className="text-white font-bold text-2xl text-center">
              Thanks for writing the test!
            </div>
            <div className="text-green-400 font-extrabold text-3xl text-center mt-10">
              Your Score:{score}/{quizQuestion.length}
            </div>
          </>
        ) : (
          <>
            {/* Progress bar */}
            <div className="h-[1vh] rounded-2xl w-[90%] bg-black mx-auto mb-5 relative">
              <div
                className="h-[1vh] rounded-2xl bg-white"
                style={{
                  width: `${
                    ((currentQuestion + 1) / quizQuestion.length) * 100
                  }%`,
                }}
              ></div>
            </div>

            <div className="text-gray-600 font-thin">
              Question {currentQuestion + 1} of {quizQuestion.length}
            </div>

            {/* Question */}
            <div className="text-white font-semibold text-2xl my-4 ">
              {quizQuestion[currentQuestion].question}
            </div>

            {/* Options */}
            <div className="text-white">
              {quizQuestion[currentQuestion].options.map((option, index) => (
                <div
                  onClick={() => setselectedAnswer(option)}
                  key={index}
                  className={`my-2 border p-2 rounded-xl px-4 font-bold ${
                    selectedAnswer === option
                      ? "border-yellow-500 border-2 text-[#2D3748] bg-yellow-50"
                      : "bg-none"
                  }
                  ${
                    quizQuestion[currentQuestion].correctAnswer === option &&
                    showAnswer
                      ? "scale-110 border-green-600 bg-green-200"
                      : ""
                  }
                  `}
                >
                  <div>{option}</div>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <div
              className="bg-[#38a169] rounded-xl text-white p-2 mt-5 text-center cursor-pointer"
              onClick={handleSubmit}
            >
              Next
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
