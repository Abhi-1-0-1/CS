import { useId, useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const TOOLTIP_MAX_WIDTH = 280
const EDGE_MARGIN = 12

export default function NoteToken({ html, note }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const ref = useRef(null)
  const tooltipId = useId()

  const updateCoords = () => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const vw = window.innerWidth
    const half = TOOLTIP_MAX_WIDTH / 2
    const rawLeft = rect.left + rect.width / 2
    const left = Math.max(half + EDGE_MARGIN, Math.min(rawLeft, vw - half - EDGE_MARGIN))
    // top = the token's own top edge — the anchor wrapper below shifts
    // itself fully above this point via CSS transform, so this stays the
    // token's position, not a pre-computed "above" position.
    setCoords({ top: rect.top, left })
  }

  const show = () => { updateCoords(); setOpen(true) }
  const hide = () => setOpen(false)
  const onKeyDown = (e) => { if (e.key === 'Escape') hide() }

  useEffect(() => {
    if (!open) return
    window.addEventListener('scroll', hide, true)
    window.addEventListener('resize', hide)
    return () => {
      window.removeEventListener('scroll', hide, true)
      window.removeEventListener('resize', hide)
    }
  }, [open])

  return (
    <>
      <span
        ref={ref}
        className={`note-token${open ? ' is-open' : ''}`}
        tabIndex={0}
        role="button"
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={() => (open ? hide() : show())}
        onKeyDown={onKeyDown}
      >
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </span>

      {open && coords && createPortal(
        // This outer element is a PLAIN div, not a framer-motion component —
        // it owns the static "sit above and centered on the anchor" transform.
        // Framer Motion only ever touches the inner motion.div's transform
        // (for the fade/scale animation), so the two transforms can never
        // clobber each other.
        <div className="note-tooltip-anchor" style={{ top: coords.top, left: coords.left }}>
          <AnimatePresence>
            <motion.div
              role="tooltip"
              id={tooltipId}
              className="note-tooltip"
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
            >
              {note}
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </>
  )
}
