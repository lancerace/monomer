FROM node:20.10.0

COPY . /app 

WORKDIR /app

RUN npm install -g typescript ts-node
RUN npm install --legacy-peer-deps

USER lancerace

CMD ["npm", "start"]