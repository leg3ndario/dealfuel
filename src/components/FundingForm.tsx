import { useState } from 'react'

type DealType = 'emd' | 'double-same' | 'double-diff' | 'stack' | 'other' | ''

interface FormData {
  dealType: DealType
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zip: string
  purchasePrice: string
  fundingAmount: string
  closingDate: string
  propertyType: string
  notes: string
}

const INITIAL: FormData = {
  dealType: '',
  firstName: '', lastName: '',
  email: '', phone: '',
  street: '', city: '', state: '', zip: '',
  purchasePrice: '', fundingAmount: '',
  closingDate: '', propertyType: '', notes: '',
}

const dealTypes = [
  { id: 'emd',         icon: '💵', label: 'Earnest Money Deposit',       sub: 'EMD to secure a property under contract' },
  { id: 'double-same', icon: '⚡', label: 'Double Close (Same Title)',    sub: 'A-B and B-C close at the same title company' },
  { id: 'double-diff', icon: '🏛️', label: 'Double Close (Different Title)', sub: 'A-B and B-C close at different title companies' },
  { id: 'stack',       icon: '📊', label: 'Stack Method',                 sub: 'Layered financing — seller carryback, DSCR, etc.' },
  { id: 'other',       icon: '💡', label: 'Other / Not Sure',             sub: 'Describe your deal in the notes below' },
]

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

const PROPERTY_TYPES = ['SFR', 'Multi-Family', 'Commercial', 'Land', 'Mobile Home', 'Other']

const TODAY = new Date().toISOString().split('T')[0]

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }
function isValidPhone(v: string) { return v.replace(/\D/g, '').length === 10 }
function isValidZip(v: string)   { return /^\d{5}$/.test(v) }
function parseCurrency(v: string) { return v.replace(/[^\d.]/g, '') }

const inputCls = 'w-full bg-surface border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-DEFAULT focus:ring-2 focus:ring-blue-DEFAULT/20 transition-all'
const selectCls = `${inputCls} appearance-none`
const errorCls  = 'mt-1 text-red-400 text-xs'

type Errors = Partial<Record<keyof FormData, string>>

