import { motion } from 'framer-motion'

export default function ChapterHero({ eyebrow, titlePre, titleEm, subtitle, pills, activeId, color }) {
  return (
    <motion.header
      className="page-header"
      style={{ '--hero-accent': `var(--${color})` }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chapter-label">{eyebrow}</div>
      <h1 className="page-title">{titlePre} <em>{titleEm}</em></h1>
      <p className="page-subtitle">{subtitle}</p>
      <div className="toc-pills">
        {pills.map((p, i) => (
          <motion.a
            key={p.id}
            href={`#${p.id}`}
            className={`toc-pill pill-${color}${activeId === p.id ? ' is-active' : ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04, duration: 0.35 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            {p.icon} {p.label}
          </motion.a>
        ))}
      </div>
    </motion.header>
  )
}
