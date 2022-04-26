import type { NextPage } from "next"
import { useWeb3 } from "hooks/use-web3"
import { Example } from "components/Example"
import { useBlockchainAddressNft } from "hooks/use-blockchain-address-nft"
import { chunk } from "lodash"

const Home: NextPage = () => {
  const web3 = useWeb3()
  const nft = useBlockchainAddressNft(web3)

  return (
    <Example
      web3={web3}
      header="Address NFT Example"
      subHeader="A NFT contract that lets you list an accounts NFTs."
    >
      <div className="text-lg mb-4">Current accounts NFTs:</div>

      <div>
        {chunk(nft.accountNfts, 3).map((nftRow, i) => (
          <div
            className="w-100 justify-between flex flex-row items-center mb-2"
            key={`accounts-nft-row-${i}`}
          >
            {nftRow.map((nft, j) => (
              <div className="w-100 flex justify-center" key={`account-nft-cell-${i}-${j}-${nft}`}>
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
