import React, { createContext, useContext, useReducer, useRef, useEffect, ReactNode } from 'react';
import * as THREE from 'three';

// TypeScript interfaces for the scene management system
export interface ModelConfig {
  id: string;
  url?: string;
  scale: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  animations?: AnimationConfig[];
  visible?: boolean;
  interactive?: boolean;
  type: 'gltf' | 'procedural';
  proceduralData?: {
    geometry?: 'egg' | 'sphere' | 'cube' | 'chicken';
    material?: 'standard' | 'custom';
    texture?: string;
  };
}

export interface AnimationConfig {
  name: string;
  loop: boolean;
  speed: number;
  onStart?: () => void;
  onEnd?: () => void;
}

export interface SceneState {
  models: Map<string, ModelConfig>;
  lights: LightConfig[];
  camera: CameraConfig;
  isLoading: boolean;
  loadedModels: string[];
  activeAnimations: string[];
  selectedModel: string | null;
}

export interface LightConfig {
  id: string;
  type: 'ambient' | 'directional' | 'point' | 'spot';
  intensity: number;
  position?: [number, number, number];
  color?: string;
  castShadow?: boolean;
}

export interface CameraConfig {
  position: [number, number, number];
  fov: number;
  near: number;
  far: number;
  target?: [number, number, number];
}

