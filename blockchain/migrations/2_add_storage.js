const Migrations = artifacts.require("Storage")

module.exports = function (deployer) {
  deployer.deploy(Migrations)
}
