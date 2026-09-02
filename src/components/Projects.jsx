import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Pinned horizontal scroll only above ~800px wide — below that,
    // the rail becomes a normal vertical stack (see App.css).
    mm.add('(min-width: 800px)', () => {
      const track = trackRef.current
      const distance = track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      return () => tween.scrollTrigger?.kill()
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="projects" id="work" ref={sectionRef}>
      <div className="projects__track" ref={trackRef}>
        <div className="projects__intro">
          <p className="projects__kicker">Selected work</p>
          <h2 className="projects__heading">
            A handful of things
            <br />
            I've actually shipped.
          </h2>
        </div>

        {projects.map((p) => (
          <article className="project-card" key={p.id}>
            <span className="project-card__id">{p.id}</span>
            <h3 className="project-card__name">{p.name}</h3>
            <p className="project-card__role">
              {p.role} · {p.year}
            </p>
            <p className="project-card__blurb">{p.blurb}</p>
            <ul className="project-card__stack">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <a
              className="project-card__link"
              href={p.link}
              data-cursor="view"
            >
              View project
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
