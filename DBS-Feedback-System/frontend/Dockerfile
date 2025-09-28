# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json from feedback-frontend directory
COPY feedback-frontend/package*.json ./
RUN npm install

# Copy all source and build
COPY feedback-frontend/ .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx content and copy React build
RUN rm -rf ./*
COPY --from=build /app/build .

# Expose frontend port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
