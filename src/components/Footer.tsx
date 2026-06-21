export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bg border-t border-white/5">
      {/* Final CTA strip */}
      <div className="bg-gradient-to-r from-blue-glow/40 via-blue-DEFAULT/20 to-blue-glow/40 border-y border-blue-DEFAULT/20 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center section-fade">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Your Next Deal is Waiting.
            <br />
            <span className="gradient-text">Don't Lose It Over Capital.</span>
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
            Submit your deal details and get a funding decision within 48 hours. No upfront fees on double closes or stack method — we don't fund until you close.
          </p>
          <a
            href="#funding-form"
            className="inline-flex items-center gap-2 bg-blue-DEFAULT hover:bg-blue-bright text-white font-bold text-lg px-10 py-5 rounded-xl transition-colors blue-glow"
          >
            Submit a Funding Request →
          </a>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-black">
              <span className="text-white">i</span>
              <span className="gradient-text">Fund</span>
              <span className="text-white">YourDeals</span>
            </span>
            <p className="text-white/30 text-xs mt-1">Fast transactional funding for real estate investors.</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="mailto:funding@ifundyourdeals.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/20 text-xs">
          <span>© {year} iFundYourDeals. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/40 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
