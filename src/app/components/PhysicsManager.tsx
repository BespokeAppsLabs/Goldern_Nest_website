import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// TypeScript interfaces for physics system
export interface PhysicsBody {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  mass: number;
  radius: number;
  friction: number;
  restitution: number; // Bounciness
  fixed: boolean; // Static body
  group?: string; // Collision group
}

export interface Force {
  type: 'gravity' | 'wind' | 'magnet' | 'spring' | 'buoyancy' | 'drag';
  strength: number;
  direction?: THREE.Vector3;
  position?: THREE.Vector3;
  range?: number;
}

export interface Collision {
  bodyA: PhysicsBody;
  bodyB: PhysicsBody;
  normal: THREE.Vector3;
  penetration: number;
  point: THREE.Vector3;
}

export interface PhysicsWorld {
  bodies: Map<string, PhysicsBody>;
  forces: Force[];
  bounds: {
    min: THREE.Vector3;
    max: THREE.Vector3;
  };
  gravity: THREE.Vector3;
  timeStep: number;
}

// Physics World Manager
export class PhysicsWorldManager {
  private world: PhysicsWorld;
  private collisionPairs: Set<string> = new Set();

  constructor(
    bounds: { min: THREE.Vector3; max: THREE.Vector3 },
    gravity: THREE.Vector3 = new THREE.Vector3(0, -9.81, 0),
    timeStep: number = 1/60
  ) {
    this.world = {
      bodies: new Map(),
      forces: [],
      bounds,
      gravity,
      timeStep
    };
  }

  addBody(body: PhysicsBody): void {
    this.world.bodies.set(body.id, body);
  }

  removeBody(id: string): void {
    this.world.bodies.delete(id);
  }

  addForce(force: Force): void {
    this.world.forces.push(force);
  }

  removeForce(index: number): void {
    this.world.forces.splice(index, 1);
  }

  update(): void {
    // Apply forces
    this.applyForces();

    // Integrate physics
    this.integrate();

    // Handle collisions
    this.handleCollisions();

    // Apply constraints
    this.applyConstraints();
  }

  private applyForces(): void {
    for (const [id, body] of this.world.bodies) {
      if (body.fixed) continue;

      // Reset acceleration
      body.acceleration.copy(this.world.gravity);

      // Apply world forces
      for (const force of this.world.forces) {
        this.applyForceToBody(body, force);
      }

      // Apply friction
      body.velocity.multiplyScalar(1 - body.friction * this.world.timeStep);
    }
  }

  private applyForceToBody(body: PhysicsBody, force: Force): void {
    switch (force.type) {
      case 'gravity':
        body.acceleration.add(force.direction!.clone().multiplyScalar(force.strength));
        break;
      case 'wind':
        if (force.direction) {
          body.acceleration.add(force.direction.clone().multiplyScalar(force.strength / body.mass));
        }
        break;
      case 'drag':
        const dragForce = body.velocity.clone().normalize().multiplyScalar(-force.strength * body.velocity.lengthSq());
        body.acceleration.add(dragForce.divideScalar(body.mass));
        break;
      case 'magnet':
        if (force.position) {
          const direction = force.position.clone().sub(body.position).normalize();
          const distance = body.position.distanceTo(force.position);
          if (distance > 0) {
            const magnetForce = direction.multiplyScalar(force.strength / (distance * distance));
            body.acceleration.add(magnetForce.divideScalar(body.mass));
          }
        }
        break;
    }
  }

  private integrate(): void {
    for (const [id, body] of this.world.bodies) {
      if (body.fixed) continue;

      // Verlet integration for stability
      const deltaTime = this.world.timeStep;

      // Update velocity
      body.velocity.add(body.acceleration.clone().multiplyScalar(deltaTime));

      // Update position
      body.position.add(body.velocity.clone().multiplyScalar(deltaTime));
    }
  }

