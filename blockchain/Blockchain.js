const crypto = require('crypto');
const uuid = require('uuid');

/**
 * Block represents a block in the blockchain. It has the
 * following params:
 * @index represents its position in the blockchain
 * @timestamp shows when it was created
 * @transactions represents the data about transactions
 * added to the chain
 * @hash represents the hash of the previous block
 */
class Block {
    constructor(index, transactions, prevHash, nonce, hash) {
        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nonce = nonce;
    }
}

/**
 * A blockchain transaction. Has an amount, sender and a
 * recipient (not UTXO).
 */
class Transaction {
    constructor(amount, sender, recipient) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.tx_id = uuid().split('-').join();
    }
}

/**
 * Blockchain represents the entire blockchain with the
 * ability to create transactions, mine and validate
 * all blocks.
 */
class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.difficulty = 5;
        this.addBlock('0');
    }

    /**
     * Creates a transaction on the blockchain
     */
    createTransaction(amount, sender, recipient) {
        this.pendingTransactions.push(new Transaction(amount, sender, recipient));
    }

    /**
     * Add a block to the blockchain
     */
    addBlock(nonce) {
        let index = this.chain.length;
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : '0';
        let hash = this.getHash(prevHash, this.pendingTransactions, nonce);
        console.log(hash)
        console.log(nonce)
        let block = new Block(index, this.pendingTransactions, prevHash, nonce, hash);

        // reset pending txs
        this.pendingTransactions = [];
        this.chain.push(block);
    }

    /**
     * Gets the hash of a block.
     */
    getHash(prevHash, txs, nonce) {
        var encrypt = prevHash + nonce;
        txs.forEach((tx) => { encrypt += tx.tx_id; });
        var hash=crypto.createHmac('sha256', "secret")
            .update(encrypt)
            .digest('hex');
        return hash;
    }

    /**
     * Find nonce that satisfies our proof of work.
     */
    proofOfWork(difficulty,pendingTransactions) {
        //TODO
        let nonce = 0
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : '0';
        let hash = this.getHash(prevHash,pendingTransactions,nonce).toString()
        while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            nonce++;
            hash = this.getHash(prevHash,pendingTransactions,nonce);
        }
        return nonce;
    }

    /**
     * Mine a block and add it to the chain.
     */
    mine() {
        let tx_id_list = [];
        this.pendingTransactions.forEach((tx) => tx_id_list.push(tx.tx_id));
        let nonce = this.proofOfWork(this.difficulty,this.pendingTransactions);
        this.addBlock(nonce);
    }


    /**
     * Check if the chain is valid by going through all blocks and comparing their stored
     * hash with the computed hash.
     */
    chainIsValid(){
        for(var i=0;i<this.chain.length;i++){
            let tx_id_list = [];
            this.chain[i].transactions.forEach((tx) => tx_id_list.push(tx.tx_id));

            if(i == 0 && this.chain[i].hash !==this.getHash('0',[],'0')){
                console.log("1");
                return false;
            }
            if(i > 0 && this.chain[i].hash !== this.getHash(this.chain[i-1].hash, this.chain[i].transactions, this.chain[i].nonce)){
                console.log("2");
                return false;
            }
            if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash){
                console.log("3");
                return false;
            }
        }
        return true;
    }
}

function constructMerkleTree(inputs) {
    //TODO
}

function simulateChain(blockchain, numTxs, numBlocks) {
    for(let i = 0; i < numBlocks; i++) {
        let numTxsRand = Math.floor(Math.random() * Math.floor(numTxs));
        for(let j = 0; j < numTxsRand; j++) {
            let sender = uuid().substr(0,5);
            let receiver = uuid().substr(0,5);
            blockchain.createTransaction(sender, receiver,
                                         Math.floor(Math.random() * Math.floor(1000)));
        }
        blockchain.mine();
    }
}

const BChain = new Blockchain();
simulateChain(BChain, 5, 20);

console.dir(BChain,{depth:null});

console.log("******** Validity of this blockchain: ", BChain.chainIsValid());
