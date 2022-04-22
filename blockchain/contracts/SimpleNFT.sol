// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimpleNFT is ERC721 {
    using Counters for Counters.Counter;

    address public owner = msg.sender;

    struct Data {
        string name;
    }

    Data[] public dataEntries;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Simple NFT", "SNFT") {}

    function mint(string memory name) public {
        Data memory data = Data(name);

        dataEntries.push(data);

        _safeMint(msg.sender, _tokenIdCounter.current());

        _tokenIdCounter.increment();
    }

    function getTotalCount() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
