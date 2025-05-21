"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  emoji: string
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, emoji, title, description, className }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`${className} perspective-1000`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`group h-full overflow-hidden rounded-xl border-none bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isHovered ? "shadow-xl" : ""
        }`}
      >
        <CardHeader className="pb-2">
          <div className="mb-2 flex items-center justify-between">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-purple/20 text-purple transition-all duration-300 ${
                isHovered ? "bg-purple text-white" : ""
              }`}
            >
              {icon}
            </div>
            <div className="text-3xl">{emoji}</div>
          </div>
          <h3 className="font-display text-xl font-bold text-charcoal">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-charcoal/80">{description}</p>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className={`-ml-2 px-2 text-purple transition-all duration-300 ${isHovered ? "translate-x-2" : ""}`}
          >
            Learn more <ArrowRight className={`ml-1 h-4 w-4 transition-all duration-300 ${isHovered ? "ml-2" : ""}`} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
