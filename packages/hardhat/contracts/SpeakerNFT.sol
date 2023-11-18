// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract SpeakerNFT is ERC721URIStorage, Ownable {
    string constant TOKEN_URI =
        "https://ipfs.io/ipfs/QmYuKY45Aq87LeL1R5dhb1hqHLp6ZFbJaCP8jxqKM1MX6y/babe_ruth_1.json";
    uint256 internal tokenId;
    // Mapping from token ID to CID of the IPFS file
    mapping(uint256 => string) private _tokenCIDs;

    // Mapping from token ID to script bytes
    mapping(uint256 => string) private _script;

    // Mapping from token ID to price
    mapping(uint256 => uint256) private _price;

    // Mapping from address to the number of NFTs owned
    mapping(address => uint256) private _balanceOf;
    constructor() ERC721("SPEAKERNFT", "SPKR") Ownable(msg.sender){}

    function mint(address to,string memory _cid, string memory _audioScript, uint256 _audioPrice) public {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);
        _setTokenCID(tokenId, _cid);
        _setScript(tokenId, _audioScript);
        _setPrice(tokenId, _audioPrice);
        unchecked {
            tokenId++;
        }
    }


    function tokenCID(uint256 _tokenId) external view returns (string memory) {
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
}