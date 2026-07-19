import { useMotionValue, useTransform, useReducedMotion } from 'framer-motion'

export default function useTilt(strength = 10) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-60, 60], [strength, -strength])
  const rotateY = useTransform(x, [-60, 60], [-strength, strength])

  const onMouseMove = (e) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return {
    style: reduce ? undefined : { rotateX, rotateY, transformPerspective: 800 },
    handlers: { onMouseMove, onMouseLeave },
  }
}
