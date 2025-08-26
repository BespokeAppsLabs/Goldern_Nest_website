# 3D Models Components

This directory contains generated and wrapper components for 3D models used in the Golden Nest application.

## File Naming Convention

- `{ModelName}ModelGen.tsx` - Generated components from gltfjsx (e.g., `ChickModelGen.tsx`)
- `{ModelName}Model.tsx` - Main component files in the parent directory

## Generated Components

### ChickModelGen.tsx
- **Source**: `public/models/chick.glb`
- **Features**: Animation support ('Armature|Animation')
- **Usage**: `<ChickModelGen scale={1.8} position={[0, 0, 0]} />`

### ChickenModelGen.tsx
- **Source**: `public/models/chicken_2.glb`
- **Features**: Animation support ('Idle')
- **Usage**: `<ChickenModelGen scale={0.6} position={[0, -0.3, 0]} />`

### LargeChickenModelGen.tsx
- **Source**: `public/models/Chicken.glb`
- **Features**: No animations (static model)
- **Usage**: `<LargeChickenModelGen scale={0.8} position={[0, -0.2, 0]} />`

## Shared Components

### AnimatedModel
A wrapper component for adding animation controls and click handlers to any model.

```tsx
<AnimatedModel onClick={() => console.log('Model clicked!')}>
  <ChickModelGen />
</AnimatedModel>
```

### NormalizedModel
Automatically scales models to a consistent size using bounding box calculations.

```tsx
<NormalizedModel desiredSize={2}>
  <LargeChickenModelGen />
</NormalizedModel>
```

### ModelWrapper
A comprehensive wrapper providing consistent Canvas setup, lighting, controls, and error boundaries.

```tsx
<ModelWrapper
  scale={1.5}
  position={[0, 0, 0]}
  autoRotate={true}
  enableZoom={false}
  cameraPosition={[0, 1, 4]}
  onModelClick={() => console.log('Model clicked!')}
>
  <ChickModelGen />
</ModelWrapper>
```

## Usage Patterns

### Basic Usage
```tsx
import { Model as ChickModelGen } from './models/ChickModelGen';

function MyComponent() {
  return (
    <Canvas>
      <ChickModelGen scale={1.8} />
    </Canvas>
  );
}
```

### With Animation Support
```tsx
import { Model as ChickModelGen, AnimatedModel } from './models/ChickModelGen';

function MyComponent() {
  return (
    <Canvas>
      <AnimatedModel onClick={() => console.log('Chick clicked!')}>
        <ChickModelGen scale={1.8} />
      </AnimatedModel>
    </Canvas>
  );
}
```

### With Normalized Scaling
```tsx
import { Model as LargeChickenModelGen, NormalizedModel } from './models/LargeChickenModelGen';

function MyComponent() {
  return (
    <Canvas>
      <NormalizedModel desiredSize={2}>
        <LargeChickenModelGen />
      </NormalizedModel>
    </Canvas>
  );
}
```

### Complete Setup (Recommended)
```tsx
import { Suspense } from 'react';
import { Model as ChickModelGen, ModelWrapper } from './models/ChickModelGen';

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModelWrapper
        scale={1.8}
        position={[0, 0, 0]}
        autoRotate={true}
        enableZoom={false}
      >
        <ChickModelGen />
      </ModelWrapper>
    </Suspense>
  );
}
```

## Best Practices

1. **Always use Suspense** for loading states
2. **Use ModelWrapper** for consistent behavior across models
3. **Apply NormalizedModel** when consistent sizing is important
4. **Use AnimatedModel** wrapper for interactive features
5. **Keep generated components pure** - add custom logic in wrapper components

## Performance Notes

- Generated components include `useGLTF.preload()` calls for optimal loading
- Use `React.memo()` on wrapper components to prevent unnecessary re-renders
- Consider lazy loading for models not immediately visible
