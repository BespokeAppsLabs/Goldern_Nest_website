import { useThree, useFrame } from '@react-three/fiber';
import { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// TypeScript interfaces for scaling system
export interface ScalingConfig {
  baseScale: [number, number, number];
  breakpoints: {
    mobile: { scale: [number, number, number]; position: [number, number, number] };
    tablet: { scale: [number, number, number]; position: [number, number, number] };
    desktop: { scale: [number, number, number]; position: [number, number, number] };
    wide: { scale: [number, number, number]; position: [number, number, number] };
  };
  contentAware?: boolean;
  adaptiveScaling?: boolean;
}

export interface ResponsiveValues {
  scale: [number, number, number];
  position: [number, number, number];
  viewport: { width: number; height: number };
  size: { width: number; height: number };
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'wide';
}

// Default scaling configurations for different model types
export const SCALING_PRESETS = {
  chick: {
    baseScale: [0.003, 0.003, 0.003] as [number, number, number],
    breakpoints: {
      mobile: {
        scale: [0.002, 0.002, 0.002] as [number, number, number],
        position: [0, -0.3, 0] as [number, number, number]
      },
      tablet: {
        scale: [0.0025, 0.0025, 0.0025] as [number, number, number],
        position: [0, -0.4, 0] as [number, number, number]
      },
      desktop: {
        scale: [0.003, 0.003, 0.003] as [number, number, number],
        position: [0, -0.5, 0] as [number, number, number]
      },
      wide: {
        scale: [0.0035, 0.0035, 0.0035] as [number, number, number],
        position: [0, -0.5, 0] as [number, number, number]
      }
    },
    contentAware: true,
    adaptiveScaling: true
  },
  egg: {
    baseScale: [1, 1, 1] as [number, number, number],
    breakpoints: {
      mobile: {
        scale: [0.8, 0.8, 0.8] as [number, number, number],
        position: [0, 0, 0] as [number, number, number]
      },
      tablet: {
        scale: [0.9, 0.9, 0.9] as [number, number, number],
        position: [0, 0, 0] as [number, number, number]
      },
      desktop: {
        scale: [1, 1, 1] as [number, number, number],
        position: [0, 0, 0] as [number, number, number]
      },
      wide: {
        scale: [1.2, 1.2, 1.2] as [number, number, number],
        position: [0, 0, 0] as [number, number, number]
      }
    },
    contentAware: true,
    adaptiveScaling: true
  },
  farm: {
    baseScale: [1, 1, 1] as [number, number, number],
    breakpoints: {
      mobile: {
        scale: [0.5, 0.5, 0.5] as [number, number, number],
        position: [0, -1, 0] as [number, number, number]
      },
      tablet: {
        scale: [0.7, 0.7, 0.7] as [number, number, number],
        position: [0, -0.8, 0] as [number, number, number]
      },
      desktop: {
        scale: [1, 1, 1] as [number, number, number],
        position: [0, -0.5, 0] as [number, number, number]
      },
      wide: {
        scale: [1.3, 1.3, 1.3] as [number, number, number],
        position: [0, -0.5, 0] as [number, number, number]
      }
    },
    contentAware: true,
    adaptiveScaling: true
  }
} as const;

// Main dynamic scaling hook
export const useDynamicScaling = (config: ScalingConfig): ResponsiveValues => {
  const { viewport, size } = useThree();
  const [currentDeviceType, setCurrentDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | 'wide'>('desktop');

  // Determine device type based on screen size
  const deviceType = useMemo(() => {
    const width = size.width;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    if (width < 1440) return 'desktop';
    return 'wide';
  }, [size.width]);

  // Update device type when it changes
  useEffect(() => {
    setCurrentDeviceType(deviceType);
  }, [deviceType]);

  // Get responsive values based on device type
  const responsiveValues = useMemo(() => {
    const aspectRatio = size.width / size.height;
    return config.breakpoints[deviceType];
  }, [deviceType, config.breakpoints, size.width, size.height]);

  // Calculate content-aware scaling
  const contentAwareScale = useMemo(() => {
    if (!config.contentAware) {
      return responsiveValues.scale;
    }

    // Calculate scale factor based on viewport and content
    const scaleFactor = Math.min(viewport.width / 10, viewport.height / 6);

    // Apply adaptive scaling based on content
    if (config.adaptiveScaling) {
      const adaptiveFactor = Math.min(1, scaleFactor * 2);
      return responsiveValues.scale.map(s => s * adaptiveFactor) as [number, number, number];
    }

    return responsiveValues.scale.map(s => s * scaleFactor) as [number, number, number];
  }, [viewport, responsiveValues.scale, config.contentAware, config.adaptiveScaling]);

  return {
    scale: contentAwareScale,
    position: responsiveValues.position,
    viewport,
    size,
    deviceType: currentDeviceType
  };
};

// Advanced scaling hook with bounding box calculations
export const useAdvancedScaling = (
  config: ScalingConfig,
  boundingBox?: THREE.Box3
) => {
  const baseScaling = useDynamicScaling(config);
  const { camera } = useThree();

  // Calculate optimal scale based on bounding box
  const optimalScale = useMemo(() => {
    if (!boundingBox) return baseScaling.scale;

    const box = boundingBox;
    const size = new THREE.Vector3();
    box.getSize(size);

    // Calculate the maximum dimension
    const maxDim = Math.max(size.x, size.y, size.z);

    // Calculate camera distance for optimal viewing
    const cameraDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));

    // Adjust scale based on camera distance and bounding box
    const distanceFactor = Math.max(0.1, cameraDistance / 10);
    const scaleAdjustment = 1 / (maxDim * distanceFactor);

    return baseScaling.scale.map(s => s * scaleAdjustment) as [number, number, number];
  }, [boundingBox, camera.position, baseScaling.scale]);

  return {
    ...baseScaling,
    scale: optimalScale,
    boundingBox
  };
};

