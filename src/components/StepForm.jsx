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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      
      <div className="flex-grow flex items-stretch justify-center p-4">
        <div className="w-full mx-auto">
          <div className="bg-white h-full border-1 p-8 md:p-12">
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
            />
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={prevQuestion}
                className={`px-6 py-3 text-lg transition-all ${
                  currentQuestion === 0 
                    ? "opacity-0 cursor-default" 
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                disabled={currentQuestion === 0}
              >
                ← Back
              </button>
              
              <button 
                onClick={nextQuestion}
                className="bg-blue-600 text-white px-6 py-3 text-lg hover:bg-blue-700 transition-all"
              >
                {currentQuestion === getAllQuestions().length - 1 ? "Submit" : "Next →"}
              </button>
            </div>
            
            {/* Keyboard shortcuts hint */}
            <div className="text-center text-gray-400 text-sm mt-6 absolute bottom-12 left-12">
              Press <kbd className="px-2 py-1 bg-gray-100">Enter ↵</kbd> to continue, 
              <kbd className="px-2 py-1 bg-gray-100 ml-2">Alt + Backspace</kbd> to go back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}