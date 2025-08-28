"use client";

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Detailed } from '@react-three/drei';
import { Group } from 'three';

interface ModelLODProps {
  position: [number, number, number];
  highDetail: React.ComponentType<any>;
  lowDetail: React.ComponentType<any>;
}

export function ModelLOD({ position, highDetail: HighDetail, lowDetail: LowDetail }: ModelLODProps) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    const distance = camera.position.distanceTo(groupRef.current.position);
    // LOD switching based on distance - this is handled automatically by Detailed component
  });

  return (
    <group ref={groupRef} position={position}>
      <Detailed distances={[0, 15]}>
        <HighDetail />
        <LowDetail />
      </Detailed>
    </group>
  );
}
