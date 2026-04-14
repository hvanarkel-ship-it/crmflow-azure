import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/password'
import { z } from 'zod'

const Schema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  organizationName: z.string().min(1).max(120)
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input', details: parsed.error.flatten() }, { status: 400 })
  }

  const { name, email, password, organizationName } = parsed.data
  const emailNorm = email.toLowerCase().trim()

  const existing = await prisma.user.findUnique({ where: { email: emailNorm } })
  if (existing) return NextResponse.json({ error: 'email_in_use' }, { status: 409 })

  const user = await prisma.user.create({
    data: {
      name,
      email: emailNorm,
      passwordHash: await hashPassword(password)
    }
  })

  const org = await prisma.organization.create({ data: { name: organizationName } })

  await prisma.membership.create({
    data: { userId: user.id, organizationId: org.id, role: 'OWNER' }
  })

  return NextResponse.json({ ok: true })
}
