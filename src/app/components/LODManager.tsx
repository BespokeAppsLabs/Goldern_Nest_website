import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// TypeScript interfaces for LOD system
export interface LODConfig {
  high: {
    distance: number;
    geometry: THREE.BufferGeometry;
    materials?: THREE.Material[];
    animations?: THREE.AnimationClip[];
  };
  medium: {
    distance: number;
    geometry: THREE.BufferGeometry;
    materials?: THREE.Material[];
    animations?: THREE.AnimationClip[];
  };
  low: {
    distance: number;
    geometry: THREE.BufferGeometry;
    materials?: THREE.Material[];
    animations?: THREE.AnimationClip[];
  };
  billboard?: {
    distance: number;
    texture: THREE.Texture;
    size: [number, number];
  };
}

export interface LODMeshProps {
  config: LODConfig;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  onLODChange?: (level: 'high' | 'medium' | 'low' | 'billboard') => void;
}

// LOD Mesh component with automatic detail switching
export function LODMesh({
  config,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onLODChange
}: LODMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [currentLOD, setCurrentLOD] = useState<'high' | 'medium' | 'low' | 'billboard'>('high');

  // Calculate distance and determine appropriate LOD level
  useFrame(() => {
    if (!meshRef.current) return;

    const distance = camera.position.distanceTo(meshRef.current.position);
    let newLOD: typeof currentLOD = 'high';

    if (config.billboard && distance > config.billboard.distance) {
      newLOD = 'billboard';
    } else if (distance > config.low.distance) {
      newLOD = 'low';
    } else if (distance > config.medium.distance) {
      newLOD = 'medium';
    }

    if (newLOD !== currentLOD) {
      setCurrentLOD(newLOD);
      onLODChange?.(newLOD);
    }
  });

  // Get current geometry based on LOD level
  const currentGeometry = useMemo(() => {
    switch (currentLOD) {
      case 'high':
        return config.high.geometry;
      case 'medium':
        return config.medium.geometry;
      case 'low':
        return config.low.geometry;
      case 'billboard':
        // Create simple quad for billboard
        return new THREE.PlaneGeometry(config.billboard!.size[0], config.billboard!.size[1]);
    }
  }, [currentLOD, config]);

  // Get current material based on LOD level
  const currentMaterial = useMemo(() => {
    switch (currentLOD) {
      case 'high':
        return config.high.materials?.[0] || new THREE.MeshStandardMaterial();
      case 'medium':
        return config.medium.materials?.[0] || new THREE.MeshStandardMaterial();
      case 'low':
        return config.low.materials?.[0] || new THREE.MeshStandardMaterial();
      case 'billboard':
        return new THREE.MeshBasicMaterial({ map: config.billboard!.texture });
    }
  }, [currentLOD, config]);

  // Face camera for billboard
  useFrame(() => {
    if (currentLOD === 'billboard' && meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={currentGeometry}
      material={currentMaterial}
      position={position}
      rotation={rotation}
      scale={scale}
      frustumCulled={true}
    />
  );
}

// Utility function to create simplified geometry from high-detail geometry
export function createSimplifiedGeometry(
  originalGeometry: THREE.BufferGeometry,
  simplificationFactor: number = 0.5
): THREE.BufferGeometry {
  // Create a simplified version of the geometry
  const simplifiedGeometry = originalGeometry.clone();

  // Reduce vertices based on simplification factor
  const positions = simplifiedGeometry.attributes.position.array as Float32Array;
  const newPositions = new Float32Array(Math.floor(positions.length * simplificationFactor));

  // Simple vertex reduction by taking every nth vertex
  for (let i = 0; i < newPositions.length; i++) {
    const originalIndex = Math.floor(i / simplificationFactor);
    newPositions[i] = positions[originalIndex];
  }

  simplifiedGeometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
  simplifiedGeometry.computeVertexNormals();

  return simplifiedGeometry;
}

// Utility function to create LOD configurations from a single geometry
export function createLODConfigs(
  originalGeometry: THREE.BufferGeometry,
  originalMaterials?: THREE.Material[],
  originalAnimations?: THREE.AnimationClip[]
): LODConfig {
  const highDetail = {
    distance: 5,
    geometry: originalGeometry,
    materials: originalMaterials,
    animations: originalAnimations
  };

  const mediumDetail = {
    distance: 15,
    geometry: createSimplifiedGeometry(originalGeometry, 0.6),
    materials: originalMaterials?.map(mat => {
      const newMat = mat.clone();
      if (newMat instanceof THREE.MeshStandardMaterial) {
        // Simplify material for medium detail
        newMat.roughness = 0.8;
        newMat.metalness = 0.2;
      }
      return newMat;
    }),
    animations: originalAnimations
  };

  const lowDetail = {
    distance: 30,
    geometry: createSimplifiedGeometry(originalGeometry, 0.3),
    materials: originalMaterials?.map(mat => {
      const newMat = mat.clone();
      if (newMat instanceof THREE.MeshStandardMaterial) {
        // Further simplify material for low detail
        newMat.roughness = 1.0;
        newMat.metalness = 0.0;
        newMat.map = null; // Remove texture for performance
      }
      return newMat;
    }),
    animations: undefined // No animations for low detail
  };

  return {
    high: highDetail,
    medium: mediumDetail,
    low: lowDetail
  };
}

// Hook for managing LOD system
export const useLODSystem = () => {
  const { camera, scene } = useThree();
  const [globalLOD, setGlobalLOD] = useState<'high' | 'medium' | 'low'>('high');
  const [performanceMode, setPerformanceMode] = useState(false);

  // Performance monitoring
  useFrame(() => {
    // Simple performance check - adjust LOD based on frame rate
    // In a real implementation, you'd use more sophisticated metrics
    const currentFrameRate = 60; // This would be measured

    if (currentFrameRate < 30 && !performanceMode) {
      setPerformanceMode(true);
      setGlobalLOD('low');
    } else if (currentFrameRate > 50 && performanceMode) {
      setPerformanceMode(false);
      setGlobalLOD('high');
    }
  });

  return {
    globalLOD,
    performanceMode,
    setGlobalLOD,
    setPerformanceMode
  };
};

// Instancing LOD system for multiple similar objects
export interface InstancedLODProps {
  count: number;
  config: LODConfig;
  positions: Float32Array;
  rotations?: Float32Array;
  scales?: Float32Array;
}

export function InstancedLOD({
  count,
  config,
  positions,
  rotations,
  scales
}: InstancedLODProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();
  const [instanceLODs, setInstanceLODs] = useState<('high' | 'medium' | 'low' | 'billboard')[]>(
    new Array(count).fill('high')
  );

  // Calculate LOD for each instance
  useFrame(() => {
    if (!meshRef.current) return;

    const newLODs = instanceLODs.slice();
    let needsUpdate = false;

    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4();
      meshRef.current.getMatrixAt(i, matrix);
      const position = new THREE.Vector3();
      position.setFromMatrixPosition(matrix);

      const distance = camera.position.distanceTo(position);
      let newLOD: typeof instanceLODs[0] = 'high';

      if (config.billboard && distance > config.billboard.distance) {
        newLOD = 'billboard';
      } else if (distance > config.low.distance) {
        newLOD = 'low';
      } else if (distance > config.medium.distance) {
        newLOD = 'medium';
      }

      if (newLODs[i] !== newLOD) {
        newLODs[i] = newLOD;
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      setInstanceLODs(newLODs);
    }
  });

  // Get current geometry based on most common LOD level
  const currentGeometry = useMemo(() => {
    const lodCounts = instanceLODs.reduce((acc, lod) => {
      acc[lod] = (acc[lod] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonLOD = Object.entries(lodCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] as keyof typeof config;

    switch (mostCommonLOD) {
      case 'high':
        return config.high.geometry;
      case 'medium':
        return config.medium.geometry;
      case 'low':
        return config.low.geometry;
      case 'billboard':
        return new THREE.PlaneGeometry(config.billboard!.size[0], config.billboard!.size[1]);
      default:
        return config.high.geometry;
    }
  }, [instanceLODs, config]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[currentGeometry, undefined, count]}
      frustumCulled={true}
    >
      <meshStandardMaterial />
    </instancedMesh>
  );
}

// Frustum culling hook
export const useFrustumCulling = (
  object: THREE.Object3D | null,
  onVisibilityChange?: (visible: boolean) => void
) => {
  const { camera } = useThree();
  const [isVisible, setIsVisible] = useState(true);

  useFrame(() => {
    if (!object) return;

    const frustum = new THREE.Frustum();
    const cameraMatrix = new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(cameraMatrix);

    const visible = frustum.intersectsObject(object);

    if (visible !== isVisible) {
      setIsVisible(visible);
      onVisibilityChange?.(visible);
    }

    // Disable rendering for culled objects
    object.visible = visible;
  });

  return isVisible;
};

// Texture LOD system
export interface TextureLOD {
  high: THREE.Texture;
  medium: THREE.Texture;
  low: THREE.Texture;
}

export const useTextureLOD = (
  textureConfig: TextureLOD,
  object: THREE.Mesh | null,
  baseDistance: number = 10
) => {
  const { camera } = useThree();

  useFrame(() => {
    if (!object || !object.material) return;

    const distance = camera.position.distanceTo(object.position);
    const material = object.material as THREE.MeshStandardMaterial;

    if (distance > baseDistance * 2) {
      if (material.map !== textureConfig.low) {
        material.map = textureConfig.low;
        material.needsUpdate = true;
      }
    } else if (distance > baseDistance) {
      if (material.map !== textureConfig.medium) {
        material.map = textureConfig.medium;
        material.needsUpdate = true;
      }
    } else {
      if (material.map !== textureConfig.high) {
        material.map = textureConfig.high;
        material.needsUpdate = true;
      }
    }
  });
};

// Performance monitoring hook for LOD system
export const useLODPerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    averageFPS: 60,
    memoryUsage: 0,
    drawCalls: 0,
    triangles: 0,
    lodSwitches: 0
  });

  const updateMetrics = (metrics: Partial<typeof performanceMetrics>) => {
    setPerformanceMetrics(prev => ({ ...prev, ...metrics }));
  };

  // Monitor performance
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let lastLODUpdate = performance.now();

    const monitorPerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setPerformanceMetrics(prev => ({
          ...prev,
          averageFPS: fps
        }));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(monitorPerformance);
    };

    requestAnimationFrame(monitorPerformance);
  }, []);

  return {
    performanceMetrics,
    updateMetrics
  };
};

// Adaptive quality system
export const useAdaptiveQuality = () => {
  const { camera, scene } = useThree();
  const [qualityLevel, setQualityLevel] = useState<'high' | 'medium' | 'low'>('high');
  const [adaptiveEnabled, setAdaptiveEnabled] = useState(true);

  useFrame(() => {
    if (!adaptiveEnabled) return;

    // Simple adaptive quality based on camera movement and scene complexity
    const cameraSpeed = camera.position.distanceTo(camera.position.clone()) / 0.016; // Approximate speed

    if (cameraSpeed > 5 && qualityLevel !== 'low') {
      setQualityLevel('low');
    } else if (cameraSpeed < 2 && qualityLevel !== 'high') {
      setQualityLevel('high');
    }
  });

  return {
    qualityLevel,
    adaptiveEnabled,
    setQualityLevel,
    setAdaptiveEnabled
  };
};
