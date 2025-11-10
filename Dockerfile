
# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Instala as dependências direto do repositório
RUN npm install

# Expõe a porta usada pelo Render
EXPOSE 3000

# Executa diretamente o servidor e os módulos do robô
CMD ["sh", "-c", "node server.js && node renda-automatica.js && node renda-real.js"]
