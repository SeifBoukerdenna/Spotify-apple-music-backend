# Stage 1: Build
FROM node:20.13.0 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copy source code
COPY src ./src

# Build the TypeScript code
RUN npm run build

# Stage 2: Production
FROM node:20.13.0

# Set working directory
WORKDIR /app

# Copy over node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the built code
COPY --from=builder /app/dist ./dist

# Set environment variables if needed
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "-r", "module-alias/register", "dist/app.js"]
