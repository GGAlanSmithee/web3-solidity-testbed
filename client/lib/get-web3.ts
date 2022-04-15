import Web3 from "web3"

const getWeb3 = async (): Promise<Web3> => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum)

    // Request account access if needed, accounts now exposed
    await window.ethereum.enable()

    return web3
  }

  // Legacy dapp browsers, use Mist/MetaMask's provider.
  if (window.web3) return window.web3

  // Fallback to localhost; use dev console port by default..
  return new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
}

export { getWeb3 }
