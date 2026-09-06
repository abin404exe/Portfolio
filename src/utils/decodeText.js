import gsap from 'gsap'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01#/*_'

// Scrambles each character of `el`'s text into place, left to right,
// like a value settling out of noise. Used by the hero headline and
// the preloader's status word — the one shared "signature" text effect
// on the site.
export function decodeText(el, { delay = 0 } = {}) {
  const finalText = el.textContent
  const letters = finalText.split('')

  const state = { progress: 0 }
  return gsap.to(state, {
    progress: 1,
    delay,
    duration: letters.length * 0.045 + 0.4,
    ease: 'none',
    onUpdate: () => {
      const revealCount = Math.floor(state.progress * letters.length)
      el.textContent = letters
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < revealCount) return ch
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
    },
    onComplete: () => {
      el.textContent = finalText
    },
  })
}