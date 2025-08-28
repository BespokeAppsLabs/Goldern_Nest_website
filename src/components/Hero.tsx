"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { JumpingChick } from "@/models";
import * as THREE from "three";
import { HeroContent } from "../constants";


// Error boundary for 3D components
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeDErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
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

// Enhanced 3D model component with rotation logic
function ChickenModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Rotation logic - rotate the model slowly around the Y-axis
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.01; // Rotate at 0.3 radians per second
    }
  });

  return (
    <group ref={groupRef}>
      <JumpingChick scale={[0.1, 0.1, 0.1]} position={[-5, -1.5, 0]} />
    </group>
  );
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
      
      {/* Background Logo
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10">
        <Image
          src="/images/logo_transparent.png"
          alt="Golden Nest Poultry Logo"
          width={1500}
          height={1500}
          className=" object-contain"
          priority
        />
      </div> */}
      
      <div className="container-width relative z-10 flex items-center justify-between">
        <div ref={scopeRef} className="max-w-lg">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            {HeroContent.title.split(',')[0]},{" "}
            <span className="text-gradient">{HeroContent.title.split(',')[1]}</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed">
            {HeroContent.description}
          </p>
          <button type="button" className="btn-primary" onClick={() => {
            window.location.href = "/products";
          }}>
            {HeroContent.cta.primary}
          </button>
        </div>
      </div>

      {/* 3D Model Display */}
      <div className="absolute inset-0 flex items-center justify-center z-0" style={{ width: '100vw', height: '100vh', transform: 'translateZ(0)', willChange: 'transform' }}>
        <ThreeDErrorBoundary>
          <Canvas
            shadows
            camera={{
              position: [0, 1.5, 12],
              fov: 50,
              near: 0.1,
              far: 100
            }}
          >
            {/* Enhanced Lighting Setup */}
            <ambientLight intensity={2} />
            <directionalLight
              position={[10, 10, 10]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />

            {/* Camera Controls */}
            <OrbitControls
              enableZoom={false}
              enableDamping
              dampingFactor={0.1}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />

            {/* 3D Model */}
            <ChickenModel />
          </Canvas>
        </ThreeDErrorBoundary>
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
