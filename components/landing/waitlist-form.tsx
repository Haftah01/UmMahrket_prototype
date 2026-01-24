"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Loader2, Lock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormData {
  firstName: string
  email: string
  phone: string
  interest: string
  consent: boolean
}

interface FormErrors {
  firstName?: string
  email?: string
  interest?: string
  consent?: string
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    interest: "",
    consent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.firstName.length < 2) {
      newErrors.firstName = "Name must be at least 2 characters"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.interest) {
      newErrors.interest = "Please select an option"
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to continue"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
      } else {
        setSubmitError(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-heading font-bold text-foreground mb-2">You&apos;re on the list!</h3>
        <p className="text-muted-foreground">Check your email for confirmation and exclusive founding member perks.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="waitlist-form">
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <Input
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First Name *"
            className="h-12"
          />
          {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            type="email"
            placeholder="Email Address *"
            className="h-12"
          />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <Input
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        type="tel"
        placeholder="Phone Number (optional, for WhatsApp community)"
        className="h-12"
      />

      <div>
        <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="I'm interested in... *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buying">Buying Products</SelectItem>
            <SelectItem value="booking">Booking Services</SelectItem>
            <SelectItem value="selling">Selling Products</SelectItem>
            <SelectItem value="providing">Offering Services</SelectItem>
            <SelectItem value="all">All of the Above</SelectItem>
          </SelectContent>
        </Select>
        {errors.interest && <p className="text-destructive text-sm mt-1">{errors.interest}</p>}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
        />
        <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
          I agree to receive launch updates and founding member perks. No spam, unsubscribe anytime.
        </label>
      </div>
      {errors.consent && <p className="text-destructive text-sm">{errors.consent}</p>}

      {submitError && (
        <p className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg">{submitError}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Joining...
          </>
        ) : (
          "Join the Waitlist - 100% Free"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Lock className="w-4 h-4" />
        We respect your privacy. 100+ Muslims have joined.
      </p>
    </form>
  )
}
