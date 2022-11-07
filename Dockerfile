FROM node:12

USER root

WORKDIR /usr/src/app_timetable

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN NODE_ENV=production

EXPOSE 8000

CMD ["npm", "run", "start"]
