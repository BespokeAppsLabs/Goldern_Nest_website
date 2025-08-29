import { AnimatedRooster } from "@/models";
import { Footer, ModelDisplay, Navbar } from "../../components";
import { AboutContent } from "../../constants";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900">{AboutContent.title}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            {AboutContent.story}
          </p>
        </div>

        {/* Mission & Values */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="p-6 md:p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-primary-700">Our Mission</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {AboutContent.mission}
            </p>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-primary-700">Our Values</h2>
            <ul className="text-base md:text-lg text-gray-700 leading-relaxed space-y-2">
              {AboutContent.values.map((value) => (
                <li key={value.title}>• <strong>{value.title}:</strong> {value.description}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3D Farm Model Showcase
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Farm in 3D</h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            Take an interactive tour of our modern farming facilities. This 3D model showcases our commitment to technology and quality infrastructure.
          </p>
          <div className="max-w-4xl mx-auto">
            <ModelDisplay className="w-full h-[300px] mb-8" scale={0.3}>
              <AnimatedRooster currentAnimation="idle" />
            </ModelDisplay>
          </div>
        </section> */}

        {/* Journey Timeline */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-900">Our Journey</h2>
          <div className="space-y-6 md:space-y-8">
            {AboutContent.journey.map((milestone) => (
              <div key={milestone.year} className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-base md:text-xl font-bold">
                  {milestone.year}
                </div>
                <div className="pt-1 md:pt-2">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900">{milestone.title}</h3>
                  <p className="text-sm md:text-base text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Our Team</h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-6 md:mb-8 px-4 md:px-0">
            Our dedicated team of farming professionals ensures that every product meets our high standards of quality and safety.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {AboutContent.team.map((member) => (
              <div key={member.role} className="p-4 md:p-6 bg-white rounded-2xl shadow-md">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-primary-200 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center text-xl md:text-3xl">
                  <member.icon className="w-8 h-8 md:w-12 md:h-12" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900">{member.role}</h3>
                <p className="text-sm md:text-base text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
