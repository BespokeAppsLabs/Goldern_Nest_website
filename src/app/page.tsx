import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

const products = [
  {
    title: "Fresh Eggs",
    description: "Large, medium, and small eggs packed with nutrition.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop",
    price: "R45/dozen"
  },
  {
    title: "Broiler Chickens",
    description: "Healthy and well-fed chickens, ideal for commercial and home use.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    price: "R120/kg"
  },
  {
    title: "Layer Chickens",
    description: "Strong layers producing high-quality eggs consistently.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    price: "R180 each"
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Highlights />

        {/* Products Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Products</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Discover our range of poultry products tailored to meet your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-primary-50 rounded-2xl shadow-md">
                <p className="text-lg text-gray-700 mb-4 italic">
                  "Golden Nest's eggs are always fresh and tasty. My family loves them!"
                </p>
                <p className="font-semibold text-primary-700">— Customer, Pretoria</p>
              </div>
              <div className="p-8 bg-primary-50 rounded-2xl shadow-md">
                <p className="text-lg text-gray-700 mb-4 italic">
                  "The quality is unmatched, and delivery is always reliable."
                </p>
                <p className="font-semibold text-primary-700">— Retailer, Johannesburg</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
