// StepForm.js - Main form component
import React from "react";
import useFormState from "../hooks/useFormState";
import QuestionRenderer from "./QuestionRenderer";

export default function StepForm() {
  // Use custom hook for form state management
  const {
    currentQuestion,
    formData,
    errors,
    animationDirection,
    isAnimating,
    getCurrentQuestion,
    getAllQuestions,
    handleChange,
    handleServiceSelect,
    handleCheckboxChange,
    handleBooleanSelect,
    nextQuestion,
    prevQuestion,
    calculateProgress
  } = useFormState();

  // Get current question
  const question = getCurrentQuestion();

  return (
    <div className="min-h-screen flex flex-col bg-[#191919]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
        <div 
          className="h-full bg-[#7a7a7a] transition-all duration-300"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      
      <div className="main-container flex-grow flex justify-center">
        <div className="w-full items-stretch mx-auto">
          <div className=" p-8 h-full md:p-12">
            {/* Question content */}
            <QuestionRenderer
              question={question}
              value={formData[question.id]}
              error={errors[question.id]}
              animationDirection={animationDirection}
              isAnimating={isAnimating}
              formData={formData}
              handleChange={handleChange}
              handleServiceSelect={handleServiceSelect}
              handleCheckboxChange={handleCheckboxChange}
              handleBooleanSelect={handleBooleanSelect}
              prevQuestion={prevQuestion}
              nextQuestion={nextQuestion}
              currentQuestion={currentQuestion}
              totalQuestions={getAllQuestions().length}
              className="text-white"
            />
            
            {/* Keyboard shortcuts hint */}
            <div className="text-center text-gray-400 text-sm mt-6 absolute bottom-16 left-12">
              Press <kbd className="px-2 py-1 bg-gray-100">Enter ↵</kbd> to continue, 
              <kbd className="px-2 py-1 bg-gray-100 ml-2">Alt + Backspace</kbd> to go back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}