const { expect, assert } = require("chai")

const AddressStorage = artifacts.require("AddressStorage")

contract("AddressStorage", function (accounts) {
  let addressStorage

  beforeEach(async () => {
    addressStorage = await AddressStorage.deployed()
  })

  it("is deployed", async () => {
    expect(addressStorage).to.be.an("object")
  })

  it("has default values", async () => {
    for (let i = 0; i < accounts.length; ++i) {
      const account = accounts[i]
      const value = await addressStorage.get({ from: account })

      assert.equal(0, value, `default value for account ${account} should be 0`)
    }
  })

  it("can set and get a value for an address", async () => {
    const defaultValue = 0
    const firstExpectedValue = 100
    const secondExpectedValue = 200

    assert.equal(
      defaultValue,
      await addressStorage.get({ from: accounts[0] }),
      `account 0 should have default value ${defaultValue}`
    )
    assert.equal(
      defaultValue,
      await addressStorage.get({ from: accounts[1] }),
      `account 1 should have default value ${defaultValue}`
    )

    await addressStorage.set(firstExpectedValue, { from: accounts[0] })

    assert.equal(
      firstExpectedValue,
      await addressStorage.get({ from: accounts[0] }),
      `account 0 should have value ${firstExpectedValue}`
    )
    assert.equal(
      defaultValue,
      await addressStorage.get({ from: accounts[1] }),
      `account 1 should have default value ${defaultValue}`
    )

    await addressStorage.set(secondExpectedValue, { from: accounts[1] })

    assert.equal(
      firstExpectedValue,
      await addressStorage.get({ from: accounts[0] }),
      `account 0 should have value ${firstExpectedValue}`
    )
    assert.equal(
      secondExpectedValue,
      await addressStorage.get({ from: accounts[1] }),
      `account 1 should have value ${secondExpectedValue}`
    )
  })

  it("cannot set an invalid value", async () => {
    await addressStorage.set("invalid type", { from: accounts[2] }).should.be.rejected
  })
})
