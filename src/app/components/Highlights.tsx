"use client";

const highlights = [
  {
    title: "Farm Fresh Eggs",
    text: "Nutritious and delicious eggs sourced directly from our farm.",
    icon: "🥚"
  },
  {
    title: "Healthy Chickens",
    text: "Well-cared for poultry raised with natural feed and proper welfare.",
    icon: "🐔"
  },
  {
    title: "Trusted Quality",
    text: "Certified processes ensuring safety and freshness every step of the way.",
    icon: "✨"
  },
];

export default function Highlights() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, _index) => (
            <div
              key={item.title}
              className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-700 group-hover:text-primary-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
