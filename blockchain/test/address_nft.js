const AddressNFT = artifacts.require("AddressNFT")

const { assert, expect } = require("chai")
require("chai").use(require("chai-as-promised")).should()

contract("AddressNFT", function (accounts) {
  let addressNFT

  beforeEach(async () => {
    addressNFT = await AddressNFT.deployed()
  })

  it("is deployed", async () => {
    expect(addressNFT).to.be.an("object")
  })

  it("can be minted, and total count increases with each mint", async () => {
    assert.equal(0, await addressNFT.getTotalCount(), "initial count of NFTs should be 0")

    await addressNFT.mint("My NFT", { from: accounts[0] })

    assert.equal(1, await addressNFT.getTotalCount(), "count after one mint should be 1")

    await addressNFT.mint("My other NFT", { from: accounts[1] })

    assert.equal(
      2,
      await addressNFT.getTotalCount(),
      "count after a second mint - by another account - should be 2"
    )
  })

  it("gets the balance of each account (ERC721)", async () => {
    assert.equal(
      1,
      await addressNFT.balanceOf(accounts[0]),
      "account 0 should have a balance of 1 NFT"
    )
    assert.equal(
      1,
      await addressNFT.balanceOf(accounts[1]),
      "account 1 should have a balance of 1 NFT"
    )
    assert.equal(
      0,
      await addressNFT.balanceOf(accounts[2]),
      "account 2 should have a balance of 0 NFT"
    )
  })

  it("can get an NFT by an index", async () => {
    assert.equal("My NFT", await addressNFT.dataEntries(0), 'The fetched NFT should be "My NFT"')
    assert.equal(
      "My other NFT",
      await addressNFT.dataEntries(1),
      'The fetched NFT should be "My other NFT"'
    )
  })

  // NOTE(Alan): Should not need to test ERC-721 functionality
  it("can transfer a NFT", async () => {
    assert.equal(accounts[0], await addressNFT.ownerOf(0))
    await addressNFT.safeTransferFrom(accounts[0], accounts[1], 0)
    assert.equal(accounts[1], await addressNFT.ownerOf(0))
  })

  it("can get a list of NFTs for a specific account", async () => {
    const expectedNfts = ["This is a new token", "Yet another token", "And a third"]

    await addressNFT.mint(expectedNfts[0], { from: accounts[2] })
    await addressNFT.mint(expectedNfts[1], { from: accounts[2] })
    await addressNFT.mint(expectedNfts[2], { from: accounts[2] })

    const balance = await addressNFT.balanceOf(accounts[2])

    assert.equal(balance, 3, "account 2 should have a balance of 3 NFT")

    for (let i = 0; i < balance; ++i) {
      const index = await addressNFT.tokenOfOwnerByIndex(accounts[2], i, { from: accounts[2] })
      const actualNft = await addressNFT.dataEntries(index)

      assert.equal(actualNft, expectedNfts[i], `"${actualNft}" should equal "${expectedNfts[i]}"`)
    }
  })
})
