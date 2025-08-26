"use client";

import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

// TypeScript interfaces
interface EggModelProps {
  interactive?: boolean;
  animate?: boolean;
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
      return this.props.fallback || (
        <div className="w-full h-48 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">🥚</div>
            <p className="text-gray-600 text-sm">Failed to load egg model</p>
            <p className="text-xs text-red-500 mt-1">{this.state.error?.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component with progress
function ModelLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 15, 95));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-3xl mb-2 animate-pulse">🥚</div>
        <p className="text-gray-600 text-sm">Generating egg model...</p>
        <div className="w-32 h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-accent-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{progress}%</p>
      </div>
    </div>
  );
}

// Procedural egg geometry generator
function createEggGeometry(widthSegments = 32, heightSegments = 32) {
  const geometry = new THREE.SphereGeometry(1, widthSegments, heightSegments);

  // Modify vertices to create egg shape
  const positions = geometry.attributes.position.array as Float32Array;

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];

    // Create egg shape by stretching top and compressing bottom
    const factor = 1 + (y * 0.3); // More pronounced at the top
    positions[i] = x * factor;
    positions[i + 2] = z * factor;

    // Adjust Y to make it more pointy at top and rounded at bottom
    if (y > 0) {
      positions[i + 1] = y * (1 + y * 0.2);
    } else {
      positions[i + 1] = y * (1 - y * 0.1);
    }
  }

  geometry.computeVertexNormals();
  return geometry;
}

// Procedural egg texture/material
function createEggMaterial() {
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    roughness: 0.3,
    metalness: 0.1,
  });

  // Create subtle spots pattern
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d')!;

  // Base color
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, 512, 512);

  // Add subtle spots
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = Math.random() * 20 + 5;

    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(139, 69, 19, ${Math.random() * 0.3})`);
    gradient.addColorStop(1, 'rgba(139, 69, 19, 0)');

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  material.map = texture;
  material.normalMap = texture; // Use same texture for subtle normal mapping

  return material;
}

// Advanced egg animation system
const useEggAnimation = (config: {
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

// Physics-based egg movement
function PhysicsEgg({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const velocity = useRef(new THREE.Vector3(0.002, 0, 0));
  const acceleration = useRef(new THREE.Vector3(0, -0.0002, 0));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Apply gentle physics
    velocity.current.add(acceleration.current.clone().multiplyScalar(delta));
    groupRef.current.position.add(velocity.current.clone().multiplyScalar(delta));

    // Gentle rolling motion
    groupRef.current.rotation.z += delta * 0.5;

    // Boundary checks with gentle bouncing
    const bounds = { left: -1.5, right: 1.5, top: 1, bottom: -1 };

    if (groupRef.current.position.x < bounds.left || groupRef.current.position.x > bounds.right) {
      velocity.current.x *= -0.6; // Energy loss on bounce
    }

    if (groupRef.current.position.y < bounds.bottom) {
      velocity.current.y *= -0.5;
      groupRef.current.position.y = bounds.bottom;
    }

    // Add subtle wobble
    const wobbleSpeed = 3;
    const wobbleAmplitude = 0.02;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * wobbleSpeed) * wobbleAmplitude;
  });

  return null;
}

// Procedural egg component
function EggModel({
  interactive = true,
  animate = true,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  onModelClick
}: EggModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [animationMode, setAnimationMode] = useState<'idle' | 'rolling'>('idle');

  // Create egg geometry and material
  const eggGeometry = useMemo(() => createEggGeometry(), []);
  const eggMaterial = useMemo(() => createEggMaterial(), []);

  // Animation system
  const { position: animatedPosition, rotation: animatedRotation, scale: animatedScale } = useSpring({
    from: {
      position: position,
      rotation: [0, 0, 0],
      scale: scale
    },
    to: {
      position: animationMode === 'rolling' ? [0.5, 0.1, 0] : [0, 0.05, 0],
      rotation: animationMode === 'rolling' ? [0, 0, Math.PI] : [0, 0, 0],
      scale: animationMode === 'rolling' 
        ? scale.map(s => s * 1.05) as [number, number, number]
        : scale.map(s => s * 1.02) as [number, number, number]
    },
    config: {
      tension: 80,
      friction: 40,
      mass: 1
    }
  });

  // Handle interactions
  const handleClick = () => {
    setAnimationMode(prev => prev === 'idle' ? 'rolling' : 'idle');
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
      <mesh geometry={eggGeometry} material={eggMaterial} castShadow receiveShadow />
      {hovered && (
        <mesh>
          <sphereGeometry args={[1.1, 16, 16]} />
          <meshBasicMaterial color="orange" transparent opacity={0.1} />
        </mesh>
      )}
      {animate && <PhysicsEgg groupRef={groupRef as React.RefObject<THREE.Group>} />}
    </animated.group>
  );
}

// Main display component
export default function EggModelDisplay({
  interactive = true,
  animate = true,
  onModelClick
}: {
  interactive?: boolean;
  animate?: boolean;
  onModelClick?: () => void;
}) {
  return (
    <ThreeDErrorBoundary>
      <div className="w-full h-48 rounded-2xl overflow-hidden shadow-lg">
        <Canvas
          camera={{ position: [0, 1, 3], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[2, 3, 2]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-2, 2, 2]} intensity={0.3} color="#ffeb99" />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={1.5}
            maxDistance={6}
          />
          <Stage
            intensity={0.4}
            environment="studio"
            shadows
            adjustCamera={false}
          >
            <Suspense fallback={<ModelLoader />}>
              <EggModel
                interactive={interactive}
                animate={animate}
                onModelClick={onModelClick}
              />
            </Suspense>
          </Stage>
        </Canvas>
      </div>
    </ThreeDErrorBoundary>
  );
}
