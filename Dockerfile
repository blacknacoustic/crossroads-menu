# Use the official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy .env file (for environment variables)
COPY .env .env

# Build the React app
RUN npm run build

# Expose port for the app to be accessible
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
