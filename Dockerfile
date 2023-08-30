# Use an official Node.js runtime as the base image
FROM node:18-alpine AS BUILD_IMAGE

# Set the working directory inside the container
WORKDIR /app/react-app

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the production app
RUN npm run build

# Use a smaller image for serving the app
FROM node:18-alpine as PRODUCTION_IMAGE

WORKDIR /app/react-app

# Copy the built app from the previous stage to the nginx directory
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/

EXPOSE 5137

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

# EXPOSE 5137

# # Start the nginx server
# CMD ["npm", "run", "preview"]
