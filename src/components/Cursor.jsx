import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// A small dot that trails the pointer, and swells into a word
// when it crosses anything carrying data-cursor="...".
// Only active on fine-pointer (mouse) devices — see index.css.
export default function Cursor() {
  const dotRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const label = labelRef.current
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.5, ease: 'power3' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    window.addEventListener('mousemove', move)

    const targets = document.querySelectorAll('[data-cursor]')
    const handlers = []
    targets.forEach((el) => {
      const enter = () => {
        gsap.to(dot, { scale: 1, duration: 0.35, ease: 'back.out(2)' })
        label.textContent = el.dataset.cursor
        gsap.to(label, { opacity: 1, duration: 0.2 })
      }
      const leave = () => {
        gsap.to(dot, { scale: 0.4, duration: 0.35, ease: 'power3.out' })
        gsap.to(label, { opacity: 0, duration: 0.15 })
      }
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
      handlers.push([el, enter, leave])
    })

    return () => {
      window.removeEventListener('mousemove', move)
      handlers.forEach(([el, enter, leave]) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor__dot">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </div>
  )
}
