FROM node:19.4-alpine
WORKDIR /app

COPY ../SaM.AnyDeals.Web/package.json .
COPY ../SaM.AnyDeals.Web/package-lock.json .

ENV NODE_OPTIONS=--max-old-space-size=4096
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install
COPY . .
CMD ["npm", "start"]