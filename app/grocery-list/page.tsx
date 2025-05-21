"use client"

import { useState } from "react"
import { Edit, Filter, Plus, Search, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import Navbar from "@/components/navbar"

// Sample data
const initialItems = [
  {
    id: 1,
    name: "Milk",
    quantity: 2,
    category: "Dairy",
    store: "Whole Foods",
    price: 4.99,
  },
  {
    id: 2,
    name: "Bread",
    quantity: 1,
    category: "Bakery",
    store: "Trader Joe's",
    price: 3.49,
  },
  {
    id: 3,
    name: "Eggs",
    quantity: 1,
    category: "Dairy",
    store: "Whole Foods",
    price: 5.99,
  },
  {
    id: 4,
    name: "Apples",
    quantity: 6,
    category: "Produce",
    store: "Farmer's Market",
    price: 4.5,
  },
  {
    id: 5,
    name: "Chicken Breast",
    quantity: 2,
    category: "Meat",
    store: "Costco",
    price: 12.99,
  },
  {
    id: 6,
    name: "Pasta",
    quantity: 3,
    category: "Dry Goods",
    store: "Trader Joe's",
    price: 1.99,
  },
]

const categories = ["Produce", "Dairy", "Meat", "Bakery", "Dry Goods", "Frozen", "Snacks", "Beverages", "Other"]
const stores = ["Whole Foods", "Trader Joe's", "Costco", "Farmer's Market", "Target", "Walmart", "Other"]

export default function GroceryList() {
  const [items, setItems] = useState(initialItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("") // Updated default value
  const [storeFilter, setStoreFilter] = useState("") // Updated default value
  const [editingItem, setEditingItem] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false) // <-- NEW
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    category: "",
    store: "",
    price: "",
  })

  const handleAddItem = () => {
    const itemToAdd = {
      ...newItem,
      id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
      price: Number.parseFloat(newItem.price),
    }
    setItems([...items, itemToAdd])
    setNewItem({
      name: "",
      quantity: 1,
      category: "",
      store: "",
      price: "",
    })
  }

  const handleUpdateItem = () => {
    setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)))
    setEditingItem(null)
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter
    const matchesStore = storeFilter === "" || item.store === storeFilter
    return matchesSearch && matchesCategory && matchesStore
  })

  const totalCost = filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">Grocery List</h1>
            <p className="text-charcoal/80">Manage your shopping items and stay within budget</p>
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
                  <DialogTitle>Add Grocery Item</DialogTitle>
                  <DialogDescription>Add a new item to your grocery list.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="e.g., Milk"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
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
                    <Label htmlFor="store">Store</Label>
                    <Select onValueChange={(value) => setNewItem({ ...newItem, store: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Stores</SelectLabel>
                          {stores.map((store) => (
                            <SelectItem key={store} value={store}>
                              {store}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleAddItem}
                    disabled={!newItem.name || !newItem.category || !newItem.store || !newItem.price}
                    className="bg-pink hover:bg-pink/90"
                  >
                    Add to List
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
                  <SheetTitle>Filter Grocery List</SheetTitle>
                  <SheetDescription>Filter your grocery items by category or store.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
                    <Label>Store</Label>
                    <Select value={storeFilter} onValueChange={setStoreFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Stores" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Stores</SelectItem>
                        {stores.map((store) => (
                          <SelectItem key={store} value={store}>
                            {store}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCategoryFilter("")
                      setStoreFilter("")
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

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Card className="flex items-center justify-between p-4 sm:w-auto">
            <div className="text-sm font-medium text-slate-600">Total:</div>
            <div className="text-xl font-bold text-purple">${totalCost.toFixed(2)}</div>
          </Card>
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 p-8 text-center">
            <p className="text-slate-500">No grocery items found. Add some items to your list!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-4 pt-6">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-slate-500">
                        {item.quantity} {item.quantity > 1 ? "items" : "item"}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-slate-100">
                      {item.category}
                    </Badge>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">{item.store}</div>
                    <div className="font-medium text-emerald-600">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-slate-50 p-2">
                  
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 hover:text-emerald-600"
                        onClick={() => {
                          setEditingItem({ ...item });   // remember what to edit
                          setIsEditOpen(true);           // open the dialog
                        }}
                        
                      >
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </Button>
                    
                      {editingItem && (
                        <Dialog open={isEditOpen} onOpenChange={(open) => !open && setIsEditOpen(false)}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Grocery Item</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                            <Label htmlFor="edit-name">Item Name</Label>
                            <Input
                              id="edit-name"
                              value={editingItem.name}
                              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-quantity">Quantity</Label>
                              <Input
                                id="edit-quantity"
                                type="number"
                                min="1"
                                value={editingItem.quantity}
                                onChange={(e) =>
                                  setEditingItem({ ...editingItem, quantity: Number.parseInt(e.target.value) })
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-price">Price ($)</Label>
                              <Input
                                id="edit-price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={editingItem.price}
                                onChange={(e) =>
                                  setEditingItem({ ...editingItem, price: Number.parseFloat(e.target.value) })
                                }
                              />
                            </div>
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                              value={editingItem.category}
                              onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="edit-store">Store</Label>
                            <Select
                              value={editingItem.store}
                              onValueChange={(value) => setEditingItem({ ...editingItem, store: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {stores.map((store) => (
                                  <SelectItem key={store} value={store}>
                                    {store}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            </div>
                            </div>
                          <DialogFooter>
                          <Button onClick={handleUpdateItem} className="bg-pink hover:bg-pink/90">
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                      </Dialog>
                    )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-red-600"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Delete
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
