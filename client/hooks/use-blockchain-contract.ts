import { Dictionary } from "lodash"
import { useState, useEffect, useCallback, useMemo } from "react"
import Web3 from "web3"
import { Contract } from "web3-eth-contract"

const useBlockchainContract = (web3: Web3 | undefined, contractJson: Dictionary<any>) => {
  const [contract, setContract] = useState<Contract>()

  useEffect(() => {
    if (!web3) return
    ;(async () => {
      try {
        const networkId = await web3.eth.net.getId()

        const deployedNetwork = contractJson.networks[networkId]
        const instance = new web3.eth.Contract(
          contractJson.abi,
          deployedNetwork && deployedNetwork.address
        )

        setContract(instance)
      } catch {
        alert("Failed to load contract")
      }
    })()
  }, [web3, contractJson.abi, contractJson.networks])

  useEffect(() => {
    if (!web3) return

    window.ethereum.on("chainChanged", (networkId: string) => {
      const deployedNetwork = contractJson.networks[networkId]
      const instance = new web3.eth.Contract(
        contractJson.abi,
        deployedNetwork && deployedNetwork.address
      )

      setContract(instance)
    })
  }, [web3, contractJson.abi, contractJson.networks])

  const call = useCallback(
    async (method: string, user: string, ...args: any[]) => {
      if (!contract) return

      return await contract.methods[method](...args).call({ from: user })
    },
    [contract]
  )

  const send = useCallback(
    async (method: string, user: string, receiptCallback: Function, ...args: any[]) => {
      if (!contract) return

      return await contract.methods[method](...args)
        .send({ from: user })
        .once("receipt", receiptCallback)
    },
    [contract]
  )

  const methods = useMemo(
    () => ({
      call,
      send,
    }),
    [call, send]
  )

  return methods
}

export { useBlockchainContract }
