import { useState } from 'react'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  return (
    <>
      {/* Cursor mounts immediately — otherwise the real cursor is hidden
          (see index.css `cursor: none`) with nothing to replace it while
          the preloader is up. */}
      <Cursor />

      {showPreloader && (
        <Preloader
          onCountComplete={() => setLoaded(true)}
          onExitComplete={() => setShowPreloader(false)}
        />
      )}

      {loaded && (
        <>
          <nav className="nav">
            <a href="#top" className="nav__mark" data-cursor="top">
              AB
            </a>
            <div className="nav__links">
              <a href="#work" data-cursor="go">
                work
              </a>
              <a href="#about" data-cursor="go">
                about
              </a>
              <a href="#contact" data-cursor="go">
                contact
              </a>
            </div>
            <span className="nav__status">
              <span className="nav__status-dot" />
              Open to work
            </span>
          </nav>
          <main>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}