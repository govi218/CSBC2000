FROM ubuntu:bionic

WORKDIR /usr/src/app

COPY . .

RUN apt update && apt install -y curl && \
        curl -fsSL https://deb.nodesource.com/setup_15.x |  bash - && \
        apt install -y nodejs && \
        npm install

CMD [ "node", "blockchain-peer.js" ]
