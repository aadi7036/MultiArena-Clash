FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
RUN npm install -D nodemon concurrently
COPY . .
EXPOSE 5000 3001
CMD ["npm", "run", "dev"]