import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Products', href: '#products' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-white">i</span>
            <span className="gradient-text">Fund</span>
            <span className="text-white">YourDeals</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#funding-form"
          className="hidden md:inline-flex items-center gap-2 bg-blue-DEFAULT hover:bg-blue-bright text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors blue-glow"
        >
          Submit Funding Request
        </a>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            {menuOpen ? (
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white font-medium py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#funding-form"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-DEFAULT text-white font-semibold px-5 py-3 rounded-lg text-center"
          >
            Submit Funding Request
          </a>
        </div>
      )}
    </nav>
  )
}
