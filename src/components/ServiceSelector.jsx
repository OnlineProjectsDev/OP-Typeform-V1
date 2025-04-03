import React from 'react';

const ServiceSelector = ({ onSelectService, currentService }) => {
  const services = [
    { id: 'seo', label: 'SEO Services', description: 'Improve your website visibility in search engines' },
    { id: 'ppc', label: 'PPC Campaign', description: 'Drive targeted traffic with paid advertising' },
    { id: 'web', label: 'Website Build', description: 'Create a new website or redesign your existing one' }
  ];

  return (
    <div className="service-selector">
      <h2>What service are you interested in?</h2>
      <div className="service-options">
        {services.map((service) => (
          <button 
            key={service.id}
            type="button"
            className={`custom-service-card ${currentService === service.id ? 'custom-selected' : ''}`}
            onClick={() => {
              // Toggle selection
              if (currentService === service.id) {
                onSelectService(null);
              } else {
                onSelectService(service.id);
              }
            }}
          >
            <div className="service-card-content">
              <h3>{service.label}</h3>
              <p>{service.description}</p>
            </div>
            
            {currentService === service.id && (
              <div className="service-selected-indicator">
                <span>✓</span>
                <small>Click to deselect</small>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;
