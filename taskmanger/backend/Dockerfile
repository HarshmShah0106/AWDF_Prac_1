FROM node:20-alpine

WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package*.json ./

# Install backend dependencies inside container
RUN npm install

# Copy application code (excluding files in .dockerignore)
COPY . .

# Expose backend API port
EXPOSE 5000

# Set environment defaults
ENV PORT=5000

# Start Express server
CMD ["node", "server.js"]
