"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useAnimations, useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

// TypeScript interfaces for better type safety
interface ModelConfig {
  url: string;
  scale: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  animations?: AnimationConfig[];
}

interface AnimationConfig {
  name: string;
  loop: boolean;
  speed: number;
  onStart?: () => void;
  onEnd?: () => void;
}

interface ChickModelProps {
  animate?: boolean;
  interactive?: boolean;
  scale?: [number, number, number];
  position?: [number, number, number];
  onModelClick?: () => void;
}

// Error boundary for 3D components
class ThreeDErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('3D Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return null for 3D context - let the parent handle the error display
      return null;
    }

    return this.props.children;
  }
}

// Loading fallback component with 3D objects
function ModelLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <group>
      {/* Simple 3D loading indicator */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {/* Progress ring */}
      <mesh position={[0, 0, 0.01]} rotation={[0, 0, -Math.PI / 2]}>
        <ringGeometry args={[0.6, 0.8, 32]} />
        <meshBasicMaterial color="#e5e7eb" transparent opacity={0.3} />
      </mesh>
      {/* Progress indicator */}
      <mesh position={[0, 0, 0.02]} rotation={[0, 0, -Math.PI / 2]}>
        <ringGeometry args={[0.6, 0.8, 32, 1, (progress / 100) * Math.PI * 2, 0]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
    </group>
  );
}

// Advanced animation hook using React Spring
const useAdvancedAnimation = (config: {
  from: any;
  to: any;
  config?: { tension?: number; friction?: number; mass?: number };
  onStart?: () => void;
  onRest?: () => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const spring = useSpring({
    ...config,
    onStart: () => {
      setIsAnimating(true);
      config.onStart?.();
    },
    onRest: () => {
      setIsAnimating(false);
      config.onRest?.();
    }
  });

  return { ...spring, isAnimating };
};

// Physics-based chick animation
function PhysicsChick({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const velocity = useRef(new THREE.Vector3(0.005, 0, 0));
  const acceleration = useRef(new THREE.Vector3(0, -0.0005, 0));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Apply physics
    velocity.current.add(acceleration.current.clone().multiplyScalar(delta));
    groupRef.current.position.add(velocity.current.clone().multiplyScalar(delta));

    // Add gentle bobbing animation
    const bobSpeed = 8;
    const bobAmplitude = 0.05;
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * bobSpeed) * bobAmplitude * delta;

    // Boundary checks with realistic bouncing
    const bounds = { left: -2, right: 2, top: 1.5, bottom: -0.5 };

    if (groupRef.current.position.x < bounds.left || groupRef.current.position.x > bounds.right) {
      velocity.current.x *= -0.7; // Energy loss on bounce
    }

    if (groupRef.current.position.y < bounds.bottom) {
      velocity.current.y *= -0.8;
      groupRef.current.position.y = bounds.bottom;
    }

    // Add subtle rotation for liveliness
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return null;
}

// Enhanced chick model component with TypeScript
function ChickModel({
  animate = true,
  interactive = true,
  scale = [0.003, 0.003, 0.003],
  position = [0, -0.5, 0],
  onModelClick
}: ChickModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [animationMode, setAnimationMode] = useState<'idle' | 'walking' | 'physics'>('idle');

  // Load the 3D model with proper error handling - hooks must be called unconditionally
  const gltf = useGLTF('/models/chick.glb');
  const { actions } = useAnimations(gltf.animations, groupRef);
  
  // Advanced animation system
  const { position: animatedPosition, rotation: animatedRotation, scale: animatedScale } = useSpring({
    from: {
      position: [0, -0.5, 0],
      rotation: [0, 0, 0],
      scale: scale
    },
    to: {
      position: animationMode === 'walking' ? [1, -0.3, 0] : [0, -0.45, 0],
      rotation: animationMode === 'walking' ? [0, 0.5, 0] : [0, 0, 0],
      scale: animationMode === 'walking' 
        ? scale.map(s => s * 1.1) as [number, number, number]
        : scale.map(s => s * 1.05) as [number, number, number]
    },
    config: {
      tension: 120,
      friction: 50,
      mass: 1
    }
  });

  // Play animations based on mode
  useEffect(() => {
    if (actions && gltf.animations.length > 0) {
      // Stop all animations first
      Object.values(actions).forEach((action: any) => {
        action.stop();
      });

      // Play appropriate animation
      const animationName = 'Armature|Animation'; // From the GLTF file
      if (actions[animationName]) {
        actions[animationName].play();
        actions[animationName].timeScale = animationMode === 'walking' ? 2 : 1;
      }
    }
  }, [actions, animationMode, gltf.animations.length]);

  // Handle interactions
  const handleClick = () => {
    setAnimationMode(prev => prev === 'idle' ? 'walking' : 'idle');
    onModelClick?.();
  };

  return (
    <animated.group
      ref={groupRef}
      position={animatedPosition as any}
      rotation={animatedRotation as any}
      scale={animatedScale as any}
      onClick={interactive ? handleClick : undefined}
      onPointerEnter={() => interactive && setHovered(true)}
      onPointerLeave={() => interactive && setHovered(false)}
    >
      <primitive object={gltf.scene} />
      {hovered && (
        <mesh>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial color="orange" transparent opacity={0.2} />
        </mesh>
      )}
      {animate && <PhysicsChick groupRef={groupRef as React.RefObject<THREE.Group>} />}
    </animated.group>
  );
}

// Main display component with enhanced features
export default function ChickModelDisplay({
  animate = true,
  interactive = true,
  onModelClick
}: {
  animate?: boolean;
  interactive?: boolean;
  onModelClick?: () => void;
}) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle errors from 3D components
  const handleError = (error: Error) => {
    setHasError(true);
    setErrorMessage(error.message);
  };

  if (hasError) {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl mb-2">🐥</div>
          <p className="text-gray-600 text-sm">Failed to load chick model</p>
          <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
          <button
            type="button"
            onClick={() => setHasError(false)}
            className="mt-2 px-3 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 rounded-2xl overflow-hidden shadow-lg">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[3, 3, 3]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 3, 3]} intensity={0.4} color="#ffffff" />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={8}
        />
        <Stage
          intensity={0.5}
          environment="sunset"
          shadows
          adjustCamera={false}
        >
          <Suspense fallback={<ModelLoader />}>
            <ThreeDErrorBoundary>
              <ChickModel
                animate={animate}
                interactive={interactive}
                onModelClick={onModelClick}
              />
            </ThreeDErrorBoundary>
          </Suspense>
        </Stage>
      </Canvas>
    </div>
  );
}
