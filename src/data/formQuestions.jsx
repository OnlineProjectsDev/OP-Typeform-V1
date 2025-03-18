// formQuestions.js - Stores all question definitions

// Common questions for all services
export const commonQuestions = [
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

// PPC specific questions
export const ppcQuestions = [
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

// SEO specific questions
export const seoQuestions = [
  {
    id: "seoQuestion",
    title: "What are your SEO goals?",
    type: "textarea",
    placeholder: "Describe your SEO goals",
    isRequired: true
  }
];

// Website build specific questions
export const websiteQuestions = [
  {
    id: "websiteQuestion",
    title: "What type of website are you looking to build?",
    type: "textarea",
    placeholder: "Describe your website needs",
    isRequired: true
  }
];

// Initial form data structure
export const initialFormData = {
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
};