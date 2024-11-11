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

# **Copy the secrets file to /app/etc/secrets/ inside the container**
# Create the target directory
RUN mkdir -p /app/etc/secrets

# Copy the secret key
COPY etc/secrets/AuthKey_8MQTX7S357.p8 /app/etc/secrets/AuthKey_8MQTX7S357.p8

# **(Optional) Set appropriate permissions for the secrets file**
RUN chmod 600 /app/etc/secrets/AuthKey_8MQTX7S357.p8

# Set environment variables if needed
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
