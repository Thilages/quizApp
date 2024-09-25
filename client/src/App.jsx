import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./homePage";
import QuizPage from "./quizPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/quiz" element={<QuizPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
