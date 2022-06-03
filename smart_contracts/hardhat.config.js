require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/AjsULX5BITvJsBO_ES2HaZxH0kSrxTpn',
      accounts: ['3196c36912105fdb9997c6e59b3017b23cb9006f1a0589717a2f352ebd421494']
    }
  }
}
