//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTWarrenty is ERC721URIStorage{

    address payable issuer;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
     
    constructor() ERC721("NFTWarrenty", "NFW"){
        issuer = payable(msg.sender);
    }
    
    struct TokenInfo{
        /* Pertinent entities */
        address payable owner;  //Buyer
        address payable issuer; //Seller
        
        /* Warrenty Details */
        string serial_number; 
        uint256 issue_time; 
        uint256 warranty_duration; //In days
        string link_to_warrenty_condition;

        //Warrenty mechanics        
        uint256 num_transfers_allowed;
    }

    mapping(uint256 => TokenInfo) private idToTokenInfo; //Mapping of token id with token info
    
    function createListedToken(uint256 currentTokenId, address payable owner,string memory serial_number, uint256 warranty_duration,string memory link_to_warranty_condition,uint256 num_transfers_allowed) private 
    {
        uint issue_time = block.timestamp;
        idToTokenInfo[currentTokenId] = TokenInfo(
            payable(owner),
            payable(msg.sender),
            serial_number,
            issue_time,
            warranty_duration,
            link_to_warranty_condition,
            num_transfers_allowed
        );

        _transfer(msg.sender,owner,currentTokenId);
    }


    function createToken (string memory tokenURI,address payable owner,string memory serial_number,uint256 warranty_duration,string memory link_to_warranty_condition,uint256 num_transfers_allowed) public payable returns (uint) {
        //Validations if any 
        _tokenIds.increment();
        uint256 currentTokenId = _tokenIds.current();
        _safeMint(msg.sender,currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);
       
        createListedToken(currentTokenId,owner,serial_number,warranty_duration,link_to_warranty_condition,num_transfers_allowed);
        return currentTokenId;
    }
}