  private handleCollisions(): void {
    const bodies = Array.from(this.world.bodies.values());
    const collisions: Collision[] = [];

    // Broad phase: check all pairs
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const bodyA = bodies[i];
        const bodyB = bodies[j];

        // Skip fixed bodies
        if (bodyA.fixed && bodyB.fixed) continue;

        // Skip same group collisions if specified
        if (bodyA.group && bodyB.group && bodyA.group === bodyB.group) continue;

        const collision = this.checkCollision(bodyA, bodyB);
        if (collision) {
          collisions.push(collision);
        }
      }
    }

    // Resolve collisions
    for (const collision of collisions) {
      this.resolveCollision(collision);
    }
  }

  private checkCollision(bodyA: PhysicsBody, bodyB: PhysicsBody): Collision | null {
    const distance = bodyA.position.distanceTo(bodyB.position);
    const minDistance = bodyA.radius + bodyB.radius;

    if (distance < minDistance) {
      const normal = bodyB.position.clone().sub(bodyA.position).normalize();
      const penetration = minDistance - distance;
      const point = bodyA.position.clone().add(normal.clone().multiplyScalar(bodyA.radius));

      return {
        bodyA,
        bodyB,
        normal,
        penetration,
        point
      };
    }

    return null;
  }

  private resolveCollision(collision: Collision): void {
    const { bodyA, bodyB, normal, penetration } = collision;

    // Separate bodies
    const separation = normal.clone().multiplyScalar(penetration * 0.5);
    if (!bodyA.fixed) bodyA.position.sub(separation);
    if (!bodyB.fixed) bodyB.position.add(separation);

    // Calculate relative velocity
    const relativeVelocity = bodyB.velocity.clone().sub(bodyA.velocity);
    const velocityAlongNormal = relativeVelocity.dot(normal);

    // Do not resolve if velocities are separating
    if (velocityAlongNormal > 0) return;

    // Calculate restitution
    const restitution = Math.min(bodyA.restitution, bodyB.restitution);

    // Calculate impulse scalar
    const impulseScalar = -(1 + restitution) * velocityAlongNormal;
    const totalMass = bodyA.mass + bodyB.mass;

    if (totalMass > 0) {
      const impulse = normal.clone().multiplyScalar(impulseScalar / totalMass);

      // Apply impulse
      if (!bodyA.fixed) {
        bodyA.velocity.sub(impulse.clone().multiplyScalar(bodyB.mass));
      }
      if (!bodyB.fixed) {
        bodyB.velocity.add(impulse.clone().multiplyScalar(bodyA.mass));
      }
    }
  }

  private applyConstraints(): void {
    const { min, max } = this.world.bounds;

    for (const [id, body] of this.world.bodies) {
      if (body.fixed) continue;

      // Boundary collisions
      if (body.position.x - body.radius < min.x) {
        body.position.x = min.x + body.radius;
        body.velocity.x *= -body.restitution;
      }
      if (body.position.x + body.radius > max.x) {
        body.position.x = max.x - body.radius;
        body.velocity.x *= -body.restitution;
      }

      if (body.position.y - body.radius < min.y) {
        body.position.y = min.y + body.radius;
        body.velocity.y *= -body.restitution;
      }
      if (body.position.y + body.radius > max.y) {
        body.position.y = max.y - body.radius;
        body.velocity.y *= -body.restitution;
      }

      if (body.position.z - body.radius < min.z) {
        body.position.z = min.z + body.radius;
        body.velocity.z *= -body.restitution;
      }
      if (body.position.z + body.radius > max.z) {
        body.position.z = max.z - body.radius;
        body.velocity.z *= -body.restitution;
      }
    }
  }

  getWorld(): PhysicsWorld {
    return this.world;
  }

  getBody(id: string): PhysicsBody | undefined {
    return this.world.bodies.get(id);
  }

  setGravity(gravity: THREE.Vector3): void {
    this.world.gravity.copy(gravity);
  }

  setBounds(bounds: { min: THREE.Vector3; max: THREE.Vector3 }): void {
    this.world.bounds = bounds;
  }
}

// React hook for physics simulation
export const usePhysicsSimulation = (
  initialBodies: PhysicsBody[] = [],
  worldConfig: {
    bounds?: { min: THREE.Vector3; max: THREE.Vector3 };
    gravity?: THREE.Vector3;
    timeStep?: number;
  } = {}
) => {
  const physicsManager = useRef<PhysicsWorldManager | null>(null);
  const [bodies, setBodies] = useState<Map<string, PhysicsBody>>(new Map());
  const [isRunning, setIsRunning] = useState(true);

  // Initialize physics world
  useEffect(() => {
    const bounds = worldConfig.bounds || {
      min: new THREE.Vector3(-10, -10, -10),
      max: new THREE.Vector3(10, 10, 10)
    };

    physicsManager.current = new PhysicsWorldManager(
      bounds,
      worldConfig.gravity,
      worldConfig.timeStep
    );

    // Add initial bodies
    for (const body of initialBodies) {
      physicsManager.current.addBody(body);
    }

    return () => {
      // Cleanup
    };
  }, [initialBodies, worldConfig]);

  // Update physics simulation
  useFrame(() => {
    if (!physicsManager.current || !isRunning) return;

    physicsManager.current.update();
    setBodies(new Map(physicsManager.current.getWorld().bodies));
  });

  const addBody = useCallback((body: PhysicsBody) => {
    physicsManager.current?.addBody(body);
  }, []);

  const removeBody = useCallback((id: string) => {
    physicsManager.current?.removeBody(id);
  }, []);

  const addForce = useCallback((force: Force) => {
    physicsManager.current?.addForce(force);
  }, []);

  const setRunning = useCallback((running: boolean) => {
    setIsRunning(running);
  }, []);

  return {
    bodies,
    isRunning,
    addBody,
    removeBody,
    addForce,
    setRunning,
    physicsManager: physicsManager.current
  };
};

