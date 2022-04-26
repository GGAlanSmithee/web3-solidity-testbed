import { useCallback, useEffect, useState } from "react"
import Web3 from "web3"
import AddressNFT from "contracts/AddressNFT.json"
import { useBlockchainContract } from "./use-blockchain-contract"
import { useBlockchainUser } from "./use-blockchain-user"

const useBlockchainAddressNft = (web3: Web3 | undefined) => {
  const user = useBlockchainUser(web3)
  const contract = useBlockchainContract(web3, AddressNFT)

  const [accountNfts, setAccountNfts] = useState<string[]>([])
  const [current, setCurrent] = useState<string>()

  const getAccountNFTs = useCallback(async () => {
    if (!user || !contract) return

    const balance = await contract.call("balanceOf", user, user)

    const nfts = []
    for (let i = 0; i < balance; ++i) {
      const index = await contract.call("tokenOfOwnerByIndex", user, user, i)
      const nft = await contract.call("dataEntries", user, index)
      nfts.push(nft)
    }

    setAccountNfts(nfts)
  }, [contract, user])

  useEffect(() => {
    getAccountNFTs()
  }, [getAccountNFTs])

  const mint = useCallback(() => {
    if (!contract || !user) return

    contract.send(
      "mint",
      user,
      () => {
        getAccountNFTs()
        setCurrent("")
      },
      current
    )
  }, [user, current, contract, getAccountNFTs])

  return { current, setCurrent, mint, accountNfts }
}

export { useBlockchainAddressNft }
