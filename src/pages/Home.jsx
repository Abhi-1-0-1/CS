import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { chapters } from '../data/chapters'
import useTilt from '../hooks/useTilt'
import { handleSpotlightMove } from '../lib/spotlight'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function SubjectCard({ c }) {
  const tilt = useTilt(6)

  if (!c.ready) {
    return (
      <motion.div variants={item} className={`subject-card accent-${c.color} is-soon`}>
        <div className="subject-card-top">
          <div className="subject-icon">{c.icon}</div>
          <div className="subject-status soon">Soon</div>
        </div>
        <div className="subject-num">Chapter {c.num}</div>
        <div className="subject-name">{c.label}</div>
        <p className="subject-desc">{c.desc}</p>
      </motion.div>
    )
  }
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={tilt.style}
      {...tilt.handlers}
    >
      <Link
        to={c.path}
        className={`subject-card spotlight accent-${c.color}`}
        onMouseMove={(e) => { handleSpotlightMove(e); tilt.handlers.onMouseMove(e) }}
        onMouseLeave={tilt.handlers.onMouseLeave}
      >
        <div className="subject-card-top">
          <div className="subject-icon">{c.icon}</div>
          <div className="subject-status ready">Ready</div>
        </div>
        <div className="subject-num">Chapter {c.num}</div>
        <div className="subject-name">{c.label}</div>
        <p className="subject-desc">{c.desc}</p>
        <div className="subject-topics">
          {c.topics.map((t) => <span className="subject-topic" key={t}>{t}</span>)}
        </div>
      </Link>
    </motion.div>
  )
}

export default function Home() {
  const ready = chapters.filter((c) => c.ready)
  const soon = chapters.filter((c) => !c.ready)

  return (
    <>
      <header className="hub-hero">
        <motion.div className="hub-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          Class 12 · Computer Science
        </motion.div>
        <motion.h1
          className="hub-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Your entire syllabus,<br /><span className="gradient-text">one set of notes.</span>
        </motion.h1>
        <motion.p
          className="hub-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Concise, exam-focused revision notes for the full CS syllabus — File Handling, Exceptions, Functions,
          Data Structures, SQL and Computer Networks, all in one consistent format.
        </motion.p>
      </header>

      <main className="hub-content">
        <div className="hub-section-label">Available now</div>
        <motion.div className="subject-grid" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {ready.map((c) => <SubjectCard c={c} key={c.id} />)}
        </motion.div>

        <div className="hub-section-label">Coming soon</div>
        <motion.div className="subject-grid" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {soon.map((c) => <SubjectCard c={c} key={c.id} />)}
        </motion.div>
      </main>
    </>
  )
}
