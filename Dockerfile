# Dockerfile — base Node.js 20
FROM node:20-alpine

RUN addgroup -S app && adduser -S -G app app
WORKDIR /usr/src/app

COPY package*.json ./
# trocar npm ci por npm install para evitar erro sem package-lock
RUN npm install --production

COPY . .

RUN chown -R app:app /usr/src/app
USER app

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "app.js"]




