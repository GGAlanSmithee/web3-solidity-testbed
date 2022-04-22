import type { NextPage } from "next"
import { useWeb3 } from "hooks/use-web3"
import { Example } from "components/Example"
import { useBlockchainSimpleNft } from "hooks/use-blockchain-simple-nft"
import { isNil } from "lodash"

const Home: NextPage = () => {
  const web3 = useWeb3()
  const nft = useBlockchainSimpleNft(web3)

  return (
    <Example
      web3={web3}
      header="Simple NFT Example"
      subHeader="A simple NFT contract that lets the user mint a NFT."
    >
      <div className="mb-4">Number NFTs minted: {nft.totalCount}</div>

      <div className="mt-4">
        <input
          className="border-2 rounded-md outline-none p-2"
          type="text"
          placeholder="name"
          value={nft.name || ""}
          onChange={(e) => nft.setName(e.target.value?.toString())}
        />
        <button className="border-2 rounded-md outline-none p-2 w-44 ml-2" onClick={nft.mint}>
          Mint NFT
        </button>
      </div>
    </Example>
  )
}

export default Home
