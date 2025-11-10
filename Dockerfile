# Usa a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta usada pelo Render
EXPOSE 3000

# Comando para iniciar o robô e o painel
CMD ["sh", "-c", "node server.js && node renda-automatica.js && node renda-real.js"]
