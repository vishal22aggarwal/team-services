# Step 1: Use an official Node.js runtime as the base image
FROM node:18 as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the Angular application
RUN npm run build --prod

# Step 7: Use an NGINX image to serve the built Angular application
FROM nginx:alpine

# Step 8: Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to allow external access
EXPOSE 80

# Step 10: Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
