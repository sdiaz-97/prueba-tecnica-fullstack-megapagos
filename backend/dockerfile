FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi"]
