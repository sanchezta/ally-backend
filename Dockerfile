# Usa Node 20 como base
FROM node:20-alpine

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos de dependencias primero (para aprovechar cache)
COPY package.json yarn.lock ./

# Instala dependencias
RUN yarn install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Compila el proyecto NestJS
RUN yarn build

# Expone el puerto de la app (ajústalo si usas otro)
EXPOSE 3001

# Comando para iniciar la app
CMD ["node", "dist/main"]
