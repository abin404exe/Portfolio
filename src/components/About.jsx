import { useRef, useState } from 'react'
import gsap from 'gsap'
import { about } from '../data/about'

export default function About() {
  const [active, setActive] = useState(0)
  const imgRef = useRef(null)

  const goTo = (i) => {
    if (i === active || !imgRef.current) return
    gsap.to(imgRef.current, {
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        setActive(i)
        gsap.to(imgRef.current, { opacity: 1, duration: 0.25 })
      },
    })
  }

  return (
    <section className="about" id="about">
      <p className="about__kicker">About</p>

      <div className="about__grid">
        <div className="about__text">
          <h2 className="about__headline">
            Hi, I'm {about.firstName}
            <span className="about__dot">.</span>
          </h2>

          {about.paragraphs.map((p, i) => (
            <p key={i} className="about__para">
              {p}
            </p>
          ))}

          <div className="about__ctas">
            <a
              href={about.resumeUrl}
              className="pill pill--filled"
              data-cursor="download"
              download
            >
              Download resume ↓
            </a>
            <a
              href={`mailto:${about.email}`}
              className="pill pill--outline"
              data-cursor="email"
            >
              {about.email}
            </a>
          </div>
        </div>

        <div className="about__portrait">
          <div className="about__portrait-frame">
            <img
              ref={imgRef}
              src={about.images[active]}
              alt={`Portrait of ${about.firstName}`}
            />
          </div>
          {about.images.length > 1 && (
            <div className="about__dots">
              {about.images.map((_, i) => (
                <button
                  key={i}
                  className={
                    'about__dot-btn' +
                    (i === active ? ' about__dot-btn--active' : '')
                  }
                  onClick={() => goTo(i)}
                  aria-label={`Show image ${i + 1}`}
                  data-cursor="view"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}