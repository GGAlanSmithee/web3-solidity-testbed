import { useState, useEffect, useCallback } from "react"
import Web3 from "web3"
import { useBlockchainContract } from "./use-blockchain-contract"
import { useBlockchainUser } from "./use-blockchain-user"
import Storage from "contracts/Storage.json"

const useBlockchainStorage = (web3: Web3 | undefined) => {
  const user = useBlockchainUser(web3)
  const contract = useBlockchainContract(web3, Storage)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!contract) return

    contract.call("get").then(setValue)
  }, [contract])

  const commit = useCallback(() => {
    if (!contract || !user) return

    contract.send("set", user, () => {}, value)
  }, [user, value, contract])

  return { value, setValue, commit }
}

export { useBlockchainStorage }
