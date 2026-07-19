import { motion } from 'framer-motion'
import Reveal from './Reveal'

/** Small schema diagram: 1-2 tables with PK/FK-tagged fields, optionally linked by a key. */
export function ERD({ tables, linkLabel }) {
  return (
    <Reveal>
      <div className="erd-row">
        {tables.map((t, i) => (
          <motion.div key={t.name} whileHover={{ y: -4 }} style={{ display: 'contents' }}>
            <div className="erd-table">
              <div className="erd-table-title">{t.name}</div>
              {t.fields.map((f) => (
                <div key={f.name} className={`erd-field${f.pk ? ' pk' : ''}${f.fk ? ' fk' : ''}`}>
                  <span>{f.name}</span>
                  <span className="tag">{f.pk ? 'PK' : f.fk ? 'FK' : f.type}</span>
                </div>
              ))}
            </div>
            {i === 0 && tables.length > 1 && (
              <div className="erd-link">
                <svg viewBox="0 0 44 16"><line x1="0" y1="8" x2="44" y2="8" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowhead)" /><defs><marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor" /></marker></defs></svg>
                {linkLabel}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Reveal>
  )
}

/** Two overlapping circles illustrating how a join relates two tables. */
export function JoinVenn({ leftLabel, rightLabel, mode = 'equi', leftColor = 'blue', rightColor = 'green', note }) {
  const overlap = mode === 'cross' ? 0 : 60
  return (
    <Reveal>
      <div className="venn-row">
        <div className="venn" style={{ width: 190 - overlap + 60 }}>
          <motion.div
            className="venn-circle"
            style={{ background: `var(--${leftColor})`, left: 0, top: 0 }}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="venn-circle"
            style={{ background: `var(--${rightColor})`, left: 120 - overlap, top: 0 }}
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <div className="venn-label">{leftLabel} {mode === 'cross' ? '  ' : '∩'} {rightLabel}</div>
        </div>
        {note && <p style={{ maxWidth: 260, fontSize: 13 }}>{note}</p>}
      </div>
    </Reveal>
  )
}

/** Renders a small "this is what the query returns" result table. */
export function OutputTable({ head, rows, caption }) {
  return (
    <Reveal className="output-wrap">
      <div className="output-label"><span className="live-dot" />{caption || 'Sample Output'}</div>
      <div className="output-table-wrap table-wrap">
        <table>
          <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}
