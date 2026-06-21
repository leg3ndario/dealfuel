interface Env {
  GHL_API_KEY: string
  GHL_LOCATION_ID: string
}

interface FormPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  dealType: string
  street: string
  city: string
  state: string
  zip: string
  purchasePrice: string
  fundingAmount: string
  closingDate: string
  propertyType?: string
  notes?: string
}

// GHL custom field IDs
const CF = {
  propertyAddress: 'coQufhgGteccTkAZ2hAW',   // contact.dm_property_address_line_1
  propertyCity:    'KIjlPtPaKBpwQ8WlES5H',   // contact.dm_property_city
  propertyState:   'T2hnbvFggtQ4336AWr65',    // contact.dm_property_state
  propertyZip:     'UYRCKo1NoMoUwTbHQ6xd',    // contact.dm_property_zip
  purchasePrice:   'QkyXbU8gnLIELwgnQJ9X',   // contact.purchase_price (MONETORY)
  closingDate:     'EUv3YKLJRyg3zANhSymY',    // contact.closing_date
  notes:           'nlx8zlNlwFUUhS1nyWad',    // contact.other_notes
  fundingAmount:   'OmzQt6Ei6tchR6A8beVx',   // contact.tf__funding_amount (MONETORY)
  fundingType:     'teW1Ai9ylxbgbfgm4cdn',    // contact.tf__funding_request_type (RADIO)
}

const DEAL_TYPE_LABELS: Record<string, string> = {
  'emd':         'EMD',
  'double-same': 'Double Close - Same Title',
  'double-diff': 'Double Close - Different Title',
  'stack':       'Stack Method',
  'other':       'Other',
}

const DEAL_TAGS: Record<string, string> = {
  'emd':         'EMD',
  'double-same': 'Double Close',
  'double-diff': 'Double Close',
  'stack':       'Stack Method',
  'other':       'Other',
}

function parseCurrency(val: string): number {
  return parseFloat(val.replace(/[$,\s]/g, '')) || 0
}

function normalizePhone(val: string): string {
  const digits = val.replace(/\D/g, '')
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  return ten.length === 10
    ? `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`
    : val
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const data = await request.json() as FormPayload
    const {
      firstName, lastName, email, phone, dealType,
      street, city, state, zip,
      purchasePrice, fundingAmount, closingDate,
      propertyType, notes,
    } = data

    const dealTypeLabel = DEAL_TYPE_LABELS[dealType] ?? 'Other'
    const dealTag = DEAL_TAGS[dealType] ?? 'Other'
    const tags = ['Transactional Funding', dealTag]

    const customFields = [
      { id: CF.propertyAddress, field_value: street },
      { id: CF.propertyCity,    field_value: city },
      { id: CF.propertyState,   field_value: state },
      { id: CF.propertyZip,     field_value: zip },
      { id: CF.purchasePrice,   field_value: parseCurrency(purchasePrice) },
      { id: CF.closingDate,     field_value: closingDate },
      { id: CF.fundingAmount,   field_value: parseCurrency(fundingAmount) },
      { id: CF.fundingType,     field_value: dealTypeLabel },
      ...(notes ? [{ id: CF.notes, field_value: notes }] : []),
    ]

    const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        locationId: env.GHL_LOCATION_ID,
        firstName,
        lastName,
        email,
        phone: normalizePhone(phone),
        source: 'iFundYourDeals Website',
        tags,
        customFields,
      }),
    })

    if (!upsertRes.ok) {
      const err = await upsertRes.text()
      console.error('GHL upsert failed:', err)
      return Response.json({ error: 'CRM error' }, { status: 502 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('submit-deal error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
