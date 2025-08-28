"use client";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { ModelDisplay } from "../../components/ModelDisplay";
import { JumpingChick } from "../../models";
import { ContactContent } from "../../constants";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "", phone: "" });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          
          
          <h1 className="text-5xl font-bold mb-6 text-gray-900">{ContactContent.title}</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {ContactContent.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a Message</h2>
            {isSubmitted ? (
              <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700">Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your inquiry, order, or partnership request"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-4 text-lg"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>

                {error && <p className="text-red-500 mt-4">{error}</p>}
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Contact Information</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Farm Location</h3>
                    <p className="text-gray-700">{ContactContent.contactInfo.location}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                    {ContactContent.contactInfo.phone.map((phone) => (
                      <div key={phone}>
                        <a href={`tel:${phone}`} className="text-accent-600 hover:text-accent-700 font-medium">
                          {phone}
                        </a>
                      </div>
                    ))}
                    <p className="text-sm text-gray-600 mt-1">Available Mon-Fri, 8AM-6PM</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <a href={`mailto:${ContactContent.contactInfo.email}`} className="text-accent-600 hover:text-accent-700 font-medium">
                      {ContactContent.contactInfo.email}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-700">Saturday: 9:00 AM - 2:00 PM</p>
                    <p className="text-gray-700">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Find Us</h2>
          <div className="bg-gray-100 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-gray-600 mb-2">Interactive Map Coming Soon</p>
                <p className="text-sm text-gray-500">We're working on integrating Google Maps</p>
              </div>
              {/* <div className="flex justify-center">
                <ModelDisplay className="w-full h-[200px]" scale={0.4}>
                  <JumpingChick />
                </ModelDisplay>
              </div> */}
            </div>
            <p className="text-gray-600 text-center mt-4">Find us easily with our detailed directions and map integration.</p>
          </div>
        </section>

        {/* Additional Contact Options */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Other Ways to Connect</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Prefer to reach out through other channels? We're available on social media and welcome
            farm visits by appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" className="btn-secondary">
              Schedule a Farm Tour
            </button>
            <button type="button" className="btn-primary">
              Follow Us on Social Media
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
