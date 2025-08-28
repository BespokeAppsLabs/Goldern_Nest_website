import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const modelPaths = [
  '/3d/animated-chicken.glb',
  '/3d/animated-rooster.glb',
  '/3d/jumping-chick.glb',
  '/3d/static-chicken.glb'
];

export function useModelPreloader() {
  useEffect(() => {
    // Preload all models on app start
    modelPaths.forEach(path => {
      useGLTF.preload(path);
    });
  }, []);
}
