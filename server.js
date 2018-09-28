'use strict';


const Hapi=require('hapi');
const Blockchain = require('./src/blockchain/chain');
const BlockController=require('./src/controllers/block');


//Create the server on port 8000
const server=Hapi.server({
    host:'localhost',
    port:8000
});

server.route({
    method:'GET',
    path:'/block/{height}',
    handler:BlockController.get
});

server.route({
    method:'POST',
    path:'/block',
    handler:BlockController.post
});

const start = async() => {


    try {
        await server.start();
        server.app.blockchain = new Blockchain();
        server.app.blockchain.getChain()
        .then((chain) => {
            console.log('Connected to the blockchain.');
            return chain;
        })
        .catch((err) => {
            console.log(`Couldn't access the blockchain: ${err}`);
            process.exit(1);
        })
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Server running at: ${server.info.uri}`);
};

start();