import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const certifications = [
  {
    id: "poultry-health",
    title: "Certified Poultry Health & Safety",
    description: "Our farm meets and exceeds all local and international poultry health standards.",
    icon: "🏥"
  },
  {
    id: "biosecurity",
    title: "Biosecurity Standards Compliant",
    description: "We maintain strict biosecurity protocols to prevent disease and ensure animal welfare.",
    icon: "🛡️"
  },
  {
    id: "retailers-trust",
    title: "Trusted by Retailers Across South Africa",
    description: "Over 100 retailers and restaurants trust us for consistent quality and reliable supply.",
    icon: "🤝"
  },
  {
    id: "iso-9001",
    title: "ISO 9001 Quality Management",
    description: "Our quality management system is certified to international standards.",
    icon: "📋"
  },
  {
    id: "haccp",
    title: "HACCP Food Safety Certified",
    description: "We follow Hazard Analysis and Critical Control Point principles for food safety.",
    icon: "🔒"
  },
  {
    id: "animal-welfare",
    title: "Animal Welfare Approved",
    description: "Our farming practices prioritize the health and well-being of our poultry.",
    icon: "❤️"
  }
];

const faqs = [
  {
    id: "organic-eggs",
    question: "Are your eggs organic?",
    answer: "Our eggs come from healthy hens fed on natural grain-based diets. While not certified organic, we use sustainable farming practices and avoid unnecessary chemicals."
  },
  {
    id: "delivery",
    question: "Do you deliver?",
    answer: "Yes, we deliver bulk orders to local retailers and distributors. We also offer pickup options for smaller orders at our farm location."
  },
  {
    id: "quality-checks",
    question: "What quality checks do you perform?",
    answer: "We conduct daily health checks, regular egg quality testing, and continuous monitoring of feed quality and environmental conditions."
  },
  {
    id: "free-range",
    question: "Are your chickens free-range?",
    answer: "Our chickens have access to both indoor and outdoor spaces, ensuring they can express natural behaviors while being protected from predators and extreme weather."
  },
  {
    id: "food-safety",
    question: "How do you ensure food safety?",
    answer: "We follow strict hygiene protocols, regular testing, and maintain detailed records of all processes from farm to delivery."
  },
  {
    id: "certifications",
    question: "What certifications do you hold?",
    answer: "We maintain multiple certifications including ISO 9001, HACCP, and local food safety standards. All certifications are regularly audited and renewed."
  }
];

export default function QualityPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Quality You Can Trust</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We follow rigorous quality checks and maintain industry certifications to keep our poultry safe and healthy. 
            Our commitment to excellence ensures that every product meets the highest standards.
          </p>
        </div>

        {/* Quality Counters */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-md">
              <div className="text-5xl font-bold text-accent-600 mb-2">10+</div>
              <p className="text-lg text-gray-700">Years Experience</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl shadow-md">
              <div className="text-5xl font-bold text-primary-600 mb-2">5000+</div>
              <p className="text-lg text-gray-700">Eggs Daily</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-md">
              <div className="text-5xl font-bold text-accent-600 mb-2">100+</div>
              <p className="text-lg text-gray-700">Happy Clients</p>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Certifications & Standards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{cert.title}</h3>
                <p className="text-gray-700 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Process */}
        <section className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Quality Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Selection</h3>
              <p className="text-gray-700">Careful selection of healthy breeding stock and quality feed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Monitoring</h3>
              <p className="text-gray-700">24/7 monitoring of health, environment, and feeding</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Testing</h3>
              <p className="text-gray-700">Regular testing for quality, safety, and nutritional content</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Delivery</h3>
              <p className="text-gray-700">Safe and timely delivery to maintain freshness</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Quality Commitment</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            We believe that quality is not just about meeting standards—it's about exceeding them. 
            Every day, we work to improve our processes and ensure that our customers receive the best 
            possible poultry products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" className="btn-primary">
              Download Quality Report
            </button>
            <button type="button" className="btn-secondary">
              Schedule Quality Audit
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
