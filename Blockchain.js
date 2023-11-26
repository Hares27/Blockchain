
const {createHash } = require('node:crypto');

function Blockchain(){
    this.chains=[];
    this.pendingtransactions=[];
}


Blockchain.prototype.createNewBlock= function(Block){

    const newBlock={
    
        previousBlockHash:Block.previousblockHash,
        timestamp:Date.now(),
        transactions: this.pendingtransactions,
        currentBlockHash:Block.currentBlockHash,
        nonce:Block.nonce

    }

    this.pendingtransactions=[];
    this.chains.push(newBlock);
    

}


Blockchain.prototype.addNewTransaction=function(transaction){

    this.pendingtransactions.push(transactiondata);


}






Blockchain.prototype.proofOfwork=function(previousBlockHash){

    let nonce=0;
    let Hash=this.hashBlock({previousBlockHash:previousBlockHash,blocktransactions:this.pendingtransactions,nonce:nonce}).toString();

    while(Hash.substring(0,4) !==000)
    {
        nonce++;
        let Hash=this.hashBlock({previousBlockHash:previousBlockHash,blocktransactions:this.pendingtransactions,nonce:nonce}).toString();
        
        
    }
    return nonce;

}

Blockchain.prototype.hashBlock=function(block){
    const blockdataAsString= block.previousBlockHash + JSON.stringify(block.blocktransactions)+block.nonce.toString();
    const hash = createHash('sha256');

    const newBlockHash=hash.update(blockdataAsString).digest('hex');
    

    return newBlockHash;



}


Blockchain.prototype.getLatestBlock=function(){
    return this.chains[this.chains.length-1];
}





const bitcoin=new Blockchain();


const transaction={from:"sender",to:"target",value:23};
bitcoin.createNewTransaction(transaction);


const Blocknonce=bitcoin.proofOfwork({previousBlockHash:"fghj"});
const Blockdata={previousBlockHash:"fghj",blocktransactions:this.pendingtransactions,nonce:Blocknonce};
const BlockHash=bitcoin.hashBlock(Blockdata);


const Block={previousBlockHash:"fghj",currentBlockHash:BlockHash,nonce:Blocknonce};
bitcoin.createNewBlock(Block);


console.log(bitcoin);
