# Smart Contracts Prep

# Operating system
If you are Windows, please install the Windows Subsystem for Linux. You *will* need a UNIX environment and this is the easiest way to get one. You can download it [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
Mac and Linux will be able to run these commands out of the box.

## Remix (Solidity)
- Start by installing Moonbeam on your terminal. Follow the instructions in [this guide](https://docs.moonbeam.network/getting-started/local-node/setting-up-a-node/) under "Installation and Setup". This will take up to 30 minutes.
- Install Metamask by following this guide: https://medium.com/moonbeam-network/using-metamask-to-interact-with-a-local-moonbeam-node-16679214fad2

## Libra Move
- Clone libra: `git clone https://github.com/libra/libra.git`
- Setup the node:
```
cd libra
./scripts/dev_setup.sh
```
- Start a testnet node:
```
./scripts/cli/start_cli_testnet.sh
```
