import { useState, useEffect, PropsWithChildren } from "react"
import Web3 from "web3"
import { useBlockchainUser } from "hooks/use-blockchain-user"
import Link from "next/link"

interface Props {
  web3?: Web3
  header: string
  subHeader: string
}

const Example = ({ children, web3, header, subHeader }: PropsWithChildren<Props>) => {
  const user = useBlockchainUser(web3)

  const [balance, setBalance] = useState<string>()

  useEffect(() => {
    if (!web3 || !user) return

    web3.eth.getBalance(user).then((b) => setBalance(web3.utils.fromWei(b)))
  }, [web3, user])

  return (
    <>
      <div className="absolute top-5 left-5">
        <div>
          <Link href="/">&#8592; Home</Link>
        </div>
        <div>User: {user}</div>
        <div>{balance ? <div>Balance: {balance} ETH</div> : <div>Balance:</div>}</div>
      </div>

      <div className="flex flex-col items-center w-screen h-screen pt-16">
        <header className="py-16 text-center">
          <p className="text-3xl">{header}</p>
          <p className="text-xl">{subHeader}</p>
        </header>

        <main className="mt-8">{children}</main>
      </div>
    </>
  )
}

export { Example }
