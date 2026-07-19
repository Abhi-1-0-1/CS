import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="content" style={{ textAlign: 'center', padding: '120px 24px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ fontSize: 52, marginBottom: 18 }}
      >
        🧭
      </motion.div>
      <h1 className="page-title">Page not <em>found</em></h1>
      <p className="page-subtitle" style={{ margin: '10px auto 24px' }}>That chapter doesn't exist yet — or the link is off.</p>
      <Link to="/" className="site-link" style={{ display: 'inline-flex', border: '1px solid var(--border2)' }}>← Back to Home</Link>
    </div>
  )
}
