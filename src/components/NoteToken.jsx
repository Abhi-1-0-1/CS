import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function NoteToken({ html, note }) {
  const [open, setOpen] = useState(false)
  const tooltipId = useId()

  const show = () => setOpen(true)
  const hide = () => setOpen(false)
  const onKeyDown = (e) => {
    if (e.key === 'Escape') hide()
  }

  return (
    <span
      className={`note-token${open ? ' is-open' : ''}`}
      tabIndex={0}
      role="button"
      aria-describedby={open ? tooltipId : undefined}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={onKeyDown}
    >
      <span dangerouslySetInnerHTML={{ __html: html }} />
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            id={tooltipId}
            className="note-tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {note}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