// Action types for the scene reducer
type SceneAction =
  | { type: 'ADD_MODEL'; payload: ModelConfig }
  | { type: 'REMOVE_MODEL'; payload: { id: string } }
  | { type: 'UPDATE_MODEL'; payload: { id: string; config: Partial<ModelConfig> } }
  | { type: 'MODEL_LOADED'; payload: { id: string } }
  | { type: 'MODEL_LOADING_FAILED'; payload: { id: string; error: Error } }
  | { type: 'SELECT_MODEL'; payload: { id: string | null } }
  | { type: 'TOGGLE_ANIMATION'; payload: { modelId: string; animationName: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_CAMERA'; payload: Partial<CameraConfig> };

// Initial state
const initialState: SceneState = {
  models: new Map(),
  lights: [
    {
      id: 'ambient',
      type: 'ambient',
      intensity: 0.6,
      color: '#ffffff'
    },
    {
      id: 'directional',
      type: 'directional',
      intensity: 0.8,
      position: [5, 5, 5],
      castShadow: true
    }
  ],
  camera: {
    position: [0, 1, 5],
    fov: 50,
    near: 0.1,
    far: 1000,
    target: [0, 0, 0]
  },
  isLoading: false,
  loadedModels: [],
  activeAnimations: [],
  selectedModel: null
};

// Scene reducer
function sceneReducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'ADD_MODEL':
      const newModels = new Map(state.models);
      newModels.set(action.payload.id, action.payload);
      return {
        ...state,
        models: newModels
      };

    case 'REMOVE_MODEL':
      const filteredModels = new Map(state.models);
      filteredModels.delete(action.payload.id);
      return {
        ...state,
        models: filteredModels,
        loadedModels: state.loadedModels.filter(id => id !== action.payload.id)
      };

    case 'UPDATE_MODEL':
      const updatedModels = new Map(state.models);
      const existingModel = updatedModels.get(action.payload.id);
      if (existingModel) {
        updatedModels.set(action.payload.id, { ...existingModel, ...action.payload.config });
      }
      return {
        ...state,
        models: updatedModels
      };

    case 'MODEL_LOADED':
      return {
        ...state,
        loadedModels: [...state.loadedModels, action.payload.id],
        isLoading: state.models.size > state.loadedModels.length + 1
      };

    case 'MODEL_LOADING_FAILED':
      console.error(`Failed to load model ${action.payload.id}:`, action.payload.error);
      return {
        ...state,
        isLoading: state.models.size > state.loadedModels.length
      };

    case 'SELECT_MODEL':
      return {
        ...state,
        selectedModel: action.payload.id
      };

    case 'TOGGLE_ANIMATION':
      const animationKey = `${action.payload.modelId}-${action.payload.animationName}`;
      const isActive = state.activeAnimations.includes(animationKey);
      return {
        ...state,
        activeAnimations: isActive
          ? state.activeAnimations.filter(key => key !== animationKey)
          : [...state.activeAnimations, animationKey]
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'UPDATE_CAMERA':
      return {
        ...state,
        camera: { ...state.camera, ...action.payload }
      };

    default:
      return state;
  }
}

// Context
const SceneContext = createContext<{
  state: SceneState;
  dispatch: React.Dispatch<SceneAction>;
  addModel: (config: ModelConfig) => void;
  removeModel: (id: string) => void;
  updateModel: (id: string, config: Partial<ModelConfig>) => void;
  selectModel: (id: string | null) => void;
  toggleAnimation: (modelId: string, animationName: string) => void;
} | null>(null);

// Provider component
export function SceneProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sceneReducer, initialState);

  // Helper functions
  const addModel = (config: ModelConfig) => {
    dispatch({ type: 'ADD_MODEL', payload: config });
  };

  const removeModel = (id: string) => {
    dispatch({ type: 'REMOVE_MODEL', payload: { id } });
  };

  const updateModel = (id: string, config: Partial<ModelConfig>) => {
    dispatch({ type: 'UPDATE_MODEL', payload: { id, config } });
  };

  const selectModel = (id: string | null) => {
    dispatch({ type: 'SELECT_MODEL', payload: { id } });
  };

  const toggleAnimation = (modelId: string, animationName: string) => {
    dispatch({ type: 'TOGGLE_ANIMATION', payload: { modelId, animationName } });
  };

  return (
    <SceneContext.Provider
      value={{
        state,
        dispatch,
        addModel,
        removeModel,
        updateModel,
        selectModel,
        toggleAnimation
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

// Hook to use the scene context
export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};

// Scene manager hook for advanced scene operations
export const useSceneManager = () => {
  const { state, dispatch } = useScene();
  const sceneRef = useRef<THREE.Scene | null>(null);

  // Initialize scene
  useEffect(() => {
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
    }
  }, []);

  // Load model helper
  const loadModel = async (modelId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const model = state.models.get(modelId);
      if (!model) throw new Error(`Model ${modelId} not found`);

      if (model.type === 'gltf' && model.url) {
        // Handle GLTF loading
        const { useGLTF } = await import('@react-three/drei');
        const gltf = useGLTF(model.url);
        // Model loading logic would go here
      }

      dispatch({ type: 'MODEL_LOADED', payload: { id: modelId } });
    } catch (error) {
      dispatch({
        type: 'MODEL_LOADING_FAILED',
        payload: { id: modelId, error: error as Error }
      });
    }
  };

  // Batch load models
  const loadModels = async (modelIds: string[]) => {
    await Promise.all(modelIds.map(id => loadModel(id)));
  };

  // Get model by ID
  const getModel = (id: string) => state.models.get(id);

  // Get all visible models
  const getVisibleModels = () => Array.from(state.models.values()).filter(model => model.visible !== false);

  // Get models by type
  const getModelsByType = (type: ModelConfig['type']) =>
    Array.from(state.models.values()).filter(model => model.type === type);

  return {
    scene: sceneRef.current,
    models: state.models,
    lights: state.lights,
    camera: state.camera,
    isLoading: state.isLoading,
    loadedModels: state.loadedModels,
    activeAnimations: state.activeAnimations,
    selectedModel: state.selectedModel,
    loadModel,
    loadModels,
    getModel,
    getVisibleModels,
    getModelsByType
  };
};

// Predefined model configurations
export const MODEL_PRESETS = {
  chick: {
    scale: [0.003, 0.003, 0.003] as [number, number, number],
    position: [0, -0.5, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    type: 'gltf' as const,
    url: '/models/chick.glb'
  },
  egg: {
    scale: [1, 1, 1] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    type: 'procedural' as const,
    proceduralData: {
      geometry: 'egg' as const,
      material: 'custom' as const
    }
  },
  farm: {
    scale: [1, 1, 1] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    type: 'gltf' as const,
    url: '/models/farm.glb'
  }
} as const;
