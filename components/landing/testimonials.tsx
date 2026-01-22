"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Fatima Abubakar",
    role: "Mother of 3, Lagos",
    image: "/nigerian-muslim-woman-professional-headshot.jpg",
    quote:
      "Finally, a platform where I don't have to second-guess if products are truly halal. This is what we've been waiting for!",
    rating: 5,
  },
  {
    name: "Sanusi Musa",
    role: "Quran Teacher, Ibadan",
    image: "/nigerian-muslim-man-teacher-headshot.jpg",
    quote:
      "As a Quran tutor, I struggled to find students beyond my mosque. UmMarket will change everything for educators like me.",
    rating: 5,
  },
  {
    name: "Aisha Yusuf",
    role: "Modest Fashion Designer, Lagos ",
    image: "/nigerian-muslim-woman-fashion-designer-headshot.jpg",
    quote:
      "I've been selling through WhatsApp for years. A verified platform that understands our values? Count me in!",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            What Our Community Says
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">Join thousands of Muslims excited about UmMarket</p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">&ldquo;{testimonial.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
