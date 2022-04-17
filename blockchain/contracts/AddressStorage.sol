// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AddressStorage {
    mapping(address => uint256) private storedData;

    function set(uint256 x) public {
        storedData[msg.sender] = x;
    }

    function get() public view returns (uint256) {
        return storedData[msg.sender];
    }
}
