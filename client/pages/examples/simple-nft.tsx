import type { NextPage } from "next"
import { useWeb3 } from "hooks/use-web3"
import { Example } from "components/Example"

const Home: NextPage = () => {
  const web3 = useWeb3()

  return (
    <Example
      web3={web3}
      header="Simple NFT Example"
      subHeader="A simple NFT contract that lets the user mint a NFT."
    >
      <div>Hello</div>
    </Example>
  )
}

export default Home
