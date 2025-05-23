// ─────────────────────────────────────────────────────────────
// 1.  ENV & DEPENDENCIES
// ─────────────────────────────────────────────────────────────

require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Item = require('./models/Item');


// ─────────────────────────────────────────────────────────────
// 2.  APP INSTANCE & GLOBAL MIDDLEWARE
// ─────────────────────────────────────────────────────────────

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// 3.  DB CONNECTION
// ─────────────────────────────────────────────────────────────

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));




// ─────────────────────────────────────────────────────────────
// 4.  HELPERS
// ─────────────────────────────────────────────────────────────


//Helper to sign a token
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '2h' }
  );
}

//Secure the item routes (read-only for now)
// middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token invalid/expired' });
  }
}


// ─────────────────────────────────────────────────────────────
// 5.  ROUTES
// ─────────────────────────────────────────────────────────────

// Health-check
app.get('/', (_req, res) => res.send('Hello from backend!'));

// -----  AUTH  ------------------------------------------------

//Signup → return token
app.post('/users/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

    if (await User.findOne({ email })) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    const token = generateToken(newUser);
    res.status(201).json({ message: 'User created', token, user: { name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
//Login → verify, then token
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid password' });

    const token = generateToken(user);
    res.json({ message: 'Login successful', token, user: { name: user.name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// -----  GROCERY ITEMS  ---------------------------------------
// protect the routes that need a user
app.post('/items', auth, async (req, res) => {
  try {
    const { name, groceryStore, price } = req.body;
    const createdBy = req.user.email;

    let item = await Item.findOne({ name, groceryStore, createdBy });

    if (item) {
      item.price = price;
      await item.save();
      return res.json({ message: 'Item price updated', item });
    }

    item = await Item.create({ name, groceryStore, price, createdBy });
    res.json({ message: 'Item created', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
app.get('/items/all', auth, async (req, res) => {
  try {
    const items = await Item.find({ createdBy: req.user.email }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/items/:id', auth, async (req, res) => {
  try {
    const result = await Item.findOneAndDelete({ _id: req.params.id, createdBy: req.user.email });
    if (!result) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})










// ─────────────────────────────────────────────────────────────
// 6.  SERVER LISTEN
// ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
