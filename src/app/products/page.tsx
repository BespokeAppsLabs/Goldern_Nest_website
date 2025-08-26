import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ChickModelDisplay from "../components/ChickModel";

const products = [
  {
    title: "Fresh Eggs",
    description: "Large, medium, and small eggs packed with nutrition. Our hens are fed a natural grain-based diet, ensuring rich, flavorful eggs with bright orange yolks. Available in various sizes and quantities.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop",
    price: "R45/dozen"
  },
  {
    title: "Broiler Chickens",
    description: "Healthy and well-fed chickens, ideal for commercial and home use. Raised with care and fed premium feed for optimal growth and taste. Available in various weights and processing options.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    price: "R120/kg"
  },
  {
    title: "Layer Chickens",
    description: "Strong layers producing high-quality eggs consistently. These hens are specifically bred and raised for egg production, ensuring reliable daily egg output for your business needs.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    price: "R180 each"
  },
  {
    title: "Organic Eggs",
    description: "Premium organic eggs from free-range hens. These eggs come from chickens that roam freely and are fed certified organic feed, resulting in superior taste and nutritional value.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop&sat=-50",
    price: "R65/dozen"
  },
  {
    title: "Day-Old Chicks",
    description: "Healthy day-old chicks for those looking to start their own poultry operation. We provide both broiler and layer chicks, all vaccinated and ready for your farm.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&sat=-30",
    price: "R25 each"
  },
  {
    title: "Bulk Orders",
    description: "Special pricing for bulk orders and wholesale customers. We offer competitive rates for restaurants, retailers, and distributors looking for consistent supply.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&sat=-20",
    price: "Contact us"
  },
];

const categories = [
  { name: "All Products", active: true },
  { name: "Eggs", active: false },
  { name: "Chickens", active: false },
  { name: "Bulk Orders", active: false },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Our Products</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From eggs to live chickens, we supply premium poultry products for homes, retailers, and businesses. 
            Each product is carefully selected and processed to meet our high standards of quality and safety.
          </p>
        </div>

        {/* 3D Chick Model Showcase */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Healthy Chicks in 3D</h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            Explore our healthy chicks in interactive 3D. Each chick represents our commitment to excellence and natural farming practices.
          </p>
          <div className="max-w-2xl mx-auto">
            <ChickModelDisplay />
          </div>
        </section>

        {/* Product Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
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
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>

        {/* Product Features */}
        <section className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Why Choose Our Products?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Premium Quality</h3>
              <p className="text-gray-700">Every product meets our strict quality standards and undergoes thorough inspection.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Reliable Delivery</h3>
              <p className="text-gray-700">Consistent delivery schedules to ensure your business never runs out of stock.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Sustainable Farming</h3>
              <p className="text-gray-700">Environmentally responsible practices that protect our planet for future generations.</p>
            </div>
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
