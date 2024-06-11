# Use the official Node.js image as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's code
COPY . .

# Expose port 4000 where your app is running
EXPOSE 4000

# The command to run your application
CMD ["node", "index.js"]
