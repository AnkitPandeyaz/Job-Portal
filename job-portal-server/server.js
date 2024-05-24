// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
