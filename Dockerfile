# Multi-stage build for React Portfolio Frontend
# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and generate production build
COPY . .
RUN npm run build

# Expose Vite preview port
EXPOSE 5173

# Serve production preview
CMD ["npm", "run", "preview", "--", "--host", "--port", "5173"]
