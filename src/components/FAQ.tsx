import { useState } from 'react'

const faqs = [
  {
    q: 'How much do you charge?',
    a: 'Our fees vary by deal type and transaction size. For EMDs and Double Closes, fees typically range from 1–3% of the funded amount. Stack Method deals are quoted on a case-by-case basis. All fees are disclosed upfront before you commit — no surprises at closing.',
  },
  {
    q: 'Are there any upfront fees?',
    a: 'No. We charge zero upfront fees. Our fee is collected at closing directly from the transaction proceeds. You never pay out of pocket before your deal is done.',
  },
  {
    q: 'What qualifies as a Double Close?',
    a: 'A Double Close involves two sequential transactions: you buy the property from the seller (A-B), then immediately sell it to your end buyer (B-C). Both can happen at the same title company or at different title companies. We fund the A-B purchase so you can complete both legs and keep your spread private.',
  },
  {
    q: 'What qualifies as the Stack Method?',
    a: 'The Stack Method uses layered financing — often combining a seller carryback note, a DSCR loan, or another creative finance structure to acquire a property. We provide the transactional bridge capital that makes these stacked deals executable.',
  },
  {
    q: 'Can you fund EMDs for end buyers?',
    a: 'No. We fund EMDs for real estate investors and wholesalers who are using transactional strategies — not for retail end buyers purchasing primary residences. Our products are designed for investors.',
  },
  {
    q: 'Is there a maximum amount you can fund?',
    a: 'We have no hard cap. We have funded individual transactions exceeding $4 million. Large deals are reviewed on a case-by-case basis. Contact us directly for high-volume or jumbo transactions.',
  },
  {
    q: 'How quickly can you fund my deal?',
    a: 'Approval typically happens within 24–48 hours of receiving a complete submission. Once approved and all documents are in place, funds are wired to the title company in time for your scheduled closing.',
  },
  {
    q: "What happens if my deal doesn't close?",
    a: "If the deal falls through after funding is issued, our agreement spells out the resolution process. We work through each situation individually. In general, the funded amount is returned to us from the escrow — your personal liability depends on the specifics of the deal and what's in our agreement.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 section-fade">
          <p className="text-blue-bright text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Everything you need to know before submitting your first deal.
          </p>
        </div>

        <div className="space-y-3 section-fade">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-blue-DEFAULT/20 transition-colors"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-medium text-sm sm:text-base">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-blue-bright flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center section-fade">
          <p className="text-white/40 text-sm mb-4">Still have questions?</p>
          <a
            href="mailto:funding@dealfuel.com"
            className="text-blue-bright hover:text-white text-sm font-medium transition-colors"
          >
            Email us at funding@dealfuel.com →
          </a>
        </div>
      </div>
    </section>
  )
}
