const HelloWorld = artifacts.require("Storage")

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Storage", function (/* accounts */) {
  it("should assert true", async function () {
    await HelloWorld.deployed()
    return assert.isTrue(true)
  })
})
