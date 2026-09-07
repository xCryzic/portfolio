import { useEffect, useRef, useState } from 'react'
import profileImage from '../pfp (1).png'

const navItems = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['research', 'Research'],
  ['helion', 'HELION'],
  ['contact', 'Contact'],
]

const projects = [
  {
    number: '01',
    title: 'HELION Techfest',
    category: 'Event · Technology · 2027',
    description: 'A student-hosted technology festival coming to Bangalore in 2027. I’m the Lead Organiser—shaping the event, not just its website.',
    url: 'https://heliontech.in',
    visual: 'helion',
    featured: true,
  },
  {
    number: '02',
    title: 'PDF Toolkit',
    category: 'Web tool · Local-first',
    description: 'A practical browser-based toolkit for everyday PDF operations. Simple, fast, and designed so files stay on the user’s device.',
    url: 'https://xcryzic.github.io/pdf-toolkit',
    visual: 'pdf',
  },
  {
    number: '03',
    title: 'Stardust Mirror Protocol',
    category: 'CTF · Cybersecurity',
    description: 'A cybersecurity challenge website built around traces, hidden details, and a mysterious protocol.',
    url: 'https://stardust-mirror-protocol.onrender.com',
    visual: 'stardust',
  },
  {
    number: '04',
    title: 'The University Guide',
    category: 'Student utility · Data',
    description: 'A university helper that makes information easier for students to explore, compare, and understand.',
    url: 'https://xcryzic.github.io/The-University-Guide',
    visual: 'guide',
  },
  {
    number: '05',
    title: 'Cryzic’s Waypoint',
    category: 'Day organiser · Retro-inspired',
    description: 'A deliberately simple, retro video game-styled day organiser for mapping daily quests and goals.',
    url: 'https://cryzics-waypoint.onrender.com',
    visual: 'waypoint',
  },
  {
    number: '06',
    title: 'UpNext',
    category: 'In development · Coming soon',
    description: 'I’m currently working on UpNext. More details will be shared soon.',
    url: "https://cryzic-upnext.vercel.app",
    visual: 'upnext',
  },
]

const interests = [
  'Artificial Intelligence',
  'Quantum Physics',
  'Astrophysics',
  'Web Development',
  'Technology',
  'Event Organisation',
]

const heroRoles = ['builder.', 'science explorer.', 'event organiser.']

function Arrow({ external = false }) {
  return <span aria-hidden="true">{external ? '↗' : '→'}</span>
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible')
        observer.unobserve(element)
      }
    }, { threshold: 0.13, rootMargin: '0px 0px -24px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <Tag ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</Tag>
}

function SectionHeading({ label, title, subtitle, align = 'left' }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <p className="section-kicker">{label}</p>
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  )
}

function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observers = navItems.map(([id]) => {
      const section = document.getElementById(id)
      if (!section) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id)
      }, { rootMargin: '-35% 0px -55%', threshold: 0 })
      observer.observe(section)
      return observer
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__identity" aria-label="xCryzic — home">
          <img src={profileImage} alt="" width="36" height="36" decoding="async" />
          <span><i>[</i> xCryzic <i>]</i></span>
        </a>
        <nav className="navbar__links" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
              {label}<span />
            </a>
          ))}
        </nav>
        <button className={`navbar__toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle navigation"><span /><span /><span /></button>
      </div>
      <nav id="mobile-nav" className={`navbar__mobile ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
        {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<Arrow /></a>)}
      </nav>
    </header>
  )
}

