import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'

export async function GET() {
  const mongoUriPresent = Boolean(process.env.MONGO_URI || process.env.MONGODB_URI)
  try {
    await dbConnect()
    return NextResponse.json({ ok: true, mongoUriPresent })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        mongoUriPresent,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}


