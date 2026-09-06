import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { decodeText } from '../utils/decodeText'

export default function Hero() {
  const line1 = useRef(null)
  const line2 = useRef(null)
  const meta = useRef(null)
  const cue = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.add(decodeText(line1.current))
      tl.add(decodeText(line2.current, { delay: 0 }), '<0.15')
      tl.from(meta.current, { opacity: 0, y: 8, duration: 0.6 }, '-=0.3')
      tl.from(cue.current, { opacity: 0, duration: 0.8 }, '-=0.2')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero__body">
        <h1 className="hero__headline">
          <span ref={line1} className="hero__line">
            Full-stack developer.
          </span>
          <span ref={line2} className="hero__line hero__line--accent">
            One year in, moving fast.
          </span>
        </h1>
        <p ref={meta} className="hero__meta">
          Abin Babu — building web products end to end since 2025.
          Based remote, open to work.
        </p>
      </div>
      <div ref={cue} className="hero__cue">
        <span>scroll</span>
        <span className="hero__cue-line" />
      </div>
    </section>
  )
}