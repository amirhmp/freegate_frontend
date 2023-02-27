FROM node:18.14.2-alpine3.17
#RUN addgroup app && adduser -S -G app app
#USER app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 3000

CMD ["npm", "start"]
