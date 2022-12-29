FROM node:15.13-alpine
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build
CMD ["npm", "start"]