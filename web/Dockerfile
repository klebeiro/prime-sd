# Usa a imagem do Node para construir o projeto
FROM node:18 AS build
WORKDIR /app

# Copia apenas os arquivos de dependências para otimizar o cache do Docker
COPY package.json package-lock.json ./

# Instala as dependências antes de copiar o código-fonte (melhora cache)
RUN npm install

# Copia todo o código-fonte para dentro do container
COPY . .

# Faz o build da aplicação
RUN npm run build

# Servindo o build com Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Remove arquivos padrão do Nginx
RUN rm -rf ./*

# Copia os arquivos gerados pelo build do React
COPY --from=build /app/dist ./

# Copia um arquivo de configuração customizado do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposição da porta 80 (padrão do Nginx)
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
