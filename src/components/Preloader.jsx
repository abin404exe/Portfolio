import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { decodeText } from '../utils/decodeText'

const STATUS_WORDS = ['booting up', 'compiling', 'almost there']

// Counts 0 → 100 with an eased, slightly organic pace (not a flat linear
// tick), then the whole overlay slides up off-screen like a blind
// lifting. `onCountComplete` fires the moment it hits 100 — that's when
// the parent should mount the real page, so its own entrance animation
// plays as part of this reveal. `onExitComplete` fires once the curtain
// has fully cleared, so the parent can unmount this component.
export default function Preloader({ onCountComplete, onExitComplete }) {
  const rootRef = useRef(null)
  const innerRef = useRef(null)
  const numberRef = useRef(null)
  const statusRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const counter = { value: 0 }
    const tl = gsap.timeline()

    STATUS_WORDS.forEach((word, i) => {
      tl.call(
        () => {
          statusRef.current.textContent = word
          decodeText(statusRef.current)
        },
        null,
        i * 0.8
      )
    })

    tl.to(
      counter,
      {
        value: 100,
        duration: 2.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.floor(counter.value)
          numberRef.current.textContent = v
          gsap.set(barRef.current, { scaleX: v / 100 })
        },
      },
      0
    )

    tl.call(() => onCountComplete?.())
    tl.to(innerRef.current, { scale: 0.94, opacity: 0.6, duration: 0.25, ease: 'power2.in' })
    tl.to(
      rootRef.current,
      { yPercent: -100, duration: 1, ease: 'power4.inOut' },
      '-=0.05'
    )
    tl.call(() => {
      document.body.style.overflow = prevOverflow
      onExitComplete?.()
    })

    return () => {
      tl.kill()
      document.body.style.overflow = prevOverflow
    }
  }, [])

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader__inner" ref={innerRef}>
        <span className="preloader__status" ref={statusRef} />
        <div className="preloader__count">
          <span ref={numberRef}>0</span>
          <span className="preloader__percent">%</span>
        </div>
        <div className="preloader__bar-track">
          <div className="preloader__bar" ref={barRef} />
        </div>
      </div>
    </div>
  )
}