// Hook for individual physics body
export const usePhysicsBody = (
  id: string,
  initialConfig: {
    position?: THREE.Vector3;
    velocity?: THREE.Vector3;
    mass?: number;
    radius?: number;
    friction?: number;
    restitution?: number;
    fixed?: boolean;
  }
) => {
  const bodyRef = useRef<THREE.Group>(null);
  const [physicsBody, setPhysicsBody] = useState<PhysicsBody>();

  useEffect(() => {
    const body: PhysicsBody = {
      id,
      position: initialConfig.position || new THREE.Vector3(),
      velocity: initialConfig.velocity || new THREE.Vector3(),
      acceleration: new THREE.Vector3(),
      mass: initialConfig.mass || 1,
      radius: initialConfig.radius || 1,
      friction: initialConfig.friction || 0.1,
      restitution: initialConfig.restitution || 0.8,
      fixed: initialConfig.fixed || false
    };

    setPhysicsBody(body);
  }, [id, initialConfig]);

  // Sync physics body with Three.js object
  useFrame(() => {
    if (bodyRef.current && physicsBody) {
      bodyRef.current.position.copy(physicsBody.position);
    }
  });

  return {
    bodyRef,
    physicsBody,
    setPosition: (position: THREE.Vector3) => {
      if (physicsBody) {
        physicsBody.position.copy(position);
      }
    },
    setVelocity: (velocity: THREE.Vector3) => {
      if (physicsBody) {
        physicsBody.velocity.copy(velocity);
      }
    },
    applyForce: (force: THREE.Vector3) => {
      if (physicsBody) {
        physicsBody.acceleration.add(force.clone().divideScalar(physicsBody.mass));
      }
    }
  };
};

// Predefined physics scenarios
export const PHYSICS_PRESETS = {
  chick_behavior: {
    mass: 0.5,
    radius: 0.5,
    friction: 0.3,
    restitution: 0.6,
    gravity: new THREE.Vector3(0, -4.9, 0), // Reduced gravity for cuteness
    forces: [
      { type: 'wind' as const, strength: 0.1, direction: new THREE.Vector3(0.01, 0, 0) },
      { type: 'drag' as const, strength: 0.02 }
    ]
  },

  egg_physics: {
    mass: 0.1,
    radius: 0.3,
    friction: 0.1,
    restitution: 0.3,
    gravity: new THREE.Vector3(0, -9.81, 0),
    forces: [
      { type: 'drag' as const, strength: 0.05 },
      { type: 'wind' as const, strength: 0.02, direction: new THREE.Vector3(0.005, 0, 0) }
    ]
  },

  playground: {
    gravity: new THREE.Vector3(0, -9.81, 0),
    bounds: {
      min: new THREE.Vector3(-5, -5, -5),
      max: new THREE.Vector3(5, 5, 5)
    },
    forces: [
      { type: 'wind' as const, strength: 0.05, direction: new THREE.Vector3(0.01, 0, 0) },
      { type: 'magnet' as const, strength: 2, position: new THREE.Vector3(0, 2, 0), range: 3 }
    ]
  }
} as const;

// Performance monitoring for physics
export const usePhysicsPerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    bodiesCount: 0,
    collisionChecks: 0,
    averageUpdateTime: 0,
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

// Joint/constraint system for connected bodies
export const usePhysicsConstraints = (
  bodyA: PhysicsBody,
  bodyB: PhysicsBody,
  constraint: {
    type: 'distance' | 'hinge' | 'fixed';
    distance?: number;
    axis?: THREE.Vector3;
  }
) => {
  const [constraintActive, setConstraintActive] = useState(true);

  useFrame(() => {
    if (!constraintActive) return;

    switch (constraint.type) {
      case 'distance':
        const currentDistance = bodyA.position.distanceTo(bodyB.position);
        const targetDistance = constraint.distance || 1;

        if (Math.abs(currentDistance - targetDistance) > 0.01) {
          const direction = bodyB.position.clone().sub(bodyA.position).normalize();
          const correction = direction.multiplyScalar((currentDistance - targetDistance) * 0.5);

          if (!bodyA.fixed) bodyA.position.add(correction);
          if (!bodyB.fixed) bodyB.position.sub(correction);
        }
        break;

      case 'hinge':
        // Simplified hinge - keep bodies at fixed distance and aligned
        const hingeAxis = constraint.axis || new THREE.Vector3(0, 1, 0);
        // Implementation would go here
        break;
    }
  });

  return {
    constraintActive,
    setConstraintActive
  };
};
