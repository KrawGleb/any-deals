FROM node:15.13-alpine
WORKDIR /app
COPY ./package*.json ./
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
CMD ["npm", "start"]