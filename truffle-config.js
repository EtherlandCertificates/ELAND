require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');

const { MNEMONIC, INFURA_KEY } = process.env;
const solcStable = {
  version: '0.7.5',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

const needsInfura = process.env.npm_config_argv && (process.env.npm_config_argv.includes('rinkeby') || process.env.npm_config_argv.includes('live'));

if (needsInfura && !(MNEMONIC && INFURA_KEY)) {
  console.error('Please set a mnemonic and infura key.');
  process.exit(0);
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  networks: {
    localtest: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA_KEY}`);
      },
      network_id: '*',
      networkCheckTimeout: 10000000,
      skipDryRun: true
    },
    live: {
      network_id: 1,
      provider: () => {
        return new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/${INFURA_KEY}`);
      },
      gas: 3500000,   // 3216724
      gasPrice: 30000000000, // 30Gwei
      skipDryRun: true
    }
  },
  compilers: {
    solc: solcStable
  }
};