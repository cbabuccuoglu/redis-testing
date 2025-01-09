# Use the Redis Stack Server image as the base image
FROM redis/redis-stack-server:latest

# Expose the Redis port
EXPOSE 6379

# Start the Redis server
CMD ["redis-stack-server"]