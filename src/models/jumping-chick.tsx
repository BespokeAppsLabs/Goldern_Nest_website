'use client'

import { useRef, useEffect, JSX } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import type { Group } from 'three'
import { LoopRepeat } from 'three'

/**
 * JumpingChick component (TypeScript)
 *
 * - Logs available animation names so you can inspect them in console.
 * - Tries exact names 'walk'|'walking' (case variants), then falls back to
 *   a case-insensitive substring match, then finally to the first animation.
 * - Stops all other actions and fades in the selected walk action.
 *
 * Replace the path '/3d/jumping-chick.glb' if your asset path differs.
 */
export function JumpingChick(props: JSX.IntrinsicElements['group']) {
  // reference for the model root (used by useAnimations)
  const group = useRef<Group | null>(null)

  // load glb with nodes/materials/animations
  const { nodes, materials, animations } = useGLTF('/3d/jumping-chick.glb') as any

  // useAnimations returns { actions, mixer, names, clips } — actions keyed by clip.name
  const { actions } = useAnimations(animations, group as any)

  useEffect(() => {
    // nothing to do if actions not ready yet
    if (!actions || Object.keys(actions).length === 0) {
      return
    }

    console.log('[JumpingChick] Available actions:', Object.keys(actions));

    // --- DEBUG: print what we actually have so we can pick the right name ---
    try {
      console.debug('[JumpingChick] GLB animation clips:', animations.map((c: any) => c.name))
      console.debug('[JumpingChick] useAnimations action keys:', Object.keys(actions))
    } catch (err) {
      // swallow logging errors in production
    }

    // Helper: find a "walk" action robustly
    const findWalkAction = () => {
      const keys = Object.keys(actions)

      // 1) exact candidates (common names)
      const exactCandidates = ['walk', 'Walk', 'walking', 'Walking', 'walkCycle', 'WalkCycle', 'Armature|Animation']
      for (const name of exactCandidates) {
        if (actions[name]) return actions[name]
      }

      // 2) case-insensitive substring match on the action keys
      const substringKey = keys.find((k) => k.toLowerCase().includes('walk'))
      if (substringKey) return actions[substringKey]

      // 3) try to match using the raw animations array (some exporters may name tracks differently)
      const clipMatch = animations.find((c: any) => c.name && String(c.name).toLowerCase().includes('walk'))
      if (clipMatch && actions[clipMatch.name]) return actions[clipMatch.name]

      // 4) fallback: use the first available action (warn the user)
      if (keys.length > 0) {
        console.warn('[JumpingChick] No explicit "walk" animation found — falling back to first animation:', keys[0])
        return actions[keys[0]]
      }

      return null
    }

    const walkAction = findWalkAction()
    if (walkAction) {
      // stop other actions to avoid mixing multiple animations
      Object.values(actions).forEach((a) => {
        if (a !== walkAction) {
          try { a?.stop() } catch (e) { /* ignore */ }
        }
      })

      // make sure it loops and play it, with a small fade in for smoothness
      try {
        // ensure a repeating loop (infinite)
        // setLoop takes (mode, repetitions) — LoopRepeat is three.js constant
        walkAction.setLoop(LoopRepeat as any, Infinity)
        walkAction.reset()
        // fadeIn is available on AnimationAction — quick fade
        walkAction.fadeIn?.(0.2)
        walkAction.play()
      } catch (e) {
        // fallback: at least call play
        try { walkAction.play() } catch (_) {}
      }
    } else {
      console.warn('[JumpingChick] No animations available to play.')
    }

    // cleanup — stop all actions when unmounting
    return () => {
      Object.values(actions).forEach((a) => {
        try { a?.stop() } catch (_) {}
      })
    }
  }, [actions, animations])

  // render the model exactly like your original structure
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="4ca55330a8ae4c7b982346cd0ab93b7cfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Armature" scale={100}>
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_36"
                      geometry={(nodes as any).Object_36.geometry}
                      material={materials.chicken}
                      skeleton={(nodes as any).Object_36.skeleton}
                    />
                    <group name="Object_35" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                  </group>
                </group>
                <group name="CR_1044a_rig" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/3d/jumping-chick.glb')