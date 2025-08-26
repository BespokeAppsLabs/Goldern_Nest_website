import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FarmModelDisplay from "../components/FarmModel";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Our Story</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Golden Nest Poultry began with a vision to provide families and businesses with poultry products that are both fresh and trustworthy. With years of dedication, we have grown into a name customers rely on.
          </p>
        </div>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-primary-700">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To deliver safe, nutritious poultry products while upholding ethical farming practices and maintaining the highest standards of quality and animal welfare.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-accent-700">Our Values</h2>
            <ul className="text-lg text-gray-700 leading-relaxed space-y-2">
              <li>• <strong>Integrity:</strong> Honest and transparent in all our dealings</li>
              <li>• <strong>Quality:</strong> Uncompromising standards in every product</li>
              <li>• <strong>Sustainability:</strong> Environmentally responsible farming practices</li>
              <li>• <strong>Care:</strong> Compassionate treatment of our poultry</li>
            </ul>
          </div>
        </section>

        {/* 3D Farm Model Showcase */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Farm in 3D</h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            Take an interactive tour of our modern farming facilities. This 3D model showcases our commitment to technology and quality infrastructure.
          </p>
          <div className="max-w-4xl mx-auto">
            <FarmModelDisplay />
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Journey</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2015
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Founded as a Small Family Farm</h3>
                <p className="text-gray-700">Started with just 50 chickens and a dream to provide fresh, quality poultry products to our local community.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2018
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Expanded into Wholesale Egg Supply</h3>
                <p className="text-gray-700">Grew our operations to supply fresh eggs to local retailers and restaurants, maintaining our commitment to quality.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2021
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Introduced Modern Facilities and Certifications</h3>
                <p className="text-gray-700">Invested in state-of-the-art facilities and obtained industry certifications to ensure the highest standards of safety and quality.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2024
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Leading Poultry Supplier in Gauteng</h3>
                <p className="text-gray-700">Now serving over 100 clients across Gauteng with daily production of 5000+ eggs and premium poultry products.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Team</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Our dedicated team of farming professionals ensures that every product meets our high standards of quality and safety.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <div className="w-24 h-24 bg-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👨‍🌾</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Farm Manager</h3>
              <p className="text-gray-600">Oversees all farming operations and ensures animal welfare standards</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <div className="w-24 h-24 bg-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👩‍🔬</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Control</h3>
              <p className="text-gray-600">Maintains strict quality standards and food safety protocols</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <div className="w-24 h-24 bg-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👨‍💼</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Operations</h3>
              <p className="text-gray-600">Manages logistics and customer relationships</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
