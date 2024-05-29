// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.24;

contract SecureTransfer {
    mapping(address => bool) public whitelistedAddresses;
    mapping(address => string) public addressNicknames;
    address public owner;

    event AddressWhitelisted(address indexed _address, string nickname);
    event TransferAttempt(address indexed from, address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addWhitelistedAddress(address _address, string memory nickname) public onlyOwner {
        whitelistedAddresses[_address] = true;
        addressNicknames[_address] = nickname;
        emit AddressWhitelisted(_address, nickname);
    }

    function removeWhitelistedAddress(address _address) public onlyOwner {
        whitelistedAddresses[_address] = false;
        addressNicknames[_address] = "";
    }

    function transfer(address _to, uint256 _amount) public {
        require(whitelistedAddresses[_to], "Address not whitelisted");
        emit TransferAttempt(msg.sender, _to, _amount);
        // Add your transfer logic here. For Celo, we typically use `CELO` as the native token.
        payable(_to).transfer(_amount);
    }

    function getAddressNickname(address _address) public view returns (string memory) {
        return addressNicknames[_address];
    }

    
}