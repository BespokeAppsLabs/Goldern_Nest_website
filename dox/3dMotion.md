# Animating 3D Models in React with @react-three/drei and gltfjsx

This guide explains how to animate 3D models in React using [@react-three/drei](https://drei.docs.pmnd.rs/controls/introduction) controls and convert GLTF models into reusable React components with [gltfjsx](https://github.com/pmndrs/gltfjsx). Follow these steps for smooth 3D integration, animation, and best practices.

---

## 1. Introduction

React Three Fiber (R3F) enables powerful 3D scenes in React. The [drei](https://drei.docs.pmnd.rs/) library provides helpers for controls, loading, and animation. [gltfjsx](https://github.com/pmndrs/gltfjsx) converts GLTF/GLB models into ready-to-use React components, making it easy to load, animate, and interact with 3D assets.

---

## 2. Setup Instructions

Install the required dependencies:

```bash
yarn add @react-three/fiber @react-three/drei three
# (Optional, for converting models)
yarn add -D gltfjsx
```

If you haven't already, initialize your React/Next.js project and set up the `/public/models/` directory for your GLTF/GLB files.

---

## 3. Generating JSX Components from `.glb`/`.gltf` Models with gltfjsx

1. **Place your `.glb` or `.gltf` file in your project (e.g., `/public/models/chicken.glb`).**
2. **Run gltfjsx in your terminal:**
   ```bash
   npx gltfjsx public/models/chicken.glb
   ```
   This generates a `Chicken.js` or `Chicken.tsx` file in your project directory.
3. **Move the generated file to your components folder:**
   ```
   /app/components/ChickenModel.tsx
   ```
4. **Edit the generated component if needed (e.g., to adjust scale, add props, or expose animation hooks).**

**Tip:** gltfjsx supports options like `--types` for TypeScript and `--transform` for mesh optimizations. See [gltfjsx docs](https://github.com/pmndrs/gltfjsx) for more.

---

## 4. Integrating Models into a Scene with Canvas and drei Controls

1. **Import Canvas and controls from drei:**
   ```tsx
   import { Canvas } from "@react-three/fiber";
   import { OrbitControls, PresentationControls } from "@react-three/drei";
   import ChickenModel from "./components/ChickenModel";
   ```
2. **Set up your scene:**
   ```tsx
   <Canvas camera={{ position: [0, 1, 5] }}>
     <ambientLight intensity={0.5} />
     <directionalLight position={[5, 10, 7]} intensity={1} />
     <OrbitControls enablePan enableZoom enableRotate />
     {/* Or use PresentationControls for presentation-style interaction */}
     {/* <PresentationControls global polar={[-0.4, 0.2]} azimuth={[-1, 1]} /> */}
     <ChickenModel scale={1.2} position={[0, 0, 0]} />
   </Canvas>
   ```

### 4.1 Fixing Model Size

To keep your model's visual size consistent regardless of user interaction or camera changes, consider the following steps:

1. **Disable zoom** by setting `enableZoom={false}` on `OrbitControls`. This prevents users from changing the camera distance.

2. **Fix the camera position and field of view (fov)** to maintain a constant perspective.

3. **Manually normalize the model scale** by setting a fixed `scale` prop to your model component.

4. **Automatically normalize the model scale** by computing its bounding box and applying a uniform scale so it fits a consistent size in the scene.

Here's an example of how to compute the bounding box size and apply uniform scaling to normalize your model's size dynamically:

```tsx
import { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import ChickenModel from "./components/ChickenModel";

export default function NormalizedModel(props) {
  const ref = useRef();
  const [scale, setScale] = useState(1);
  const { scene } = useThree();

  useEffect(() => {
    if (ref.current) {
      // Compute bounding box of the model
      const box = new Box3().setFromObject(ref.current);
      const size = new Vector3();
      box.getSize(size);

      // Desired size to fit in the scene
      const desiredSize = 2;

      // Calculate the max dimension and scale accordingly
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        setScale(desiredSize / maxDim);
      }
    }
  }, [props]);

  return (
    <group ref={ref} scale={scale} {...props}>
      <ChickenModel />
    </group>
  );
}
```

And adjust your `OrbitControls` to disable zoom and fix the camera:

```tsx
<Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
  <ambientLight intensity={0.5} />
  <directionalLight position={[5, 10, 7]} intensity={1} />
  <OrbitControls enablePan enableZoom={false} enableRotate />
  <NormalizedModel position={[0, 0, 0]} />
</Canvas>
```

This approach ensures your model always fits within a consistent visual size in the scene, improving user experience and presentation quality.

---

## 5. Adding Animations Using `useAnimations` from drei

If your GLTF model has animations:

1. **Access animations in your component:**
   ```tsx
   import { useGLTF, useAnimations } from "@react-three/drei";
   import { useRef, useEffect } from "react";

   export function AnimatedChicken(props) {
     const group = useRef();
     const { scene, animations } = useGLTF("/models/chicken.glb");
     const { actions, names } = useAnimations(animations, group);

     useEffect(() => {
       // Play the first animation by default
       if (names.length > 0 && actions[names[0]]) {
         actions[names[0]].reset().play();
       }
     }, [actions, names]);

     return <group ref={group} {...props}><primitive object={scene} /></group>;
   }
   ```
2. **Trigger animations on interaction:**
   ```tsx
   // Example: play animation on click
   <group ref={group} onClick={() => actions[names[0]].reset().play()}>
     <primitive object={scene} />
   </group>
   ```
3. **Multiple animations:** Use the `names` array to select which animation to play.

---

## 6. Example Code Snippets

### Loading and Displaying a Model with Controls
```tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ChickenModel from "./components/ChickenModel";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 1, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1} />
      <OrbitControls />
      <ChickenModel scale={1.2} position={[0, 0, 0]} />
    </Canvas>
  );
}
```

### Animating a Model on Click
```tsx
import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef } from "react";

function AnimatedModel({ path, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF(path);
  const { actions, names } = useAnimations(animations, group);
  const handleClick = () => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().play();
    }
  };
  return (
    <group ref={group} {...props} onClick={handleClick}>
      <primitive object={scene} />
    </group>
  );
}
```

### Using PresentationControls for Interactive Showcases
```tsx
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import ChickenModel from "./components/ChickenModel";

export default function PresentScene() {
  return (
    <Canvas camera={{ position: [0, 1, 5] }}>
      <ambientLight />
      <PresentationControls
        global
        config={{ mass: 2, tension: 400 }}
        snap
        polar={[-0.4, 0.2]}
        azimuth={[-1, 1]}
      >
        <ChickenModel scale={1.2} />
      </PresentationControls>
    </Canvas>
  );
}
```

---

## 7. Best Practices

- **File Organization:**
  - Store models in `/public/models/`.
  - Place generated model components in `/app/components/`.
  - Keep scenes and logic in `/app/components/` or feature folders.
- **Performance:**
  - Optimize GLTF/GLB files (remove unused meshes, compress textures).
  - Use [`useMemo`](https://react.dev/reference/react/useMemo) for heavy computations.
  - Lazy-load 3D scenes if not immediately visible.
  - Use [`<Suspense>`](https://react.dev/reference/react/Suspense) for loading fallback.
- **Accessibility:**
  - Provide alternative content (descriptions, captions) for users with screen readers.
  - Use focus indicators and keyboard handlers for interactive 3D elements.
  - Ensure color contrast for overlays/UI.
- **General:**
  - Use [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) queries to disable auto-rotation or parallax for users who prefer it.
  - Test models on mobile and desktop for usability.
  - Keep 3D scenes simple and performant for best user experience.

---

## 8. References

- [drei controls documentation](https://drei.docs.pmnd.rs/controls/introduction)
- [gltfjsx documentation](https://github.com/pmndrs/gltfjsx)
- [React Three Fiber documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Best practices for web 3D](https://discoverthreejs.com/tips-and-tricks/)
