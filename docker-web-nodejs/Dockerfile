FROM node:10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --quiet --production --no-progress --registry=${registry:-https://registry.npmjs.org} && \
    npm cache clean --force && \
	npm install --save-dev webpack && \
    npm install --save-dev nodemon && \
    npm install express --save && \
	npm install mssql --save

COPY . .

RUN chown -R node:node /home/node/app

USER node

EXPOSE 8080

CMD [ "node", "app.js" ]