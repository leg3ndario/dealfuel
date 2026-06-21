import { useState } from 'react'

type DealType = 'emd' | 'double-same' | 'double-diff' | 'stack' | 'other' | ''

interface FormData {
  dealType: DealType
  name: string
  email: string
  phone: string
  propertyAddress: string
  purchasePrice: string
  fundingAmount: string
  closingDate: string
  notes: string
}

const INITIAL: FormData = {
  dealType: '',
  name: '',
  email: '',
  phone: '',
  propertyAddress: '',
  purchasePrice: '',
  fundingAmount: '',
  closingDate: '',
  notes: '',
}

const dealTypes = [
  { id: 'emd', icon: '🏠', label: 'Earnest Money Deposit', sub: 'EMD to secure a property under contract' },
  { id: 'double-same', icon: '🔑', label: 'Double Close (Same Title)', sub: 'A-B and B-C at the same title company' },
  { id: 'double-diff', icon: '🔑', label: 'Double Close (Different Title)', sub: 'A-B and B-C at different title companies' },
  { id: 'stack', icon: '📐', label: 'Stack Method', sub: 'Layered financing — seller carryback, DSCR, etc.' },
  { id: 'other', icon: '💬', label: 'Other / Not Sure', sub: 'Describe your deal in the notes' },
]

export default function FundingForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="funding-form" className="py-24 bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-surface-2 border border-blue-DEFAULT/20 rounded-2xl p-12">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-white text-2xl font-black mb-3">Request Received!</h3>
            <p className="text-white/60 mb-8">
              Thanks, <span className="text-white font-medium">{form.name}</span>. We've received your funding request and will be in touch within 24–48 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm(INITIAL) }}
              className="text-blue-bright text-sm hover:text-white transition-colors"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="funding-form" className="py-24 bg-surface">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 section-fade">
          <p className="text-blue-bright text-sm font-semibold uppercase tracking-widest mb-3">Get Funded</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Submit a Funding Request</h2>
          <p className="text-white/50">Takes less than 5 minutes. No commitment until you approve the terms.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10 section-fade">
          {['Deal Type', 'Your Info', 'Deal Details', 'Review'].map((label, i) => {
            const s = i + 1
            return (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > s
                      ? 'bg-blue-DEFAULT text-white'
                      : step === s
                      ? 'bg-blue-DEFAULT text-white ring-4 ring-blue-DEFAULT/30'
                      : 'bg-surface-2 text-white/30 border border-white/10'
                  }`}>
                    {step > s ? '✓' : s}
                  </div>
                  <span className={`text-xs hidden sm:block ${step >= s ? 'text-white/60' : 'text-white/20'}`}>{label}</span>
                </div>
                {i < 3 && <div className={`h-px flex-1 mx-1 ${step > s ? 'bg-blue-DEFAULT' : 'bg-white/10'}`} />}
              </div>
            )
          })}
        </div>

        <div className="bg-surface-2 border border-white/5 rounded-2xl p-6 sm:p-8 section-fade">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Deal Type */}
            {step === 1 && (
              <div>
                <h3 className="text-white font-bold text-lg mb-6">What type of deal is this?</h3>
                <div className="space-y-3">
                  {dealTypes.map((dt) => (
                    <button
                      key={dt.id}
                      type="button"
                      onClick={() => set('dealType', dt.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                        form.dealType === dt.id
                          ? 'border-blue-DEFAULT bg-blue-DEFAULT/10'
                          : 'border-white/10 bg-surface hover:border-white/20'
                      }`}
                    >
                      <span className="text-2xl">{dt.icon}</span>
                      <div>
                        <div className="text-white font-medium text-sm">{dt.label}</div>
                        <div className="text-white/40 text-xs mt-0.5">{dt.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!form.dealType}
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-blue-DEFAULT hover:bg-blue-bright disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors"
                >
                  Continue →
                </button>
              </div>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Your Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { field: 'name' as const, label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                    { field: 'email' as const, label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                    { field: 'phone' as const, label: 'Phone Number', type: 'tel', placeholder: '(555) 000-0000' },
                  ].map(({ field, label, type, placeholder }) => (
                    <div key={field}>
                      <label className="block text-white/60 text-sm font-medium mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={form[field]}
                        onChange={(e) => set(field, e.target.value)}
                        placeholder={placeholder}
                        required
                        className="w-full bg-surface border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-DEFAULT focus:ring-2 focus:ring-blue-DEFAULT/20 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors">
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!form.name || !form.email || !form.phone}
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-DEFAULT hover:bg-blue-bright disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Deal Details */}
            {step === 3 && (
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Deal Details</h3>
                <div className="space-y-4">
                  {[
                    { field: 'propertyAddress' as const, label: 'Property Address', type: 'text', placeholder: '123 Main St, City, State ZIP' },
                    { field: 'purchasePrice' as const, label: 'Purchase Price ($)', type: 'text', placeholder: '250,000' },
                    { field: 'fundingAmount' as const, label: 'Amount Needed ($)', type: 'text', placeholder: '25,000' },
                    { field: 'closingDate' as const, label: 'Expected Closing Date', type: 'date', placeholder: '' },
                  ].map(({ field, label, type, placeholder }) => (
                    <div key={field}>
                      <label className="block text-white/60 text-sm font-medium mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={form[field]}
                        onChange={(e) => set(field, e.target.value)}
                        placeholder={placeholder}
                        required
                        className="w-full bg-surface border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-DEFAULT focus:ring-2 focus:ring-blue-DEFAULT/20 transition-all"
                        style={type === 'date' ? { colorScheme: 'dark' } : undefined}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">Additional Notes (optional)</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      placeholder="Any additional context about your deal..."
                      rows={3}
                      className="w-full bg-surface border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-DEFAULT focus:ring-2 focus:ring-blue-DEFAULT/20 transition-all resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors">
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!form.propertyAddress || !form.purchasePrice || !form.fundingAmount || !form.closingDate}
                    onClick={() => setStep(4)}
                    className="flex-1 bg-blue-DEFAULT hover:bg-blue-bright disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors"
                  >
                    Review →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Review & Submit</h3>
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Deal Type', value: dealTypes.find(d => d.id === form.dealType)?.label },
                    { label: 'Name', value: form.name },
                    { label: 'Email', value: form.email },
                    { label: 'Phone', value: form.phone },
                    { label: 'Property', value: form.propertyAddress },
                    { label: 'Purchase Price', value: `$${form.purchasePrice}` },
                    { label: 'Funding Needed', value: `$${form.fundingAmount}` },
                    { label: 'Closing Date', value: form.closingDate },
                    ...(form.notes ? [{ label: 'Notes', value: form.notes }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4 py-2 border-b border-white/5 last:border-0">
                      <span className="text-white/40 text-sm">{label}</span>
                      <span className="text-white text-sm font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/30 text-xs mb-6">
                  By submitting, you agree that Dealfuel may contact you regarding your funding request. No commitment is made until you review and accept the terms.
                </p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(3)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors">
                    ← Edit
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-DEFAULT hover:bg-blue-bright text-white font-bold py-4 rounded-xl transition-colors blue-glow"
                  >
                    Submit Request ✓
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
