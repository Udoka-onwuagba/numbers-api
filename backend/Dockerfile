# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code
COPY . .

# Expose port 3000 for backend
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start"]
