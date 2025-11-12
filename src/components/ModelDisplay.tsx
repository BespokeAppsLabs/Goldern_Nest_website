'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

interface ModelDisplayProps {
  children: React.ReactNode;
  className?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
  scale?: number;
}

export function ModelDisplay({
  children,
  className = 'w-full h-[300px]',
  enableControls = false,
  autoRotate = true,
  scale = 0.5,
}: ModelDisplayProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <group scale={[scale, scale, scale]}>{children}</group>

          {enableControls && (
            <OrbitControls
              enableZoom={false}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
