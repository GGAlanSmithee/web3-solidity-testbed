const SimpleNFT = artifacts.require("SimpleNFT")

const { assert, expect } = require("chai")
require("chai").use(require("chai-as-promised")).should()

contract("SimpleNFT", function (accounts) {
  let simpleNFT

  beforeEach(async () => {
    simpleNFT = await SimpleNFT.deployed()
  })

  it("is deployed", async () => {
    expect(simpleNFT).to.be.an("object")
  })

  it("can be minted, and total count increases with each mint", async () => {
    assert.equal(0, await simpleNFT.getTotalCount(), "initial count of NFTs should be 0")

    await simpleNFT.mint("My NFT", { from: accounts[0] })

    assert.equal(1, await simpleNFT.getTotalCount(), "count after one mint should be 1")

    await simpleNFT.mint("My other NFT", { from: accounts[1] })

    assert.equal(
      2,
      await simpleNFT.getTotalCount(),
      "count after a second mint - by another account - should be 2"
    )
  })

  it("gets the balance of each account (ERC721)", async () => {
    assert.equal(
      1,
      await simpleNFT.balanceOf(accounts[0]),
      "account 0 should have a balance of 1 NFT"
    )
    assert.equal(
      1,
      await simpleNFT.balanceOf(accounts[1]),
      "account 1 should have a balance of 1 NFT"
    )
    assert.equal(
      0,
      await simpleNFT.balanceOf(accounts[2]),
      "account 2 should have a balance of 0 NFT"
    )
  })

  it("can get an NFT by an index", async () => {
    assert.equal("My NFT", await simpleNFT.dataEntries(0), 'The fetched NFT should be "My NFT"')
    assert.equal(
      "My other NFT",
      await simpleNFT.dataEntries(1),
      'The fetched NFT should be "My other NFT"'
    )
  })
})
