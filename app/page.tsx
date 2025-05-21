

import Link from "next/link"
import { ArrowRight, BarChart3, ClipboardList, ShoppingBasket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import Navbar from "@/components/navbar"
import { BlobBackground } from "@/components/blob-background"
import { FeatureCard } from "@/components/feature-card"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-offwhite">
      <BlobBackground />
      <Navbar />

      <main className="container relative z-10 mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 mt-8 text-center md:mt-16">
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-charcoal md:text-6xl lg:text-7xl">
            BagIt: <span className="text-gradient">Secure the Snacks.</span> <br className="hidden md:block" />
            <span className="text-gradient-alt">Save the Stack.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-charcoal/80 md:text-xl">
            Track your grocery list, monthly budget, and home essentials — all in one vibe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-pink hover:bg-pink/90">
              <Link href="/grocery-list">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple text-purple hover:bg-purple/10">
              <Link href="/monthly-budget">View Budget</Link>
            </Button>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<ShoppingBasket className="h-8 w-8" />}
            emoji="🛒"
            title="Grocery List"
            description="Create shopping lists that actually slap. Sort by store, category, or vibe."
            className="grocery-card"
          />

          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            emoji="💸"
            title="Monthly Budget"
            description="Track your cash flow without the anxiety. We make budgeting actually fun (no cap)."
            className="budget-card"
          />

          <FeatureCard
            icon={<ClipboardList className="h-8 w-8" />}
            emoji="📦"
            title="Inventory Tracker"
            description="Never run out of essentials again. Your future self will thank you."
            className="inventory-card"
          />
        </section>

        {/* Testimonial Section */}
        <section className="my-16 rounded-2xl bg-gradient-to-br from-purple/10 to-pink/10 p-8 text-center backdrop-blur-sm">
          <h2 className="mb-6 font-display text-3xl font-bold text-charcoal md:text-4xl">
            The Vibe Check <span className="text-purple">Passed</span> ✓
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-lg italic text-charcoal/80">
              "I was always ordering takeout because I couldn't keep track of what was in my fridge. BagIt literally
              saved my bank account."
            </p>
            <p className="font-medium text-charcoal">— Alex, 22, Graphic Design Student</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-16 text-center">
          <Card className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-none bg-gradient-to-r from-purple/80 to-pink/80 p-8 shadow-xl">
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Ready to get your finances in check?
            </h2>
            <p className="mb-6 text-white/90">
              Join thousands of other Gen Z-ers who are saving money without the boomer energy.
            </p>
            <Button asChild size="lg" className="bg-lime text-charcoal hover:bg-lime/90">
              <Link href="/signup">
                Start Bagging It <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </section>
      </main>

      <footer className="border-t border-charcoal/10 bg-offwhite py-6 text-center text-charcoal/70">
        <p className="text-sm md:text-base">Made with love by broke geniuses 💸💡</p>
      </footer>
    </div>
  )
}
