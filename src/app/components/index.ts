// Export all 3D model components and systems
export { default as ChickModelDisplay } from './ChickModel';
export { default as EggModelDisplay } from './EggModel';

// Core systems - export specific items to avoid conflicts
export { SceneProvider, useScene } from './SceneManager';
export { useDynamicScaling } from './ScalingManager';
export { CameraController, useCameraController } from './CameraController';
export { useAdvancedAnimation, useKeyframeAnimation, useSequenceAnimation } from './AnimationManager';
export { usePhysicsSimulation, usePhysicsBody } from './PhysicsManager';
export { LODMesh } from './LODManager';
export { ModelErrorBoundary } from './ErrorBoundary';

// Model generators (auto-generated)
export { Model as ChickModelGen, AnimatedModel as AnimatedChickModel } from './models/ChickModelGen';
export { Model as LargeChickenModelGen } from './models/LargeChickenModelGen';

// Constants and presets
export { SCALING_PRESETS } from './ScalingManager';
export { CAMERA_PRESETS } from './CameraController';
export { ANIMATION_PRESETS } from './AnimationManager';
export { PHYSICS_PRESETS } from './PhysicsManager';
