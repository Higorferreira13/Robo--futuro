
# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta usada pelo Render
EXPOSE 3000

# Copia o painel HTML para o servidor
COPY painel /usr/share/nginx/html

# Comando para rodar o servidor e módulos
CMD ["sh", "-c", "node server.js && node renda-automatica.js && node renda-real.js"]
