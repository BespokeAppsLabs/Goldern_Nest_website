# 3D Model Integration Plan - Golden Nest Poultry

## Project Overview

This document outlines a targeted plan to integrate 3D chicken models as background props into the Golden Nest Poultry website. The focus is on fixing existing commented-out model placements and adding simple animated models where appropriate.

## 🎯 **Specific Model Assignments**

| Page | Model Component | Animation Behavior | Scale |
|------|----------------|-------------------|-------|
| **Hero** | `JumpingChick` | Automatic/random: idle → jump → peck (3s intervals) | 50% |
| **Products** | `AnimatedChicken` | Automatic walking animation | 40% |
| **About** | `AnimatedRooster` | Automatic idle/crowing animation | 30% |

## Current Project State Analysis

### Existing Assets
- **4 TypeScript Model Components**: `animated-chicken.tsx`, `animated-rooster.tsx`, `jumping-chick.tsx`, `static-chicken.tsx`
- **5 GLB Model Files**: `animated-chicken.glb`, `animated-rooster.glb`, `animated-spotted-chicken.glb`, `jumping-chick.glb`, `static-chicken.glb`
- **3D Libraries Installed**: `@react-three/fiber`, `@react-three/drei`, `@react-spring/three`, `three`, `gltfjsx`
- **Hero Component**: Already has 3D Canvas setup but with incorrect model path (`/models/chicken_2.glb` should be `/3d/animated-chicken.glb`)

### Identified Model Placement Locations
1. **Hero Component**: Currently broken - needs path fix → **Use JumpingChick with automatic/random animations**
2. **Products Page**: Commented out `{/* <ChickModelDisplay /> */}` on line 69 → **Use AnimatedChicken**
3. **About Page**: Commented out `{/* <FarmModelDisplay /> */}` on line 42 → **Use AnimatedRooster**

### Key Requirements
- **No complex scenes**: Just individual models as background props
- **50% smaller scale**: Models should be scaled down for subtle background display
- **No interaction**: Models should just display and animate automatically
- **Strategic placement**: Models placed where they enhance content without overwhelming it

## Integration Plan

### Phase 1: Fix Existing Model Placements

#### 1.1 Fix Hero Component - JumpingChick with Random Animations
**Current Issue**: Hero component tries to load from `/models/chicken_2.glb` (doesn't exist)
**Solution**: Update to use `/3d/jumping-chick.glb` with automatic/random animation switching

**Why this approach is better than example**:
- The example uses complex Stage components and OrbitControls for interactive scenes
- We need a simple background prop that auto-rotates without user interaction
- This maintains the existing error boundary pattern while being more performant

```typescript
// Fix in src/components/Hero.tsx
function ChickModel() {
  const { scene, animations } = useGLTF("/3d/jumping-chick.glb");
  const { actions } = useAnimations(animations, groupRef);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  // Random animation switching
  useEffect(() => {
    const animationInterval = setInterval(() => {
      const randomAnimations = ['idle', 'jump', 'peck'];
      const randomAnimation = randomAnimations[Math.floor(Math.random() * randomAnimations.length)];
      setCurrentAnimation(randomAnimation);
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    // Stop all animations
    Object.values(actions).forEach(action => action.stop());

    // Play selected animation
    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={[0.3, 0.3, 0.3]} // 50% smaller as requested
      position={[0, 0, 0]}
    />
  );
}
```

#### 1.2 Create Simple Model Display Component
**Purpose**: Reusable component for placing individual models as background props

```typescript
// src/components/ModelDisplay.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { ReactNode } from "react";

interface ModelDisplayProps {
  children: ReactNode;
  className?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
  scale?: number;
}

export function ModelDisplay({
  children,
  className = "w-full h-[300px]",
  enableControls = false,
  autoRotate = true,
  scale = 0.5
}: ModelDisplayProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <group scale={[scale, scale, scale]}>
            {children}
          </group>

          {enableControls && (
            <OrbitControls
              enableZoom={false}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### Phase 2: Implement Commented-Out Model Displays

#### 2.1 Products Page - Animated Chicken Display
**Location**: Replace `{/* <ChickModelDisplay /> */}` on line 69
**Model**: Use `AnimatedChicken` for automatic walking animation

```typescript
// Add to src/app/products/page.tsx
import { ModelDisplay } from "~/components/ModelDisplay";
import { AnimatedChicken } from "~/models";

// Replace the commented line with:
<ModelDisplay className="max-w-2xl mx-auto mb-8" scale={0.4}>
  <AnimatedChicken animation="walk" />
</ModelDisplay>
```

#### 2.2 About Page - Animated Rooster Display
**Location**: Replace `{/* <FarmModelDisplay /> */}` on line 42
**Model**: Use `AnimatedRooster` for automatic crowing/idle animation

```typescript
// Add to src/app/about/page.tsx
import { ModelDisplay } from "~/components/ModelDisplay";
import { AnimatedRooster } from "~/models";

// Replace the commented line with:
<ModelDisplay className="max-w-4xl mx-auto mb-8" scale={0.3}>
  <AnimatedRooster animation="idle" />
</ModelDisplay>
```

### Phase 3: Model Registry & Types

#### 3.1 Create Model Index File
**Purpose**: Central export point for all models

```typescript
// src/models/index.ts
export { AnimatedChicken } from './animated-chicken';
export { AnimatedRooster } from './animated-rooster';
export { JumpingChick } from './jumping-chick';
export { StaticChicken } from './static-chicken';

// Simple prop interface for model components
export interface ModelProps extends JSX.IntrinsicElements['group'] {
  animation?: string;
}
```

### Phase 4: Performance Optimization

#### 4.1 Add Model Preloading
**Why add preloading when example doesn't have it**:
- The example assumes models load instantly
- In production, model loading can cause UI stuttering
- Preloading ensures smooth user experience

```typescript
// src/hooks/useModelPreloader.ts
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const modelPaths = [
  '/3d/animated-chicken.glb',
  '/3d/animated-rooster.glb',
  '/3d/jumping-chick.glb',
  '/3d/static-chicken.glb'
];

export function useModelPreloader() {
  useEffect(() => {
    // Preload all models on app start
    modelPaths.forEach(path => {
      useGLTF.preload(path);
    });
  }, []);
}
```

#### 4.2 Add LOD (Level of Detail) Management
**Why add LOD when example doesn't have it**:
- Example assumes all users have powerful devices
- LOD prevents performance issues on lower-end devices
- Better user experience across different hardware capabilities

```typescript
// src/components/ModelLOD.tsx
"use client";

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Detailed } from '@react-three/drei';
import { Group } from 'three';

