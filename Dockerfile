# Imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia e instala dependências
COPY package*.json ./
RUN npm install

# Copia todo o restante do projeto
COPY . .

# Expõe a porta padrão do Render
EXPOSE 3000

# Comando para iniciar o app
CMD ["node", "server.js"]

