const express = require('express');
const cors = require('cors');
const { connect } = require('./db/db');
const couponRoutes = require('./routes/couponRoutes');

// Create an Express application
const app = express();

// PORT
const PORT = 3000;

// Middleware for parsing JSON bodies and parsing URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for enabling CORS
app.use(cors());

// Connect to MongoDB
connect().then(() => {
    console.log('MongoDB connected successfully');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Use couponRoutes
app.use('/coupon', couponRoutes);


// Define a basic route
app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to , coupon add backend server!"
    }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