function Hero() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setWordIndex(index => (index + 1) % heroRoles.length), 2400)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__intro">Hello, I’m</p>
          <h1><span>x</span>Cryzic.</h1>
          <div className="hero__role" aria-label="Student, builder, science explorer, and event organiser"><span aria-hidden="true">Student &amp;&nbsp;</span><strong aria-hidden="true" key={heroRoles[wordIndex]}>{heroRoles[wordIndex]}</strong><i aria-hidden="true" /></div>
          <p className="hero__bio">Building things. Exploring ideas. I’m Lakshit Garg—a 15-year-old student curious about AI, physics, the web, and how ambitious ideas become real projects.</p>
          <div className="hero__actions">
            <a href="#projects" className="button button--primary">View my work <Arrow /></a>
            <a href="#about" className="button button--secondary">About me</a>
          </div>
        </div>
        <div className="hero__portrait-wrap">
          <div className="hero__dots" aria-hidden="true" />
          <div className="hero__ring" aria-hidden="true" />
          <img className="hero__portrait" src={profileImage} alt="xCryzic profile image" width="1280" height="1280" decoding="async" fetchPriority="high" />
          <span className="hero__portrait-label">LAKSHIT GARG / XCRYZIC</span>
        </div>
      </div>
      <a href="#about" className="hero__scroll" aria-label="Scroll to about section"><span /> Scroll</a>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeading label="About me" title="Curious by default." subtitle="A short introduction, without the corporate biography." />
        <div className="about__grid">
          <Reveal className="about-card about-card--wide">
            <span className="card-index">01</span>
            <h3>Lakshit Garg, usually xCryzic.</h3>
            <p>I’m a 15-year-old student interested in AI, quantum physics, astrophysics, web development, and technology. I like turning ideas into actual things—websites, tools, experiments, and events.</p>
          </Reveal>
          <Reveal className="about-card" delay={90}>
            <span className="card-index">02</span>
            <h3>What I’m exploring</h3>
            <p>How science explains the world, how software can make information useful, and how both can create memorable experiences.</p>
          </Reveal>
          <Reveal className="about-card" delay={180}>
            <span className="card-index">03</span>
            <h3>What I like making</h3>
            <p>Practical tools, unusual web experiments, clear explanations, and spaces where curious people can build together.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Interests() {
  const repeated = [...interests, ...interests]
  return (
    <section className="interests section" aria-labelledby="interests-title">
      <div className="container interests__heading">
        <Reveal>
          <p className="section-kicker">Interests</p>
          <h2 id="interests-title">Ideas I keep returning to.</h2>
          <p className="section-subtitle">Not a skills scoreboard—just the subjects that keep pulling me in.</p>
        </Reveal>
      </div>
      <Reveal className="marquee" delay={120}>
        <div className="marquee__fade marquee__fade--left" />
        <div className="marquee__track">{repeated.map((interest, index) => <span key={`${interest}-${index}`}>{interest}<i>↗</i></span>)}</div>
        <div className="marquee__fade marquee__fade--right" />
      </Reveal>
      <Reveal className="marquee marquee--reverse" delay={180}>
        <div className="marquee__fade marquee__fade--left" />
        <div className="marquee__track">{[...repeated].reverse().map((interest, index) => <span key={`${interest}-r-${index}`}>{interest}<i>+</i></span>)}</div>
        <div className="marquee__fade marquee__fade--right" />
      </Reveal>
    </section>
  )
}

function ProjectArtwork({ type }) {
  if (type === 'helion') return <div className="art art--helion"><span>H</span><p>TECHFEST<br />BANGALORE<br />2027</p><i /><i /></div>
  if (type === 'pdf') return <div className="art art--pdf"><div><b>PDF</b><span>LOCAL / PRIVATE</span></div><div /><div /></div>
  if (type === 'stardust') return <div className="art art--stardust"><p><span>mirror://</span> protocol.trace()</p><strong>STARDUST<br />SIGNAL FOUND</strong><small>CTF / 03</small></div>
  if (type === 'waypoint') return <div className="art art--waypoint"><div className="waypoint-top"><strong>◆ WAYPOINT</strong><span>QUEST LOG / DAY 01</span></div><div className="waypoint-window"><p>MY QUESTS</p><div className="waypoint-row"><span>01</span><strong>PLAN THE DAY</strong><i>ACTIVE</i></div><div className="waypoint-row"><span>02</span><strong>FINISH WHAT MATTERS</strong><i>2 / 4</i></div><div className="waypoint-progress"><span>ROADMAP PROGRESS</span><div><i /></div></div></div><span className="waypoint-corner waypoint-corner--one" /><span className="waypoint-corner waypoint-corner--two" /></div>
  if (type === 'guide') return <div className="art art--guide"><span>EXPLORE / COMPARE</span><div>{[58, 78, 44, 89].map((height, index) => <i key={index} style={{ '--height': `${height}%` }} />)}</div><strong>UNIVERSITY<br />GUIDE</strong></div>
  return <div className="art art--upnext"><span>UP/NEXT</span><div><i /><i /><i /></div><strong>DETAILS<br />COMING SOON</strong></div>
}

