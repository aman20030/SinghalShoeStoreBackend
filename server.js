const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// ✅ CORS: Allow Netlify frontend
app.use(cors({
  origin: 'singhalshoestore.netlify.app/', // <-- 🔁 Change to your Netlify URL
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ✅ Root Test Route (for testing Render deploy)
app.get('/api/test', (req, res) => {
  res.json({ message: '🎉 Backend is live!' });
});

// ✅ Port Setup
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connect & Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));
