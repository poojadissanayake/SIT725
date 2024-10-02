# Node.js base image
FROM node:20.3.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rset of the project files
COPY . .

# Expose the port
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]