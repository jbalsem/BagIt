"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, ClipboardList, Menu, ShoppingBasket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-offwhite/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-purple">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple text-white">
            <ShoppingBasket className="h-5 w-5" />
          </div>
          <span>BagIt</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="/grocery-list"
            className="flex items-center gap-2 text-charcoal transition-colors hover:text-purple"
          >
            <ShoppingBasket className="h-4 w-4" />
            <span>Grocery List</span>
          </Link>
          <Link
            href="/monthly-budget"
            className="flex items-center gap-2 text-charcoal transition-colors hover:text-purple"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Monthly Budget</span>
          </Link>
          <Link href="/inventory" className="flex items-center gap-2 text-charcoal transition-colors hover:text-purple">
            <ClipboardList className="h-4 w-4" />
            <span>Inventory</span>
          </Link>
          <Button asChild className="ml-2 bg-pink hover:bg-pink/90">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col gap-6 pt-6">
              <Link
                href="/grocery-list"
                className="flex items-center gap-2 text-charcoal transition-colors hover:text-purple"
                onClick={closeSheet}
              >
                <ShoppingBasket className="h-5 w-5" />
                <span>Grocery List</span>
              </Link>
              <Link
                href="/monthly-budget"
                className="flex items-center gap-2 text-charcoal transition-colors hover:text-purple"
                onClick={closeSheet}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Monthly Budget</span>
              </Link>
              <Link
                href="/inventory"
                className="flex items-center gap-2 text-charcoal transition-colors hover:text-purple"
                onClick={closeSheet}
              >
                <ClipboardList className="h-5 w-5" />
                <span>Inventory</span>
              </Link>
              <Button className="mt-4 bg-pink hover:bg-pink/90" onClick={closeSheet}>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
