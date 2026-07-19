import Reveal from './Reveal'
import { handleSpotlightMove } from '../lib/spotlight'

export function Section({ id, color, icon, num, title, desc, children, first }) {
  return (
    <>
      <Reveal>
        <div id={id} className={`section-divider sd-${color}`} style={first ? undefined : { marginTop: 72 }}>
          <div className="section-icon">{icon}</div>
          <div className="section-num">Section {num}</div>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </div>
      </Reveal>
      {children}
    </>
  )
}

export function Subsection({ title, color = 'blue', children }) {
  return (
    <Reveal className="subsection" y={16}>
      {title && (
        <h3 className="subsection-title">
          <span className={`dot dot-${color}`} />
          {title}
        </h3>
      )}
      {children}
    </Reveal>
  )
}

export function Callout({ type = 'note', title, children }) {
  const icon = { note: '📌', warning: '⚠', tip: '💡', danger: '🚨' }[type]
  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-title">{icon} {title}</div>
      <p>{children}</p>
    </div>
  )
}

export function CardGrid({ children }) {
  return <div className="card-grid">{children}</div>
}

export function Card({ icon, title, children }) {
  return (
    <div className="card spotlight" onMouseMove={handleSpotlightMove}>
      {icon && <div className="card-icon">{icon}</div>}
      <div className="card-title">{title}</div>
      <div className="card-desc">{children}</div>
    </div>
  )
}

export function Compare({ children }) {
  return <div className="compare">{children}</div>
}

export function CompareCard({ title, color, children }) {
  return (
    <div className="compare-card spotlight" onMouseMove={handleSpotlightMove}>
      <div className="compare-card-title" style={color ? { color: `var(--${color})` } : undefined}>{title}</div>
      {children}
    </div>
  )
}

export function Steps({ items }) {
  return (
    <div className="steps">
      {items.map((text, i) => (
        <div className="step" key={i}>
          <div className="step-num">{i + 1}</div>
          <div className="step-text" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      ))}
    </div>
  )
}

export function SummaryStrip({ items }) {
  return (
    <div className="summary-strip">
      <h4>⚡ Exam Quick-Fire Reminders</h4>
      <div className="strip-row">
        {items.map(([left, right], i) => (
          <div className="strip-item" key={i}>
            <span dangerouslySetInnerHTML={{ __html: left }} />
            <span className="arr">→</span>
            <span dangerouslySetInnerHTML={{ __html: right }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TableWrap({ head, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
