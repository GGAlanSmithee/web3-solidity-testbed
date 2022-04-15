import { useState, useEffect } from "react"
import Web3 from "web3"
import { getWeb3 } from "lib/get-web3"

const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3>()

  useEffect(() => {
    getWeb3()
      .then((web3) => {
        web3.eth.handleRevert = true
        web3.eth.transactionConfirmationBlocks = 1

        setWeb3(web3)
      })
      .catch(() => console.error("Failed to load web3"))
  }, [])

  useEffect(() => {
    if (!web3) {
      return
    }

    window.onbeforeunload = function () {
      return "Prevent reload"
    }
  }, [web3])

  return web3
}

export { useWeb3 }
