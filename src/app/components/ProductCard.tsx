"use client";

import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useState, useMemo, useCallback, useEffect, Component, ReactNode } from "react";
import type * as THREE from "three";

// Hook to check for reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

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
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm">3D Model unavailable</p>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  modelPath?: string;
}

// Generic animated model component
function AnimatedModel({ modelPath, position = [0, 0, 0], scale = 1 }: {
  modelPath: string;
  position?: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, group);

  // Cache available animations for performance
  const availableAnimations = useMemo(() =>
    names.filter(name => actions[name]),
    [names, actions]
  );

  // Handle animation completion
  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
    setCurrentAnimation(null);
  }, []);

  // Enhanced click handler with state management and reduced motion support
  const handleClick = useCallback(() => {
    // Respect reduced motion preference
    if (prefersReducedMotion) {
      return;
    }

    if (availableAnimations.length > 0 && !isAnimating) {
      // Stop current animation if playing
      if (currentAnimation && actions[currentAnimation]) {
        actions[currentAnimation].stop();
      }

      // Select random animation
      const randomIndex = Math.floor(Math.random() * availableAnimations.length);
      const selectedAnimation = availableAnimations[randomIndex];

      // Play new animation
      if (actions[selectedAnimation]) {
        actions[selectedAnimation].reset().play();
        setCurrentAnimation(selectedAnimation);
        setIsAnimating(true);

        // Set up animation end listener
        const mixer = actions[selectedAnimation].getMixer?.();
        if (mixer) {
          mixer.addEventListener('finished', handleAnimationEnd);
        }
      }
    }
  }, [availableAnimations, actions, currentAnimation, isAnimating, handleAnimationEnd, prefersReducedMotion]);



  return (
  <group 
  ref={group} 
  position={position} 
  scale={scale} 
  onPointerDown={handleClick}
>
  <primitive object={scene} />
</group>
  );
}

export default function ProductCard({ title, description, image, modelPath }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform">
      {modelPath ? (
        <ThreeDErrorBoundary>
          <div className="w-full h-48 relative">
            <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              <AnimatedModel modelPath={modelPath} position={[0, 0, 0]} scale={0.8} />
            </Canvas>
          </div>
        </ThreeDErrorBoundary>
      ) : (
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
