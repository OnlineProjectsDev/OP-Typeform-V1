import { useState, useEffect } from "react";

export default function StepForm() {
  // Main state for current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Form data state
  const [formData, setFormData] = useState({
    service: "",
    fullName: "",
    businessName: "",
    email: "",
    contactNumber: "",
    hasWebsite: "",
    // PPC specific fields
    ppcBudget: "",
    ppcPlatforms: [],
    ppcGoals: "",
    ppcTargetAudience: "",
    ppcExperience: "",
    ppcTimeframe: ""
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Animation state
  const [animationDirection, setAnimationDirection] = useState("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  // Define all questions
  const questions = [
    // Question 0: Service selection
    {
      id: "service",
      title: "What service are you interested in?",
      type: "service-select",
      isRequired: true,
      options: ["Google Ads (PPC)", "SEO", "Website Build"]
    },
    // Question 1: Full name
    {
      id: "fullName",
      title: "What's your full name?",
      subtitle: "This will be our point of contact for the engagement",
      type: "text",
      placeholder: "Enter your full name",
      isRequired: true
    },
    // Question 2: Business name
    {
      id: "businessName",
      title: "What's the name of your business?",
      type: "text",
      placeholder: "Enter your business name",
      isRequired: true
    },
    // Question 3: Email
    {
      id: "email",
      title: "What's your email address?",
      subtitle: "We'll use this to follow up with you",
      type: "email",
      placeholder: "name@example.com",
      isRequired: true
    },
    // Question 4: Contact number
    {
      id: "contactNumber",
      title: "What's your contact number?",
      type: "text",
      placeholder: "Enter your phone number",
      isRequired: true
    },
    // Question 5: Has website
    {
      id: "hasWebsite",
      title: "Do you currently have a website?",
      type: "boolean",
      isRequired: true
    }
  ];

  // Define PPC specific questions
  const ppcQuestions = [
    // PPC Question 1: Budget
    {
      id: "ppcBudget",
      title: "What is your monthly budget for PPC advertising?",
      type: "select",
      isRequired: true,
      options: [
        { value: "Less than $1,000", label: "Less than $1,000" },
        { value: "$1,000 - $3,000", label: "$1,000 - $3,000" },
        { value: "$3,000 - $5,000", label: "$3,000 - $5,000" },
        { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
        { value: "$10,000+", label: "$10,000+" }
      ]
    },
    // PPC Question 2: Platforms
    {
      id: "ppcPlatforms",
      title: "Which platforms are you interested in advertising on?",
      subtitle: "Select all that apply",
      type: "multi-select",
      isRequired: true,
      options: [
        { value: "Google Ads", label: "Google Ads" },
        { value: "Facebook/Instagram Ads", label: "Facebook/Instagram Ads" },
        { value: "LinkedIn Ads", label: "LinkedIn Ads" },
        { value: "Twitter Ads", label: "Twitter Ads" },
        { value: "Microsoft/Bing Ads", label: "Microsoft/Bing Ads" }
      ]
    },
    // PPC Question 3: Goals
    {
      id: "ppcGoals",
      title: "What are your primary goals for PPC advertising?",
      type: "select",
      isRequired: true,
      options: [
        { value: "Increase brand awareness", label: "Increase brand awareness" },
        { value: "Generate leads", label: "Generate leads" },
        { value: "Drive website traffic", label: "Drive website traffic" },
        { value: "Increase online sales", label: "Increase online sales" },
        { value: "Promote specific products/services", label: "Promote specific products/services" },
        { value: "Other", label: "Other" }
      ]
    },
    // PPC Question 4: Target audience
    {
      id: "ppcTargetAudience",
      title: "Describe your target audience",
      subtitle: "Who are you trying to reach with your ads?",
      type: "textarea",
      placeholder: "Age range, location, interests, behaviors, etc.",
      isRequired: true
    },
    // PPC Question 5: Experience
    {
      id: "ppcExperience",
      title: "What is your experience level with PPC advertising?",
      type: "select",
      isRequired: true,
      options: [
        { value: "No experience", label: "No experience" },
        { value: "Beginner", label: "Beginner" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Advanced", label: "Advanced" },
        { value: "Expert", label: "Expert" }
      ]
    },
    // PPC Question 6: Timeframe
    {
      id: "ppcTimeframe",
      title: "What is your desired timeframe for starting your PPC campaign?",
      type: "select",
      isRequired: true,
      options: [
        { value: "Immediately", label: "Immediately" },
        { value: "Within 1 month", label: "Within 1 month" },
        { value: "1-3 months", label: "1-3 months" },
        { value: "3-6 months", label: "3-6 months" },
        { value: "Not sure yet", label: "Not sure yet" }
      ]
    }
  ];

  // SEO specific questions (placeholder)
  const seoQuestions = [
    {
      id: "seoQuestion",
      title: "What are your SEO goals?",
      type: "textarea",
      placeholder: "Describe your SEO goals",
      isRequired: true
    }
  ];

  // Website build specific questions (placeholder)
  const websiteQuestions = [
    {
      id: "websiteQuestion",
      title: "What type of website are you looking to build?",
      type: "textarea",
      placeholder: "Describe your website needs",
      isRequired: true
    }
  ];

  // Get all questions based on service selection
  const getAllQuestions = () => {
    // Start with common questions
    let allQuestions = [...questions];
    
    // Add service-specific questions
    if (formData.service === "Google Ads (PPC)") {
      allQuestions = [...allQuestions, ...ppcQuestions];
    } else if (formData.service === "SEO") {
      allQuestions = [...allQuestions, ...seoQuestions];
    } else if (formData.service === "Website Build") {
      allQuestions = [...allQuestions, ...websiteQuestions];
    }
    
    return allQuestions;
  };

  // Get current question
  const getCurrentQuestion = () => {
    const allQuestions = getAllQuestions();
    return allQuestions[currentQuestion];
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service });
    
    // Clear service error
    if (errors.service) {
      setErrors({ ...errors, service: "" });
    }
  };

  // Handle checkbox changes for multi-select
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle boolean selection (Yes/No)
  const handleBooleanSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate current question
  const validateCurrentQuestion = () => {
    const question = getCurrentQuestion();
    const { id, isRequired, type } = question;
    
    // Skip validation if not required
    if (!isRequired) return true;
    
    let isValid = true;
    const newErrors = { ...errors };
    
    // Validate based on question type
    if (type === "service-select") {
      if (!formData[id]) {
        newErrors[id] = "Please select a service";
        isValid = false;
      }
    } else if (type === "text" || type === "email" || type === "textarea") {
      if (!formData[id].trim()) {
        newErrors[id] = "This field is required";
        isValid = false;
      }
      
      // Additional email validation
      if (type === "email" && formData[id].trim() && !/\S+@\S+\.\S+/.test(formData[id])) {
        newErrors[id] = "Please enter a valid email address";
        isValid = false;
      }
    } else if (type === "select") {
      if (!formData[id]) {
        newErrors[id] = "Please select an option";
        isValid = false;
      }
    } else if (type === "multi-select") {
      if (formData[id].length === 0) {
        newErrors[id] = "Please select at least one option";
        isValid = false;
      }
    } else if (type === "boolean") {
      if (!formData[id]) {
        newErrors[id] = "Please select an option";
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Go to next question
  const nextQuestion = () => {
    if (validateCurrentQuestion()) {
      const allQuestions = getAllQuestions();
      
      if (currentQuestion < allQuestions.length - 1) {
        setAnimationDirection("forward");
        setIsAnimating(true);
        
        // Delay the actual state change to allow for animation
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setIsAnimating(false);
        }, 300);
      } else {
        // Submit the form if we're at the last question
        handleSubmit();
      }
    }
  };

  // Go to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setAnimationDirection("backward");
      setIsAnimating(true);
      
      // Delay the actual state change to allow for animation
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Final validation of all questions
    const allQuestions = getAllQuestions();
    let isValid = true;
    const newErrors = {};
    
    allQuestions.forEach(question => {
      const { id, isRequired, type } = question;
      
      if (isRequired) {
        if (type === "service-select" || type === "select" || type === "boolean") {
          if (!formData[id]) {
            newErrors[id] = "This field is required";
            isValid = false;
          }
        } else if (type === "text" || type === "email" || type === "textarea") {
          if (!formData[id].trim()) {
            newErrors[id] = "This field is required";
            isValid = false;
          }
          
          if (type === "email" && formData[id].trim() && !/\S+@\S+\.\S+/.test(formData[id])) {
            newErrors[id] = "Please enter a valid email address";
            isValid = false;
          }
        } else if (type === "multi-select") {
          if (formData[id].length === 0) {
            newErrors[id] = "Please select at least one option";
            isValid = false;
          }
        }
      }
    });
    
    setErrors(newErrors);
    
    if (isValid) {
      // Submit form data
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
      alert("Form submitted successfully!");
    } else {
      // Find the first question with an error and go to it
      for (let i = 0; i < allQuestions.length; i++) {
        if (newErrors[allQuestions[i].id]) {
          setCurrentQuestion(i);
          break;
        }
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        nextQuestion();
      } else if (e.key === "Backspace" && e.altKey) {
        e.preventDefault();
        prevQuestion();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, formData]);

  // Render the current question
  const renderQuestion = () => {
    const question = getCurrentQuestion();
    const { id, title, subtitle, type, placeholder, options } = question;
    const value = formData[id];
    const error = errors[id];
    
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
                className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg ${
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
            className={`w-full p-4 text-xl border-2 rounded-xl ${error ? "border-red-500" : "border-gray-300"}`}
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
            className={`w-full p-4 text-xl border-2 rounded-xl ${error ? "border-red-500" : "border-gray-300"}`}
            autoFocus
          />
        )}
        
        {type === "textarea" && (
          <textarea
            name={id}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full p-4 text-xl border-2 rounded-xl ${error ? "border-red-500" : "border-gray-300"}`}
            rows="4"
            autoFocus
          />
        )}
        
        {type === "select" && (
          <select
            name={id}
            value={value}
            onChange={handleChange}
            className={`w-full p-4 text-xl border-2 rounded-xl ${error ? "border-red-500" : "border-gray-300"}`}
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
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
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
              className={`flex-1 border-2 rounded-xl p-5 text-center cursor-pointer transition-all hover:shadow-lg ${
                value === "Yes" 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleBooleanSelect(id, "Yes")}
            >
              <span className="text-xl">Yes</span>
            </div>
            
            <div 
              className={`flex-1 border-2 rounded-xl p-5 text-center cursor-pointer transition-all hover:shadow-lg ${
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

  // Calculate progress percentage
  const calculateProgress = () => {
    const allQuestions = getAllQuestions();
    return ((currentQuestion + 1) / allQuestions.length) * 100;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Question content */}
            {renderQuestion()}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={prevQuestion}
                className={`px-6 py-3 rounded-xl text-lg transition-all ${
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
                className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition-all"
              >
                {currentQuestion === getAllQuestions().length - 1 ? "Submit" : "Next →"}
              </button>
            </div>
            
            {/* Keyboard shortcuts hint */}
            <div className="text-center text-gray-400 text-sm mt-6">
              Press <kbd className="px-2 py-1 bg-gray-100 rounded">Enter ↵</kbd> to continue, 
              <kbd className="px-2 py-1 bg-gray-100 rounded ml-2">Alt + Backspace</kbd> to go back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
