# Se usa una imagen oficial de Node.js 18.18.0 como base
FROM node:18.18.0

RUN mkdir -p /app && chown node:node /app
WORKDIR /app

COPY ./ /app
RUN npm install 

EXPOSE 3333

#COPY . /app

CMD ["npm", "run", "start-migrations"]
