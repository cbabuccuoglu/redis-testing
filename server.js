// Import dependencies
const express = require('express');
const Redis = require('ioredis');

// Initialize Redis client
const redis = new Redis(); // Connects to Redis running on localhost with default port 6379

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// API route to perform a search
app.get('/search', async (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({ success: false, message: 'Key is required.' });
    }

    try {
        // Check if the key exists in Redis
        const exists = await redis.exists(key);
        // Return boolean value to the client
        return res.json({ exists: exists === 1 });
    } catch (error) {
        console.error('Error accessing Redis:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});