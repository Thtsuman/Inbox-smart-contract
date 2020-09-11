// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.17;

contract Inbox {
    string public message;
    
    constructor(string memory InitialMessage) {
        message = InitialMessage;
    }
    
    function setMessage(string memory NewMessage) public {
        message = NewMessage;
    }
}