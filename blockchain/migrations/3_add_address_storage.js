const Migrations = artifacts.require("AddressStorage")

module.exports = function (deployer) {
  deployer.deploy(Migrations)
}
