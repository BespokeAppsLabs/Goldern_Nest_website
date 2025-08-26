import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const galleryImages = [
  {
    id: "farm-life-1",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    alt: "Our poultry enjoying open-air spaces",
    category: "Farm Life"
  },
  {
    id: "animal-welfare-1",
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    alt: "Healthy chickens in a safe environment",
    category: "Animal Welfare"
  },
  {
    id: "products-1",
    src: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=400&fit=crop",
    alt: "Fresh eggs ready for collection",
    category: "Products"
  },
  {
    id: "infrastructure-1",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&sat=-20",
    alt: "Modern farming facilities",
    category: "Infrastructure"
  },
  {
    id: "quality-1",
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&sat=-30",
    alt: "Quality control processes",
    category: "Quality"
  },
  {
    id: "operations-1",
    src: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=400&fit=crop&sat=-40",
    alt: "Packing facility ensuring quality control",
    category: "Operations"
  },
  {
    id: "team-1",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&sat=-50",
    alt: "Farm team at work",
    category: "Team"
  },
  {
    id: "sustainability-1",
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&sat=-60",
    alt: "Sustainable farming practices",
    category: "Sustainability"
  },
  {
    id: "service-1",
    src: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=400&fit=crop&sat=-70",
    alt: "Customer satisfaction",
    category: "Service"
  }
];

const categories = ["All", "Farm Life", "Animal Welfare", "Products", "Infrastructure", "Quality", "Operations", "Team", "Sustainability", "Service"];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Farm Life in Pictures</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Take a closer look at our farm, facilities, and poultry. These images showcase our commitment to quality, 
            animal welfare, and sustainable farming practices.
          </p>
        </div>

        {/* Gallery Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                category === "All"
                  ? "bg-accent-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium text-accent-300 mb-1">{image.category}</p>
                <p className="text-sm">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Farm Story Section */}
        <section className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Behind the Scenes</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Daily Operations</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Every day, our dedicated team works tirelessly to ensure the highest standards of care for our poultry. 
                From feeding and health monitoring to facility maintenance and quality control, we maintain rigorous 
                protocols that exceed industry standards.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our farm operates 24/7 to provide consistent, reliable service to our customers. We believe that 
                transparency in our operations builds trust, which is why we're proud to share these glimpses into 
                our daily farm life.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
                alt="Farm operations"
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
                alt="Quality control"
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Visit Invitation */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Want to See More?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            We welcome visitors to our farm to see our operations firsthand. Schedule a tour to learn more about 
            our farming practices and see our facilities in person.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" className="btn-primary">
              Schedule a Farm Tour
            </button>
            <button type="button" className="btn-secondary">
              Contact Us
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
