import { useCallback, useEffect, useState } from "react"
import Web3 from "web3"
import SimpleNFT from "contracts/SimpleNFT.json"
import { useBlockchainContract } from "./use-blockchain-contract"
import { useBlockchainUser } from "./use-blockchain-user"

const useBlockchainSimpleNft = (web3: Web3 | undefined) => {
  const user = useBlockchainUser(web3)
  const contract = useBlockchainContract(web3, SimpleNFT)

  const [totalCount, setTotalCount] = useState<number>()
  const [allNfts, setAllNfts] = useState<number[]>([])
  const [current, setCurrent] = useState<string>()

  useEffect(() => {
    if (!contract || !user) return

    contract.call("getTotalCount", user).then(setTotalCount)
  }, [contract, user])

  useEffect(() => {
    if (!user || !totalCount) return

    if (allNfts.length === totalCount) return
    ;(async () => {
      const nfts = []

      for (let i = 0; i < totalCount; ++i) {
        const nft = await contract.call("dataEntries", user, i)

        nfts.push(nft)
      }

      setAllNfts(nfts)
    })()
  }, [user, totalCount, contract, allNfts.length])

  const mint = useCallback(() => {
    if (!contract || !user) return

    contract.send(
      "mint",
      user,
      () => {
        contract.call("getTotalCount", user).then(setTotalCount)
        setCurrent("")
      },
      current
    )
  }, [user, current, contract])

  return { totalCount, current, setCurrent, mint, all: allNfts }
}

export { useBlockchainSimpleNft }
