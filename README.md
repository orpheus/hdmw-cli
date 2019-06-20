### install
`git clone https://github.com/orpheus/hdmw-cli.git`

`cd hdmw-cli`

`yarn install`

### run
`yarn start`

### load mnemonic
`load mnemonic "alpha alpha alpha alpha alpha alpha alpha alpha alpha alpha alpha alpha`

**or**

`lm "alpha alpha alpha alpha alpha alpha alpha alpha alpha alpha alpha alpha"`

#### get xpub
>> can use `xpub` instead of `getXpub` 

>> `xpub <coin> [account] [chain]`

>> get the hardened xpub for the Flo coin at m/44'/216'

`getXpub flo` 

>> get the hardened xpub for Flo Account 0 at m/44'/216'/0'

`getXpub flo 0`

>> get the unhardened xpub for the Flo Change 0 at m/44'/216/0'/0

`getXpub flo 0 0` 

#### get private key (wif)
>> can use `wif` instead of `getPrivateKey`

>> `wif <coin> <account> <chain> <address>`

>> get private key Flo address at m/44'/216'/0'/0/0

`getPrivateKey flo 0 0 0`