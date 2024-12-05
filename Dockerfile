# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]