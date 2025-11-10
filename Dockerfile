# Imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências e instalar
COPY package*.json ./
RUN npm install

# Copiar o restante do projeto
COPY . .

# Expor a porta padrão do Render
EXPOSE 3000

# Copiar os arquivos do painel para o servidor
COPY painel /usr/share/nginx/html

# Comando para iniciar o servidor e o painel
CMD ["sh", "-c", "node server.js && node renda-automatica.js && node renda-real.js"]


