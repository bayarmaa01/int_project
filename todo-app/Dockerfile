# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install backend
COPY backend ./backend
WORKDIR /app/backend
RUN npm install

# Expose and run
EXPOSE 3000
CMD ["node", "server.js"]
