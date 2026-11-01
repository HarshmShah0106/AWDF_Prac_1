# Multi-stage build for React Frontend to reduce final image size
# Node 20 LTS provides native styleText in node:util required by modern Vite / Rolldown
FROM node:20-alpine AS build

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build production bundle
COPY . .
RUN npm run build

# Expose Vite preview port (configured in vite.config.js)
EXPOSE 5173

# Serve built production assets with host binding to 0.0.0.0
CMD ["npm", "run", "preview", "--", "--host", "--port", "5173"]