export default function FundingForm() {
  const [step, setStep]           = useState(1)
  const [form, setForm]           = useState<FormData>(INITIAL)
  const [errors, setErrors]       = useState<Errors>({})
  const [touched, setTouched]     = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const set = (field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }))
    if (touched[field]) validate(field, value)
  }

  const touch = (field: keyof FormData) => {
    setTouched(t => ({ ...t, [field]: true }))
    validate(field, form[field])
  }

  const validate = (field: keyof FormData, value: string) => {
    let msg = ''
    if (field === 'email' && value && !isValidEmail(value)) msg = 'Enter a valid email address'
    if (field === 'phone' && value && !isValidPhone(value)) msg = 'Enter a 10-digit US phone number'
    if (field === 'zip'   && value && !isValidZip(value))   msg = 'Enter a 5-digit ZIP code'
    if (field === 'closingDate' && value && value < TODAY)   msg = 'Closing date must be in the future'
    if (field === 'notes' && form.dealType === 'other' && !value.trim()) msg = 'Please describe your deal'
    setErrors(e => ({ ...e, [field]: msg }))
  }

  const step2Valid = form.firstName && form.lastName &&
    form.email && isValidEmail(form.email) &&
    form.phone && isValidPhone(form.phone)

  const step3Valid = form.street && form.city && form.state && form.zip && isValidZip(form.zip) &&
    form.purchasePrice && form.fundingAmount &&
    form.closingDate && form.closingDate >= TODAY &&
    (form.dealType !== 'other' || form.notes.trim())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/submit-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or email us at funding@ifundyourdeals.com')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="funding-form" className="py-24 bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-surface-2 border border-blue-DEFAULT/20 rounded-2xl p-12">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-white text-2xl font-black mb-3">Request Received!</h3>
            <p className="text-white/60 mb-8">
              Thanks, <span className="text-white font-medium">{form.firstName}</span>. We've received your funding request and will be in touch within 24–48 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm(INITIAL); setErrors({}); setTouched({}) }}
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
                    step > s ? 'bg-blue-DEFAULT text-white'
                    : step === s ? 'bg-blue-DEFAULT text-white ring-4 ring-blue-DEFAULT/30'
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
                  {/* First + Last Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-1.5">First Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={e => set('firstName', e.target.value)}
                        onBlur={() => touch('firstName')}
                        placeholder="John"
                        required
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-1.5">Last Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={e => set('lastName', e.target.value)}
                        onBlur={() => touch('lastName')}
                        placeholder="Smith"
                        required
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">Email Address <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      onBlur={() => touch('email')}
                      placeholder="john@example.com"
                      required
                      className={inputCls}
                    />
                    {touched.email && errors.email && <p className={errorCls}>{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      onBlur={() => touch('phone')}
                      placeholder="(555) 000-0000"
                      required
                      className={inputCls}
                    />
                    {touched.phone && errors.phone && <p className={errorCls}>{errors.phone}</p>}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors">
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!step2Valid}
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

                  {/* Property Type */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">Property Type</label>
                    <select
                      value={form.propertyType}
                      onChange={e => set('propertyType', e.target.value)}
                      className={selectCls}
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="">Select type (optional)</option>
                      {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">Property Address <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={form.street}
                      onChange={e => set('street', e.target.value)}
                      onBlur={() => touch('street')}
                      placeholder="123 Main St"
                      required
                      className={inputCls}
                    />
                  </div>

                  {/* City + State row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-1.5">City <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={e => set('city', e.target.value)}
                        onBlur={() => touch('city')}
                        placeholder="Houston"
                        required
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-1.5">State <span className="text-red-400">*</span></label>
                      <select
                        value={form.state}
                        onChange={e => set('state', e.target.value)}
                        required
                        className={selectCls}
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="">State</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* ZIP */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">ZIP Code <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={e => set('zip', parseCurrency(e.target.value).slice(0, 5))}
                      onBlur={() => touch('zip')}
                      placeholder="77001"
                      required
                      maxLength={5}
                      inputMode="numeric"
                      className={inputCls}
                    />
                    {touched.zip && errors.zip && <p className={errorCls}>{errors.zip}</p>}
                  </div>

                  {/* Purchase Price + Funding Amount row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-1.5">Purchase Price <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        value={form.purchasePrice}
                        onChange={e => set('purchasePrice', e.target.value)}
                        onBlur={e => { set('purchasePrice', parseCurrency(e.target.value)); touch('purchasePrice') }}
                        placeholder="250000"
                        required
                        inputMode="numeric"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-1.5">Amount Needed <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        value={form.fundingAmount}
                        onChange={e => set('fundingAmount', e.target.value)}
                        onBlur={e => { set('fundingAmount', parseCurrency(e.target.value)); touch('fundingAmount') }}
                        placeholder="25000"
                        required
                        inputMode="numeric"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Closing Date */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">Expected Closing Date <span className="text-red-400">*</span></label>
                    <input
                      type="date"
                      value={form.closingDate}
                      min={TODAY}
                      onChange={e => set('closingDate', e.target.value)}
                      onBlur={() => touch('closingDate')}
                      required
                      className={inputCls}
                      style={{ colorScheme: 'dark' }}
                    />
                    {touched.closingDate && errors.closingDate && <p className={errorCls}>{errors.closingDate}</p>}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">
                      Additional Notes {form.dealType === 'other' && <span className="text-red-400">*</span>}
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={e => set('notes', e.target.value)}
                      onBlur={() => touch('notes')}
                      placeholder={form.dealType === 'other' ? 'Describe your deal and what funding you need...' : 'Any additional context about your deal (optional)'}
                      rows={3}
                      required={form.dealType === 'other'}
                      className="w-full bg-surface border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-DEFAULT focus:ring-2 focus:ring-blue-DEFAULT/20 transition-all resize-none"
                    />
                    {touched.notes && errors.notes && <p className={errorCls}>{errors.notes}</p>}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors">
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!step3Valid}
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
                    { label: 'Deal Type',       value: dealTypes.find(d => d.id === form.dealType)?.label },
                    { label: 'Name',            value: `${form.firstName} ${form.lastName}` },
                    { label: 'Email',           value: form.email },
                    { label: 'Phone',           value: form.phone },
                    { label: 'Property',        value: `${form.street}, ${form.city}, ${form.state} ${form.zip}` },
                    ...(form.propertyType ? [{ label: 'Property Type', value: form.propertyType }] : []),
                    { label: 'Purchase Price',  value: `$${Number(form.purchasePrice).toLocaleString()}` },
                    { label: 'Funding Needed',  value: `$${Number(form.fundingAmount).toLocaleString()}` },
                    { label: 'Closing Date',    value: form.closingDate },
                    ...(form.notes ? [{ label: 'Notes', value: form.notes }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4 py-2 border-b border-white/5 last:border-0">
                      <span className="text-white/40 text-sm flex-shrink-0">{label}</span>
                      <span className="text-white text-sm font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/30 text-xs mb-6">
                  By submitting, you agree that iFundYourDeals may contact you regarding your funding request. No commitment is made until you review and accept the terms.
                </p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(3)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors">
                    ← Edit
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-DEFAULT hover:bg-blue-bright disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors blue-glow"
                  >
                    {submitting ? 'Submitting…' : 'Submit Request ✓'}
                  </button>
                </div>
                {submitError && (
                  <p className="mt-4 text-red-400 text-sm text-center">{submitError}</p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
