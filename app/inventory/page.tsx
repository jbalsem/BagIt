"use client"

import { useState } from "react"
import { Check, Filter, Plus, Search, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Navbar from "@/components/navbar"

// Sample data
const initialItems = [
  {
    id: 1,
    name: "Paper Towels",
    category: "Household",
    quantity: 4,
    status: "In Stock",
    lastPurchased: "2023-05-10",
  },
  {
    id: 2,
    name: "Dish Soap",
    category: "Cleaning",
    quantity: 1,
    status: "Low",
    lastPurchased: "2023-04-22",
  },
  {
    id: 3,
    name: "Toothpaste",
    category: "Personal Care",
    quantity: 2,
    status: "In Stock",
    lastPurchased: "2023-05-05",
  },
  {
    id: 4,
    name: "Laundry Detergent",
    category: "Cleaning",
    quantity: 0,
    status: "Out of Stock",
    lastPurchased: "2023-03-15",
  },
  {
    id: 5,
    name: "Coffee",
    category: "Food",
    quantity: 1,
    status: "Low",
    lastPurchased: "2023-05-01",
  },
  {
    id: 6,
    name: "Toilet Paper",
    category: "Household",
    quantity: 12,
    status: "In Stock",
    lastPurchased: "2023-05-12",
  },
  {
    id: 7,
    name: "Shampoo",
    category: "Personal Care",
    quantity: 2,
    status: "In Stock",
    lastPurchased: "2023-04-28",
  },
  {
    id: 8,
    name: "Pasta",
    category: "Food",
    quantity: 3,
    status: "In Stock",
    lastPurchased: "2023-05-08",
  },
]

const categories = ["Household", "Cleaning", "Personal Care", "Food", "Other"]
const statuses = ["In Stock", "Low", "Out of Stock"]

export default function Inventory() {
  const [items, setItems] = useState(initialItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Household")
  const [statusFilter, setStatusFilter] = useState("In Stock")
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Household",
    quantity: 1,
    status: "In Stock",
    lastPurchased: new Date().toISOString().split("T")[0],
  })

  const handleAddItem = () => {
    const itemToAdd = {
      ...newItem,
      id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
    }
    setItems([...items, itemToAdd])
    setNewItem({
      name: "",
      category: "Household",
      quantity: 1,
      status: "In Stock",
      lastPurchased: new Date().toISOString().split("T")[0],
    })
  }

  const handleUpdateStatus = (id, newStatus) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              quantity: newStatus === "Out of Stock" ? 0 : newStatus === "Low" ? 1 : Math.max(item.quantity, 2),
            }
          : item,
      ),
    )
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter
    const matchesStatus = statusFilter === "" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-lime text-charcoal"
      case "Low":
        return "bg-purple/30 text-purple"
      case "Out of Stock":
        return "bg-pink/20 text-pink"
      default:
        return "bg-offwhite text-charcoal"
    }
  }

  const itemsByStatus = {
    "In Stock": filteredItems.filter((item) => item.status === "In Stock").length,
    Low: filteredItems.filter((item) => item.status === "Low").length,
    "Out of Stock": filteredItems.filter((item) => item.status === "Out of Stock").length,
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">Household Inventory</h1>
            <p className="text-charcoal/80">Track your household items and never run out of essentials</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-pink hover:bg-pink/90">
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Inventory Item</DialogTitle>
                  <DialogDescription>Add a new item to your household inventory.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="e.g., Paper Towels"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                        defaultValue="Household"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newItem.status}
                        onValueChange={(value) => setNewItem({ ...newItem, status: value })}
                        defaultValue="In Stock"
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastPurchased">Last Purchased</Label>
                      <Input
                        id="lastPurchased"
                        type="date"
                        value={newItem.lastPurchased}
                        onChange={(e) => setNewItem({ ...newItem, lastPurchased: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleAddItem}
                    disabled={!newItem.name || !newItem.category}
                    className="bg-pink hover:bg-pink/90"
                  >
                    Add to Inventory
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Inventory</SheetTitle>
                  <SheetDescription>Filter your inventory items by category or status.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter} defaultValue="Household">
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter} defaultValue="In Stock">
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCategoryFilter("")
                      setStatusFilter("")
                    }}
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="relative flex-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Card className="flex items-center justify-between p-4">
            <div className="text-sm font-medium text-slate-600">Total Items:</div>
            <div className="text-xl font-bold text-slate-900">{filteredItems.length}</div>
          </Card>

          <Card className="p-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="low">Low</TabsTrigger>
                <TabsTrigger value="out">Out</TabsTrigger>
              </TabsList>
              <div className="mt-2 text-center text-xl font-bold text-slate-900">
                <TabsContent value="all">{filteredItems.length}</TabsContent>
                <TabsContent value="low">{itemsByStatus.Low}</TabsContent>
                <TabsContent value="out">{itemsByStatus["Out of Stock"]}</TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 p-8 text-center">
            <p className="text-slate-500">No inventory items found. Add some items to your inventory!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Category:</span>
                      <span className="text-sm font-medium">{item.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Quantity:</span>
                      <span className="text-sm font-medium">{item.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Last Purchased:</span>
                      <span className="text-sm font-medium">{new Date(item.lastPurchased).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2 bg-slate-50 p-2">
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-lime/30 bg-lime text-charcoal hover:bg-lime/80"
                      onClick={() => handleUpdateStatus(item.id, "In Stock")}
                    >
                      <Check className="mr-1 h-3 w-3" /> In Stock
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-purple/20 bg-purple/20 text-purple hover:bg-purple/30"
                      onClick={() => handleUpdateStatus(item.id, "Low")}
                    >
                      Low
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-pink/20 bg-pink/10 text-pink hover:bg-pink/20"
                      onClick={() => handleUpdateStatus(item.id, "Out of Stock")}
                    >
                      <X className="mr-1 h-3 w-3" /> Out
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-slate-600 hover:text-red-600"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
