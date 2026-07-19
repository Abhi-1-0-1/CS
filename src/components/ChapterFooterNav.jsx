import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getNeighbors } from '../data/chapters'

export default function ChapterFooterNav({ id }) {
  const { prev, next } = getNeighbors(id)
  return (
    <div className="chapter-footer">
      {prev ? (
        <motion.div whileHover={{ y: -3 }}>
          <Link to={prev.path} className="chapter-nav-link">
            <span className="chapter-nav-eyebrow">← Previous chapter</span>
            <span className="chapter-nav-title">{prev.label}</span>
          </Link>
        </motion.div>
      ) : (
        <motion.div whileHover={{ y: -3 }}>
          <Link to="/" className="chapter-nav-link">
            <span className="chapter-nav-eyebrow">← Back to</span>
            <span className="chapter-nav-title">All Chapters</span>
          </Link>
        </motion.div>
      )}
      {next ? (
        <motion.div whileHover={{ y: -3 }}>
          <Link to={next.path} className="chapter-nav-link next">
            <span className="chapter-nav-eyebrow">Next chapter →</span>
            <span className="chapter-nav-title">{next.label}</span>
          </Link>
        </motion.div>
      ) : (
        <motion.div whileHover={{ y: -3 }}>
          <Link to="/" className="chapter-nav-link next">
            <span className="chapter-nav-eyebrow">🎉 That's the syllabus →</span>
            <span className="chapter-nav-title">Back to All Chapters</span>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