interface ModelLODProps {
  position: [number, number, number];
  highDetail: React.ComponentType<any>;
  lowDetail: React.ComponentType<any>;
}

export function ModelLOD({ position, highDetail: HighDetail, lowDetail: LowDetail }: ModelLODProps) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    const distance = camera.position.distanceTo(groupRef.current.position);
    // LOD switching based on distance
  });

  return (
    <group ref={groupRef} position={position}>
      <Detailed distances={[0, 15]}>
        <HighDetail />
        <LowDetail />
      </Detailed>
    </group>
  );
}
```

### Phase 5: Additional Strategic Placements

#### 5.1 Quality Page Model Addition
**Location**: Add subtle model to quality counters section
**Purpose**: Visual reinforcement of quality message

#### 5.2 Contact Page Model Addition
**Location**: Add model to map section placeholder
**Purpose**: Make the placeholder more engaging while waiting for map integration

## File Structure Summary

```
src/
├── components/
│   ├── Hero.tsx (fix model path)
│   ├── ModelDisplay.tsx (new reusable component)
│   └── ModelLOD.tsx (new performance component)
├── hooks/
│   ├── useModelPreloader.ts (new performance hook)
│   └── usePerformanceMonitor.ts (new monitoring hook)
├── models/
│   ├── index.ts (new central export)
│   ├── animated-chicken.tsx
│   ├── animated-rooster.tsx
│   ├── jumping-chick.tsx
│   └── static-chicken.tsx
└── app/
    ├── products/page.tsx (uncomment and implement ChickModelDisplay with AnimatedChicken)
    ├── about/page.tsx (uncomment and implement FarmModelDisplay with AnimatedRooster)
    ├── quality/page.tsx (add strategic model placement)
    ├── contact/page.tsx (enhance map placeholder)
    └── gallery/page.tsx (optional: add background model)
```

## Todo List

### Phase 1: Fix Existing Issues
- [ ] Fix Hero component to use JumpingChick with automatic/random animations
- [ ] Create `src/models/index.ts` with proper exports and TypeScript types
- [ ] Create `src/components/ModelDisplay.tsx` reusable component

### Phase 2: Implement Commented-Out Features
- [ ] Uncomment and implement `<ChickModelDisplay />` in products page using `AnimatedChicken`
- [ ] Uncomment and implement `<FarmModelDisplay />` in about page using `AnimatedRooster`

### Phase 3: Performance Optimization
- [ ] Create `src/hooks/useModelPreloader.ts` for model preloading
- [ ] Create `src/components/ModelLOD.tsx` for level-of-detail management

### Phase 4: Strategic Model Placements
- [ ] Add model to quality page counters section
- [ ] Add model to contact page map placeholder
- [ ] Consider adding subtle model to gallery page

### Phase 5: Testing & Polish
- [ ] Test all model placements across different devices
- [ ] Verify 50% scale reduction is appropriate for all placements
- [ ] Ensure models don't interfere with content readability
- [ ] Performance test with model preloading and LOD

## Key Differences from Example

### Why I Added Preloading:
- **Example Issue**: Assumes instant model loading
- **Our Solution**: Preload models to prevent UI stuttering
- **Benefit**: Smoother user experience, especially on slower connections

### Why I Added LOD Management:
- **Example Issue**: Assumes all users have powerful devices
- **Our Solution**: Automatically switch to simpler models on lower-end devices
- **Benefit**: Better performance across different hardware capabilities

### Why I Simplified the Approach:
- **Example Issue**: Complex interactive scenes with full user controls
- **Your Requirement**: Background props that enhance without overwhelming
- **Our Solution**: Simple auto-rotating models at 50% scale
- **Benefit**: Subtle enhancement that supports content rather than competing with it

This plan focuses on your specific requirements while adding essential performance optimizations that the example project lacks.