function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <SectionHeading label="Selected projects" title="Things I’ve built." subtitle="A small collection of useful tools, experiments, and one technology festival in the making." />
        <Reveal className="projects__notice"><span>Development note</span><p>Some projects are still under development and may be temporarily unavailable or not work as expected.</p></Reveal>
        <div className="projects__grid">
          {projects.map((project, index) => {
            const ProjectContainer = project.url ? 'a' : 'div'
            const linkProps = project.url ? { href: project.url, target: '_blank', rel: 'noreferrer', 'aria-label': `Open ${project.title}` } : { className: 'project__shell' }
            return (
            <Reveal key={project.title} className={`project ${project.featured ? 'project--featured' : ''} ${project.url ? '' : 'project--pending'}`} delay={(index % 2) * 100} as="article">
              <ProjectContainer {...linkProps}>
                <div className="project__visual"><ProjectArtwork type={project.visual} /><span className="project__number">{project.number}</span></div>
                <div className="project__body">
                  <p className="project__category">{project.category}</p>
                  <div className="project__title-row"><h3>{project.title}</h3><span className="project__arrow"><Arrow external={Boolean(project.url)} /></span></div>
                  <p>{project.description}</p>
                  <span className="project__visit">{project.url ? 'Visit project' : 'Details coming soon'} <Arrow external={Boolean(project.url)} /></span>
                </div>
              </ProjectContainer>
            </Reveal>
          )})}
        </div>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="research section">
      <div className="container research__grid">
        <Reveal className="research__copy">
          <p className="section-kicker">Research / exploration</p>
          <h2>Bell States</h2>
          <p className="research__lead">An exploration of quantum mechanics leading to Bell states.</p>
          <p>This paper is a fundamentals-level journey through the concepts—not a claim of groundbreaking original research. It is how I worked toward understanding the ideas clearly.</p>
          <a className="paper-link" href="https://xcryzic.github.io/physics-archive" target="_blank" rel="noreferrer">Read the exploration <Arrow external /></a>
        </Reveal>
        <Reveal className="research__figure" delay={120}>
          <div className="research__figure-head"><span>FIG. 01</span><span>TWO-QUBIT STATE</span></div>
          <div className="bell-diagram" aria-hidden="true">
            <span className="qubit qubit--a">q₀</span>
            <span className="qubit qubit--b">q₁</span>
            <svg viewBox="0 0 600 280">
              <path d="M80 140 C160 20 220 250 300 140 S450 25 520 140" />
              <path d="M80 140 C160 260 220 30 300 140 S450 255 520 140" />
              <line x1="300" y1="35" x2="300" y2="245" />
            </svg>
            <code>|Φ⁺⟩ = (|00⟩ + |11⟩) / √2</code>
          </div>
          <div className="research__figure-foot"><span>SUPERPOSITION</span><span>CORRELATION</span><span>MEASUREMENT</span></div>
        </Reveal>
      </div>
    </section>
  )
}

function Helion() {
  return (
    <section id="helion" className="helion section">
      <div className="container">
        <Reveal className="helion__panel">
          <div className="helion__mark"><span>H</span><i /></div>
          <div className="helion__content">
            <p className="section-kicker">Organisation / Bangalore / 2027</p>
            <h2>Lead Organiser of<br />HELION Techfest 2027.</h2>
            <p>HELION is an upcoming student-hosted technology festival in Bangalore. I’m helping lead the event itself—its direction, organisation, identity, technology, and the team bringing it to life.</p>
            <a href="https://heliontech.in" target="_blank" rel="noreferrer" className="button button--light">Visit HELION <Arrow external /></a>
          </div>
          <span className="helion__year">2027</span>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copyDiscord = async () => {
    await navigator.clipboard?.writeText('cryzicx.')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="contact section">
      <div className="container contact__inner">
        <SectionHeading label="Contact" title="Want to talk?" subtitle="You can DM me anytime." />
        <Reveal className="contact__links" delay={100}>
          <a href="https://github.com/xcryzic" target="_blank" rel="noreferrer"><span>GitHub</span><strong>@xcryzic</strong><Arrow external /></a>
          <button type="button" onClick={copyDiscord}><span>Discord · click to copy</span><strong>cryzicx.</strong><Arrow /></button>
        </Reveal>
        <div className={`copy-toast ${copied ? 'is-visible' : ''}`} role="status">Discord username copied.</div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div><a href="#home" className="footer__brand">xCryzic</a><p>Still building.</p></div>
        <nav aria-label="Footer navigation"><a href="#about">About</a><a href="#projects">Projects</a><a href="#research">Research</a><a href="https://heliontech.in" target="_blank" rel="noreferrer">HELION</a></nav>
        <p className="footer__copyright">© {new Date().getFullYear()} xCryzic</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <Navigation />
      <main><Hero /><About /><Interests /><Projects /><Research /><Helion /><Contact /></main>
      <Footer />
    </>
  )
}

export default App
