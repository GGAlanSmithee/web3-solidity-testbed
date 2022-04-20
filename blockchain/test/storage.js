const Storage = artifacts.require("Storage")

contract("Storage", function (/* accounts */) {
  let storage

  beforeEach(async () => {
    storage = await Storage.deployed()
  })

  it("is deployed", async () => {
    expect(storage).to.be.an("object")
  })

  it("can get a value", async () => {
    expect(storage.get).to.be.a("function")

    const value = await storage.get()

    assert.equal(value, 0, "initial value should be 0")
  })

  it("can set a value", async () => {
    expect(storage.set).to.be.a("function")

    const expectedValue = 100
    await storage.set(expectedValue)
    const actualValue = await storage.get()

    assert.equal(expectedValue, actualValue, `set value should be ${100}`)
  })
})
