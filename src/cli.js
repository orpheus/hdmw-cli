import vorpal from 'vorpal'
import { Wallet } from 'oip-hdmw'
import { validateMnemonic } from 'bip39'

const cli = vorpal()
let wallet

cli
  .command('load mnemonic <mnemonic>')
  .description('Load your mnemonic. ex: lm "wheat beer hockey rams leaf tree play statue music hear piano audio guitar"')
  .alias('lm')
  .action(async function (args) {
    const self = this
    const { options, mnemonic } = args

    if (validateMnemonic(mnemonic)) {
      wallet = new Wallet(mnemonic, {discover: false})
      this.log(cli.chalk.green(`wallet initialized with: ${mnemonic}`))
    } else {
      this.log(cli.chalk.red(`invalid mnemonic: ${mnemonic}`))
    }
  });

cli
  .command('getXpub <coin> [account] [chain]')
  .description('get xpub for given node path')
  .alias('xpub')
  .action( async function (args) {
    const self = this
    const { coin, account, chain } = args

    if (!wallet) {
      return self.log(cli.chalk.red('wallet not initialized. use the command: <load mnemonic "mnemonic..."> to initialize wallet'))
    }
    const walletCoin = wallet.getCoin(coin)
    if (!walletCoin) {
      return self.log(cli.chalk.red(`coin: <${coin}> not found. try entering 'bitcoin' or 'flo'`))
    }

    // if no account index given, return coin extended public key
    if (account == null) {
      return self.log(cli.chalk.yellow(walletCoin.getExtendedPublicKey()))
    }

    let walletAccount = walletCoin.getAccount(account)
    if (!walletAccount) {
      return self.log(cli.chalk.red(`account: <${account}> not found. try entering an integer 0 or greater`))

    }

    // if no chain index given, return account extended public key
    if (chain == null) {
      return self.log(cli.chalk.yellow(walletAccount.getExtendedPublicKey()))
    }

    let walletChain = walletAccount.account_master.derive(chain)
    if (!walletChain) {
      return self.log(cli.chalk.red(`chain: <${chain}> not found. try entering an integer 0 or greater`))
    }

    self.log(cli.chalk.yellow(walletChain.neutered().toBase58()))
  })

cli
  .command('getPrivatekey <coin> <account> <chain> <address>')
  .description('get private key (wif) for given node path')
  .alias('wif')
  .action( async function (args) {
    const self = this
    const { coin, account, chain, address } = args

    if (!wallet) {
      return self.log(cli.chalk.red('wallet not initialized. use the command: <load mnemonic "mnemonic..."> to initialize wallet'))
    }
    const walletCoin = wallet.getCoin(coin)
    if (!walletCoin) {
      return self.log(cli.chalk.red(`coin: <${coin}> not found. try entering 'bitcoin' or 'flo'`))
    }

    if (isNaN(account)) {
      return self.log(cli.chalk.red(`account is Not a Number: <${account}> try entering an index 0 or greater`))
    }

    if (isNaN(chain)) {
      return self.log(cli.chalk.red(`chain is Not a Number: <${chain}> try entering an index 0 or greater`))
    }

    if (isNaN(address)) {
      return self.log(cli.chalk.red(`address is Not a Number: <${address}> try entering an index 0 or greater`))
    }

    const walletAccount = walletCoin.getAccount(account)
    const walletAddress = walletAccount.getAddress(chain, address)

    return self.log(cli.chalk.yellow(walletAddress.getPrivateAddress()))
  })

cli
  .delimiter(cli.chalk.magenta('oip-hdmw$'))
  .show()
  .log(cli.chalk.yellow(`Welcome to oip-hdmw helper. Use the command: 'help' view a list of commands.`))