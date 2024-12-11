FROM node:20 AS base
WORKDIR /app
EXPOSE 3000
COPY . .
RUN npm install next
RUN npm run build
CMD ["npm", "start"]