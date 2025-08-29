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
    <section className="relative min-h-screen flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 overflow-hidden">
      {/* Spotlight gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

      {/* 3D Model Display - Desktop - Background Layer */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-0" style={{ width: '100vw', height: '100vh', transform: 'translateZ(0)', willChange: 'transform' }}>
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

      {/* Content Container */}
      <div className="container-width relative z-10 flex flex-col md:flex-row md:items-center md:justify-center min-h-screen py-20 md:py-0">
        {/* Text Content - Transparent Background */}
        <div ref={scopeRef} className="max-w-lg md:max-w-2xl lg:max-w-3xl mb-8 md:mb-0 bg-transparent">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight drop-shadow-lg">
            {HeroContent.title.split(',')[0]},{" "}
            <span className="text-gradient drop-shadow-lg">{HeroContent.title.split(',')[1]}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-700 leading-relaxed max-w-full md:max-w-none drop-shadow-md">
            {HeroContent.description}
          </p>
          <button
            type="button"
            className="btn-primary w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4 drop-shadow-lg"
            onClick={() => {
              window.location.href = "/products";
            }}
          >
            {HeroContent.cta.primary}
          </button>
        </div>

        {/* Mobile 3D Model Placeholder */}
        <div className="md:hidden w-full h-64 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🐔</div>
            <p className="text-gray-600 text-sm">Interactive 3D Model</p>
            <p className="text-gray-500 text-xs mt-1">Available on larger screens</p>
          </div>
        </div>
      </div>

      {/* Decorative elements - Hidden on mobile */}
      <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
