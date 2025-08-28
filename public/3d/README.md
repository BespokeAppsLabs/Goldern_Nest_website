# 3D Models Directory

This directory contains 3D models used in the Golden Nest Poultry website.

## Available Models

- **chicken_2.glb** (706KB) - Optimized poultry 3D model for the Hero section ✅ **ACTIVE**
- **Chicken.glb** (23MB) - Original large chicken model (backup)
- **chick.glb** (358KB) - Chick model for Products page ✅ **ACTIVE**
- **farm.glb** - Farm building model for About page ⏳ **MISSING** (using chicken_2.glb placeholder)

## Model Usage

### 1. Chicken Model (Hero Section) - UPDATED
- **File**: `chicken_2.glb` (optimized version)
- **Location**: Hero component (`src/app/components/Hero.tsx`)
- **Purpose**: Main 3D showcase on homepage
- **Features**: Interactive rotation, auto-rotate, optimized lighting
- **Performance**: Much smaller file size (706KB vs 23MB) for better loading

### 2. Farm Model (About Page)
- **File**: `chicken_2.glb` (temporary placeholder)
- **Location**: About page (`src/app/about/page.tsx`)
- **Purpose**: Showcase farm facilities and infrastructure
- **Features**: Interactive tour, professional presentation
- **Status**: Using chicken model as placeholder until actual farm model is available

### 3. Chick Model (Products Page) - UPDATED
- **File**: `chick.glb` (replacing egg.glb)
- **Location**: Products page (`src/app/products/page.tsx`)
- **Purpose**: Demonstrate healthy chicks and quality
- **Features**: Detailed view, smooth rotation

## How to Add New 3D Models

### 1. Model Format
- Use **GLB** or **GLTF** format for best compatibility
- Ensure models are optimized for web (under 10MB recommended)
- Models should be centered at origin (0,0,0)

### 2. Adding a New Model
1. Place your `.glb` or `.gltf` file in this directory
2. Create a new component in `src/app/components/` (e.g., `NewModel.tsx`)
3. Use the existing components as templates:

```tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function NewModel() {
  const { scene } = useGLTF("/models/your-model.glb");
  return <primitive object={scene} scale={1.0} position={[0, 0, 0]} />;
}

export default function NewModelDisplay() {
  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        <Stage intensity={0.5}>
          <NewModel />
        </Stage>
      </Canvas>
    </div>
  );
}
```

### 3. Model Sources
- **Sketchfab** - High-quality 3D models
- **TurboSquid** - Professional 3D assets
- **Blender** - Create custom models
- **Free3D** - Free 3D model resources

### 4. Optimization Tips
- Reduce polygon count for web performance
- Use compressed textures
- Test loading times on slower connections
- Consider LOD (Level of Detail) for complex models
- Keep file sizes under 10MB for optimal performance

## Current Implementation Status

✅ **3D models are active and integrated**
✅ **Hero section uses optimized chicken_2.glb model (706KB)**
⏳ **About page uses chicken_2.glb as farm model placeholder**
✅ **Products page displays chick.glb model**
✅ **All models have proper lighting and controls**

## Performance Notes

- **chicken_2.glb** (706KB) - **NEW OPTIMIZED VERSION** - Excellent performance
- **Chicken.glb** (23MB) - **ORIGINAL VERSION** - Available as backup
- **farm.glb** (706KB) - Well-optimized, good performance
- **chick.glb** (358KB) - Excellent performance, fast loading

## Recent Updates

- **Hero Section**: Updated to use `chicken_2.glb` for better performance
- **Products Page**: Changed from egg model to chick model for better representation
- **File Optimization**: Reduced main chicken model from 23MB to 706KB

## Future Enhancements

- Add loading states for 3D models
- Implement progressive loading for large models
- Add model interaction animations
- Consider model compression techniques
- Add fallback images for slow connections
