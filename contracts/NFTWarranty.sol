//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
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

    // struct TransferInfo{
    //     address payable from_;
    //     address payable to_;
    //     uint256 token_id; 
    // }

    // struct TokenMetaData{
    //     uint256 token_id;
    //     TokenInfo TokenInfo;
    // }


    // mapping(uint256 => TokenMetaData) private TokenMetaDataStorage; //Mapping of token id with token meta data 

    mapping(uint256 => TokenInfo) private idToTokenInfo; //Mapping of token id with token info
    

    /*
        Check Whether a warranty NFT has not expired.
        returns false if expired
        else retuerns true if not expired
    */

    function is_not_expired(uint256 issue_time , uint256 warranty_duration) public view returns (bool) {
        uint256 one_day =  86400;
        if(block.timestamp < (issue_time + (warranty_duration * one_day) )){
            return false;
        }
        else 
        {
            return true;
        }
    }

    function TransferNFT(address payable new_owner, uint256 token_id) public returns (uint256) {
            // require(if(!idToTokenInfo[token_id]),"No NFT found for this token id")
            TokenInfo storage info = idToTokenInfo[token_id];
            require(is_not_expired(info.issue_time,info.warranty_duration) == true,"Warrenty Expired No transfer allowed");
            _transfer(info.owner,new_owner,token_id);
            info.issuer = info.owner;
            info.owner = new_owner;
            uint256 nta= info.num_transfers_allowed;
            nta--;
            info.num_transfers_allowed=nta;
            return token_id;
    }

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
