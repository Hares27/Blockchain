# Blockchain

The project built using nodejs core libraries.The project has two functionalities which are building Blockchain prototype and basic virtual machine.

## How can you define Blockchain

__Blockchain is a decentralized distributed system__. This is exactly we get from internet.
Instead of going for the definition at first place why don't we know the use of Blockchain.


_How can we transfer our money from one account to another account in general_ . 

The answer might be so many ways but at last this action happens by bank. You are asking bank to transfer your money from one account to another account.This means sender and receiver are trusting a third party(bank) to do this transaction. This means bank has all the history of sender and receiver transactions. I want to eliminate this bank for doing any transaction using Blockchain.How can I do this. The main purpose of bank here is to validate sender really owns the money to transfer. Here bank acting as a validator and validating the transaction by checking the history of sender transactions.Another role of bank here is sender and receiver trusting that bank will not modify our history of transactions means they need immutability.In worst case scenario the bank will take more time for validation and also will modify by history of transactions.If we want to eliminate bank here we need to build a system which automates this validation and immmutability.Blockchain gives us immutability and validation of transaction using consensus algorithms.


Blockchain not only provide decentralization by removing third party(like bank in the above example) , it provides distributing functionality.

Right now most of them using web2 applications. These applications are centralized. Sometime most of us faced server down issues.The applications are build using client and server models.Client interact with server using HTTP and HTTPS protocols.I can consider client is your browser and server might be hosted on any cloud provider. Client fetching data from server using location based address(http://google.com). If server goes down we won't get any data beacause the client only knows address of data not the data.We can prevent this using distributed systems by storing the data in every node in the network(Blockchain)with reference of hash.You can even observe every block in Blockchain has hash, this means Blockchain consider every block is a file and storing the block with the reference of hash. Hashing is like if we change single bit in data the hash of data will change.This gives immutability.By using this hashes we can fetch Blockchain data not like location based addressing in centralized system.From this we can understand the nodes in Blockchain are not communicating using HTTP or HTTPs protocols, these two communication protocols are only for client and server model communication.But in Blockchain the nodes sometimes act as client and sometimes as server. From this we can say Blockchain also eliminates server downtime and Blockchain uses peer to peer(sometimes acts a client and sometimes a server) communication protocol.

## Virtual machine

Virtual machines are isolated environments. The main purpose of virtual machine is to get same output for specific input in any environment. I can consider virtual machine are functions which takes input and gives output which is same for who ever run the this function with same input. In Blockchain virtual machines plays a main role to make validators come to consensus.The Blockchain does not create virtual machine for normal transaction like transfering money.Blockchain create virtual machine for transaction who need to interact with contract to transafer an asset.


## Requirements

- [Node](https://nodejs.org/en) should be installed on you local machine

## Getting Started

To get started with this project, follow these steps:

- Fork this repository

- Clone this repository to your local machine:

```bash
git clone https://github.com/Hares27/Blockchain.git
```

- Start the Blockchain:

```bash
node Blockchain
```
- Start the Virtual machine:

```bash
node virtualmachine
```
