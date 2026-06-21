const problems = [
  {
    icon: '💸',
    title: 'Capital Tied Up',
    desc: "You found a great deal but don't have the cash to secure it. Your own money is locked in other investments.",
  },
  {
    icon: '⏱️',
    title: 'Deals Expiring Fast',
    desc: 'Sellers expect quick closings. Slow funding means losing the deal to another buyer who can move faster.',
  },
  {
    icon: '🏦',
    title: 'Banks Move Too Slow',
    desc: 'Traditional lenders take weeks. By the time you get approved, your contract is dead and the seller has moved on.',
  },
]

export default function Problem() {
  return (
    <section className="py-24 bg-surface relative">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16 section-fade">
          <p className="text-blue-bright text-sm font-semibold uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Great Deals Die Because of Funding
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            You know how to find the deals. The only thing standing between you and the profit is the capital.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="section-fade bg-surface-2 border border-white/5 rounded-2xl p-8 card-glow transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center section-fade">
          <div className="inline-block bg-blue-DEFAULT/10 border border-blue-DEFAULT/20 rounded-2xl px-8 py-6 max-w-2xl">
            <p className="text-white/80 text-lg font-medium">
              "Dealfuel steps in as your transactional lender — so you never have to walk away from a profitable deal again."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
