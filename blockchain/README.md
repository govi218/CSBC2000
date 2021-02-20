# Blockchain Simulator

This is a blockchain simulator where transactions can be added to a mempool and can be mined into a block using PoW.

## Running
1. Install required modules: `npm install #might need sudo`
2. Run a node on one terminal by specifying a port: `PORT=8080 node blockchain-peer.js`
3. Run as many nodes as you want in separate terminals using the above command with different ports

## Interacting with the blockchain
You can simulate transactions using some HTTP request client like cURL (terminal) or [Postman](https://www.postman.com/) (GUI).
- You can start by making nodes find each other using this request body `{ "peer": "http://localhost:8081" }` and sending it to one of the nodes as a POST request to the endpoint `http://localhost:8080/add_known_peer`
- Then, you can make nodes broadcast by passing this request body `{ "msg": "Hello world!"}` as a POST request to the endpoint `http://localhost:8080/broadcast`
- You can then interact with the blockchain API methods as documented in the code

## Docker
You can run a node as a docker container.
- First, build the container using: `docker build .`. This will generate a random container ID.
- Then, you can run the node by specifying a port (such as 8082): `docker run -t -e PORT=8082 --expose 8082 -p 8082:8082 <CONTAINER-ID>`
- This will spin up a node you on your port that you can make requests to
