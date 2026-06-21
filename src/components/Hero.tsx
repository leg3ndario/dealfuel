export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-DEFAULT/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-blue-bright/5 rounded-full blur-2xl pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,112,243,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,243,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-blue-DEFAULT/10 border border-blue-DEFAULT/30 text-blue-bright text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-blue-bright rounded-full animate-pulse" />
          Trusted by Wholesalers Nationwide
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-6">
          Close Your Real Estate{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text">Deals Without</span>
          <br className="hidden sm:block" />
          Using Your Own Cash
        </h1>

        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Fast, reliable transactional funding for EMDs, Double Closes, and Stack Method deals.
          We wire the funds — you keep the profit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#funding-form"
            className="w-full sm:w-auto bg-blue-DEFAULT hover:bg-blue-bright text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 blue-glow animate-glow-pulse"
          >
            Submit a Funding Request →
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200"
          >
            See How It Works
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: '$24M+', label: 'Funded Last 30 Days' },
            { value: '48hrs', label: 'Avg Approval Time' },
            { value: '100%', label: 'No Upfront Fees' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
              <div className="text-white/40 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/30">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
