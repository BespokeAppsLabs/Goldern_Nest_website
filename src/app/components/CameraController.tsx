'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, config, useSprings, useSpringRef } from '@react-spring/three';
import * as THREE from 'three';

// TypeScript interfaces for camera system
export interface CameraPreset {
  id: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  description?: string;
}

export interface CameraTransition {
  from: CameraPreset;
  to: CameraPreset;
  duration?: number;
  easing?: (t: number) => number;
}

export interface CameraControllerProps {
  preset?: string;
  target?: [number, number, number];
  shouldFollow?: boolean;
  followTarget?: THREE.Object3D | null;
  enableSmoothTransition?: boolean;
  transitionDuration?: number;
  onTransitionComplete?: () => void;
}

// Predefined camera presets for different views
export const CAMERA_PRESETS = {
  chick_closeup: {
    id: 'chick_closeup',
    position: [0, 1, 3] as [number, number, number],
    target: [0, -0.5, 0] as [number, number, number],
    fov: 50,
    description: 'Close-up view of chick model'
  },
  chick_side: {
    id: 'chick_side',
    position: [2, 0, 0] as [number, number, number],
    target: [0, -0.5, 0] as [number, number, number],
    fov: 45,
    description: 'Side view of chick model'
  },
  egg_focus: {
    id: 'egg_focus',
    position: [0, 1, 2.5] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 45,
    description: 'Focused view of egg model'
  },
  egg_wide: {
    id: 'egg_wide',
    position: [0, 2, 4] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 60,
    description: 'Wide view of egg model'
  },
  farm_overview: {
    id: 'farm_overview',
    position: [0, 5, 8] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 75,
    description: 'Overview of farm scene'
  },
  farm_detail: {
    id: 'farm_detail',
    position: [3, 2, 3] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 50,
    description: 'Detailed view of farm elements'
  },
  hero: {
    id: 'hero',
    position: [0, 2, 5] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 55,
    description: 'Hero section camera view'
  },
  cinematic: {
    id: 'cinematic',
    position: [-3, 2, 4] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 40,
    description: 'Cinematic camera angle'
  }
} as const;

// Camera controller hook with advanced features
export const useCameraController = (
  preset: string = 'hero',
  options: {
    enableSmoothTransition?: boolean;
    transitionDuration?: number;
    shouldFollow?: boolean;
    followTarget?: THREE.Object3D | null;
    onTransitionComplete?: () => void;
  } = {}
) => {
  const {
    enableSmoothTransition = true,
    transitionDuration = 1000,
    shouldFollow = false,
    followTarget = null,
    onTransitionComplete
  } = options;

  const { camera } = useThree();
  const [currentPreset, setCurrentPreset] = useState<keyof typeof CAMERA_PRESETS>(preset as keyof typeof CAMERA_PRESETS);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Get preset configuration
  const presetConfig = useMemo(() => {
    return CAMERA_PRESETS[currentPreset] || CAMERA_PRESETS.hero;
  }, [currentPreset]);

  // Spring animation for smooth camera transitions
  const { position, target, fov } = useSpring({
    position: presetConfig.position,
    target: presetConfig.target,
    fov: presetConfig.fov,
    config: enableSmoothTransition ? config.gentle : config.default,
    onStart: () => setIsTransitioning(true),
    onRest: () => {
      setIsTransitioning(false);
      onTransitionComplete?.();
    }
  });

  // Follow target if enabled
  useFrame(() => {
    if (shouldFollow && followTarget) {
      const followPosition = followTarget.position.clone();
      followPosition.add(new THREE.Vector3(0, 2, 3)); // Offset behind and above target
      // Directly set camera position and lookAt to follow target smoothly
      camera.position.lerp(followPosition, 0.05);
      camera.lookAt(followTarget.position);
    }
  });

  // Transition to new preset
  const transitionToPreset = (newPreset: string, customOptions?: Partial<typeof options>) => {
    if (CAMERA_PRESETS[newPreset as keyof typeof CAMERA_PRESETS]) {
      setCurrentPreset(newPreset as keyof typeof CAMERA_PRESETS);
      // The spring will automatically animate to the new values
    }
  };

  // Hook for smooth follow with offset
  const useFollowWithOffset = (
    target: THREE.Object3D,
    offset: [number, number, number] = [0, 2, 3]
  ) => {
    useFrame(() => {
      const targetPosition = target.position.clone();
      targetPosition.add(new THREE.Vector3(...offset));
      camera.position.lerp(targetPosition, 0.05);
      camera.lookAt(target.position);
    });
  };

  return {
    position,
    target,
    fov,
    isTransitioning,
    currentPreset,
    transitionToPreset,
    useFollowWithOffset
  };
};

// Advanced camera controller component
export function CameraController({
  preset = 'hero',
  target,
  shouldFollow = false,
  followTarget,
  enableSmoothTransition = true,
  transitionDuration = 1000,
  onTransitionComplete
}: CameraControllerProps) {
  const { camera } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Use the camera controller hook
  const cameraController = useCameraController(preset, {
    enableSmoothTransition,
    transitionDuration,
    shouldFollow,
    followTarget: followTarget || undefined,
    onTransitionComplete
  });

  // Custom target override
  useEffect(() => {
    if (target && cameraRef.current) {
      cameraRef.current.lookAt(new THREE.Vector3(...target));
    }
  }, [target]);

  return (
    <animated.perspectiveCamera
      ref={cameraRef}
      position={cameraController.position}
      fov={cameraController.fov}
      near={0.1}
      far={1000}
      onUpdate={self => {
        // Update lookAt manually each frame because lookAt is not an animatable prop
        if (cameraController.target) {
          const targetValue = cameraController.target.get();
          if (Array.isArray(targetValue) && targetValue.length === 3) {
            self.lookAt(new THREE.Vector3(targetValue[0], targetValue[1], targetValue[2]));
          }
        }
      }}
    />
  );
}

