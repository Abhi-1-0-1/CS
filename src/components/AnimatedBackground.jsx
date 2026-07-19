import { motion } from 'framer-motion'
import useCursorGlow from '../hooks/useCursorGlow'

const colorVar = (name) => `var(--${name})`

export default function AnimatedBackground({ colors = ['blue', 'purple', 'teal'] }) {
  const style = {
    '--blob-1': colorVar(colors[0]),
    '--blob-2': colorVar(colors[1]),
    '--blob-3': colorVar(colors[2]),
  }
  const glow = useCursorGlow()

  return (
    <div className="bg-scene" style={style} aria-hidden="true">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      {glow.active && (
        <motion.div
          className="cursor-glow"
          style={{ left: glow.x, top: glow.y }}
        />
      )}
    </div>
  )
}
