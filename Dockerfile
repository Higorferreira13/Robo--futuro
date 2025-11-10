# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todo o restante do código para o container
COPY . .

# Expõe a porta usada pelo Render
EXPOSE 3000

# Copia o painel HTML para o servidor interno
COPY painel /usr/share/nginx/html

# Comando para rodar o servidor e os módulos de renda
CMD ["sh", "-c", "node server.js && node renda-automatica.js && node renda-real.js"]
