import { useState } from "react";

export default function StepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    contactNumber: "",
    email: "",
    service: "",
    additionalInfo: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="w-full p-12">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Questionaire</h2>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 mb-4 border rounded-xl text-lg"
          />
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full p-3 mb-4 border rounded-xl text-lg"
          />
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full p-3 mb-4 border rounded-xl text-lg"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 mb-4 border rounded-xl text-lg"
          />
          <button onClick={nextStep} className="bg-blue-600 text-white py-3 px-6 rounded-xl text-lg">
            Next →
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">What service are you interested in?</h2>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-xl text-lg"
          >
            <option value="">Select a service</option>
            <option value="SEO">SEO</option>
            <option value="PPC">PPC</option>
            <option value="Web Development">Web Development</option>
          </select>
          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-400 text-white py-3 px-6 rounded-xl text-lg">
              ← Back
            </button>
            <button onClick={nextStep} className="bg-blue-600 text-white py-3 px-6 rounded-xl text-lg">
              Next →
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Tell us more about your needs</h2>
          {formData.service === "SEO" && (
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Keyword Focus / SEO Goals"
              className="w-full p-3 mb-4 border rounded-xl text-lg"
            />
          )}
          {formData.service === "PPC" && (
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Ad Budget / Target Audience"
              className="w-full p-3 mb-4 border rounded-xl text-lg"
            />
          )}
          {formData.service === "Web Development" && (
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Website Features / Platform Preference"
              className="w-full p-3 mb-4 border rounded-xl text-lg"
            />
          )}
          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-400 text-white py-3 px-6 rounded-xl text-lg">
              ← Back
            </button>
            <button className="bg-green-600 text-white py-3 px-6 rounded-xl text-lg">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
