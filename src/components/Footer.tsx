"use client";

import { useState } from "react";
import Image from "next/image";
import { FooterContent } from "../constants";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: email,
          message: `🎉 NEWSLETTER SUBSCRIPTION ALERT! 🎉

A visitor has expressed interest in subscribing to your newsletter!

EMAIL: ${email}

📈 BENEFITS OF CUSTOMER ENGAGEMENT:
• Build long-term relationships with your customers
• Keep customers informed about new products and updates
• Increase customer loyalty and repeat business
• Direct communication channel for promotions and offers
• Valuable insights into customer preferences
• Higher customer lifetime value

This subscriber is interested in staying connected with Golden Nest Farm and receiving updates about your poultry products, farm news, and special offers. You do not have subscribers platform yet.

Don't miss this opportunity to nurture a potential long-term customer relationship!`,
          phone: ""
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container-width px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            
            <div className="space-y-3 text-gray-300">
              <p>{FooterContent.company.tagline}</p>
              <p>{FooterContent.contact.location}</p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${FooterContent.contact.phone}`} className="hover:text-primary-400 transition-colors">
                  {FooterContent.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${FooterContent.contact.email}`} className="hover:text-primary-400 transition-colors">
                  {FooterContent.contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe for the latest updates from our farm.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 px-6 py-3 rounded-lg text-white font-medium transition-colors hover:scale-105 transform disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>
            )}
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <p className="text-gray-300 mb-6">
              Connect with us on social media for farm updates and behind-the-scenes content.
            </p>
            <div className="flex gap-4">
              {FooterContent.social.map((social) => (
                <button
                  key={social.platform}
                  type="button"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors hover:scale-110 transform"
                  aria-label={social.platform}
                >
                  <span className="text-xl">
                    {social.platform === 'Facebook' ? '📘' : 
                     social.platform === 'Instagram' ? '📷' : '🐦'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {FooterContent.company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
