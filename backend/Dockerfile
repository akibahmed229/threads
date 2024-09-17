# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy Prisma schema to the container
COPY prisma ./prisma
COPY .env ./

# Install dependencies
RUN npm install

# Generate Prisma client and apply migrations
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose port 5000 to the outside world
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "run", "dev"]

