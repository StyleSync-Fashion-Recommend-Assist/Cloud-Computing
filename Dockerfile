# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /src/app

# Copy the current directory contents into the container at /app
COPY package*.json .
COPY . ./

# Install Dependencies
RUN npm install

# Command
CMD ["npm", "start"]

EXPOSE 8080
