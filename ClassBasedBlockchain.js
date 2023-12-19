const { createHash } = require("node:crypto");

class Blockchain {
  constructor() {
    this.chains = [];
    this.pendingtransactions = [];
  }

  createNewBlock(prevHash, currentHash, nonce) {
    const newBlock = {
      previousBlockHash: prevHash,
      timestamp: Date.now(),
      transactions: this.pendingtransactions,
      currentBlockHash: currentHash,
      nonce: nonce,
    };
    this.pendingtransactions = [];
    this.chains.push(newBlock);
  }

  createNewTransaction(from, to, value) {
    const transaction = {
      from: from,
      to: to,
      value: value,
    };
    this.pendingtransactions.push(transaction);
  }

  getLatestBlock() {
    return this.chains[this.chains.length - 1];
  }

  hashBlockdata(prevBlockHash, transactionData, nonce) {
    const dataAsaString =
      prevBlockHash + JSON.stringify(transactionData) + nonce.toString();
    const hash = createHash("sha256");
    const dataHash = hash.update(dataAsaString).digest("hex");
    return dataHash;
  }

  proofOfwork(prevHash, transactiondata) {
    let nonce = 0;
    let Hash = this.hashBlockdata(prevHash, transactiondata, nonce).toString();
    while (Hash.substring(0, 4) !== "000") {
      nonce++;
      let Hash = this.hashBlockdata(
        prevHash,
        transactiondata,
        nonce
      ).toString();
    }
    return nonce;
  }
}

const bitcoin = new Blockchain();

bitcoin.createNewTransaction({ from: "sender", to: "target", value: 23 });
const nonce = bitcoin.proofOfwork("fghj", this.pendingtransactions);
const Hash = bitcoin.hashBlockdata("fghj", this.pendingtransactions, nonce);
bitcoin.createNewBlock("fghj", Hash, nonce);

console.log(bitcoin);
