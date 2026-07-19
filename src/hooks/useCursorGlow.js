import { useEffect } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function useCursorGlow() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const sx = useSpring(x, { stiffness: 45, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 45, damping: 20, mass: 0.6 })

  // A window-level event is genuinely "an external system" React can't
  // subscribe to via JSX props — this is exactly the case react.dev
  // recommends useEffect for.
  useEffect(() => {
    if (reduce) return
    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [reduce, x, y])

  return { x: sx, y: sy, active: !reduce }
}
