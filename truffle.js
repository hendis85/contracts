// Allows us to use ES6 in our migrations and tests.
require('babel-register');
// https://github.com/trufflesuite/truffle-hdwallet-provider
const HDWalletProvider = require('truffle-hdwallet-provider');
// const HDWalletProvider = require('./WalletProvider');
const LedgerProvider = require('./LedgerProvider');

const mnemonic = 'laundry version question endless august scatter desert crew memory toy attract cruel';
const mnemonic_private = 'north depend loyal purpose because theme funny script debris divert kitchen junk diary angry method';
// make sure you have Ether on rinkeby address 0xb3fa520368f2df7bed4df5185101f303f6c7decc
const infuraApiKey = 'db719ec4fd734e798e74782bce13bbca';

const ledgerOptions = {
  networkId: 3, // ropsten testnet
  accountsOffset: 0 // we use the first address
};

module.exports = {
  networks: {
    'dev-local': {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:8545'),
      network_id: 8086, // Match any network id
      gas: 8000000,
      gasPrice: 2000000000
    },
    rinkeby: {
      provider: () => LedgerProvider(`https://rinkeby.infura.io/v3/${infuraApiKey}`, {
        networkId: 4,
        // https://github.com/LedgerHQ/ledgerjs/issues/200
        path: "44'/60'/0'/0",
        askConfirm: true,
        accountsLength: 1,
        accountsOffset: 0,
      }),
      network_id: 4,
      gas: 7000000,
      gasPrice: 50000000000,
    },
    'rinkeby-test' : {
        provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/904c762bd6984606bf8ae7f30d7cb28c'),
        network_id: 4,
        gas: 7000000,
        gasPrice: 50000000000
    },
    staging: {
      provider: () => LedgerProvider(`https://ropsten.infura.io/v3/${infuraApiKey}`, {
        networkId: 3,
        // https://github.com/LedgerHQ/ledgerjs/issues/200
        path: "44'/60'/0'/0",
        askConfirm: true,
        accountsLength: 1,
        accountsOffset: 0,
      }),
      // provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/71d39c30bc984e8a8a0d8adca84620ad'),
      network_id: 3,
      gas: 8000000,
      gasPrice: 50000000000
    },
    'ropsten' : {
        provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/71d39c30bc984e8a8a0d8adca84620ad'),
        network_id: 3,
        gas: 8000000,
        gasPrice: 50000000000
    },
    'staging-2key': {
      provider: () => LedgerProvider('http://18.233.2.70:8500/ropsten', {
        networkId: 3,
        // https://github.com/LedgerHQ/ledgerjs/issues/200
        path: "44'/60'/0'/0",
        askConfirm: true,
        accountsLength: 1,
        accountsOffset: 0,
      }),
      // provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/71d39c30bc984e8a8a0d8adca84620ad'),
      network_id: 3,
      gas: 8000000,
      gasPrice: 50000000000
    },
    'kovan': {
      provider: () => new HDWalletProvider(mnemonic, 'https://kovan.infura.io/6rAARDbMXpJlwODa2kbk'),
      network_id: 42,
      gas: 7000000,
      gasPrice: 3000000000
    },
    'plasma-local': {
      // host: 'localhost',
      // port: 8545,
      provider: () => new HDWalletProvider(mnemonic, 'http://localhost:18545'),
      network_id: 17, // Match any network id
      gas: 7000000,
      gasPrice: 1
      // gasPrice: 2000000000
    },
    'plasma-dev': {
      // host: '107.23.249.140',
      // port: 8090,
      provider: () => new HDWalletProvider(mnemonic, 'https://test.plasma.2key.network/'),
      network_id: 17, // Match any network id
      gas: 7000000,
      gasPrice: 0,
      // gasPrice: 2000000000
    },
  }
};
