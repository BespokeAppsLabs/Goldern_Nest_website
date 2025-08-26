"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense, Component, ReactNode } from "react";
import { Model as ChickenModelGen } from "./models/ChickenModelGen";

// Error boundary for 3D components
class ThreeDErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('3D Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-64 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🏭</div>
            <p className="text-gray-600 text-sm">Farm model loading...</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component
function ModelLoader() {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">🏭</div>
        <p className="text-gray-600 text-sm">Loading farm model...</p>
      </div>
    </div>
  );
}

// Load the farm 3D model
// Note: Using chicken_2.glb as temporary farm model representation
// TODO: Replace with actual farm.glb model when available
function FarmModel() {
  return <ChickenModelGen scale={0.6} position={[0, -0.3, 0]} />;
}

export default function FarmModelDisplay() {
  return (
    <ThreeDErrorBoundary>
      <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
          <Stage intensity={0.5}>
            <Suspense fallback={<ModelLoader />}>
              <FarmModel />
            </Suspense>
          </Stage>
        </Canvas>
      </div>
    </ThreeDErrorBoundary>
  );
}
