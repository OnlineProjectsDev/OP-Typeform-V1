import React, { useState, useEffect } from 'react';
import ServiceSelector from './ServiceSelector';
import SEOForm from './SEOForm';
import PPCForm from './PPCForm';
import WebBuildForm from './WebBuildForm';

const Form = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear the error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateServiceForm = () => {
    const newErrors = {};
    
    // Service-specific validation
    if (selectedService === 'seo') {
      if (!formData.websiteUrl) newErrors.websiteUrl = 'Website URL is required';
      if (!formData.keywordTargets) newErrors.keywordTargets = 'Target keywords are required';
      if (!formData.seoGoals) newErrors.seoGoals = 'Please describe your SEO goals';
    } else if (selectedService === 'ppc') {
      // Updated PPC form validation
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
      if (!formData.facebookAccount) newErrors.facebookAccount = 'This field is required';
      if (!formData.pixelInstalled) newErrors.pixelInstalled = 'Please select an option';
      if (!formData.marketingCollateral) newErrors.marketingCollateral = 'Please select an option';
      if (!formData.monthlyBudget) newErrors.monthlyBudget = 'Monthly budget is required';
      if (!formData.targetAudience) newErrors.targetAudience = 'Target audience description is required';
      if (!formData.agreementConfirmation) {
        newErrors.agreementConfirmation = 'You must confirm that you have read the agreement';
      }
    } else if (selectedService === 'web') {
      if (!formData.projectType) newErrors.projectType = 'Project type is required';
      if (!formData.existingWebsite) newErrors.existingWebsite = 'Please indicate if you have an existing website';
      if (formData.existingWebsite === 'yes' && !formData.currentWebsiteUrl) {
        newErrors.currentWebsiteUrl = 'Please provide your current website URL';
      }
      if (!formData.projectTimeline) newErrors.projectTimeline = 'Project timeline is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate service form before proceeding
      if (validateServiceForm()) {
        setCurrentStep(2);
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateContactForm()) {
      // Submit form data
      console.log('Form data submitted:', formData);
      setSubmitted(true);
    } else {
      console.log('Form has errors');
    }
  };

  const handleSelectService = (service) => {
    console.log("Service selected:", service); // Add this for debugging
    setSelectedService(service);
    
    // When changing services or deselecting, reset to step 1
    if (service !== selectedService) {
      setCurrentStep(1);
    }
    
    // Reset errors when selecting a new service (not when deselecting)
    if (service !== null) {
      setErrors({});
    }
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="success-message">
          <h2>Thank you for your submission!</h2>
          <p>We have received your information and will contact you shortly about our {
            selectedService === 'seo' ? 'SEO services' : 
            selectedService === 'ppc' ? 'PPC campaign services' : 
            'web development services'
          }.</p>
          <button onClick={() => {
            setFormData({});
            setSelectedService(null);
            setCurrentStep(1);
            setSubmitted(false);
          }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <ServiceSelector 
        onSelectService={handleSelectService} 
        currentService={selectedService} 
      />
      
      {selectedService && (
        <form onSubmit={handleSubmit}>
          <div className="step-indicator">
            <div className={`step ${currentStep === 1 ? 'active' : ''}`}>Service Details</div>
            <div className={`step ${currentStep === 2 ? 'active' : ''}`}>Contact Information</div>
          </div>
          
          {currentStep === 1 && (
            <>
              {selectedService === 'seo' && (
                <SEOForm 
                  formData={formData} 
                  handleChange={handleChange} 
                  errors={errors} 
                />
              )}
              
              {selectedService === 'ppc' && (
                <PPCForm 
                  formData={formData} 
                  handleChange={handleChange} 
                  errors={errors} 
                />
              )}
              
              {selectedService === 'web' && (
                <WebBuildForm 
                  formData={formData} 
                  handleChange={handleChange} 
                  errors={errors} 
                />
              )}
            </>
          )}
          
          {currentStep === 2 && (
            <div className="contact-form">
              <h2>Contact Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && <span className="error-message">{errors.company}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Additional Information (optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message || ''}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
            </div>
          )}
          
          <div className="form-actions">
            {currentStep > 1 && (
              <button 
                type="button" 
                className="prev-button"
                onClick={handlePrevStep}
              >
                Previous
              </button>
            )}
            
            {currentStep < 2 ? (
              <button 
                type="button" 
                className="next-button"
                onClick={handleNextStep}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">
                Submit
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
