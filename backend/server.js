const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes'); 

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();     

// Initialize Express app
const app = express();

// Configure CORS to allow frontend access
app.use(cors({
  origin: 'http://localhost:5173', // Allow only frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // If you're using cookies or authentication
}));

app.use(express.json()); // Parse incoming JSON requests

// Use routes
app.use('/api/users', userRoutes); 
app.use('/api/events', eventRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
