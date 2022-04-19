import { useState, useEffect, PropsWithChildren } from "react"
import Web3 from "web3"
import { useBlockchainUser } from "hooks/use-blockchain-user"

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
      <p className="absolute top-5 left-5">User: {user}</p>

      <div className="flex flex-col items-center w-screen h-screen pt-16">
        <header className="py-8 text-center">
          <p className="text-3xl">{header}</p>
          <p className="text-xl">{subHeader}</p>
        </header>

        <main>
          <div>{balance && <div className="text-lg">Balance: {balance} ETH</div>}</div>

          {children}
        </main>
      </div>
    </>
  )
}

export { Example }
