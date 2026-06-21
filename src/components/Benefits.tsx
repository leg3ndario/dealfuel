const benefits = [
  { icon: '⚡', title: 'Lightning Fast Approvals', desc: 'Get a funding decision within 24–48 hours. No lengthy underwriting, no committee approvals.' },
  { icon: '🚫', title: 'Zero Upfront Fees', desc: 'You pay nothing until your deal closes. Our fee comes out of the transaction — not your pocket.' },
  { icon: '📋', title: 'All Deal Types Covered', desc: 'EMD, Double Close (same or different title), and Stack Method. One lender for every scenario.' },
  { icon: '🔒', title: 'Confidential & Discreet', desc: "Your seller never knows we're involved. We work behind the scenes while you own the relationship." },
  { icon: '📞', title: 'Real Human Support', desc: 'Talk to a real person — not a chatbot. Our team walks you through every step of the process.' },
  { icon: '📈', title: 'Scale Without Limits', desc: "Close 1 deal or 20 deals a month. As your volume grows, we grow with you." },
]

export default function Benefits() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 section-fade">
          <p className="text-blue-bright text-sm font-semibold uppercase tracking-widest mb-3">Why Dealfuel</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Everything You Need to Close More Deals
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Built specifically for wholesalers who need speed, flexibility, and a funding partner they can count on.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="section-fade group bg-surface border border-white/5 hover:border-blue-DEFAULT/30 rounded-2xl p-6 card-glow transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 bg-blue-DEFAULT/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-DEFAULT/20 transition-colors">
                {b.icon}
              </div>
              <h3 className="text-white font-bold mb-2">{b.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
