const express = require("express");
const blockchain = require("./Blockchain");
const request = require('request');
const bodyParser = require('body-parser');

/* Config */

// express config
let app = express();
let jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 8000;

// blockchain config
const BChain = new blockchain();
let known_peers = [];

/* Routes */


// GET Endpoints

/**
 * Returns the full blockchain.
 */
app.get('/get_blockchain', (req, res) => {
    res.send(BChain);
});

/**
 * Mine transactions from the mempool into a new block and return the nonce.
 */
app.get('/mine_block', (req, res) => {
    BChain.mine();
    res.status(200).send("Block mined! Nonce: " + BChain.chain[BChain.chain.length-1].nonce);
});


/**
 * Calculate blockchain validity
 */
app.get('/validate_chain', (req, res) => {
    res.status(200).send("chainIsValid: " + BChain.chainIsValid());
});

// POST Endpoints

/**
 * Add another blockchain peer to our list of known peers.
 * This features a very minimal discovery protocol. After adding the peer,
 * we will announce ourselves to the peer so they can add us to their
 * known peers list.
 *
 * @param peer the peer to add
 */
app.post('/add_known_peer', (req, res) => {
    console.log(req.body);
    if (req.body.peer === undefined) {
        res.status(400).send('peer required!');
        return;
    }
    let peer = req.body.peer;

    // Check if peer already exists
    if(known_peers.includes(peer)) {
        res.status(200).send('peer already known!');
        return;
    }

    known_peers.push(peer);

    // don't announce if this is another peer's announcement
    if (req.body.from_peer || req.body.from_peer === undefined) {
        res.status(200).send('peer added!');
        return;
    }

    // anounce ourselves to peer
    var options = {
        'method': 'POST',
        'url': peer+'/add_known_peer',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"peer":"http://localhost:"+port, "from_peer":true})

    };
    request(options, function (error, response) {
        if (error) throw new Error('err: '+error);
        console.log('res: '+response.body);
    });

    res.status(200).send('peer added!');
});

/**
 * Create a new transaction and add it to the mempool.
 *
 * @param amount amount in the transactions
 * @param sender ID of the sender
 * @param receiver ID of the receiver
 */
app.post('/create_transaction', (req, res) => {
    if (!('amount' in req.body) || !('sender' in req.body) || !('recipient' in req.body)) {
        res.status(400).send('amount, sender, recipient required!');
        return;
    }
    BChain.createTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.status(200).send('Transaction added to mempool');
});

/**
 * This route is called by another peer with a message.
 *
 * @param msg message from the peer
 */
app.post('/peer_msg', (req, res) => {
    if (!('msg' in req.body)) {
        res.status(400).send('msg required!');
    }
    console.log(req.body.msg);
    res.status(200).send("ACKNOWLEDGED");
});

/**
 * Broadcast a message to all known peers
 *
 * @param msg the message to broadcast
 */
app.post('/broadcast', (req, res) => {
    if (!('msg' in req.body)) {
        res.status(400).send('msg required!');
        return;
    }
    try {
        broadcast(req.body.msg);
    } catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send("Broadcasted!");
});

// Listen on port specified by commandline param
app.listen(port, function() {
	console.log(`Listening on port ${port}...`);
});

/* Utilities */

/**
 * Broadcast a message to all known peers.
 * @param msg The message to send
 */
function broadcast(msg) {
    console.log("broadcasting msg...");

    // iterate through known peers and send msg
    known_peers.forEach((p) => {
        var options = {
            'method': 'POST',
            'url': p+'/peer_msg',
            'headers': {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "msg": msg })
        };
        request(options, function (error, response) {
            if (error) throw error;
            console.log('res: '+response.body);
        });
    });
}
