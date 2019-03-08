#iniciar o gerenciador de pacotes
npm init

# instalar extens�o do mssql
npm install -S mssql

#A flag �-S�diz que � pra salvar essa depend�ncia no arquivo packages.json

# criar o arquivo 
node create-table.js

# Adicionar dependência do Express (framework web) e do Body-Parser (parser para os POSTs futuros) no projeto via linha de comando na pasta do mesmo.
npm install -S express body-parser



## Para criar a imagem
# docker build -t jcjeancarlo_dockerhub/nodejs-image-demo-restapi .

## Para construir o container 
# docker run --name nodejs-image-demo-restapi -p 3000:3000 -d jcjeancarlo_dockerhub/nodejs-image-demo-restapi