import { Footer, Hero, Highlights, Navbar, ProductCard } from "../components";
import { OurProductsContent, WhatCustomersSayContent } from "../constants";

export default function HomePage() {
  return (
    <>
      
      <main>
        <Hero />
        <Highlights />

        {/* Products Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">{OurProductsContent.title}</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                {OurProductsContent.description}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
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
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">{WhatCustomersSayContent.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {WhatCustomersSayContent.testimonials.slice(0, 2).map((testimonial) => (
                <div key={`${testimonial.author}-${testimonial.location}`} className="p-8 bg-primary-50 rounded-2xl shadow-md">
                  <p className="text-lg text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-semibold text-primary-700">— {testimonial.author}, {testimonial.location}</p>
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
