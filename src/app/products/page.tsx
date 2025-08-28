import { AnimatedChicken } from "@/models";
import { Footer, ModelDisplay, Navbar, ProductCard } from "../../components";
import { OurProductsContent } from "../../constants";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <>
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          
          
          <h1 className="text-5xl font-bold mb-6 text-gray-900">{OurProductsContent.title}</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {OurProductsContent.categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                category.active
                  ? "bg-accent-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
        <section className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Why Choose Our Products?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {OurProductsContent.features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Order Information */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Order?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your requirements, get pricing information, or place an order. 
            We're here to help you find the perfect poultry solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" className="btn-primary">
              Contact Us
            </button>
            <button type="button" className="btn-secondary">
              Download Price List
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
