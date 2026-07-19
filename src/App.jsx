import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import AnimatedBackground from './components/AnimatedBackground'
import ReadingProgress from './components/ReadingProgress'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from './pages/Home'
import FileHandling from './pages/FileHandling'
import Exceptions from './pages/Exceptions'
import Functions from './pages/Functions'
import DataStructures from './pages/DataStructures'
import SQL from './pages/SQL'
import NotFound from './pages/NotFound'

const BLOBS = {
  '/': ['blue', 'purple', 'pink'],
  '/file-handling': ['blue', 'teal', 'purple'],
  '/exceptions': ['red', 'coral', 'purple'],
  '/functions': ['purple', 'pink', 'blue'],
  '/data-structures': ['teal', 'blue', 'green'],
  '/sql': ['green', 'teal', 'blue'],
}

function ScrollToTopOnNav() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const blobs = BLOBS[location.pathname] || ['blue', 'purple', 'teal']

  return (
    <>
      <AnimatedBackground colors={blobs} />
      <ReadingProgress />
      <Nav />
      <ScrollToTopOnNav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/file-handling" element={<FileHandling />} />
            <Route path="/exceptions" element={<Exceptions />} />
            <Route path="/functions" element={<Functions />} />
            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/sql" element={<SQL />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