// Cinematic camera system for complex scenes
export const useCinematicCamera = () => {
  const { camera } = useThree();
  const [currentSequence, setCurrentSequence] = React.useState<string>('idle');
  const springRef = useSpringRef();

  // Predefined camera sequences
  const sequences = useMemo(() => ({
    introduction: [
      { position: [0, 5, 10], target: [0, 0, 0], duration: 3000 },
      { position: [3, 2, 5], target: [0, 0, 0], duration: 2000 },
      { position: [0, 1, 3], target: [0, -0.5, 0], duration: 1500 }
    ],
    showcase: [
      { position: [-2, 1, 2], target: [0, 0, 0], duration: 2500 },
      { position: [2, 1, 2], target: [0, 0, 0], duration: 2500 },
      { position: [0, 3, 2], target: [0, 0, 0], duration: 2000 }
    ],
    farewell: [
      { position: [0, 2, 8], target: [0, 0, 0], duration: 3000 },
      { position: [0, 10, 15], target: [0, 0, 0], duration: 4000 }
    ]
  }), []);

  // Execute camera sequence with smooth tweening using react-spring
  const playSequence = (sequenceName: keyof typeof sequences) => {
    const sequence = sequences[sequenceName];
    if (!sequence) return;

    setCurrentSequence(sequenceName);

    let index = 0;

    const animateStep = () => {
      if (index >= sequence.length) return;

      const step = sequence[index];
      const nextStep = sequence[index + 1];

      const duration = step.duration || 1000;

      // Direct camera manipulation instead of hooks
      const startTime = Date.now();
      const startPosition = camera.position.clone();
      const startTarget = new THREE.Vector3(0, 0, 0);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress < 1) {
          // Linear interpolation
          camera.position.lerpVectors(startPosition, new THREE.Vector3(step.position[0], step.position[1], step.position[2]), progress);
          const currentTarget = new THREE.Vector3().lerpVectors(startTarget, new THREE.Vector3(step.target[0], step.target[1], step.target[2]), progress);
          camera.lookAt(currentTarget);
          requestAnimationFrame(animate);
        } else {
          // Complete the animation
          camera.position.set(step.position[0], step.position[1], step.position[2]);
          camera.lookAt(new THREE.Vector3(step.target[0], step.target[1], step.target[2]));
          index++;
          if (index < sequence.length) {
            setTimeout(animateStep, 100);
          }
        }
      };

      animate();
    };

    animateStep();
  };

  return {
    currentSequence,
    playSequence,
    sequences: Object.keys(sequences)
  };
};

// Camera shake effect for dynamic scenes
export const useCameraShake = (intensity: number = 0.1, duration: number = 1000) => {
  const { camera } = useThree();
  const [isShaking, setIsShaking] = React.useState(false);
  const originalPosition = useRef<THREE.Vector3>(null);

  const shake = () => {
    if (isShaking) return;

    setIsShaking(true);
    originalPosition.current = camera.position.clone();

    const startTime = Date.now();

    const shakeFrame = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const shakeOffset = new THREE.Vector3(
          (Math.random() - 0.5) * intensity,
          (Math.random() - 0.5) * intensity,
          (Math.random() - 0.5) * intensity
        );

        camera.position.copy(originalPosition.current!).add(shakeOffset);
        requestAnimationFrame(shakeFrame);
      } else {
        camera.position.copy(originalPosition.current!);
        setIsShaking(false);
      }
    };

    requestAnimationFrame(shakeFrame);
  };

  return { shake, isShaking };
};

// Orbit camera with constraints
export const useOrbitCamera = (
  target: [number, number, number] = [0, 0, 0],
  options: {
    radius?: number;
    height?: number;
    speed?: number;
    enableZoom?: boolean;
    minRadius?: number;
    maxRadius?: number;
  } = {}
) => {
  const { camera } = useThree();

  const {
    radius = 5,
    height = 2,
    speed = 0.005,
    enableZoom = true,
    minRadius = 2,
    maxRadius = 10
  } = options;

  const [currentRadius, setCurrentRadius] = React.useState(radius);
  const [currentAngle, setCurrentAngle] = React.useState(0);

  useFrame((state) => {
    const angle = state.clock.elapsedTime * speed;
    setCurrentAngle(angle);

    // Calculate camera position in orbit
    const x = Math.cos(angle) * currentRadius;
    const z = Math.sin(angle) * currentRadius;
    const y = height;

    camera.position.set(x, y, z);
    camera.lookAt(new THREE.Vector3(target[0], target[1], target[2]));
  });

  // Handle zoom
  useEffect(() => {
    if (!enableZoom) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoomSpeed = 0.1;
      const newRadius = currentRadius + (event.deltaY > 0 ? zoomSpeed : -zoomSpeed);
      setCurrentRadius(Math.max(minRadius, Math.min(maxRadius, newRadius)));
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentRadius, enableZoom, minRadius, maxRadius]);

  return {
    currentRadius,
    currentAngle,
    setRadius: setCurrentRadius
  };
};
