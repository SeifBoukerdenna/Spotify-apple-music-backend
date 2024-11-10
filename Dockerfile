# Stage 1: Build
FROM node:20.13.0 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript code and replace path aliases
RUN npm run build

# Stage 2: Production
FROM node:20.13.0-alpine

# Set working directory
WORKDIR /app

# Copy over node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the built code
COPY --from=builder /app/dist ./dist

# Copy package.json (optional if needed)
COPY package.json .

# Set environment variables if needed
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
