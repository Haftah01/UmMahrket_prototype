"use client"

import { motion } from "framer-motion"
import { SearchX, MessageSquareX, TrendingDown } from "lucide-react"

const problems = [
  {
    icon: SearchX,
    title: "Is This Really Halal?",
    description:
      "You browse Online stores for Islamic apparel but wonder: Is the seller Muslim? Are materials appropriate? Is certification authentic? Every purchase feels like a gamble.",
    color: "text-coral",
  },
  {
    icon: MessageSquareX,
    title: "WhatsApp Vendor Chaos",
    description:
      "Need a Quran tutor? You ask in 5 WhatsApp groups, get 10 unverified recommendations, and waste hours vetting strangers. There has to be a better way.",
    color: "text-accent",
  },
  {
    icon: TrendingDown,
    title: "Your Money, Their Pockets",
    description:
      "You want to support Muslim businesses but generic platforms don't help you find them. Your money flows to companies that don't reinvest in your community.",
    color: "text-secondary",
  },
]

export default function ProblemSection() {
  return (
    <section className="py-16 lg:py-20 bg-sandstone">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Sound Familiar?
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            If you&apos;re a Muslim in Nigeria, you&apos;ve experienced these frustrations
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-muted flex items-center justify-center mb-6`}>
                <problem.icon className={`w-7 h-7 lg:w-8 lg:h-8 ${problem.color}`} />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-4">{problem.title}</h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 lg:mt-16"
        >
          <p className="text-xl lg:text-2xl font-heading font-semibold text-primary text-balance">
            What if there was one platform built specifically for Muslims, by Muslims?
          </p>
        </motion.div>
      </div>
    </section>
  )
}
