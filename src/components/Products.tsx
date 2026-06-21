const products = [
  {
    icon: '🏠',
    title: 'Earnest Money Deposit (EMD)',
    badge: 'Most Common',
    badgeColor: 'bg-blue-DEFAULT/20 text-blue-bright border-blue-DEFAULT/30',
    desc: 'Need to secure a property under contract but lack the cash for the deposit? We fund your EMD so you can lock the deal without tying up your own capital.',
    details: [
      'Fund EMDs of any size',
      'Rapid wire transfer to title/escrow',
      'Available for wholesalers and investors',
      'Repaid at closing from your proceeds',
    ],
  },
  {
    icon: '🔑',
    title: 'Double Close Funding',
    badge: 'Popular',
    badgeColor: 'bg-blue-bright/20 text-blue-bright border-blue-bright/30',
    desc: 'Protect your spread and keep your assignment fee private. We fund the A-B leg so you can simultaneously close A-B and B-C — same or different title company.',
    details: [
      'Same-day A-B & B-C closings',
      'Works at same or different title companies',
      'Your margin stays completely private',
      'Funds wired directly to title at closing',
    ],
  },
  {
    icon: '📐',
    title: 'Stack Method Funding',
    badge: 'High Volume',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    desc: 'The Stack Method layers seller carryback, DSCR loans, or other creative structures. We provide the transactional bridge to make these complex deals work.',
    details: [
      'Layered financing structures',
      'Works with seller carryback deals',
      'Compatible with DSCR and creative finance',
      'Large transaction amounts available',
    ],
  },
]

export default function Products() {
  return (
    <section id="products" className="py-24 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 section-fade">
          <p className="text-blue-bright text-sm font-semibold uppercase tracking-widest mb-3">Funding Products</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            The Right Funding for Every Deal Type
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Whether it's a simple EMD or a complex stacked structure, we have the capital and expertise to get it done.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="section-fade bg-surface border border-white/5 hover:border-blue-DEFAULT/30 rounded-2xl p-8 flex flex-col card-glow transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-4xl">{p.icon}</div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.badgeColor}`}>
                  {p.badge}
                </span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{p.desc}</p>
              <ul className="space-y-2 mt-auto">
                {p.details.map((d, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4 text-blue-bright flex-shrink-0" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center section-fade">
          <p className="text-white/40 text-sm mb-4">Have an unusual deal structure? We handle those too.</p>
          <a
            href="#funding-form"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Submit Any Deal Type →
          </a>
        </div>
      </div>
    </section>
  )
}
