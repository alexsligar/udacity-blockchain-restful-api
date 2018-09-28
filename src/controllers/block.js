

/**
 * Get block by height
 */
exports.get = (req, h) => {


    return req.server.app.blockchain.getBlock(req.params.height)
    .then((block) => {


        return block;


    })
    .catch((err) => {

        
        return { err: err.message };
        

    });
};

/**
 * Post a new block to the chain
 */
exports.post = (req, h) => {


    return req.server.app.blockchain.addBlock(req.payload)
    .then((block) => {


        return block;


    })
    .catch((err) => {


        return { err: err };


    });

};