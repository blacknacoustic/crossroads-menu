# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Install the production web server (e.g., serve)
RUN npm install -g serve

# Expose port 3000 for the app
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
