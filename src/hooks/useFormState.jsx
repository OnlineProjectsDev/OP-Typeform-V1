// useFormState.js - Custom hook for form state management
import { useState, useEffect } from "react";
import { 
  commonQuestions, 
  ppcQuestions, 
  seoQuestions, 
  websiteQuestions, 
  initialFormData 
} from "../data/formQuestions";

export default function useFormState() {
  // Main state for current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Form data state
  const [formData, setFormData] = useState(initialFormData);
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Animation state
  const [animationDirection, setAnimationDirection] = useState("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  // Get all questions based on service selection
  const getAllQuestions = () => {
    // Start with common questions
    let allQuestions = [...commonQuestions];
    
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

  // Calculate progress percentage
  const calculateProgress = () => {
    const allQuestions = getAllQuestions();
    return ((currentQuestion + 1) / allQuestions.length) * 100;
  };

  return {
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
  };
}