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
  handleBooleanSelect 
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
    <div className={`transition-all duration-300 ${animationClass}`}>
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">{title}</h2>
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
      
      {type === "service-select" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {options.map(option => (
            <div 
              key={option}
              className={`border-2 p-6 text-center cursor-pointer transition-all hover:shadow-lg ${
                value === option 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleServiceSelect(option)}
            >
              <h3 className="text-xl font-medium">{option}</h3>
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
  );
};

export default QuestionRenderer;