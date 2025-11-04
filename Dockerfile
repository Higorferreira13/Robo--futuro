# Dockerfile — base Node.js 20
FROM node:20-alpine

# Cria usuário não-root
RUN addgroup -S app && adduser -S -G app app
WORKDIR /usr/src/app

# Copia dependências
COPY package*.json ./
RUN npm ci --production

# Copia código
COPY . .

# Ajusta permissões
RUN chown -R app:app /usr/src/app
USER app

# Define porta e comando
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "app.js"]

