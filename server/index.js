require('dotenv').config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const User = require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/Item');




const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.post('/test', (req, res) => {
    console.log('POST /test hit');
    console.log('Request body:', req.body);
    res.json({ message: 'Test POST success', data: req.body });
});

app.post('/items', async (req, res) => {
    try {
      const { name, groceryStore, price, createdBy } = req.body;
  
      // Check if the item with the same name and store already exists
      let item = await Item.findOne({ name, groceryStore });
  
      if (item) {
        // If it exists, update the price
        item.price = price;
        item.createdBy = createdBy || item.createdBy;
        await item.save();
        return res.json({ message: 'Item price updated', item });
      }
  
      // If it doesn't exist, create new
      item = new Item({ name, groceryStore, price, createdBy });
      await item.save();
  
      res.json({ message: 'Item created', item });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});

app.get('/items', async (req, res) => {
    try {
      const { name, groceryStore } = req.query;
      if (!name || !groceryStore) {
        return res.status(400).json({ error: 'Please provide name and groceryStore query parameters' });
      }
  
      const item = await Item.findOne({ name, groceryStore });
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.json({ price: item.price, item });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});
  
  
  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
