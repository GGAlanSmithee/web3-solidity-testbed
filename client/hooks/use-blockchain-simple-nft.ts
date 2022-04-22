import { useState, useEffect, useCallback } from "react"
import Web3 from "web3"
import SimpleNFT from "contracts/SimpleNFT.json"
import { useBlockchainContract } from "./use-blockchain-contract"
import { useBlockchainUser } from "./use-blockchain-user"

const useBlockchainSimpleNft = (web3: Web3 | undefined) => {
  const user = useBlockchainUser(web3)
  const contract = useBlockchainContract(web3, SimpleNFT)

  const [totalCount, setTotalCount] = useState<number>()
  const [name, setName] = useState<string>()

  useEffect(() => {
    if (!contract || !user) return

    contract.call("getTotalCount", user).then(setTotalCount)
  }, [contract, user])

  const mint = useCallback(() => {
    if (!contract || !user) return

    contract.send(
      "mint",
      user,
      () => {
        contract.call("getTotalCount", user).then(setTotalCount)
      },
      name
    )
  }, [user, name, contract])

  return { totalCount, name, setName, mint }
}

export { useBlockchainSimpleNft }
