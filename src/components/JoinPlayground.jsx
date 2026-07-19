import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { JoinVenn, OutputTable } from './SqlViz'

const MODES = {
  cross: {
    label: 'CROSS JOIN',
    color: 'coral',
    vennMode: 'cross',
    vennNote: 'No matching condition — every food pairs with every company.',
    head: ['item_name', 'company_id', 'company_name'],
    rows: [
      ['Wheat Flour', 'C1', 'Sunrise Foods'],
      ['Wheat Flour', 'C1', 'Golden Harvest'],
      ['Wheat Flour', 'C1', 'Ocean Fresh'],
      ['Rice', 'C2', 'Sunrise Foods'],
    ],
    caption: 'CROSS JOIN → 12 rows total (4 shown) — every food × every company',
  },
  equi: {
    label: 'EQUI-JOIN',
    color: 'blue',
    vennMode: 'equi',
    vennNote: 'WHERE foods.company_id = company.company_id keeps only the real matches.',
    head: ['item_name', 'company_id', 'company_name'],
    rows: [
      ['Wheat Flour', 'C1', 'Sunrise Foods'],
      ['Sugar', 'C1', 'Sunrise Foods'],
      ['Rice', 'C2', 'Golden Harvest'],
    ],
    caption: 'EQUI-JOIN → 3 rows — Olive Oil (C4) and Ocean Fresh (C3) drop out, no match either side.',
  },
  natural: {
    label: 'NATURAL JOIN',
    color: 'teal',
    vennMode: 'equi',
    vennNote: 'Matches automatically on the shared column name — no WHERE written at all.',
    head: ['company_id', 'item_name', 'company_name'],
    rows: [
      ['C1', 'Wheat Flour', 'Sunrise Foods'],
      ['C1', 'Sugar', 'Sunrise Foods'],
      ['C2', 'Rice', 'Golden Harvest'],
    ],
    caption: 'NATURAL JOIN → same 3 rows as the equi-join, found automatically instead of hand-written.',
  },
}

export default function JoinPlayground() {
  const [mode, setMode] = useState('cross')
  const m = MODES[mode]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 24px', margin: '22px 0' }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 14 }}>
        🎮 Playground — same two tables, switch the join type
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {Object.entries(MODES).map(([key, cfg]) => (
          <motion.button
            key={key}
            onClick={() => setMode(key)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 16px', borderRadius: 100, fontSize: 12.5, fontWeight: 600,
              border: '1px solid', cursor: 'pointer', fontFamily: 'inherit',
              opacity: mode === key ? 1 : 0.5,
              background: mode === key ? `var(--${cfg.color}-dim)` : 'transparent',
              color: `var(--${cfg.color})`, borderColor: `var(--${cfg.color})`,
              transition: 'opacity .2s',
            }}
          >
            {cfg.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <JoinVenn leftLabel="foods" rightLabel="company" mode={m.vennMode} leftColor="blue" rightColor="green" note={m.vennNote} />
          <OutputTable caption={m.label} head={m.head} rows={m.rows} />
          <p style={{ fontSize: 12.5, color: 'var(--muted)' }}>{m.caption}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
