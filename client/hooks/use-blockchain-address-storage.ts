import { useState, useEffect, useCallback } from "react"
import Web3 from "web3"
import AddressStorage from "contracts/AddressStorage.json"
import { useBlockchainContract } from "./use-blockchain-contract"
import { useBlockchainUser } from "./use-blockchain-user"

const useBlockchainAddressStorage = (web3: Web3 | undefined) => {
  const user = useBlockchainUser(web3)
  const contract = useBlockchainContract(web3, AddressStorage)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!contract || !user) return

    contract.call("get", user).then(setValue)
  }, [contract, user])

  const commit = useCallback(() => {
    if (!contract || !user) return

    contract.send("set", user, () => {}, value)
  }, [user, value, contract])

  return { value, setValue, commit }
}

export { useBlockchainAddressStorage }
