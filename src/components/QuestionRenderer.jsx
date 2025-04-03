// QuestionRenderer.js - Component for rendering different question types
import React from "react";

const QuestionRenderer = ({ 
  question, 
  value, 
  error, 
  animationDirection, 
  isAnimating, 
  formData,
  handleChange, 
  handleServiceSelect, 
  handleCheckboxChange, 
  handleBooleanSelect,
  prevQuestion,
  nextQuestion,
  currentQuestion,
  totalQuestions
}) => {
  const { id, title, subtitle, type, placeholder, options } = question;
  
  // Animation classes
  const animationClass = isAnimating
    ? animationDirection === "forward"
      ? "animate-slide-out-left"
      : "animate-slide-out-right"
    : animationDirection === "forward"
      ? "animate-slide-in-right"
      : "animate-slide-in-left";
  
  return (
    <div className={`transition-all h-full flex flex-col justify-between duration-300 ${animationClass}`}>
      {/* Header section - at the top */}
      <div className="mb-8">
        <h2 className="text-[30px] leading-none mb-3 text-white font-[Delight] font-[600]">{title}</h2>
        {subtitle && <p className="text-gray-600 mb-2">{subtitle}</p>}
      </div>
      
      {/* Question content - in the middle */}
      <div className="flex-grow flex items-center">
        <div className="w-full">
          {type === "service-select" && (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 ">
              {options.map(option => (
                <div 
                  key={option}
                  className={`transition-all ${
                    value === option 
                      ? "border-blue-600" 
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="relative group w-full flex">
                    <h3 
                      className={`cursor-pointer font-[Delight] font-[600] text-[100px] leading-none transition-all duration-300 ${
                        value === option
                          ? "text-blue-700 translate-x-16"
                          : "text-white hover:text-blue-700 active:text-blue-700"
                      }`}
                      onClick={() => handleServiceSelect(option)}
                    >
                      {option}
                    </h3>
                    <span className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${
                      value === option 
                        ? "text-blue-700 opacity-100 translate-x-2" 
                        : "text-white group-hover:text-blue-700 -translate-x-8 opacity-0 group-hover:opacity-100"
                    } transition-all duration-300 text-5xl`}>
                      -
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {type === "text" && (
            <input
              type="text"
              name={id}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full p-4 text-xl border-2 ${error ? "border-red-500" : "border-gray-300"}`}
              autoFocus
            />
          )}
          
          {type === "email" && (
            <input
              type="email"
              name={id}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full p-4 text-xl border-2 ${error ? "border-red-500" : "border-gray-300"}`}
              autoFocus
            />
          )}
          
          {type === "textarea" && (
            <textarea
              name={id}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full p-4 text-xl border-2 ${error ? "border-red-500" : "border-gray-300"}`}
              rows="4"
              autoFocus
            />
          )}
          
          {type === "select" && (
            <select
              name={id}
              value={value}
              onChange={handleChange}
              className={`w-full p-4 text-xl border-2 ${error ? "border-red-500" : "border-gray-300"}`}
              autoFocus
            >
              <option value="">Select an option</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          
          {type === "multi-select" && (
            <div className="space-y-3">
              {options.map(option => (
                <div 
                  key={option.value}
                  className={`border-2 p-4 cursor-pointer transition-all ${
                    formData[id].includes(option.value) 
                      ? "border-blue-600 bg-blue-50" 
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => {
                    const isSelected = formData[id].includes(option.value);
                    const e = {
                      target: {
                        name: id,
                        value: option.value,
                        checked: !isSelected
                      }
                    };
                    handleCheckboxChange(e);
                  }}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 mr-3 rounded border-2 flex items-center justify-center ${
                      formData[id].includes(option.value) 
                        ? "border-blue-600 bg-blue-600" 
                        : "border-gray-400"
                    }`}>
                      {formData[id].includes(option.value) && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-lg">{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {type === "boolean" && (
            <div className="flex space-x-4">
              <div 
                className={`flex-1 border-2 p-5 text-center cursor-pointer transition-all hover:shadow-lg ${
                  value === "Yes" 
                    ? "border-blue-600 bg-blue-50" 
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => handleBooleanSelect(id, "Yes")}
              >
                <span className="text-xl">Yes</span>
              </div>
              
              <div 
                className={`flex-1 border-2 p-5 text-center cursor-pointer transition-all hover:shadow-lg ${
                  value === "No" 
                    ? "border-blue-600 bg-blue-50" 
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => handleBooleanSelect(id, "No")}
              >
                <span className="text-xl">No</span>
              </div>
            </div>
          )}
          
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
      
      {/* Navigation buttons - at the bottom */}
      <div className="flex justify-end">
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
          className="bg-blue-600 text-white px-6 py-3 text-lg hover:bg-blue-700 transition-all ml-4"
        >
          {currentQuestion === totalQuestions - 1 ? "Submit" : "Next →"}
        </button>
      </div>
    </div>
  );
};

export default QuestionRenderer;