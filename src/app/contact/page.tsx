"use client";

import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { ContactContent } from "../../constants";

export default function ContactPage() {
  const [isFarmTour, setIsFarmTour] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    // Farm tour specific fields
    preferredDate: "",
    groupSize: "",
    visitPurpose: "",
    specialRequirements: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if this is a farm tour request from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    setIsFarmTour(type === 'farm-tour');
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: isFarmTour ? 'farm-tour' : 'contact'
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        phone: "",
        preferredDate: "",
        groupSize: "",
        visitPurpose: "",
        specialRequirements: ""
      });
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900">{ContactContent.title}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            {ContactContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-gray-900">
              {isFarmTour ? "Schedule Your Farm Tour" : "Send us a Message"}
            </h2>
            {isSubmitted ? (
              <div className="p-4 md:p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">✅</div>
                <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-2">
                  {isFarmTour ? "Farm Tour Request Sent Successfully!" : "Message Sent Successfully!"}
                </h3>
                <p className="text-green-700 text-sm md:text-base">
                  {isFarmTour
                    ? "Thank you for your interest in visiting our farm! We'll contact you within 24 hours to confirm your tour details."
                    : "Thank you for contacting us. We'll get back to you within 24 hours."
                  }
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>

                {isFarmTour && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Tour Date *
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required={isFarmTour}
                          className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">
                          Group Size *
                        </label>
                        <select
                          id="groupSize"
                          name="groupSize"
                          value={formData.groupSize}
                          onChange={handleChange}
                          required={isFarmTour}
                          className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Select group size</option>
                          <option value="1-5">1-5 people</option>
                          <option value="6-15">6-15 people</option>
                          <option value="16-30">16-30 people</option>
                          <option value="30+">More than 30 people</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="visitPurpose" className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose of Visit *
                      </label>
                      <select
                        id="visitPurpose"
                        name="visitPurpose"
                        value={formData.visitPurpose}
                        onChange={handleChange}
                        required={isFarmTour}
                        className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select purpose</option>
                        <option value="educational">Educational Visit (School/University)</option>
                        <option value="business">Business Partnership</option>
                        <option value="personal">Personal Interest</option>
                        <option value="media">Media/Photography</option>
                        <option value="research">Research Project</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requirements or Dietary Restrictions
                      </label>
                      <textarea
                        id="specialRequirements"
                        name="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="Any special accommodations needed, accessibility requirements, or dietary restrictions for your group"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {isFarmTour ? "Additional Message" : "Message *"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required={!isFarmTour}
                    rows={4}
                    className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                    placeholder={
                      isFarmTour
                        ? "Any additional information about your visit or questions you have"
                        : "Tell us about your inquiry, order, or partnership request"
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 md:py-4 text-base md:text-lg min-h-[48px] touch-manipulation"
                >
                  {isLoading ? 'Sending...' : (isFarmTour ? 'Schedule Tour' : 'Send Message')}
                </button>

                {error && <p className="text-red-500 mt-3 md:mt-4 text-sm md:text-base">{error}</p>}
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Contact Information</h2>
            <div className="space-y-4 md:space-y-6">
              <div className="p-4 md:p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl">
                <a
                  href="https://www.google.com/maps/place/24%C2%B043'43.2%22S+28%C2%B025'50.8%22E/@-24.7286667,28.4282029,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-24.7286667!4d28.4307778?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 md:gap-4 group cursor-pointer hover:bg-primary-100/50 transition-colors duration-200 rounded-lg p-2 -m-2"
                >
                  <div className="text-xl md:text-2xl">📍</div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 group-hover:text-primary-700 transition-colors">Farm Location</h3>
                    <p className="text-sm md:text-base text-gray-700 group-hover:text-gray-800 transition-colors">{ContactContent.contactInfo.location}</p>
                    <p className="text-xs text-primary-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to view on Google Maps ↗</p>
                  </div>
                </a>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="text-xl md:text-2xl">📞</div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Phone</h3>
                    {ContactContent.contactInfo.phone.map((phone) => (
                      <div key={phone}>
                        <a href={`tel:${phone}`} className="text-primary-600 hover:text-primary-700 font-medium text-sm md:text-base">
                          {phone}
                        </a>
                      </div>
                    ))}
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Available Mon-Fri, 8AM-6PM</p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="text-xl md:text-2xl">✉️</div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Email</h3>
                    <a href={`mailto:${ContactContent.contactInfo.email}`} className="text-primary-600 hover:text-primary-700 font-medium text-sm md:text-base break-all">
                      {ContactContent.contactInfo.email}
                    </a>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="text-xl md:text-2xl">🕒</div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Business Hours</h3>
                    <div className="text-sm md:text-base text-gray-700 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {/* <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-900">Find Us</h2>
          <div className="bg-gray-100 rounded-2xl p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="text-center">
                <div className="text-3xl md:text-4xl mb-2">🗺️</div>
                <p className="text-gray-600 mb-2 text-sm md:text-base">Interactive Map Coming Soon</p>
                <p className="text-xs md:text-sm text-gray-500">We're working on integrating Google Maps</p>
              </div>
              <div className="flex justify-center">
                <ModelDisplay className="w-full h-[200px]" scale={0.4}>
                  <JumpingChick />
                </ModelDisplay>
              </div>
            </div>
            <p className="text-gray-600 text-center mt-4 text-sm md:text-base">Find us easily with our detailed directions and map integration.</p>
          </div>
        </section> */}

        {/* Additional Contact Options */}
        {/* <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-gray-900">
            {isFarmTour ? "Tour Information" : "Other Ways to Connect"}
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto px-4 md:px-0">
            {isFarmTour
              ? "Our farm tours typically last 2-3 hours and include visits to our chicken coops, feeding demonstrations, egg collection areas, and sustainable farming facilities. Tours are available Monday through Saturday, 9 AM to 3 PM."
              : "Prefer to reach out through other channels? We're available on social media and welcome farm visits by appointment."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 md:px-0">
            {!isFarmTour && (
              <a href="/contact?type=farm-tour" className="btn-secondary py-3 md:py-4 px-6 md:px-8 text-sm md:text-base min-h-[48px] touch-manipulation inline-block text-center">
                Schedule a Farm Tour
              </a>
            )}
            <button type="button" className="btn-primary py-3 md:py-4 px-6 md:px-8 text-sm md:text-base min-h-[48px] touch-manipulation">
              Follow Us on Social Media
            </button>
          </div>
        </section> */}
      </main>
      <Footer />
    </>
  );
}
