import { useState } from 'react'
import { motion } from 'framer-motion'
import { highlightPy, highlightSql } from '../lib/highlight'
import { handleSpotlightMove } from '../lib/spotlight'
import NoteToken from './NoteToken'

/**
 * Splits raw code into an ordered list of plain / annotated segments.
 * Each note's `match` is looked up as a literal substring; notes are
 * applied in the order their match first appears, and never overlap.
 */
function buildSegments(code, notes) {
  if (!notes || !notes.length) return [{ type: 'plain', text: code }]

  const found = []
  for (const n of notes) {
    const start = code.indexOf(n.match)
    if (start === -1) continue // silently skip a note whose text drifted out of sync
    found.push({ start, end: start + n.match.length, text: n.match, note: n.note })
  }
  found.sort((a, b) => a.start - b.start)

  const clean = []
  let cursor = 0
  for (const m of found) {
    if (m.start < cursor) continue // drop overlaps, keep the earlier one
    clean.push(m)
    cursor = m.end
  }

  const segments = []
  let pos = 0
  for (const m of clean) {
    if (m.start > pos) segments.push({ type: 'plain', text: code.slice(pos, m.start) })
    segments.push({ type: 'note', text: m.text, note: m.note })
    pos = m.end
  }
  if (pos < code.length) segments.push({ type: 'plain', text: code.slice(pos) })
  return segments
}

export default function CodeBlock({ label, code, lang = 'py', notes }) {
  const [copied, setCopied] = useState(false)
  const trimmed = code.trim()
  const highlight = lang === 'sql' ? highlightSql : highlightPy
  const hasNotes = notes && notes.length > 0
  const segments = hasNotes ? buildSegments(trimmed, notes) : null

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  return (
    <motion.div
      className="code-block"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      {(label || hasNotes) && (
        <div className="pre-label">
          <span>{label || 'Example'}</span>
          <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={onCopy}>
            {copied ? '✓ copied' : 'copy'}
          </button>
        </div>
      )}
      <pre className="spotlight" onMouseMove={handleSpotlightMove}>
        <code>
          {hasNotes
            ? segments.map((seg, i) =>
                seg.type === 'note'
                  ? <NoteToken key={i} html={highlight(seg.text)} note={seg.note} />
                  : <span key={i} dangerouslySetInnerHTML={{ __html: highlight(seg.text) }} />
              )
            : <span dangerouslySetInnerHTML={{ __html: highlight(trimmed) }} />}
        </code>
      </pre>
      {hasNotes && (
        <div className="code-legend"><span className="swatch" />hover or tap the underlined parts for an explanation</div>
      )}
    </motion.div>
  )
}
