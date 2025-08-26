"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { useEffect, useRef, Component, ReactNode } from "react";

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
        <div className="w-full h-[500px] bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🐔</div>
            <p className="text-gray-600">3D Model loading...</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Load your 3D model component
function ChickenModel() {
  // Load the new optimized chicken model from /public/models/
  const { scene } = useGLTF("/models/chicken_2.glb");
  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />;
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
      {/* Spotlight gradient background */}
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
          <ThreeDErrorBoundary>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              <Stage intensity={0.6}>
                <ChickenModel />
              </Stage>
            </Canvas>
          </ThreeDErrorBoundary>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-accent-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
