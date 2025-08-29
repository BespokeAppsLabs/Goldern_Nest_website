import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { ModelDisplay } from "../../components/ModelDisplay";
import { StaticChicken } from "../../models";
import { QualityContent } from "../../constants";
import Image from "next/image";

export default function QualityPage() {
  return (
    <>
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900">{QualityContent.title}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            {QualityContent.description}
          </p>
        </div>

        {/* Quality Counters */}
        <section className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center">
            {QualityContent.stats.map((stat) => (
              <div key={stat.label} className="p-6 md:p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-md">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <p className="text-base md:text-lg text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

      

        {/* Certifications Grid */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-900">Our Certifications & Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {QualityContent.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 md:p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-2xl md:text-4xl mb-3 md:mb-4">{cert.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-900">{cert.title}</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Process */}
        <section className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 md:p-12 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-900">Our Quality Process</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
            {QualityContent.process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg md:text-2xl font-bold mx-auto mb-3 md:mb-4">{step.step}</div>
                <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-gray-900">{step.title}</h3>
                <p className="text-xs md:text-sm text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-3 md:space-y-4">
            {QualityContent.faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-gray-900">Our Quality Commitment</h2>
          <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto px-4 md:px-0">
            We believe that quality is not just about meeting standards—it's about exceeding them.
            Every day, we work to improve our processes and ensure that our customers receive the best
            possible poultry products.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 md:px-0">
            <button type="button" className="btn-primary py-3 md:py-4 px-6 md:px-8 text-sm md:text-base min-h-[48px] touch-manipulation">
              Download Quality Report
            </button>
            <button type="button" className="btn-secondary py-3 md:py-4 px-6 md:px-8 text-sm md:text-base min-h-[48px] touch-manipulation">
              Schedule Quality Audit
            </button>
          </div> */}
        </section>
      </main>
      <Footer />
    </>
  );
}
