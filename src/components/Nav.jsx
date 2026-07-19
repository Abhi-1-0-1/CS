import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { chapters } from '../data/chapters'

export default function Nav() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  const NavItem = ({ to, color, children, mobile }) => {
    const active = to === '/' ? location.pathname === '/' : location.pathname === to
    return (
      <Link to={to} className={`site-link${active ? ' active' : ''}`}>
        {active && !mobile && (
          <motion.span className="nav-pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
        )}
        <span className="dot-sm" style={{ background: `var(--${color})` }} />
        {children}
      </Link>
    )
  }

  return (
    <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-nav-inner">
        <Link to="/" className="site-logo">
          <motion.span
            className="logo-mark"
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}
          >
            🐍
          </motion.span>
          Class 12 CS Notes
        </Link>

        <div className="site-links">
          <NavItem to="/" color="blue">Home</NavItem>
          {chapters.filter((c) => c.ready).map((c) => (
            <NavItem key={c.id} to={c.path} color={c.color}>{c.shortLabel}</NavItem>
          ))}
          {chapters.filter((c) => !c.ready).map((c) => (
            <span key={c.id} className="site-link disabled">
              <span className="dot-sm" style={{ background: `var(--${c.color})` }} />
              {c.shortLabel} <span className="soon-tag">Soon</span>
            </span>
          ))}
        </div>

        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="mobile-menu-inner">
              <NavItem to="/" color="blue" mobile>Home</NavItem>
              {chapters.filter((c) => c.ready).map((c) => (
                <NavItem key={c.id} to={c.path} color={c.color} mobile>{c.label}</NavItem>
              ))}
              {chapters.filter((c) => !c.ready).map((c) => (
                <span key={c.id} className="site-link disabled">
                  <span className="dot-sm" style={{ background: `var(--${c.color})` }} />
                  {c.label} <span className="soon-tag">Soon</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
