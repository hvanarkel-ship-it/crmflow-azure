import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.SEED_EMAIL || 'admin@example.com'
  const password = process.env.SEED_PASSWORD || 'ChangeMe123!'

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: 'Admin', passwordHash }
  })

  const org = await prisma.organization.upsert({
    where: { id: 'seed-org' },
    update: {},
    create: { id: 'seed-org', name: 'Demo Organization' }
  })

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: user.id, organizationId: org.id } },
    update: { role: 'OWNER' },
    create: { userId: user.id, organizationId: org.id, role: 'OWNER' }
  })

  const acme = await prisma.company.upsert({
    where: { id: 'seed-acme' },
    update: {},
    create: { id: 'seed-acme', name: 'Acme BV', website: 'https://example.com', industry: 'Technology', organizationId: org.id }
  })

  const contact = await prisma.contact.upsert({
    where: { id: 'seed-contact' },
    update: {},
    create: { id: 'seed-contact', firstName: 'Henk', lastName: 'van Arkel', email: 'henk@example.com', companyId: acme.id, organizationId: org.id }
  })

  const deal = await prisma.deal.upsert({
    where: { id: 'seed-deal' },
    update: {},
    create: { id: 'seed-deal', name: 'CRM Opportunity', stage: 'QUALIFIED', amountCents: 2500000, organizationId: org.id, companyId: acme.id }
  })

  await prisma.dealContact.upsert({
    where: { dealId_contactId: { dealId: deal.id, contactId: contact.id } },
    update: {},
    create: { dealId: deal.id, contactId: contact.id }
  })

  await prisma.activity.create({
    data: {
      type: 'CALL',
      dueAt: new Date(Date.now() + 1000*60*60*24),
      summary: 'Follow up call about the opportunity',
      organizationId: org.id,
      dealId: deal.id,
      ownerId: user.id
    }
  })

  console.log('Seed completed')
  console.log('Login:', email)
  console.log('Password:', password)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
