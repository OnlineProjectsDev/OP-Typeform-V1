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
          <div 
            key={service.id}
            className={`service-card ${currentService === service.id ? 'selected' : ''}`}
            onClick={() => onSelectService(service.id)}
          >
            <h3>{service.label}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;
