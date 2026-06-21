const steps = [
  {
    num: '01',
    title: 'Submit Your Deal',
    desc: 'Fill out our quick funding request form with your deal details. Takes less than 5 minutes.',
  },
  {
    num: '02',
    title: 'Receive Approval',
    desc: "We review your deal and send approval within 24–48 hours. We'll outline the terms and fees upfront — no surprises.",
  },
  {
    num: '03',
    title: 'Complete Contracts & Docs',
    desc: 'Sign our funding agreement and provide the required documents. Our team will guide you through exactly what we need.',
  },
  {
    num: '04',
    title: 'Funds Hit at Closing',
    desc: 'We wire the funds directly to the title company. Your deal closes, you collect your assignment fee, and we get repaid.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 section-fade">
          <p className="text-blue-bright text-sm font-semibold uppercase tracking-widest mb-3">The Process</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            How It Works
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Simple. Fast. Built for real estate investors who need to move quickly.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-DEFAULT/30 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="section-fade relative flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="w-20 h-20 bg-surface-2 border-2 border-blue-DEFAULT/40 rounded-full flex items-center justify-center mb-6 relative z-10">
                  <span className="gradient-text text-2xl font-black">{step.num}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center section-fade">
          <a
            href="#funding-form"
            className="inline-flex items-center gap-2 bg-blue-DEFAULT hover:bg-blue-bright text-white font-bold px-8 py-4 rounded-xl transition-colors blue-glow"
          >
            Start Your Request Now →
          </a>
        </div>
      </div>
    </section>
  )
}
