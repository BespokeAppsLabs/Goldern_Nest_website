export { AnimatedChicken } from './animated-chicken';
export { AnimatedRooster } from './animated-rooster';
export { JumpingChick } from './jumping-chick';
export { StaticChicken } from './static-chicken';

// Simple prop interface for model components
export interface ModelProps {
  animation?: string;
  currentAnimation?: string;
  [key: string]: unknown;
}
