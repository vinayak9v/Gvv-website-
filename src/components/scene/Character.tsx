'use client'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Props = {
  url: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animationName?: string
  fadeDuration?: number
}

export default function Character({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animationName,
  fadeDuration = 0.5,
}: Props) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(url)
  const { actions, names } = useAnimations(animations, group)
  const currentAction = useRef<string | null>(null)

  useEffect(() => {
    console.log(`[${url}] animations available:`, names)
  }, [url, names])

  useEffect(() => {
    if (!animationName || !actions[animationName]) return

    const nextAction = actions[animationName]
    const prevName = currentAction.current
    const prevAction = prevName ? actions[prevName] : null

    if (prevAction && prevName !== animationName) {
      prevAction.fadeOut(fadeDuration)
    }

    nextAction!
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(fadeDuration)
      .play()

    currentAction.current = animationName

    return () => {
      nextAction?.fadeOut(fadeDuration)
    }
  }, [animationName, actions, fadeDuration])

  return (
    <primitive
      ref={group}
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
      dispose={null}
    />
  )
}