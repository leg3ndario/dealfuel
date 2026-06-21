interface Env {
  GHL_API_KEY: string
  GHL_LOCATION_ID: string
}

interface FormPayload {
  name: string
  email: string
  phone: string
  dealType: string
  propertyAddress: string
  purchasePrice: string
  fundingAmount: string
  closingDate: string
  notes?: string
}

const DEAL_TAGS: Record<string, string> = {
  'emd': 'EMD',
  'double-same': 'Double Close',
  'double-diff': 'Double Close',
  'stack': 'Stack Method',
  'other': 'Other',
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const data = await request.json() as FormPayload
    const { name, email, phone, dealType, propertyAddress, purchasePrice, fundingAmount, closingDate, notes } = data

    const [firstName, ...rest] = name.trim().split(' ')
    const lastName = rest.join(' ')
    const dealTag = DEAL_TAGS[dealType] ?? 'Other'

    // Upsert contact in GHL (de-dupes on email/phone per location settings)
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
        phone,
        source: 'iFundYourDeals Website',
        tags: ['Transactional Funding', dealTag],
      }),
    })

    if (!upsertRes.ok) {
      const err = await upsertRes.text()
      console.error('GHL upsert failed:', err)
      return Response.json({ error: 'CRM error' }, { status: 502 })
    }

    const { contact } = await upsertRes.json() as { contact: { id: string } }

    if (contact?.id) {
      const noteLines = [
        `Deal Type: ${dealTag}`,
        `Property Address: ${propertyAddress}`,
        `Purchase Price: $${purchasePrice}`,
        `Funding Needed: $${fundingAmount}`,
        `Expected Closing: ${closingDate}`,
      ]
      if (notes) noteLines.push(`Notes: ${notes}`)

      await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify({ body: noteLines.join('\n') }),
      })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('submit-deal error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
