const Redis = require('ioredis');
const redis = new Redis(); // Connects to Redis at localhost:6379 by default

// Sample JSON data
const data = [
    { id: "user:1", name: "Alice", email: "alice@example.com", age: 25 },
    { id: "user:2", name: "Bob", email: "bob@example.com", age: 30 },
    { id: "user:3", name: "Charlie", email: "charlie@example.com", age: 22 }
];

async function populateRedis() {
    try {
        for (const item of data) {
            // Use the `id` field as the Redis key and store the entire object as a string
            await redis.set(item.id, JSON.stringify(item));
            console.log(`Added: ${item.id}`);
        }
        console.log('Data successfully added to Redis!');
        redis.quit();
    } catch (error) {
        console.error('Error adding data to Redis:', error);
        redis.quit();
    }
}

populateRedis();