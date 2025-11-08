# Imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./
RUN npm install

COPY . .

# Expõe a porta que o Render usa
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]


