FROM node:18

WORKDIR /app

COPY todo-app/backend ./backend


WORKDIR /app/backend
RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
