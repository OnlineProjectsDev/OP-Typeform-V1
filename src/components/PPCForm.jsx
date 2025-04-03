import React, { useState } from 'react';

const PPCForm = ({ formData, handleChange, errors }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const nextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  return (
    <div className="service-form ppc-form">
      <div className="form-intro">
        <h2>PPC Campaign Services</h2>
        <p className="form-description">
          To assist us in building an effective Paid Social campaign, please answer the following queries with as much detail as possible.
        </p>
        <p className="form-description">
          There are standard queries, some will apply, and others may not. Please answer questions relevant to your business & industry, keeping in mind the more information you provide us, the better the outcome.
        </p>
      </div>

      <div className="ppc-form-pages">
        {/* Page 1 - Basic Information */}
        {currentPage === 1 && (
          <div className="form-page">
            <div className="form-group">
              <label htmlFor="fullName">What is your Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">What is your Email</label>
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
              <label htmlFor="phone">What is your Phone number</label>
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
              <label htmlFor="businessName">What is the name of your Business or Company</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName || ''}
                onChange={handleChange}
                className={errors.businessName ? 'error' : ''}
              />
              {errors.businessName && <span className="error-message">{errors.businessName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="industry">In what industry do you operate?</label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry || ''}
                onChange={handleChange}
                className={errors.industry ? 'error' : ''}
              />
              {errors.industry && <span className="error-message">{errors.industry}</span>}
            </div>
          </div>
        )}

        {/* Page 2 - Facebook and Technical Questions */}
        {currentPage === 2 && (
          <div className="form-page">
            <div className="form-group">
              <label htmlFor="facebookAccount">Do you have an existing Facebook Business account? If YES, please share the following, so that we can request access.</label>
              <textarea
                id="facebookAccount"
                name="facebookAccount"
                value={formData.facebookAccount || ''}
                onChange={handleChange}
                className={errors.facebookAccount ? 'error' : ''}
                placeholder="- Business ID
- Contact Name
- Contact Email
- Business Manager Account

If you do not have an account, we will set one up on your behalf."
                rows="6"
              ></textarea>
              {errors.facebookAccount && <span className="error-message">{errors.facebookAccount}</span>}
              <p className="field-required">This question is required.</p>
            </div>

            <div className="form-group">
              <label htmlFor="pixelInstalled">Do you have the Facebook tracking pixel installed on your website, or do you require us to install this</label>
              <select
                id="pixelInstalled"
                name="pixelInstalled"
                value={formData.pixelInstalled || ''}
                onChange={handleChange}
                className={errors.pixelInstalled ? 'error' : ''}
              >
                <option value="">Select an answer</option>
                <option value="yes_installed">Yes, already installed</option>
                <option value="no_install_needed">No, please install for me</option>
                <option value="not_sure">Not sure</option>
              </select>
              {errors.pixelInstalled && <span className="error-message">{errors.pixelInstalled}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="marketingCollateral">Marketing Collateral & Creative for Ads</label>
              <select
                id="marketingCollateral"
                name="marketingCollateral"
                value={formData.marketingCollateral || ''}
                onChange={handleChange}
                className={errors.marketingCollateral ? 'error' : ''}
              >
                <option value="">Select an answer</option>
                <option value="done">Done</option>
                <option value="will_do">Will do</option>
                <option value="on_it">On it</option>
                <option value="no_images">I do not have any images</option>
              </select>
              {errors.marketingCollateral && <span className="error-message">{errors.marketingCollateral}</span>}
              <p className="field-required">This question is required.</p>
            </div>

            <div className="form-group">
              <label htmlFor="creativeDirection">Do you have any specific creative direction or brand guidelines you'd like us to follow for the ads, or would you prefer to give us full creative control?</label>
              <textarea
                id="creativeDirection"
                name="creativeDirection"
                value={formData.creativeDirection || ''}
                onChange={handleChange}
                className={errors.creativeDirection ? 'error' : ''}
                placeholder="E.g., themes, styles, copy or concepts you'd like us to focus on"
                rows="4"
              ></textarea>
              {errors.creativeDirection && <span className="error-message">{errors.creativeDirection}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="campaignTiming">When would you like to commence your the campaign and how long would you like it to run for?</label>
              <input
                type="text"
                id="campaignTiming"
                name="campaignTiming"
                value={formData.campaignTiming || ''}
                onChange={handleChange}
                className={errors.campaignTiming ? 'error' : ''}
              />
              {errors.campaignTiming && <span className="error-message">{errors.campaignTiming}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="monthlyBudget">What would is the initial monthly ad spend budget?</label>
              <input
                type="number"
                id="monthlyBudget"
                name="monthlyBudget"
                value={formData.monthlyBudget || ''}
                onChange={handleChange}
                className={errors.monthlyBudget ? 'error' : ''}
                min="0"
                step="100"
              />
              {errors.monthlyBudget && <span className="error-message">{errors.monthlyBudget}</span>}
            </div>
          </div>
        )}

        {/* Page 3 - Campaign Details */}
        {currentPage === 3 && (
          <div className="form-page">
            <div className="form-group">
              <label htmlFor="primaryOffer">What is your primary offer/promotion, and relevant 'Call to Action' statements applicable to your business?</label>
              <textarea
                id="primaryOffer"
                name="primaryOffer"
                value={formData.primaryOffer || ''}
                onChange={handleChange}
                className={errors.primaryOffer ? 'error' : ''}
                rows="4"
              ></textarea>
              {errors.primaryOffer && <span className="error-message">{errors.primaryOffer}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="intendedUrl">What is the intended URL for Ads traffic</label>
              <input
                type="url"
                id="intendedUrl"
                name="intendedUrl"
                value={formData.intendedUrl || ''}
                onChange={handleChange}
                className={errors.intendedUrl ? 'error' : ''}
                placeholder="i.e Website homepage, or Dedicated Landing page"
              />
              {errors.intendedUrl && <span className="error-message">{errors.intendedUrl}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="targetLocations">What are the desired locations you wish to target with this campaign?</label>
              <textarea
                id="targetLocations"
                name="targetLocations"
                value={formData.targetLocations || ''}
                onChange={handleChange}
                className={errors.targetLocations ? 'error' : ''}
                rows="3"
              ></textarea>
              {errors.targetLocations && <span className="error-message">{errors.targetLocations}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="targetAudience">Who are you looking to target with your Ads. Please tell us about your typical customer.</label>
              <textarea
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience || ''}
                onChange={handleChange}
                className={errors.targetAudience ? 'error' : ''}
                placeholder="What is their age-range, hobbies, interests."
                rows="4"
              ></textarea>
              {errors.targetAudience && <span className="error-message">{errors.targetAudience}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="customerList">To help us create accurate & smart audiences for our campaigns, it will be very beneficial if you could send us a list of all customers of all time</label>
              <div className="file-upload-container">
                <label className="file-upload-label">
                  <input
                    type="file"
                    id="customerList"
                    name="customerList"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handleChange({
                        target: {
                          name: 'customerList',
                          value: file
                        }
                      });
                    }}
                    className={errors.customerList ? 'error' : ''}
                  />
                  <div className="file-upload-area">
                    <span>Drag and drop file here or click to upload</span>
                    {formData.customerList && <p>Selected file: {formData.customerList.name}</p>}
                  </div>
                </label>
              </div>
              {errors.customerList && <span className="error-message">{errors.customerList}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mainServices">What are the main services/products that you would like to target with your Ads campaign?</label>
              <textarea
                id="mainServices"
                name="mainServices"
                value={formData.mainServices || ''}
                onChange={handleChange}
                className={errors.mainServices ? 'error' : ''}
                rows="3"
              ></textarea>
              {errors.mainServices && <span className="error-message">{errors.mainServices}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="usp">What is your unique selling proposition (USP)? What benefits or value do you offer your clients compared to your competition?</label>
              <textarea
                id="usp"
                name="usp"
                value={formData.usp || ''}
                onChange={handleChange}
                className={errors.usp ? 'error' : ''}
                rows="4"
              ></textarea>
              {errors.usp && <span className="error-message">{errors.usp}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="copyPreferences">Do you have any preferences for copy writing on your ads?</label>
              <textarea
                id="copyPreferences"
                name="copyPreferences"
                value={formData.copyPreferences || ''}
                onChange={handleChange}
                className={errors.copyPreferences ? 'error' : ''}
                rows="3"
              ></textarea>
              {errors.copyPreferences && <span className="error-message">{errors.copyPreferences}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mainCompetitor">Who is your main competitor or the market leader in your space?</label>
              <input
                type="text"
                id="mainCompetitor"
                name="mainCompetitor"
                value={formData.mainCompetitor || ''}
                onChange={handleChange}
                className={errors.mainCompetitor ? 'error' : ''}
              />
              {errors.mainCompetitor && <span className="error-message">{errors.mainCompetitor}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="agreementConfirmation">Please tick to confirm you have read & completed the Online Projects Digital Advertising Agreement that was emailed to you.</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="agreementConfirmation"
                    value="yes"
                    checked={formData.agreementConfirmation === 'yes'}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="agreementConfirmation"
                    value="no"
                    checked={formData.agreementConfirmation === 'no'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
              {errors.agreementConfirmation && <span className="error-message">{errors.agreementConfirmation}</span>}
              <p className="field-required">This question is required.</p>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="form-pagination">
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="pagination-controls">
            {currentPage > 1 && (
              <button type="button" className="pagination-button" onClick={prevPage}>
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button type="button" className="pagination-button" onClick={nextPage}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPCForm;
