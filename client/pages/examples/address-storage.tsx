import type { NextPage } from "next"
import { useWeb3 } from "hooks/use-web3"
import { useBlockchainAddressStorage } from "hooks/use-blockchain-address-storage"
import { Example } from "components/Example"

const Home: NextPage = () => {
  const web3 = useWeb3()
  const storage = useBlockchainAddressStorage(web3)

  return (
    <Example
      web3={web3}
      header="Address Storage Example"
      subHeader="Sets and gets a value from a smart contract store, given the current user"
    >
      <div>Storage value: {storage.value}</div>

      <div className="mt-4">
        <input
          className="border-2 rounded-md outline-none p-2"
          type="number"
          placeholder="Value"
          value={storage.value || 0}
          onChange={(e) => storage.setValue(Number(e.target.value))}
        />
        <button className="border-2 rounded-md outline-none p-2 w-44 ml-2" onClick={storage.commit}>
          Update Storage
        </button>
      </div>
    </Example>
  )
}

export default Home
