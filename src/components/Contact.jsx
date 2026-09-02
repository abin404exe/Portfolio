export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h2 className="contact__heading">
        Say hi, or send
        <br />
        me a bug report.
      </h2>
      <div className="contact__links">
        <a
          href="mailto:jordan@example.com"
          data-cursor="email"
          className="contact__link"
        >
          jordan@example.com
        </a>
        <a
          href="https://github.com/yourhandle"
          data-cursor="visit"
          className="contact__link"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourhandle"
          data-cursor="visit"
          className="contact__link"
        >
          LinkedIn
        </a>
      </div>
      <p className="contact__footer">
        Built with React and GSAP. No template. Year one.
      </p>
    </section>
  )
}
