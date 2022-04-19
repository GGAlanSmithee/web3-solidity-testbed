const SimpleNFTContract = artifacts.require("SimpleNFT")

module.exports = function (deployer) {
  deployer.deploy(SimpleNFTContract)
}
