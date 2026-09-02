import Cursor from './components/Cursor'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

export default function App() {
  return (
    <>
      <Cursor />
      <nav className="nav">
        <a href="#top" className="nav__mark" data-cursor="top">
          JR
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
  )
}