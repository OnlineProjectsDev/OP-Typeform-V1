import React from 'react';

const WebBuildForm = ({ formData, handleChange, errors }) => {
  return (
    <div className="service-form web-build-form">
      <h2>Web Development Services</h2>
      
      <div className="form-group">
        <label htmlFor="projectType">Type of Website Needed</label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType || ''}
          onChange={handleChange}
          className={errors.projectType ? 'error' : ''}
        >
          <option value="">Select website type</option>
          <option value="business">Business Website</option>
          <option value="ecommerce">E-commerce Website</option>
          <option value="portfolio">Portfolio/Personal</option>
          <option value="blog">Blog</option>
          <option value="custom">Custom Application</option>
        </select>
        {errors.projectType && <span className="error-message">{errors.projectType}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="existingWebsite">Do you have an existing website?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="existingWebsite"
              value="yes"
              checked={formData.existingWebsite === 'yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="existingWebsite"
              value="no"
              checked={formData.existingWebsite === 'no'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        {errors.existingWebsite && <span className="error-message">{errors.existingWebsite}</span>}
      </div>

      {formData.existingWebsite === 'yes' && (
        <div className="form-group">
          <label htmlFor="currentWebsiteUrl">Current Website URL</label>
          <input
            type="url"
            id="currentWebsiteUrl"
            name="currentWebsiteUrl"
            value={formData.currentWebsiteUrl || ''}
            onChange={handleChange}
            className={errors.currentWebsiteUrl ? 'error' : ''}
          />
          {errors.currentWebsiteUrl && <span className="error-message">{errors.currentWebsiteUrl}</span>}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="websiteFeatures">Required Features</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="websiteFeatures"
              value="contact_form"
              checked={formData.websiteFeatures?.includes('contact_form')}
              onChange={(e) => {
                const currentFeatures = formData.websiteFeatures || [];
                let newFeatures;
                if (e.target.checked) {
                  newFeatures = [...currentFeatures, 'contact_form'];
                } else {
                  newFeatures = currentFeatures.filter(feature => feature !== 'contact_form');
                }
                handleChange({ target: { name: 'websiteFeatures', value: newFeatures } });
              }}
            />
            Contact Form
          </label>
          <label>
            <input
              type="checkbox"
              name="websiteFeatures"
              value="user_accounts"
              checked={formData.websiteFeatures?.includes('user_accounts')}
              onChange={(e) => {
                const currentFeatures = formData.websiteFeatures || [];
                let newFeatures;
                if (e.target.checked) {
                  newFeatures = [...currentFeatures, 'user_accounts'];
                } else {
                  newFeatures = currentFeatures.filter(feature => feature !== 'user_accounts');
                }
                handleChange({ target: { name: 'websiteFeatures', value: newFeatures } });
              }}
            />
            User Accounts
          </label>
          <label>
            <input
              type="checkbox"
              name="websiteFeatures"
              value="payment_processing"
              checked={formData.websiteFeatures?.includes('payment_processing')}
              onChange={(e) => {
                const currentFeatures = formData.websiteFeatures || [];
                let newFeatures;
                if (e.target.checked) {
                  newFeatures = [...currentFeatures, 'payment_processing'];
                } else {
                  newFeatures = currentFeatures.filter(feature => feature !== 'payment_processing');
                }
                handleChange({ target: { name: 'websiteFeatures', value: newFeatures } });
              }}
            />
            Payment Processing
          </label>
          <label>
            <input
              type="checkbox"
              name="websiteFeatures"
              value="blog_section"
              checked={formData.websiteFeatures?.includes('blog_section')}
              onChange={(e) => {
                const currentFeatures = formData.websiteFeatures || [];
                let newFeatures;
                if (e.target.checked) {
                  newFeatures = [...currentFeatures, 'blog_section'];
                } else {
                  newFeatures = currentFeatures.filter(feature => feature !== 'blog_section');
                }
                handleChange({ target: { name: 'websiteFeatures', value: newFeatures } });
              }}
            />
            Blog Section
          </label>
        </div>
        {errors.websiteFeatures && <span className="error-message">{errors.websiteFeatures}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="projectTimeline">Desired Timeline</label>
        <select
          id="projectTimeline"
          name="projectTimeline"
          value={formData.projectTimeline || ''}
          onChange={handleChange}
          className={errors.projectTimeline ? 'error' : ''}
        >
          <option value="">Select timeline</option>
          <option value="urgent">ASAP (1-2 weeks)</option>
          <option value="standard">Standard (1-2 months)</option>
          <option value="flexible">Flexible (3+ months)</option>
        </select>
        {errors.projectTimeline && <span className="error-message">{errors.projectTimeline}</span>}
      </div>
    </div>
  );
};

export default WebBuildForm;
