import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated, config, useTransition, useTrail } from '@react-spring/three';
import * as THREE from 'three';

// TypeScript interfaces for animation system
export interface AnimationConfig {
  from: any;
  to: any;
  config?: {
    tension?: number;
    friction?: number;
    mass?: number;
    duration?: number;
    easing?: (t: number) => number;
  };
  delay?: number;
  onStart?: () => void;
  onRest?: () => void;
  onChange?: (value: any) => void;
}

export interface KeyframeAnimation {
  id: string;
  keyframes: AnimationConfig[];
  loop?: boolean;
  yoyo?: boolean; // Play in reverse after completing
}

export interface SequenceAnimation {
  id: string;
  animations: KeyframeAnimation[];
  sequential?: boolean; // If true, animations play one after another
  loop?: boolean;
}

// Animation Manager Hook
export const useAdvancedAnimation = (config: AnimationConfig) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const spring = useSpring({
    ...config,
    onStart: () => {
      setIsAnimating(true);
      setIsComplete(false);
      config.onStart?.();
    },
    onRest: () => {
      setIsAnimating(false);
      setIsComplete(true);
      config.onRest?.();
    },
    onChange: config.onChange
  });

  return { ...spring, isAnimating, isComplete };
};

// Keyframe Animation Hook
export const useKeyframeAnimation = (keyframes: KeyframeAnimation) => {
  const [currentKeyframe, setCurrentKeyframe] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for reverse

  const currentConfig = keyframes.keyframes[currentKeyframe];
  const { ...springProps } = useAdvancedAnimation({
    ...currentConfig,
    onRest: () => {
      currentConfig.onRest?.();

      // Move to next keyframe
      const nextKeyframe = currentKeyframe + direction;

      if (nextKeyframe >= keyframes.keyframes.length) {
        if (keyframes.yoyo) {
          setDirection(-1);
          setCurrentKeyframe(nextKeyframe - 2);
        } else if (keyframes.loop) {
          setCurrentKeyframe(0);
        } else {
          setIsPlaying(false);
        }
      } else if (nextKeyframe < 0) {
        if (keyframes.loop) {
          setDirection(1);
          setCurrentKeyframe(1);
        } else {
          setIsPlaying(false);
        }
      } else {
        setCurrentKeyframe(nextKeyframe);
      }
    }
  });

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const reset = useCallback(() => {
    setCurrentKeyframe(0);
    setDirection(1);
    setIsPlaying(false);
  }, []);

  return {
    ...springProps,
    isPlaying,
    currentKeyframe,
    play,
    pause,
    reset
  };
};

// Sequence Animation Hook
export const useSequenceAnimation = (sequence: SequenceAnimation) => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentAnimation = sequence.animations[currentAnimationIndex];
  const animationProps = useKeyframeAnimation(currentAnimation);

  useEffect(() => {
    if (animationProps.isComplete && isPlaying) {
      if (sequence.sequential) {
        const nextIndex = currentAnimationIndex + 1;
        if (nextIndex < sequence.animations.length) {
          setCurrentAnimationIndex(nextIndex);
        } else if (sequence.loop) {
          setCurrentAnimationIndex(0);
        } else {
          setIsPlaying(false);
        }
      }
    }
  }, [animationProps.isComplete, currentAnimationIndex, sequence, isPlaying]);

  const play = useCallback(() => {
    setIsPlaying(true);
    animationProps.play();
  }, [animationProps]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    animationProps.pause();
  }, [animationProps]);

  const reset = useCallback(() => {
    setCurrentAnimationIndex(0);
    setIsPlaying(false);
    animationProps.reset();
  }, [animationProps]);

  return {
    ...animationProps,
    currentAnimationIndex,
    isPlaying,
    play,
    pause,
    reset
  };
};

// Trail Animation Hook for multiple objects
export const useTrailAnimation = (
  count: number,
  config: AnimationConfig,
  trailConfig?: { delay?: number; reverse?: boolean }
) => {
  const trail = useTrail(count, {
    ...config,
    config: config.config || { tension: 120, friction: 50 },
    delay: trailConfig?.delay || 100,
    reverse: trailConfig?.reverse || false
  });

  return trail;
};

// Transition Animation Hook
export const useTransitionAnimation = (
  items: any[],
  keys: (item: any) => string | number,
  config: {
    from: any;
    enter: any;
    leave: any;
    config?: any;
    trail?: number;
  }
) => {
  const transitions = useTransition(items, {
    keys,
    from: config.from,
    enter: config.enter,
    leave: config.leave,
    config: config.config || { tension: 120, friction: 50 },
    trail: config.trail || 100
  });

  return transitions;
};

