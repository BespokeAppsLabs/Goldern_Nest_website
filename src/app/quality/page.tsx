import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { ModelDisplay } from "../../components/ModelDisplay";
import { StaticChicken } from "../../models";
import { QualityContent } from "../../constants";
import Image from "next/image";

export default function QualityPage() {
  return (
    <>
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          
          
          <h1 className="text-5xl font-bold mb-6 text-gray-900">{QualityContent.title}</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {QualityContent.description}
          </p>
        </div>

        {/* Quality Counters */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {QualityContent.stats.map((stat) => (
              <div key={stat.label} className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-md">
                <div className="text-5xl font-bold text-accent-600 mb-2">{stat.number}</div>
                <p className="text-lg text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Model Showcase */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Commitment to Excellence</h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            Every chicken represents our dedication to quality and care. This 3D model showcases the healthy, well-maintained poultry that produce our premium products.
          </p>
          <div className="max-w-md mx-auto">
            <ModelDisplay className="w-full h-[250px]" scale={0.35}>
              <StaticChicken />
            </ModelDisplay>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Certifications & Standards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QualityContent.certifications.map((cert) => (
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
            {QualityContent.process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{step.step}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {QualityContent.faqs.map((faq) => (
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
