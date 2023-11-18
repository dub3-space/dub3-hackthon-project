// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

struct AllData{
    address speaker;
    uint256 tokenId;
    string cId;
}

contract SpeakerNFT is ERC721URIStorage, Ownable {
    string constant TOKEN_URI =
        "https://gateway.lighthouse.storage/ipfs/QmcRXYN3kNHYyxkJHYEvd84twchVyc8N2oNa4j7vMwR1om%5C";
    uint256 internal tokenId;

    // Mapping from token ID to CID of the IPFS file
    mapping(address => uint256[]) private _tokenIDs;


    // Mapping from token ID to CID of the IPFS file
    mapping(uint256 => string) private _tokenCIDs;

    // Mapping from token ID to script bytes
    mapping(uint256 => string) private _script;

    // Mapping from token ID to price
    mapping(uint256 => uint256) private _price;

    // Mapping from address to the number of NFTs owned
    mapping(address => uint256) private _balanceOf;
    constructor() ERC721("SPEAKERNFT", "SPKR") {}

    function mint(address to,string memory _cid, string memory _audioScript, uint256 _audioPrice) public {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);
        _setTokenCID(tokenId, _cid);
        _setScript(tokenId, _audioScript);
        _setPrice(tokenId, _audioPrice);
        _setTokenIds(to,tokenId);
        unchecked {
            tokenId++;
        }
    }

    function tokenIDs(address speaker) external view returns (uint256[] memory) {
        return _tokenIDs[speaker];
    }
    function tokenCID(uint256 _tokenId) internal view returns (string memory) {
        return _tokenCIDs[_tokenId];
    }

    function script(uint256 _tokenId) external view returns (string memory) {
        return _script[_tokenId];
    }

    function price(uint256 _tokenId) external view returns (uint256) {
        return _price[_tokenId];
    }

    
    function _setTokenCID(uint256 _tokenId, string memory cid) internal {
        _tokenCIDs[_tokenId] = cid;
    }

    function _setScript(uint256 _tokenId, string memory audioScript) internal {
        _script[_tokenId] = audioScript;
    }

    function _setPrice(uint256 _tokenId, uint256 audioPrice) internal {
        _price[_tokenId] = audioPrice;
    }

    function _setTokenIds(address speaker, uint256 _tokenId) internal {
        _tokenIDs[speaker].push(_tokenId);
    }

    function getAll() public view returns (AllData[] memory){
        AllData[] memory allDataArray = new AllData[](tokenId);
        for(uint256 i = 0; i < tokenId; i++){
            string memory cid= tokenCID(i);
            address owner = ownerOf(i);
            //create struct
            AllData memory allData = AllData({
                speaker: owner,
                tokenId: i,
                cId: cid
            });
            allDataArray[i] = allData;
        }
        // Return the array
        return allDataArray;
    }
}