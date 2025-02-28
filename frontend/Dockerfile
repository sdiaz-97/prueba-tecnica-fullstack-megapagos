# Etapa de construcción (builder)
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias e instalar
COPY package.json package-lock.json ./ 
RUN npm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Ejecutar pruebas unitarias antes de compilar
RUN npm test

# Definir variables de entorno para el build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Construir la aplicación
RUN npm run build

# --------------------------------------------------------

# Etapa final (producción)
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app ./ 

# Definir puerto de exposición
EXPOSE 80 8080

# Definir variable de entorno para ejecución
ENV NODE_ENV=production

# Ejecutar en modo producción
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start -- -p $PORT; fi"]
