# Use the official Node.js image
FROM node:20

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run sequelize migrations
RUN npx sequelize db:migrate

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
