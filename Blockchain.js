
const {createHash } = require('node:crypto');

function Blockchain(){
    this.chains=[];
    this.pendingtransactions=[];
}


Blockchain.prototype.createNewBlock= function(prevHash,currentHash,nonce){

    const newBlock={
    
        previousBlockHash:prevHash,
        timestamp:Date.now(),
        transactions: this.pendingtransactions,
        currentBlockHash:currentHash,
        nonce:nonce

    }

    this.pendingtransactions=[];
    this.chains.push(newBlock);
    

}


Blockchain.prototype.createNewTransaction=function(from, to, value){

    const transaction={
        from:from,
        to:to,
        value:value
    }

    this.pendingtransactions.push(transaction);


}
Blockchain.prototype.getLatestBlock=function(){
    return this.chains[this.chains.length-1];
}


Blockchain.prototype.hashBlockdata=function(prevBlockHash,transactionData,nonce){
    const dataAsaString= prevBlockHash + JSON.stringify(transactionData)+nonce.toString();
    const hash = createHash('sha256');

    const dataHash=hash.update(dataAsaString).digest('hex');
    

    return dataHash;



}


Blockchain.prototype.proofOfwork=function(prevHash,transactiondata){

    let nonce=0;
    let Hash=this.hashBlockdata(prevHash,transactiondata,nonce).toString();

    while(Hash.substring(0,4) !==000)
    {
        nonce++;
        let Hash=this.hashBlockdata(prevHash,transactiondata,nonce).toString();
        
        
    }
    return nonce;

}



// Testing

const bitcoin=new Blockchain();

bitcoin.createNewTransaction({from:"sender",to:"target",value:23});
const nonce=bitcoin.proofOfwork("fghj",this.pendingtransactions)
const Hash=bitcoin.hashBlockdata("fghj",this.pendingtransactions,nonce);
bitcoin.createNewBlock("fghj",Hash,nonce);


console.log(bitcoin);
