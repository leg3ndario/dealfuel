const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Real Estate Wholesaler — Atlanta, GA',
    quote: "iFundYourDeals saved a $90,000 double close that I almost had to walk away from. They approved it same day and the funds were at the title company the next morning. Exactly what I needed.",
    rating: 5,
  },
  {
    name: 'Priya S.',
    role: 'Investor & Wholesaler — Phoenix, AZ',
    quote: "I've used iFundYourDeals on four deals now. The process is straightforward, no hidden fees, and they actually pick up the phone. I don't even shop around anymore — they're my go-to.",
    rating: 5,
  },
  {
    name: 'DeShawn R.',
    role: 'Wholesale Investor — Dallas, TX',
    quote: "Used them for a Stack Method deal with a big spread. They funded over $1.2M without blinking. The whole thing closed smoothly and I walked away with my biggest check yet.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 section-fade">
          <p className="text-blue-bright text-sm font-semibold uppercase tracking-widest mb-3">Social Proof</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Wholesalers Trust iFundYourDeals to Deliver
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Don't take our word for it — here's what investors say after using iFundYourDeals to close their deals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="section-fade bg-surface-2 border border-white/5 rounded-2xl p-8 flex flex-col gap-4 card-glow transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/40 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
