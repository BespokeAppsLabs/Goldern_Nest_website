import { Footer, Hero, Highlights, Navbar, ProductCard } from "../components";
import { OurProductsContent, WhatCustomersSayContent } from "../constants";

export default function HomePage() {
  return (
    <>
      
      <main>
        <Hero />
        <Highlights />

        {/* Products Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container-width px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">{OurProductsContent.title}</h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto px-4 md:px-0">
                {OurProductsContent.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {OurProductsContent.products.slice(0, 3).map((product) => (
                <ProductCard
                  key={product.name}
                  title={product.name}
                  description={product.description}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container-width px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">{WhatCustomersSayContent.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {WhatCustomersSayContent.testimonials.slice(0, 2).map((testimonial) => (
                <div key={`${testimonial.author}-${testimonial.location}`} className="p-6 md:p-8 bg-primary-50 rounded-2xl shadow-md">
                  <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-semibold text-primary-700 text-sm md:text-base">— {testimonial.author}, {testimonial.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