// Hook for managing multiple models with different scaling needs
export const useMultiModelScaling = (
  models: Array<{ id: string; config: ScalingConfig; boundingBox?: THREE.Box3 }>
) => {
  const { viewport, size } = useThree();

  const scaledModels = useMemo(() => {
    return models.map(model => {
      const scaling = useDynamicScaling(model.config);
      return {
        id: model.id,
        ...scaling,
        config: model.config
      };
    });
  }, [models, viewport, size]);

  return scaledModels;
};

// Utility function to calculate optimal camera position based on model scale
export const calculateOptimalCameraPosition = (
  modelScale: [number, number, number],
  modelPosition: [number, number, number],
  deviceType: string
): [number, number, number] => {
  const [scaleX, scaleY, scaleZ] = modelScale;
  const [posX, posY, posZ] = modelPosition;

  // Base distance calculations
  const baseDistance = Math.max(scaleX, scaleY, scaleZ) * 3;
  const heightOffset = Math.max(scaleY, 1) * 1.5;

  // Adjust based on device type
  const deviceMultipliers = {
    mobile: 1.2,
    tablet: 1.1,
    desktop: 1.0,
    wide: 0.9
  };

  const multiplier = deviceMultipliers[deviceType as keyof typeof deviceMultipliers] || 1.0;
  const adjustedDistance = baseDistance * multiplier;

  return [
    posX,
    posY + heightOffset,
    posZ + adjustedDistance
  ];
};

// Performance monitoring for scaling system
export const useScalingPerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    scaleCalculations: 0,
    averageCalculationTime: 0,
    lastCalculationTime: 0
  });

  const measureCalculation = (calculationTime: number) => {
    setPerformanceMetrics(prev => ({
      scaleCalculations: prev.scaleCalculations + 1,
      averageCalculationTime: (prev.averageCalculationTime * prev.scaleCalculations + calculationTime) / (prev.scaleCalculations + 1),
      lastCalculationTime: calculationTime
    }));
  };

  return {
    ...performanceMetrics,
    measureCalculation
  };
};

// Hook for responsive canvas sizing
export const useResponsiveCanvas = () => {
  const { size, viewport } = useThree();

  const canvasSize = useMemo(() => {
    const aspectRatio = size.width / size.height;

    // Calculate optimal canvas dimensions
    let width = size.width;
    let height = size.height;

    // Adjust for very wide or tall screens
    if (aspectRatio > 2.5) {
      width = height * 2.5;
    } else if (aspectRatio < 0.4) {
      height = width / 0.4;
    }

    return { width, height, aspectRatio };
  }, [size]);

  return {
    ...canvasSize,
    viewport,
    devicePixelRatio: window.devicePixelRatio || 1
  };
};
