"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // In a real app, this would send the email to your backend
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container-width px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-accent-400">Golden Nest Poultry</h3>
            <div className="space-y-3 text-gray-300">
              <p>Golden Nest Poultry Farm</p>
              <p>Gauteng, South Africa</p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+27123456789" className="hover:text-accent-400 transition-colors">
                  +27 12 345 6789
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@goldennestpoultry.co.za" className="hover:text-accent-400 transition-colors">
                  info@goldennestpoultry.co.za
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
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
              <button
                type="submit"
                className="bg-accent-600 hover:bg-accent-700 px-6 py-3 rounded-lg text-white font-medium transition-colors hover:scale-105 transform"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>
            )}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <p className="text-gray-300 mb-6">
              Connect with us on social media for farm updates and behind-the-scenes content.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent-600 transition-colors hover:scale-110 transform"
                aria-label="Facebook"
              >
                <span className="text-xl">📘</span>
              </button>
              <button
                type="button"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent-600 transition-colors hover:scale-110 transform"
                aria-label="Instagram"
              >
                <span className="text-xl">📷</span>
              </button>
              <button
                type="button"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent-600 transition-colors hover:scale-110 transform"
                aria-label="Twitter"
              >
                <span className="text-xl">🐦</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Golden Nest Poultry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
