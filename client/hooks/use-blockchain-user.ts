import { useState, useEffect } from "react"
import Web3 from "web3"

const useBlockchainUser = (web3?: Web3) => {
  const [user, setUser] = useState<string>()

  useEffect(() => {
    if (!web3) return

    web3.eth
      .getAccounts()
      .then((accounts) => setUser(accounts[0]))
      .catch(() => alert("Failed to load accounts"))
  }, [web3])

  useEffect(() => {
    if (!web3) return

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      setUser(accounts[0])
    })
  }, [web3])

  return user
}

export { useBlockchainUser }
