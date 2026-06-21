import { useState } from 'react'

const faqs = [
  {
    q: 'How much do you charge?',
    a: 'For EMD funding: 5% upfront (covers up to 30 days) plus an additional 20% fee when the deal closes. Double close funding starts at 1.5%. Seller carryback / Stack Method starts at 2.5% for the added complexity. Rates may vary based on deal duration and risk.',
  },
  {
    q: 'Are there any upfront fees?',
    a: 'For EMD deals: yes, the 5% upfront fee is required to secure funding. For double closes and seller carrybacks: no upfront fees — we don\'t fund until closing, so there\'s nothing out of pocket beforehand.',
  },
  {
    q: 'What qualifies as a Double Close?',
    a: 'Two sequential transactions: you buy from the seller (A-B), then immediately sell to your end buyer (B-C). We fund the A-B leg so your spread stays private. Works at same or different title companies.',
  },
  {
    q: 'What qualifies as the Stack Method?',
    a: 'Layered financing using seller carryback notes, DSCR loans, or other creative structures stacked together to acquire a property. We provide the transactional bridge capital to make these deals executable.',
  },
  {
    q: 'Can you fund EMDs for end buyers?',
    a: 'No — we fund EMDs for investors and wholesalers using transactional strategies, not for retail end buyers purchasing primary residences.',
  },
  {
    q: 'Is there a maximum amount you can fund?',
    a: 'No hard cap. We have funded individual transactions exceeding $4 million. Large deals are reviewed case by case — contact us directly for jumbo transactions.',
  },
  {
    q: 'How quickly can you fund my deal?',
    a: 'Approval within 24–48 hours of a complete submission. Once approved and docs are in place, funds are wired to the title company in time for your scheduled closing.',
  },
  {
    q: "What happens if my deal doesn't close?",
    a: "For EMD deals: the EMD is sent back to us and your only cost is the upfront fee — nothing else. For double closes and seller carrybacks: no charge at all since we don't fund until closing.",
  },
]

export default function HeroFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-DEFAULT/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,112,243,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,243,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — Hero content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-blue-DEFAULT/10 border border-blue-DEFAULT/30 text-blue-bright text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 w-fit">
              <span className="w-1.5 h-1.5 bg-blue-bright rounded-full animate-pulse" />
              Trusted by Wholesalers Nationwide
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-tight mb-6">
              Close Your Deals
              <br />
              <span className="gradient-text">Without Using</span>
              <br />
              Your Own Cash
            </h1>

            <p className="text-white/60 text-lg max-w-lg mb-8 leading-relaxed">
              Fast transactional funding for EMDs, Double Closes, and Stack Method deals.
              We wire the funds — you keep the profit.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#funding-form"
                className="inline-flex items-center justify-center gap-2 bg-blue-DEFAULT hover:bg-blue-bright text-white font-bold px-7 py-4 rounded-xl transition-colors blue-glow"
              >
                Submit a Funding Request →
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-7 py-4 rounded-xl transition-colors"
              >
                How It Works
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {[
                { value: '$24M+', label: 'Funded (30 days)' },
                { value: '48hrs', label: 'Avg Approval' },
                { value: '$0', label: 'Upfront Fees' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black gradient-text">{s.value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — FAQ accordion */}
          <div className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto scrollbar-thin">
            <div className="mb-5">
              <p className="text-blue-bright text-xs font-semibold uppercase tracking-widest mb-1">FAQ</p>
              <h2 className="text-white text-2xl font-black">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-surface border border-white/5 hover:border-blue-DEFAULT/20 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className="text-white font-medium text-sm">{faq.q}</span>
                    <svg
                      className={`w-4 h-4 text-blue-bright flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {open === i && (
                    <div className="px-5 pb-4 text-white/55 text-sm leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/5">
              <p className="text-white/30 text-xs">
                Still have questions?{' '}
                <a href="mailto:funding@ifundyourdeals.com" className="text-blue-bright hover:text-white transition-colors">
                  funding@ifundyourdeals.com
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
