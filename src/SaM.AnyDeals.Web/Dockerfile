FROM node:19.4-alpine
WORKDIR /app

COPY ../SaM.AnyDeals.Web/package.json .
COPY ../SaM.AnyDeals.Web/package-lock.json .

ENV NODE_OPTIONS=--max-old-space-size=4096
ENV PATH /app/node_modules/.bin:$PATH
ENV FAST_REFRESH=false
ENV WDS_SOCKET_PORT=0

RUN npm install
COPY ../SaM.AnyDeals.Web/ .
CMD ["npm", "start"]
