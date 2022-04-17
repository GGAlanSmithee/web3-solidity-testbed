import type { NextPage } from "next"
import { useWeb3 } from "hooks/use-web3"
import { useBlockchainUser } from "hooks/use-blockchain-user"
import { useEffect, useState } from "react"
import { useBlockchainStorage } from "hooks/use-blockchain-storage"
import Link from "next/link"

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
    <div className="flex flex-col items-center mt-8">
      <div className="mb-8">
        <p className="text-3xl">Web3 solidity testbed</p>
      </div>

      <div className="underline text-sky-600 font-bold">
        <Link href="/examples/simple-storage">Simple Storage</Link>
      </div>

      <div className="underline text-sky-600 font-bold">
        <Link href="/examples/address-storage">Address Storage</Link>
      </div>
    </div>
  )
}

export default Home
