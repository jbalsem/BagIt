"use client"

import { useState } from "react"
import { ArrowRight, DollarSign, PieChart, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Navbar from "@/components/navbar"

export default function MonthlyBudget() {
  const [budget, setBudget] = useState({
    income: 5000,
    housing: 1500,
    utilities: 300,
    groceries: 600,
    transportation: 400,
    entertainment: 200,
    savings: 500,
    other: 300,
  })

  const [spent, setSpent] = useState({
    housing: 1500,
    utilities: 250,
    groceries: 450,
    transportation: 350,
    entertainment: 150,
    savings: 500,
    other: 200,
  })

  const handleBudgetChange = (category, value) => {
    setBudget({ ...budget, [category]: Number.parseFloat(value) || 0 })
  }

  const handleSpentChange = (category, value) => {
    setSpent({ ...spent, [category]: Number.parseFloat(value) || 0 })
  }

  const totalBudget = Object.values(budget).reduce((sum, value) => sum + value, 0) - budget.income
  const totalSpent = Object.values(spent).reduce((sum, value) => sum + value, 0)
  const remaining = budget.income - totalSpent

  const categories = [
    { id: "housing", name: "Housing", icon: "🏠" },
    { id: "utilities", name: "Utilities", icon: "💡" },
    { id: "groceries", name: "Groceries", icon: "🛒" },
    { id: "transportation", name: "Transportation", icon: "🚗" },
    { id: "entertainment", name: "Entertainment", icon: "🎬" },
    { id: "savings", name: "Savings", icon: "💰" },
    { id: "other", name: "Other", icon: "📦" },
  ]

  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold text-charcoal">Monthly Budget</h1>
        <p className="mb-8 text-charcoal/80">Track your income, expenses, and savings</p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs defaultValue="budget">
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="budget">Budget Planning</TabsTrigger>
                <TabsTrigger value="tracking">Expense Tracking</TabsTrigger>
              </TabsList>

              <TabsContent value="budget">
                <Card>
                  <CardHeader>
                    <CardTitle>Set Your Monthly Budget</CardTitle>
                    <CardDescription>Define your income and planned expenses for the month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="income" className="text-base font-medium">
                          Monthly Income
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                          <Input
                            id="income"
                            type="number"
                            value={budget.income}
                            onChange={(e) => handleBudgetChange("income", e.target.value)}
                            className="pl-9"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="grid gap-4">
                        <h3 className="text-base font-medium">Monthly Expenses</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {categories.map((category) => (
                            <div key={category.id} className="grid gap-2">
                              <Label htmlFor={`budget-${category.id}`} className="flex items-center gap-2">
                                <span>{category.icon}</span> {category.name}
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <Input
                                  id={`budget-${category.id}`}
                                  type="number"
                                  value={budget[category.id]}
                                  onChange={(e) => handleBudgetChange(category.id, e.target.value)}
                                  className="pl-9"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="mt-2 bg-pink hover:bg-pink/90">
                        <Save className="mr-2 h-4 w-4" /> Save Budget
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tracking">
                <Card>
                  <CardHeader>
                    <CardTitle>Track Your Expenses</CardTitle>
                    <CardDescription>Record your actual spending for the month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          {categories.map((category) => (
                            <div key={category.id} className="grid gap-2">
                              <Label htmlFor={`spent-${category.id}`} className="flex items-center gap-2">
                                <span>{category.icon}</span> {category.name}
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <Input
                                  id={`spent-${category.id}`}
                                  type="number"
                                  value={spent[category.id]}
                                  onChange={(e) => handleSpentChange(category.id, e.target.value)}
                                  className="pl-9"
                                />
                              </div>
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>
                                  ${spent[category.id]} of ${budget[category.id]}
                                </span>
                                <span>{Math.round((spent[category.id] / budget[category.id]) * 100) || 0}%</span>
                              </div>
                              <Progress
                                value={(spent[category.id] / budget[category.id]) * 100}
                                className="h-2"
                                indicatorClassName={
                                  spent[category.id] > budget[category.id]
                                    ? "bg-pink"
                                    : spent[category.id] > budget[category.id] * 0.9
                                      ? "bg-purple/70"
                                      : "bg-purple"
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="mt-2 bg-pink hover:bg-pink/90">
                        <Save className="mr-2 h-4 w-4" /> Update Expenses
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Budget Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total Income</span>
                    <span className="font-medium">${budget.income.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total Expenses</span>
                    <span className="font-medium">${totalSpent.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Remaining</span>
                    <span className={`font-bold ${remaining >= 0 ? "text-purple" : "text-pink"}`}>
                      ${remaining.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span>Budget Used</span>
                      <span>{Math.round((totalSpent / budget.income) * 100)}%</span>
                    </div>
                    <Progress
                      value={(totalSpent / budget.income) * 100}
                      className="h-2"
                      indicatorClassName={
                        totalSpent > budget.income
                          ? "bg-pink"
                          : totalSpent > budget.income * 0.9
                            ? "bg-purple/70"
                            : "bg-purple"
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" /> Expense Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span> {category.name}
                        </span>
                        <span
                          className={
                            spent[category.id] > budget[category.id]
                              ? "text-red-600"
                              : spent[category.id] > budget[category.id] * 0.9
                                ? "text-amber-600"
                                : "text-slate-600"
                          }
                        >
                          ${spent[category.id]}
                        </span>
                      </div>
                      <Progress
                        value={(spent[category.id] / totalSpent) * 100}
                        className="h-2"
                        indicatorClassName={
                          category.id === "housing"
                            ? "bg-blue-500"
                            : category.id === "utilities"
                              ? "bg-purple-500"
                              : category.id === "groceries"
                                ? "bg-emerald-500"
                                : category.id === "transportation"
                                  ? "bg-amber-500"
                                  : category.id === "entertainment"
                                    ? "bg-pink-500"
                                    : category.id === "savings"
                                      ? "bg-teal-500"
                                      : "bg-slate-500"
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" className="mt-auto">
              View Detailed Reports <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
