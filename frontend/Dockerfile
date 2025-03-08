FROM node:18

# Set working directory
WORKDIR /app

# Copy project files
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Expose port
EXPOSE 5173

# Start React App
CMD ["npm", "run", "dev"]
