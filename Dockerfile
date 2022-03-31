FROM node:17.6-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install -g react-scripts@5.0.0 --silent

COPY . ./

CMD ["npm", "start"]