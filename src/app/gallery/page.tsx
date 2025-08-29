import Footer from "../../components/Footer";
import Image from "next/image";
import { FocusCards } from "../../components/ui/focus-cards";
import { GalleryContent } from "../../constants";

// Create cards data for focus cards with expandable behavior
const createFocusCards = () => {
  return GalleryContent.categories
    .filter(category => category !== "All") // Exclude "All" category
    .map(category => {
      const categoryData = GalleryContent.categoryGalleries[category as keyof typeof GalleryContent.categoryGalleries];
      if (!categoryData || !categoryData.images.length) return null;

      const firstImage = categoryData.images[0];

      return {
        title: categoryData.title,
        src: firstImage.src,
        description: category,
        categoryDescription: categoryData.description,
        images: categoryData.images,
      };
    })
    .filter((card): card is NonNullable<typeof card> => card !== null); // Remove null entries with proper typing
};

export default function GalleryPage() {
  const focusCards = createFocusCards();

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">{GalleryContent.title}</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {GalleryContent.subtitle}
          </p>  
        </div>

        {/* Focus Cards with Expandable Behavior */}
        <div className="mb-16">
          <FocusCards cards={focusCards} />
        </div>

        {/* Farm Story Section */}
        <section className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">{GalleryContent.behindTheScenes.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{GalleryContent.behindTheScenes.subtitle}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {GalleryContent.behindTheScenes.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {GalleryContent.behindTheScenes.descriptionContinued}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/images/gallary/layer_site.jpeg"
                alt="Farm operations"
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
              <Image
                src="/images/gallary/new_house_prep.jpeg"
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
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{GalleryContent.visitInvitation.title}</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            {GalleryContent.visitInvitation.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?type=farm-tour" className="btn-primary inline-block text-center">
              Schedule a Farm Tour
            </a>
            <a href="/contact" className="btn-secondary inline-block text-center">
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
