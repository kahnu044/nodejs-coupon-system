const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware for enabling CORS
app.use(cors());

// PORT
const PORT = 3000;

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
