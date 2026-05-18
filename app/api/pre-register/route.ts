import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  return neon(url)
}

export async function POST(req: NextRequest) {
  try {
    const sql = getSql()
    const { name, email, phone, favoriteGame, utmSource } = await req.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS pre_registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        favorite_game VARCHAR(100),
        utm_source VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    // Check duplicate
    const existing = await sql`
      SELECT id FROM pre_registrations WHERE email = ${email} LIMIT 1
    `
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Email já cadastrado!', alreadyExists: true },
        { status: 409 }
      )
    }

    await sql`
      INSERT INTO pre_registrations (name, email, phone, favorite_game, utm_source, created_at)
      VALUES (${name}, ${email}, ${phone ?? null}, ${favoriteGame ?? null}, ${utmSource ?? null}, NOW())
    `

    const countResult = await sql`SELECT COUNT(*) as count FROM pre_registrations`
    const count = Number(countResult[0].count)

    return NextResponse.json({ success: true, count })
  } catch (err) {
    console.error('[PreRegister POST]', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sql = getSql()

    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS pre_registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        favorite_game VARCHAR(100),
        utm_source VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    const result = await sql`SELECT COUNT(*) as count FROM pre_registrations`
    return NextResponse.json({ count: Number(result[0].count) })
  } catch (err) {
    console.error('[PreRegister GET]', err)
    return NextResponse.json({ count: 0 })
  }
}
