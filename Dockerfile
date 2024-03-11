# Usa la imagen oficial de Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la API
EXPOSE 3000

# Comando para ejecutar la API
CMD ["node", "app.js"]
