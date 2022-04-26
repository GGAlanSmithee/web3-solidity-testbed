const AddressNFTContract = artifacts.require("AddressNFT")

module.exports = function (deployer) {
  deployer.deploy(AddressNFTContract)
}
