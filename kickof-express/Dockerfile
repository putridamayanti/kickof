# Use an official Node runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# If you're building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your app
CMD [ "node", "index.js" ]