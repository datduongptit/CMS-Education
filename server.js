const express = require('express');
const connectDB = require('./config/db');

//Created Server
const app = express();

// Connect DB
connectDB();

// Initial Middleware
app.use(express.json({ extended: false }));

//Test first Api
app.get('/', (req, res) => res.send('API running'));

// Defined routes
app.use('/api/persons', require('./routes/api/persons'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
