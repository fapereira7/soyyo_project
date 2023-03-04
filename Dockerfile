#node version
FROM node:18.12.1

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#copiar el codigo fuera de este dockerfile
COPY . .

#use in linux
EXPOSE 8080

CMD [ "npm", "run", "dev" ]

