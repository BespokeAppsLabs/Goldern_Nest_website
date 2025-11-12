# Implementation Guide – Golden Nest Poultry Website

This document provides detailed technical implementation instructions for building the site as defined in the PRD. It is meant for step-by-step execution by an AI or developer without assumptions.

---

## 1. Libraries and Dependencies

All dependencies should be installed via `package.json` and Yarn.

**Core Framework**
- [Next.js (TypeScript)](https://nextjs.org/docs): `"next": "latest"`, `"react": "latest"`, `"react-dom": "latest"`
- [TailwindCSS](https://tailwindcss.com/docs/installation): `"tailwindcss": "latest"`

**UI Components**
- [shadcn/ui](https://ui.shadcn.com/docs/cli): pre-built UI components based on Radix
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction): accessible UI primitives
- [Aceternity UI](https://ui.aceternity.com/components): advanced animated UI components

**Animation**
- [Motion One](https://motion.dev/docs/react-use-animate): `"@motionone/react": "latest"`
- [Embla Carousel](https://www.embla-carousel.com/docs/react/): `"embla-carousel-react": "latest"`

**3D Graphics**
- [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction): `"@react-three/fiber": "latest"`
- [drei](https://github.com/pmndrs/drei): `"@react-three/drei": "latest"`

**Form Handling**
- [React Hook Form](https://react-hook-form.com/get-started): `"react-hook-form": "latest"`
- [Zod](https://zod.dev): `"zod": "latest"`

**SEO & Utilities**
- [next-seo](https://github.com/garmeeh/next-seo): `"next-seo": "latest"`

---

## 2. Installation Instructions

1. Initialize project:
```bash
yarn create next-app golden-nest -typescript
```

2. Update `package.json` with required dependencies:
```json
"dependencies": {
  "next": "latest",
  "react": "latest",
  "react-dom": "latest",
  "tailwindcss": "latest",
  "@motionone/react": "latest",
  "embla-carousel-react": "latest",
  "@react-three/fiber": "latest",
  "@react-three/drei": "latest",
  "@radix-ui/react-*": "latest",
  "react-hook-form": "latest",
  "zod": "latest",
  "next-seo": "latest"
}
```

3. Run:
```bash
yarn install
```

4. Setup TailwindCSS:
```bash
npx tailwindcss init -p
```

---

## 3. Folder Structure

```
/app
  /components
    Navbar.tsx
    Hero.tsx
    Highlights.tsx
    ProductCarousel.tsx
    TestimonialCard.tsx
    Footer.tsx
    AboutSection.tsx
    ProductCard.tsx
    GalleryCarousel.tsx
    QualityCounters.tsx
    FAQAccordion.tsx
    ContactForm.tsx
  /about/page.tsx
  /products/page.tsx
  /gallery/page.tsx
  /quality/page.tsx
  /contact/page.tsx
/styles
  globals.css
  tailwind.config.ts
/utils
  seo.config.ts
  validation.ts
```

---

## 4. Component Implementation Details

### 4.1 Navbar.tsx
- Use **shadcn/ui NavigationMenu**.
- Sticky at top, background with shadow.
- Hover: underline animation on links.

### 4.2 Hero.tsx
- Full screen height section.
- Left: Heading + Subtext + CTA button.
- Right: React Three Fiber 3D poultry model.
- Background: Aceternity spotlight gradient.
- Animation: fade in text with `useAnimate`.

### 4.3 Highlights.tsx
- 3-column grid, responsive to 1 column on mobile.
- Each card uses Aceternity UI spotlight hover effect.
- Pointer: cursor-pointer, hover shadow lift.

### 4.4 ProductCarousel.tsx
- Implement with **Embla Carousel**.
- Features:
  - Parallax effect.
  - Progress bar indicator at bottom.
  - Masked edges (fade-out sides).
  - Cards tilt on hover.

### 4.5 TestimonialCard.tsx
- Cards with subtle motion entry animation.
- Background: soft neutral with shadow-md.
- Hover: slight zoom.

### 4.6 Footer.tsx
- Newsletter form (React Hook Form + Zod validation).
- Contact info + social links.
- Hover: icon scale.

### 4.7 AboutSection.tsx
- Two-column layout (text + farm image).
- Accordion timeline (Radix Accordion).
- Motion fade-in when scrolled into view.

### 4.8 ProductCard.tsx
- Grid of cards for eggs, broilers, layers.
- Hover: zoom and tilt.
- Include image placeholder, title, description.

### 4.9 GalleryCarousel.tsx
- Embla Carousel with masonry-style layout.
- Animate images with staggered fade-in.

### 4.10 QualityCounters.tsx
- Motion spring animation to count numbers up.
- Grid layout with large font sizes.

### 4.11 FAQAccordion.tsx
- Radix Accordion with shadcn/ui styling.
- Hover: pointer change, smooth expand.

### 4.12 ContactForm.tsx
- Fields: Name, Email, Message.
- Validation: Zod schema.
- Submit with API route (`/api/contact`).
- Success: confirmation toast (shadcn/ui toast).

---

## 5. Styling & Effects

- **Parallax**: Hero background and carousel.
- **Scroll effects**: Section fade and slide up with `inView`.
- **Pointer styles**: Always cursor-pointer on interactive items.
- **Hover effects**:
  - Buttons scale (1.05x).
  - Cards lift with shadow-lg.
  - Images zoom by 5%.
- **Animations**: All transitions should use cubic-bezier easing and last 300ms–500ms.
- **Reduced Motion**: Respect system preference and disable parallax/tilt.

---

## 6. Updating Components for Best Results

- Use Tailwind responsive classes for mobile-first design.
- Replace placeholder images with Unsplash/Pexels farm and poultry images.
- Ensure `alt` text is meaningful for SEO.
- Wrap all sections in semantic `<section>` tags.
- Add SEO metadata with Next SEO for each page.

---

This implementation guide ensures the development follows the exact plan, with no ambiguity for layout, animations, or copy.

---

## 7. Starter Code Snippets

### 7.1 Navbar.tsx
```tsx
"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">Golden Nest</h1>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/gallery">Gallery</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/quality">Quality</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
```

---

### 7.2 Hero.tsx
```tsx
"use client";

import { useAnimate } from "@motionone/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Hero() {
  const [scope, animate] = useAnimate();

  return (
    <section ref={scope} className="relative h-screen flex items-center justify-between px-8 bg-gradient-to-r from-yellow-50 to-orange-100">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Fresh Poultry, Trusted Quality</h1>
        <p className="text-lg mb-6 text-gray-700">Golden Nest Poultry is committed to delivering farm-fresh eggs and healthy chickens with the highest standards of care.</p>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform">Explore Our Products</button>
      </div>
      <div className="w-1/2 h-[500px]">
        {/* Placeholder 3D model */}
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight />
          <OrbitControls />
          {/* Replace with poultry model later */}
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </Canvas>
      </div>
    </section>
  );
}
```

---

### 7.3 Highlights.tsx
```tsx
"use client";

const highlights = [
  { title: "Farm Fresh Eggs", text: "Nutritious and delicious eggs sourced directly from our farm." },
  { title: "Healthy Chickens", text: "Well-cared for poultry raised with natural feed and proper welfare." },
  { title: "Trusted Quality", text: "Certified processes ensuring safety and freshness every step of the way." },
];

export default function Highlights() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {highlights.map((item) => (
          <div key={item.title} className="p-6 bg-yellow-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-orange-700">{item.title}</h3>
            <p className="text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### 7.4 ProductCard.tsx
```tsx
"use client";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
}

export default function ProductCard({ title, description, image }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
```

---

### 7.5 Footer.tsx
```tsx
"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Golden Nest Poultry</h3>
          <p>Golden Nest Poultry Farm, Gauteng, South Africa</p>
          <p>+27 12 345 6789</p>
          <p>info@goldennestpoultry.co.za</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded mb-2 text-gray-900" />
          <button className="bg-orange-600 px-4 py-2 rounded text-white hover:scale-105 transition">Subscribe</button>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400">Facebook</a>
            <a href="#" className="hover:text-orange-400">Instagram</a>
            <a href="#" className="hover:text-orange-400">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

These starter components cover the **core pages and layout**. Additional components (carousel, testimonial card, FAQ, counters) can be created using similar patterns with Embla Carousel, Radix Accordion, and Motion One animations.

---

## 8. Page Files Scaffolding

### 8.1 /about/page.tsx
```tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Our Story</h1>
        <p className="mb-8 text-lg text-gray-700">
          Golden Nest Poultry began with a vision to provide families and businesses with poultry products that are both fresh and trustworthy. With years of dedication, we have grown into a name customers rely on.
        </p>
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>To deliver safe, nutritious poultry products while upholding ethical farming practices.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <p>Integrity, quality, sustainability, and care for our poultry.</p>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>2015:</strong> Founded as a small family farm.</li>
            <li><strong>2018:</strong> Expanded into wholesale egg supply.</li>
            <li><strong>2021:</strong> Introduced modern facilities and certifications.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

---

### 8.2 /products/page.tsx
```tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const products = [
  { title: "Fresh Eggs", description: "Large, medium, and small eggs packed with nutrition.", image: "/images/eggs.jpg" },
  { title: "Broiler Chickens", description: "Healthy and well-fed chickens, ideal for commercial and home use.", image: "/images/broilers.jpg" },
  { title: "Layer Chickens", description: "Strong layers producing high-quality eggs consistently.", image: "/images/layers.jpg" },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Our Products</h1>
        <p className="mb-12 text-lg text-gray-700">
          From eggs to live chickens, we supply premium poultry products for homes, retailers, and businesses.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

---

### 8.3 /gallery/page.tsx
```tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Farm Life in Pictures</h1>
        <p className="mb-12 text-lg text-gray-700">Take a closer look at our farm, facilities, and poultry.</p>
        {/* Embla carousel will be used here */}
        <div className="grid md:grid-cols-3 gap-6">
          <img src="/images/farm1.jpg" alt="Our poultry enjoying open-air spaces." className="rounded-lg shadow-md" />
          <img src="/images/farm2.jpg" alt="Packing facility ensuring quality control." className="rounded-lg shadow-md" />
          <img src="/images/farm3.jpg" alt="Healthy chickens in a safe environment." className="rounded-lg shadow-md" />
        </div>
      </main>
      <Footer />
    </>
  );
}
```

---

### 8.4 /quality/page.tsx
```tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function QualityPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Quality You Can Trust</h1>
        <p className="mb-12 text-lg text-gray-700">
          We follow rigorous quality checks and maintain industry certifications to keep our poultry safe and healthy.
        </p>
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-yellow-50 rounded-lg shadow">Certified Poultry Health & Safety</div>
          <div className="p-6 bg-yellow-50 rounded-lg shadow">Biosecurity Standards Compliant</div>
          <div className="p-6 bg-yellow-50 rounded-lg shadow">Trusted by retailers across South Africa</div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Numbers</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div><span className="text-4xl font-bold text-orange-600">10+</span><p>Years Experience</p></div>
            <div><span className="text-4xl font-bold text-orange-600">5000+</span><p>Eggs Daily</p></div>
            <div><span className="text-4xl font-bold text-orange-600">100+</span><p>Happy Clients</p></div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
          <ul className="space-y-4">
            <li><strong>Are your eggs organic?</strong><br />Our eggs come from healthy hens fed on natural grain-based diets.</li>
            <li><strong>Do you deliver?</strong><br />Yes, we deliver bulk orders to local retailers and distributors.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

---

### 8.5 /contact/page.tsx
```tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="mb-12 text-lg text-gray-700">We’d love to hear from you. Contact us for inquiries, orders, or partnerships.</p>
        <form className="grid gap-6 mb-12">
          <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
          <textarea placeholder="Message" className="w-full px-4 py-2 border rounded h-32" />
          <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded hover:scale-105 transition">Send Message</button>
        </form>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-4 bg-yellow-50 rounded shadow">Golden Nest Poultry Farm, Gauteng, South Africa</div>
          <div className="p-4 bg-yellow-50 rounded shadow">+27 12 345 6789</div>
          <div className="p-4 bg-yellow-50 rounded shadow">info@goldennestpoultry.co.za</div>
        </div>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!..." className="w-full h-64 rounded-lg shadow"></iframe>
          <p className="mt-2 text-gray-600">Find us easily with Google Maps.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

const products = [
  { title: "Fresh Eggs", description: "Nutritious farm eggs, delivered fresh every day.", image: "/images/eggs.jpg" },
  { title: "Broiler Chickens", description: "Healthy, grain-fed broilers raised with care.", image: "/images/broilers.jpg" },
  { title: "Layer Chickens", description: "Strong, productive hens ensuring high-quality eggs.", image: "/images/layers.jpg" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Highlights />

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

---


## 9. Update Instructions

This section provides step-by-step instructions for updating the Golden Nest Poultry website, including modifying components, adding new pages, updating images or 3D models, and managing dependencies.

### 9.1 Updating Components

1. **Locate the Component:**
   - All reusable components are in `/app/components/`. For example, `Navbar.tsx`, `Hero.tsx`, etc.
2. **Edit the Component:**
   - Open the relevant `.tsx` file.
   - Make your changes (UI, logic, styling, etc.).
   - Use TailwindCSS classes for styling and ensure consistency with existing code.
3. **Test the Update:**
   - Run `yarn dev` to start the development server.
   - Check the component on all relevant pages and screen sizes.
4. **Optional – Add New Component:**
   - Create a new file in `/app/components/` (e.g., `NewFeature.tsx`).
   - Export the component and import it into the relevant page(s).

### 9.2 Adding New Pages

1. **Create a New Page File:**
   - Add a new file in the `/app/` directory, following the structure `/app/[route]/page.tsx`.
   - Example: To add a "Team" page, create `/app/team/page.tsx`.
2. **Scaffold the Page:**
   - Import `Navbar` and `Footer` at the top and bottom.
   - Add your page content between them, using existing components where possible.
3. **Add Route to Navigation:**
   - Update `Navbar.tsx` to include a link to the new page.
4. **Test the New Page:**
   - Visit the route in your browser to confirm it renders as expected.

### 9.3 Replacing Images or 3D Models

#### 9.3.1 Replacing Images
1. **Image Location:**
   - All images are stored in the `/public/images/` directory.
2. **Replace Existing Image:**
   - Overwrite the existing image file in `/public/images/` with your new image (use the same filename to avoid updating code).
3. **Add New Image:**
   - Place the new image in `/public/images/`.
   - Update the relevant component or page to reference the new image path.
4. **Accessibility:**
   - Ensure the `alt` attribute is descriptive for all `<img>` tags.


#### 9.3.2 Replacing 3D Models
1. **3D Model Location:**
   - Place 3D model files (e.g., `.glb`, `.gltf`) in `/public/models/`.
2. **Update Hero or Other 3D Components:**
   - In `Hero.tsx` or other relevant components, import and use `useGLTF` from `@react-three/drei` to load the new model.
   - Example:
     ```tsx
     import { useGLTF } from "@react-three/drei";
     // ...
     const { scene } = useGLTF("/models/poultry.glb");
     // ...
     <primitive object={scene} />
     ```
3. **Test the Model:**
   - Ensure the model displays correctly and interacts as expected.

#### 9.3.3 Dynamic Animations with Click Events

This section explains how to dynamically load multiple `.glb` models, extract their animations, and trigger them on mouse clicks using React Three Fiber and drei's `useAnimations`.

**1. Loading Multiple Models and Animations**

- Place all your `.glb` models (e.g., `chicken.glb`, `egg.glb`, `hen.glb`) in `/public/models/`.
- Use `useGLTF` from `@react-three/drei` to load each model. The returned object includes both the 3D scene and any embedded animations.
- Use `useAnimations` from `@react-three/drei` to extract and control animations for each model.

**2. Example: Dynamic Model with Animation on Click**

```tsx
import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef } from "react";

// Generic animated model component
function AnimatedModel({ modelPath, position = [0, 0, 0], scale = 1 }) {
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, group);

  // On click, play the first animation (or a named one)
  const handleClick = () => {
    // Play all animations or a specific one
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().play();
    }
  };

  return (
    <group ref={group} position={position} scale={scale} onClick={handleClick}>
      <primitive object={scene} />
    </group>
  );
}
```

**3. Usage in a Canvas**

```tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function MultiModelScene() {
  return (
    <Canvas camera={{ position: [0, 1, 6] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1} />
      <OrbitControls />
      {/* Place and scale each model as needed */}
      <AnimatedModel modelPath="/models/chicken.glb" position={[-2, 0, 0]} scale={1.2} />
      <AnimatedModel modelPath="/models/egg.glb" position={[0, 0, 0]} scale={0.8} />
      <AnimatedModel modelPath="/models/hen.glb" position={[2, 0, 0]} scale={1.1} />
    </Canvas>
  );
}
```

**4. Placement and Scaling**

- Use the `position` prop (e.g., `[x, y, z]`) to arrange models in the scene.
- Use the `scale` prop to adjust the size of each model so they fit visually together.
- You may need to experiment with values to get the best layout.

**5. Event Handling**

- The `onClick` handler in the example triggers the animation for the clicked model.
- You can expand this to trigger specific animations by name, or control playback (e.g., play, pause, stop).
- For more advanced interaction, use `onPointerOver`, `onPointerOut`, or other pointer events.

**6. Notes**

- Ensure that your `.glb` models contain animation data (check in Blender or your 3D tool).
- If a model has multiple animations, you can choose which to play by referencing `names` or looping through them.
- All event handlers in Three.js scenes bubble through the component tree, so you can also place handlers at a parent `<group>`.

**7. Sample Full Component**

```tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef } from "react";

function AnimatedModel({ modelPath, position, scale }) {
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, group);
  const handleClick = () => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().play();
    }
  };
  return (
    <group ref={group} position={position} scale={scale} onClick={handleClick}>
      <primitive object={scene} />
    </group>
  );
}

export default function Example3DModels() {
  return (
    <Canvas camera={{ position: [0, 1, 8] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls />
      <AnimatedModel modelPath="/models/chicken.glb" position={[-2, 0, 0]} scale={[1.2, 1.2, 1.2]} />
      <AnimatedModel modelPath="/models/egg.glb" position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} />
      <AnimatedModel modelPath="/models/hen.glb" position={[2, 0, 0]} scale={[1.1, 1.1, 1.1]} />
    </Canvas>
  );
}
```

**Summary**
- Place `.glb` models in `/public/models/`.
- Use `useGLTF` and `useAnimations` to load models and their animations.
- Trigger animations using `onClick` or other mouse events.
- Adjust placement and scaling for best layout.
- See the above code for a flexible, reusable pattern.

### 9.4 Updating Dependencies

1. **Modify `package.json`:**
   - To upgrade or add a dependency, update the relevant entry in `package.json` under `"dependencies"` or `"devDependencies"`.
2. **Install Dependencies:**
   - Run `yarn install` to install new or updated packages.
3. **Check for Breaking Changes:**
   - Review the changelog or documentation for any major version updates.
   - Test the site thoroughly after dependency updates.
4. **Remove Unused Dependencies (Optional):**
   - Remove the package from `package.json` and run `yarn install`.

---

ref 

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

// Load your 3D model component
function ChickenModel() {
  // Replace with the path to your .glb model in /public/models/
  const { scene } = useGLTF("/models/chicken.glb");
  return <primitive object={scene} scale={1.2} position={[0, -1, 0]} />;
}

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scopeRef.current) {
      scopeRef.current.style.opacity = "0";
      scopeRef.current.style.transform = "translateY(20px)";
      
      const timer = setTimeout(() => {
        if (scopeRef.current) {
          scopeRef.current.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
          scopeRef.current.style.opacity = "1";
          scopeRef.current.style.transform = "translateY(0)";
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-between px-6 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      
      <div className="container-width relative z-10 flex items-center justify-between">
        <div ref={scopeRef} className="max-w-lg">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Fresh Poultry,{" "}
            <span className="text-gradient">Trusted Quality</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed">
            Golden Nest Poultry is committed to delivering farm-fresh eggs and healthy chickens with the highest standards of care.
          </p>
          <button type="button" className="btn-primary">
            Explore Our Products
          </button>
        </div>
        
        {/* 3D Model Display */}
        <div className="hidden lg:block w-1/2 h-[500px] relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Stage intensity={0.6}>
              <ChickenModel />
            </Stage>
          </Canvas>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-accent-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}