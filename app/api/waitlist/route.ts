import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server-admin"

export async function POST(request: Request) {
  try {
    // Debug: Check if required env vars are set
    console.log("[v0] SUPABASE_SERVICE_ROLE_KEY set:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log("[v0] NEXT_PUBLIC_SUPABASE_URL set:", !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Server configuration error: SUPABASE_SERVICE_ROLE_KEY missing" }, { status: 500 })
    }
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: "Server configuration error: NEXT_PUBLIC_SUPABASE_URL missing" }, { status: 500 })
    }

    const { firstName, email, phone, interest } = await request.json()

    // Basic validation
    if (!firstName || firstName.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    if (!interest) {
      return NextResponse.json({ error: "Interest selection is required" }, { status: 400 })
    }

    const supabase = await createAdminClient()

    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        first_name: firstName,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        interest,
      })
      .select()
      .single()

    if (error) {
      // Handle duplicate email error
      if (error.code === "23505") {
        return NextResponse.json({ error: "This email is already on the waitlist" }, { status: 409 })
      }
      console.error("[v0] Supabase error:", error.code, error.message)
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Successfully joined the waitlist",
      data: { firstName: data.first_name, email: data.email, interest: data.interest },
    })
  } catch (error) {
    console.error("[v0] Waitlist API error:", error)
    return NextResponse.json({ error: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }, { status: 500 })
  }
}
