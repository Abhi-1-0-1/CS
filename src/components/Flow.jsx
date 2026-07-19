import { motion } from 'framer-motion'

export function FlowCol({ children, style }) {
  return (
    <motion.div
      className="flow-col"
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export function FlowBox({ children, variant, style }) {
  const cls = ['flow-box', variant].filter(Boolean).join(' ')
  return (
    <motion.div className={cls} style={style} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      {children}
    </motion.div>
  )
}

export function FlowArrow({ children = '↓' }) {
  return (
    <motion.div
      className="flow-arrow"
      animate={{ y: [0, 4, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export function FlowBranch({ children }) {
  return <div className="flow-branch">{children}</div>
}
