import React from 'react';

const SEOForm = ({ formData, handleChange, errors }) => {
  return (
    <div className="service-form seo-form">
      <h2>SEO Services</h2>
      
      <div className="form-group">
        <label htmlFor="websiteUrl">Current Website URL</label>
        <input
          type="url"
          id="websiteUrl"
          name="websiteUrl"
          value={formData.websiteUrl || ''}
          onChange={handleChange}
          className={errors.websiteUrl ? 'error' : ''}
        />
        {errors.websiteUrl && <span className="error-message">{errors.websiteUrl}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="keywordTargets">Target Keywords (comma separated)</label>
        <input
          type="text"
          id="keywordTargets"
          name="keywordTargets"
          value={formData.keywordTargets || ''}
          onChange={handleChange}
          className={errors.keywordTargets ? 'error' : ''}
        />
        {errors.keywordTargets && <span className="error-message">{errors.keywordTargets}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="competitors">Main Competitors (comma separated)</label>
        <input
          type="text"
          id="competitors"
          name="competitors"
          value={formData.competitors || ''}
          onChange={handleChange}
          className={errors.competitors ? 'error' : ''}
        />
        {errors.competitors && <span className="error-message">{errors.competitors}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="seoGoals">SEO Goals</label>
        <textarea
          id="seoGoals"
          name="seoGoals"
          value={formData.seoGoals || ''}
          onChange={handleChange}
          className={errors.seoGoals ? 'error' : ''}
          placeholder="What do you hope to achieve with SEO services?"
          rows="4"
        ></textarea>
        {errors.seoGoals && <span className="error-message">{errors.seoGoals}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="currentSEO">Current SEO Efforts</label>
        <select
          id="currentSEO"
          name="currentSEO"
          value={formData.currentSEO || ''}
          onChange={handleChange}
          className={errors.currentSEO ? 'error' : ''}
        >
          <option value="">Select an option</option>
          <option value="none">None</option>
          <option value="minimal">Minimal</option>
          <option value="moderate">Moderate</option>
          <option value="extensive">Extensive</option>
        </select>
        {errors.currentSEO && <span className="error-message">{errors.currentSEO}</span>}
      </div>
    </div>
  );
};

export default SEOForm;
