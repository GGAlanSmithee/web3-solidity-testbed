import type { NextPage } from "next"
import { useWeb3 } from "hooks/use-web3"
import { useBlockchainUser } from "hooks/use-blockchain-user"
import { useEffect, useState } from "react"
import { useBlockchainStorage } from "hooks/use-blockchain-storage"

const Home: NextPage = () => {
  const web3 = useWeb3()
  const user = useBlockchainUser(web3)

  const [balance, setBalance] = useState<string>()
  const storage = useBlockchainStorage(web3)

  useEffect(() => {
    if (!web3 || !user) return

    web3.eth.getBalance(user).then((b) => setBalance(web3.utils.fromWei(b)))
  }, [web3, user])

  return (
    <>
      <p className="absolute top-5 left-5">User: {user}</p>

      <div className="flex flex-col items-center w-screen h-screen pt-16">
        <header className="py-8 text-center">
          <p className="text-3xl">Simple Storage Example</p>
          <p className="text-xl">Sets and gets a value from a smart contract store</p>
        </header>

        <main>
          <div>{balance && <div className="text-lg">Balance: {balance} ETH</div>}</div>

          <div>Storage value: {storage.value}</div>

          <div className="mt-4">
            <input
              className="border-2 rounded-md outline-none p-2"
              type="number"
              placeholder="Value"
              value={storage.value || 0}
              onChange={(e) => storage.setValue(Number(e.target.value))}
            />
            <button
              className="border-2 rounded-md outline-none p-2 w-44 ml-2"
              onClick={storage.commit}
            >
              Update Storage
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
