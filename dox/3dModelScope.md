# 3D Model Implementation Documentation

## Project Overview
This project demonstrates a comprehensive 3D portfolio website using React Three Fiber and Three.js, showcasing various approaches to implementing 3D models with different animation patterns and interaction methods.

## Technology Stack

### Core 3D Libraries
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper library with utilities for React Three Fiber
- **@react-spring/three**: Spring animations for 3D objects
- **three**: Core Three.js library (dependency of @react-three/drei)

### Key Dependencies
```json
"@react-three/drei": "^9.88.17",
"@react-three/fiber": "^8.15.11",
"@react-spring/three": "^9.7.3"
```

### Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'], // Explicitly include GLB files as assets
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
```

## Folder Structure

```
/src/
├── assets/
│   └── 3d/                    # GLB model files
│       ├── bird.glb          # Animated flying bird
│       ├── fox.glb           # Multi-animation fox with skeleton
│       ├── island.glb        # Interactive static island
│       ├── plane.glb         # Propeller animation plane
│       └── sky.glb           # Rotating sky background
└── models/                   # React components for 3D models
    ├── Bird.jsx              # Flying bird with path animation
    ├── Fox.jsx               # Fox with multiple animations
    ├── Island.jsx            # Interactive island with mouse controls
    ├── Plane.jsx             # Plane with propeller animation
    ├── Sky.jsx               # Rotating sky background
    └── index.js              # Model exports
```

## Model Implementation Patterns

### 1. Animated Models with Built-in GLB Animations

#### Pattern A: Simple Animation Playback (Bird)
```jsx
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

export function Bird() {
  const birdRef = useRef();
  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, birdRef);

  // Play animation on mount
  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  // Manual position animation
  useFrame(({ clock, camera }) => {
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
    // Path following logic...
  });

  return (
    <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
      <primitive object={scene} />
    </mesh>
  );
}
```

**Key Features:**
- Uses `useAnimations` hook to access GLB animations
- Plays specific animation by name (`"Take 001"`)
- Combines with manual position updates using `useFrame`
- Uses `<primitive object={scene} />` for complex models

#### Pattern B: Conditional Animation Playback (Plane)
```jsx
export function Plane({ isRotating, ...props }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (isRotating) {
      actions["Take 001"].play();
    } else {
      actions["Take 001"].stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
}
```

**Key Features:**
- Animation controlled by external prop
- Play/stop logic based on application state
- Same primitive object pattern

### 2. Multi-Animation Models with Skeleton (Fox)

#### Pattern C: Dynamic Animation Switching
```jsx
export function Fox({ currentAnimation, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Stop all current animations
    Object.values(actions).forEach((action) => action.stop());

    // Play selected animation
    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Multiple skinnedMesh components with skeletons */}
      <skinnedMesh
        name='Object_7'
        geometry={nodes.Object_7.geometry}
        material={materials.PaletteMaterial001}
        skeleton={nodes.Object_7.skeleton}
      />
      {/* ... more skinnedMesh components */}
    </group>
  );
}
```

**Key Features:**
- Uses `nodes` and `materials` from GLTF for detailed control
- Multiple `skinnedMesh` components for complex models
- Skeleton-based animations for realistic movement
- Dynamic animation switching via props

### 3. Static Models with Interactive Behavior

#### Pattern D: Mouse/Keyboard Controlled Rotation (Island)
```jsx
export function Island({ isRotating, setIsRotating, setCurrentStage, ...props }) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Mouse/Touch handlers
  const handlePointerDown = (event) => {
    setIsRotating(true);
    lastX.current = event.touches ? event.touches[0].clientX : event.clientX;
  };

  const handlePointerMove = (event) => {
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Keyboard handlers
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    }
    // ... ArrowRight logic
  };

  // Smooth rotation damping
  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      islandRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <a.group ref={islandRef} {...props}>
      {/* Multiple mesh components for complex geometry */}
      <mesh geometry={nodes.polySurface944_tree_body_0.geometry} material={materials.PaletteMaterial001} />
      {/* ... more mesh components */}
    </a.group>
  );
}
```

**Key Features:**
- No built-in animations - pure interactive rotation
- Mouse and keyboard controls
- Touch support for mobile
- Smooth damping using `rotationSpeed` and `dampingFactor`
- Stage detection based on rotation angle
- Uses `<a.group>` from react-spring for smooth animations

#### Pattern E: Programmatic Rotation (Sky)
```jsx
export function Sky({ isRotating }) {
  const skyRef = useRef();
  const sky = useGLTF(skyScene);

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * delta; // Frame-rate independent
    }
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  );
}
```

**Key Features:**
- Rotation controlled by external state
- Frame-rate independent using `delta` parameter
- Simple continuous rotation

## Home.jsx Integration

```jsx
import { Canvas } from '@react-three/fiber';
import { Bird, Island, Plane, Sky } from "../models";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  // Responsive scaling functions
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let islandRotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, islandRotation];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <Canvas camera={{ near: 0.1, far: 1000 }}>
      <Suspense fallback={<Loader/>}>
        {/* Lighting */}
        <directionalLight position={[2, 1, 1]} intensity={2} />
        <ambientLight intensity={0} />
        <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1} />

        {/* Animated Models */}
        <Bird />
        <Plane position={planePosition} scale={planeScale} isRotating={isRotating} rotation={[0, 20, 0]} />

        {/* Interactive Static Models */}
        <Sky isRotating={isRotating} />
        <Island
          position={islandPosition}
          scale={islandScale}
          rotation={islandRotation}
          setIsRotating={setIsRotating}
          isRotating={isRotating}
          setCurrentStage={setCurrentStage}
        />
      </Suspense>
    </Canvas>
  );
};
```

## Animation Types Comparison

| Model | Animation Type | Control Method | Implementation Pattern |
|-------|----------------|----------------|----------------------|
| **Bird** | Built-in GLB + Manual | Auto-play + Path following | `useAnimations` + `useFrame` |
| **Fox** | Multiple GLB animations | Prop-based switching | `useAnimations` + `skinnedMesh` |
| **Plane** | Built-in GLB animation | External state control | `useAnimations` + conditional play/stop |
| **Island** | Manual rotation | Mouse/Keyboard/Touch | Event handlers + `useFrame` damping |
| **Sky** | Manual rotation | External state control | `useFrame` + delta-based rotation |

## Best Practices for Replication

### 1. GLB File Preparation
- Export models from Blender, Maya, or 3ds Max as GLB format
- Include animations in the GLB file when possible
- Optimize model complexity for web performance
- Use descriptive animation names (visible in Sketchfab)

### 2. Model Conversion Tools
- **gltf.pmnd.rs**: Convert GLB to JSX components
- Automatically generates proper `nodes`, `materials`, and `skinnedMesh` structure
- Essential for complex models with multiple parts

### 3. Animation Implementation Strategy
```jsx
// For models WITH animations in GLB
const { scene, animations } = useGLTF(modelPath);
const { actions } = useAnimations(animations, ref);

