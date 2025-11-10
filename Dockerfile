# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências do projeto
RUN npm install

# Expõe a porta usada pelo Render
EXPOSE 3000

# Comando para iniciar o robô e o painel
CMD ["sh", "-c", "node server.js && node renda-automatica.js && node renda-real.js"]