// Physics-based Animation Hook
export const usePhysicsAnimation = (
  initialVelocity: THREE.Vector3 = new THREE.Vector3(),
  acceleration: THREE.Vector3 = new THREE.Vector3(0, -0.001, 0),
  bounds?: {
    min: THREE.Vector3;
    max: THREE.Vector3;
    bounce?: number;
  }
) => {
  const velocity = useRef(initialVelocity.clone());
  const position = useRef(new THREE.Vector3());
  const [isActive, setIsActive] = useState(true);

  useFrame((state, delta) => {
    if (!isActive) return;

    // Apply physics
    velocity.current.add(acceleration.clone().multiplyScalar(delta));
    position.current.add(velocity.current.clone().multiplyScalar(delta));

    // Apply bounds if specified
    if (bounds) {
      const { min, max, bounce = 0.8 } = bounds;

      if (position.current.x < min.x || position.current.x > max.x) {
        velocity.current.x *= -bounce;
        position.current.x = THREE.MathUtils.clamp(position.current.x, min.x, max.x);
      }

      if (position.current.y < min.y || position.current.y > max.y) {
        velocity.current.y *= -bounce;
        position.current.y = THREE.MathUtils.clamp(position.current.y, min.y, max.y);
      }

      if (position.current.z < min.z || position.current.z > max.z) {
        velocity.current.z *= -bounce;
        position.current.z = THREE.MathUtils.clamp(position.current.z, min.z, max.z);
      }
    }
  });

  const setVelocity = useCallback((newVelocity: THREE.Vector3) => {
    velocity.current.copy(newVelocity);
  }, []);

  const setPosition = useCallback((newPosition: THREE.Vector3) => {
    position.current.copy(newPosition);
  }, []);

  const applyForce = useCallback((force: THREE.Vector3) => {
    velocity.current.add(force);
  }, []);

  return {
    position: position.current,
    velocity: velocity.current,
    isActive,
    setVelocity,
    setPosition,
    applyForce,
    setActive: setIsActive
  };
};

// Morphing Animation Hook
export const useMorphAnimation = (
  geometries: THREE.BufferGeometry[],
  morphTargets: THREE.Vector3[][],
  duration: number = 2000
) => {
  const [currentGeometry, setCurrentGeometry] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMorphing, setIsMorphing] = useState(false);

  const { morphProgress } = useSpring({
    morphProgress: isMorphing ? 1 : 0,
    config: { duration },
    onStart: () => setIsMorphing(true),
    onRest: () => {
      setIsMorphing(false);
      setProgress(0);
    }
  });

  const morphTo = useCallback((targetIndex: number) => {
    setCurrentGeometry(targetIndex);
    setIsMorphing(true);
  }, []);

  return {
    currentGeometry,
    morphProgress,
    isMorphing,
    morphTo,
    geometries,
    morphTargets
  };
};

// Gesture-based Animation Hook
export const useGestureAnimation = (
  config: {
    drag?: AnimationConfig;
    pinch?: AnimationConfig;
    rotate?: AnimationConfig;
  }
) => {
  const [gestureState, setGestureState] = useState({
    isDragging: false,
    isPinching: false,
    isRotating: false
  });

  const dragAnimation = useAdvancedAnimation({
    from: { scale: 1 },
    to: { scale: 1.1 },
    ...config.drag,
    onStart: () => setGestureState(prev => ({ ...prev, isDragging: true })),
    onRest: () => setGestureState(prev => ({ ...prev, isDragging: false }))
  });

  const pinchAnimation = useAdvancedAnimation({
    from: { scale: 1 },
    to: { scale: 0.9 },
    ...config.pinch,
    onStart: () => setGestureState(prev => ({ ...prev, isPinching: true })),
    onRest: () => setGestureState(prev => ({ ...prev, isPinching: false }))
  });

  const rotateAnimation = useAdvancedAnimation({
    from: { rotation: 0 },
    to: { rotation: Math.PI / 4 },
    ...config.rotate,
    onStart: () => setGestureState(prev => ({ ...prev, isRotating: true })),
    onRest: () => setGestureState(prev => ({ ...prev, isRotating: false }))
  });

  return {
    dragAnimation,
    pinchAnimation,
    rotateAnimation,
    gestureState
  };
};

