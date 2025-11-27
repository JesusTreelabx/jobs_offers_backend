# Usa una imagen base oficial de Node.js (con Alpine para un tamaño más pequeño)
FROM node:18-alpine

# Crea y establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias
# Usa COPY package*.json para aprovechar el caching de Docker
COPY package*.json ./

# Instala las dependencias. Esto solo se ejecuta si package.json cambia.
RUN npm install

# Copia el resto del código fuente de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto que usa tu aplicación (el puerto 3000 de tu server.js)
EXPOSE 3000

# Define el comando que se ejecutará cuando se inicie el contenedor
# Usa 'npm start' (que debe estar definido en tu package.json)
CMD [ "npm", "start" ]