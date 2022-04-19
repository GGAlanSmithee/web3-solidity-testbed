// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
    address public owner = msg.sender;

    struct Data {
        string name;
    }

    Data[] public dataEntries;

    mapping(string => bool) private _nameExists;
    mapping(string => uint256) private _nameData;

    constructor() ERC721("Simple NFT", "SNFT") {}

    function mint(string memory name) public {
        require(!_nameExists[name], "name isn't unique");

        Data memory data = Data(name);

        dataEntries.push(data);

        uint256 id = dataEntries.length - 1;

        _safeMint(msg.sender, id);

        _nameData[name] = id;
        _nameExists[name] = true;
    }
}