// For models WITHOUT animations
const { nodes, materials } = useGLTF(modelPath);
// Implement custom animations using useFrame
```

### 4. Performance Optimization
- Use `useGLTF.preload()` for critical models
- Implement LOD (Level of Detail) for complex models
- Use `dispose={null}` on groups to prevent memory leaks
- Optimize draw calls by merging geometries when possible

### 5. Responsive Design
- Create scaling functions based on `window.innerWidth`
- Adjust camera positions and model scales for mobile
- Test touch interactions on mobile devices

### 6. State Management
- Use props to control animation states
- Implement proper cleanup in useEffect returns
- Handle loading states with Suspense boundaries

## Complete Replication Example

### Animated Character Model
```jsx
// MyCharacter.jsx
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

export function MyCharacter({ animation = "idle", position = [0, 0, 0] }) {
  const characterRef = useRef();
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions } = useAnimations(animations, characterRef);

  useEffect(() => {
    // Stop all animations
    Object.values(actions).forEach(action => action.stop());

    // Play selected animation
    if (actions[animation]) {
      actions[animation].play();
    }
  }, [actions, animation]);

  // Optional: Add custom movement
  useFrame((state) => {
    // Add floating or other custom animations
    characterRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <primitive
      ref={characterRef}
      object={scene}
      position={position}
      scale={[1, 1, 1]}
    />
  );
}
```

### Interactive Environment Model
```jsx
// MyEnvironment.jsx
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function MyEnvironment({ onRotate, ...props }) {
  const envRef = useRef();
  const { nodes, materials } = useGLTF("/models/environment.glb");
  const { viewport } = useThree();

  useFrame(() => {
    // Custom rotation or animation logic
    envRef.current.rotation.y += 0.005;
    onRotate?.(envRef.current.rotation.y);
  });

  return (
    <group ref={envRef} {...props}>
      {/* Individual meshes from gltf.pmnd.rs conversion */}
      <mesh geometry={nodes.Mesh1.geometry} material={materials.Material1} />
      <mesh geometry={nodes.Mesh2.geometry} material={materials.Material2} />
    </group>
  );
}
```

### Usage in Main Component
```jsx
// MyScene.jsx
import { Canvas } from '@react-three/fiber';
import { MyCharacter } from './models/MyCharacter';
import { MyEnvironment } from './models/MyEnvironment';

export default function MyScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />

      <MyCharacter
        animation="walk"
        position={[0, 0, 0]}
      />

      <MyEnvironment
        onRotate={(rotation) => console.log('Environment rotated:', rotation)}
        position={[0, -2, 0]}
      />
    </Canvas>
  );
}
```

## Common Pitfalls and Solutions

### 1. Animation Names
- **Problem**: Animation names in GLB might be generic (e.g., "Take 001")
- **Solution**: Check animation names on Sketchfab or use console.log(actions) to see available animations

### 2. Model Scaling
- **Problem**: Models appear too large/small
- **Solution**: Use scale prop and test with different values: `scale={[0.1, 0.1, 0.1]}`

### 3. Performance Issues
- **Problem**: Complex models cause frame drops
- **Solution**: Use `useGLTF.preload()` and consider simplifying geometry

### 4. Touch Events
- **Problem**: Mouse events don't work on mobile
- **Solution**: Always check for touch events: `event.touches ? event.touches[0].clientX : event.clientX`

### 5. Memory Leaks
- **Problem**: Models not properly disposed
- **Solution**: Add `dispose={null}` to groups and cleanup event listeners

This documentation provides a comprehensive guide for implementing various 3D model patterns in React Three Fiber applications, from simple animated models to complex interactive environments.
