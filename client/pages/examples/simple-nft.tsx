import type { NextPage } from "next"
import { useWeb3 } from "hooks/use-web3"
import { Example } from "components/Example"
import { useBlockchainSimpleNft } from "hooks/use-blockchain-simple-nft"
import { chunk, isNil } from "lodash"

const Home: NextPage = () => {
  const web3 = useWeb3()
  const nft = useBlockchainSimpleNft(web3)

  return (
    <Example
      web3={web3}
      header="Simple NFT Example"
      subHeader="A simple NFT contract that lets the user mint a NFT."
    >
      <div className="text-lg mb-4">Number of NFTs minted: {nft.totalCount}</div>

      <div>
        {chunk(nft.all, 3).map((nftRow, i) => (
          <div
            className="w-100 justify-between flex flex-row items-center mb-2"
            key={`nft-row-${i}`}
          >
            {nftRow.map((nft, j) => (
              <div className="w-100 flex justify-center" key={`nft-cell-${i}-${j}-${nft}`}>
                <div className="text-center self-center bg-sky-200 px-2 py-1">{nft}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          className="border-2 rounded-md outline-none p-2"
          type="text"
          placeholder="name"
          value={nft.current || ""}
          onChange={(e) => nft.setCurrent(e.target.value?.toString())}
        />
        <button className="border-2 rounded-md outline-none p-2 w-44 ml-2" onClick={nft.mint}>
          Mint NFT
        </button>
      </div>
    </Example>
  )
}

export default Home