// Animation Sequence Builder
export class AnimationSequenceBuilder {
  private animations: KeyframeAnimation[] = [];
  private currentId = 0;

  addKeyframe(
    id: string,
    keyframes: AnimationConfig[],
    options: { loop?: boolean; yoyo?: boolean } = {}
  ): this {
    this.animations.push({
      id,
      keyframes,
      ...options
    });
    return this;
  }

  createSequence(options: { sequential?: boolean; loop?: boolean } = {}): SequenceAnimation {
    return {
      id: `sequence_${this.currentId++}`,
      animations: this.animations,
      ...options
    };
  }

  clear(): this {
    this.animations = [];
    return this;
  }
}

// Predefined Animation Presets
export const ANIMATION_PRESETS = {
  // Chick animations
  chick_idle: {
    id: 'chick_idle',
    keyframes: [
      {
        from: { scale: [0.003, 0.003, 0.003], position: [0, -0.5, 0] },
        to: { scale: [0.0032, 0.003, 0.003], position: [0, -0.48, 0] },
        config: { tension: 120, friction: 50 }
      },
      {
        from: { scale: [0.0032, 0.003, 0.003], position: [0, -0.48, 0] },
        to: { scale: [0.003, 0.003, 0.003], position: [0, -0.5, 0] },
        config: { tension: 120, friction: 50 }
      }
    ],
    loop: true
  },

  chick_walk: {
    id: 'chick_walk',
    keyframes: [
      {
        from: { position: [0, -0.5, 0], rotation: [0, 0, 0] },
        to: { position: [0.5, -0.4, 0], rotation: [0, 0.3, 0] },
        config: { tension: 150, friction: 40 }
      },
      {
        from: { position: [0.5, -0.4, 0], rotation: [0, 0.3, 0] },
        to: { position: [0, -0.5, 0], rotation: [0, 0, 0] },
        config: { tension: 150, friction: 40 }
      }
    ],
    loop: true
  },

  // Egg animations
  egg_roll: {
    id: 'egg_roll',
    keyframes: [
      {
        from: { rotation: [0, 0, 0], position: [0, 0, 0] },
        to: { rotation: [0, 0, Math.PI], position: [0.3, 0, 0] },
        config: { tension: 100, friction: 30 }
      },
      {
        from: { rotation: [0, 0, Math.PI], position: [0.3, 0, 0] },
        to: { rotation: [0, 0, 0], position: [0, 0, 0] },
        config: { tension: 100, friction: 30 }
      }
    ],
    loop: true
  },

  egg_hatch: {
    id: 'egg_hatch',
    keyframes: [
      {
        from: { scale: [1, 1, 1], opacity: 1 },
        to: { scale: [1.1, 1.1, 1.1], opacity: 0.8 },
        config: { tension: 200, friction: 60 }
      },
      {
        from: { scale: [1.1, 1.1, 1.1], opacity: 0.8 },
        to: { scale: [0.1, 0.1, 0.1], opacity: 0 },
        config: { tension: 300, friction: 80 }
      }
    ]
  },

  // General purpose animations
  fade_in: {
    id: 'fade_in',
    keyframes: [
      {
        from: { opacity: 0, scale: [0.8, 0.8, 0.8] },
        to: { opacity: 1, scale: [1, 1, 1] },
        config: { tension: 120, friction: 50 }
      }
    ]
  },

  bounce: {
    id: 'bounce',
    keyframes: [
      {
        from: { position: [0, 0, 0] },
        to: { position: [0, 1, 0] },
        config: { tension: 300, friction: 20 }
      },
      {
        from: { position: [0, 1, 0] },
        to: { position: [0, 0, 0] },
        config: { tension: 300, friction: 20 }
      }
    ],
    loop: true
  },

  spin: {
    id: 'spin',
    keyframes: [
      {
        from: { rotation: [0, 0, 0] },
        to: { rotation: [0, Math.PI * 2, 0] },
        config: { tension: 50, friction: 30 }
      }
    ],
    loop: true
  }
} as const;

// Performance monitoring for animations
export const useAnimationPerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    activeAnimations: 0,
    averageFrameTime: 0,
    droppedFrames: 0,
    memoryUsage: 0
  });

  const updateMetrics = (metrics: Partial<typeof performanceMetrics>) => {
    setPerformanceMetrics(prev => ({ ...prev, ...metrics }));
  };

  return {
    performanceMetrics,
    updateMetrics
  };
};
