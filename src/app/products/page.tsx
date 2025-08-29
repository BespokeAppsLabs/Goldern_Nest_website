"use client";

import { Footer, ProductCard } from "../../components";
import { OurProductsContent } from "../../constants";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function ProductsPage() {
  const router = useRouter();

  const handleDownloadPriceList = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/Brown Chicken Restaurant Redraw.pdf';
    link.download = 'Brown Chicken Restaurant Redraw.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleContactUs = useCallback(() => {
    router.push('/contact');
  }, [router]);
  return (
    <>
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900">{OurProductsContent.title}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            {OurProductsContent.description}
          </p>
        </div>

        {/* 3D Chick Model Showcase
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Healthy Chicks in 3D</h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            Explore our healthy chicks in interactive 3D. Each chick represents our commitment to excellence and natural farming practices.
          </p>
          <div className="max-w-2xl mx-auto">
            <ModelDisplay className="w-full h-[300px] mb-8" scale={0.4}>
              <AnimatedChicken currentAnimation="walk" />
            </ModelDisplay>
          </div>
        </section> */}

        {/* Product Categories */}
        {/* <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4 md:px-0">
          {OurProductsContent.categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base min-h-[40px] touch-manipulation ${
                category.active
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div> */}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {OurProductsContent.products.map((product) => (
            <ProductCard 
              key={product.name}
              title={product.name}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>

        {/* Product Features */}
        <section className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 md:p-12 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-900">Why Choose Our Products?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {OurProductsContent.features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg md:text-2xl mx-auto mb-3 md:mb-4">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Order Information */}
        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-gray-900">Ready to Order?</h2>
          <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto px-4 md:px-0">
            Contact us to discuss your requirements, get pricing information, or place an order.
            We're here to help you find the perfect poultry solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 md:px-0">
            <button
              type="button"
              onClick={handleContactUs}
              className="btn-primary py-3 md:py-4 px-6 md:px-8 text-sm md:text-base min-h-[48px] touch-manipulation"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={handleDownloadPriceList}
              className="btn-secondary py-3 md:py-4 px-6 md:px-8 text-sm md:text-base min-h-[48px] touch-manipulation"
            >
              Download Price List
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
