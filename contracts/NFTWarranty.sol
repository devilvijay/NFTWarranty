//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTWarrenty is ERC721URIStorage {
    address payable issuer;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("NFTWarrenty", "NFW") {
        issuer = payable(msg.sender);
    }

    struct TokenInfo {
        /* Pertinent entities */
        address payable owner; //Buyer
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
    // mapping(address => _tokenIds[]) private addressToTokenID;
    mapping(uint256 => TokenInfo) private idToTokenInfo; //Mapping of token id with token info

    /* Returns only items that a user has purchased */
    function fetchMyNFTs(address payable ownerAddress) public view returns (TokenInfo[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToTokenInfo[i + 1].owner == ownerAddress) {
                itemCount += 1;
            }
        }

        TokenInfo[] memory items = new TokenInfo[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToTokenInfo[i + 1].owner == ownerAddress) {
                uint256 currentId = i + 1;
                TokenInfo storage currentItem = idToTokenInfo[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
    //Delete a NFT 
    function Burn(uint256 token_Id) private {
        super._burn(token_Id);
        delete idToTokenInfo[token_Id];
    }

    /*
        Check Whether a warranty NFT has not expired.
        returns false if expired
        else retuerns true if not expired
    */

    function is_not_expired(
        uint256 issue_time,
        uint256 warranty_duration,
        uint256 token_id
    ) public returns (bool) {
        uint256 one_day = 86400;
        if (block.timestamp < (issue_time + (warranty_duration * one_day))) {
            return false;
        } else {
            Burn(token_id);
            return true;
        }
    }

    function checkValidity(uint256 tokenId) public returns (bool) {
        TokenInfo storage info = idToTokenInfo[tokenId];
        return (
            is_not_expired(info.issue_time, info.warranty_duration, tokenId)
        );
    }

    /* 
         Transfer NFT From One owner to Another
    */
    function TransferNFT(address payable old_owner,address payable new_owner, uint256 token_id)
        public
        returns (uint256)
    {
        require(idToTokenInfo[token_id].owner == address(0),"No NFT found for this token id");
        TokenInfo storage info = idToTokenInfo[token_id];
        require(
            is_not_expired(info.issue_time, info.warranty_duration, token_id) ==
                true,
            "Warrenty Expired No transfer allowed"
        );
        require(info.owner != old_owner,"Only Owner can Transfer the Warranty");
        _transfer(info.owner, new_owner, token_id);
        info.issuer = info.owner;
        info.owner = new_owner;
        uint256 nta = info.num_transfers_allowed;
        nta--;
        info.num_transfers_allowed = nta;
        return token_id;
    }

    function createListedToken(
        uint256 currentTokenId,
        address payable owner,
        address payable seller,
        string memory serial_number,
        uint256 warranty_duration,
        string memory link_to_warranty_condition,
        uint256 num_transfers_allowed
    ) private {
        uint256 issue_time = block.timestamp;
        idToTokenInfo[currentTokenId] = TokenInfo(
            payable(owner),
            payable(seller),
            serial_number,
            issue_time,
            warranty_duration,
            link_to_warranty_condition,
            num_transfers_allowed
        );

        _transfer(seller, owner, currentTokenId);
    }

    /*
        Create Token BY Seller to Receiver
    */

    function createToken(
        string memory tokenURI,
        address payable seller,
        address payable owner,
        string memory serial_number,
        uint256 warranty_duration,
        string memory link_to_warranty_condition,
        uint256 num_transfers_allowed
    ) public payable returns (uint256) {
        //Validations if any
        _tokenIds.increment();
        uint256 currentTokenId = _tokenIds.current();
        _safeMint(seller, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);

        createListedToken(
            currentTokenId,
            owner,
            seller,
            serial_number,
            warranty_duration,
            link_to_warranty_condition,
            num_transfers_allowed
        );
        return currentTokenId;
    }
}
