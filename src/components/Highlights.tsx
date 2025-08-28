"use client";

import { FeatureContent } from "../constants";

export default function Highlights() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="grid md:grid-cols-3 gap-8">
          {FeatureContent.hero.highlights.map((item) => (
            <div
              key={item.title}
              className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-700 group-hover:text-primary-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
