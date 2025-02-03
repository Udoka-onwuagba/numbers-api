# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json before installing dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Expose port for Vite (default is 5173)
EXPOSE 5173

# Run frontend in development mode
CMD ["npm", "run", "dev"]
