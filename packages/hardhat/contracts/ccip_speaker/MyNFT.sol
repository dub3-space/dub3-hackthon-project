// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract MyNFT is ERC721URIStorage, Ownable {
    string constant TOKEN_URI =
        "https://ipfs.io/ipfs/QmYuKY45Aq87LeL1R5dhb1hqHLp6ZFbJaCP8jxqKM1MX6y/babe_ruth_1.json";
    uint256 internal tokenId;
    // Mapping from token ID to CID of the IPFS file
    mapping(uint256 => string) private _tokenCIDs;

    // Mapping from token ID to speaker name
    mapping(uint256 => string) private _speakerNames;

    // Mapping from token ID to script bytes
    mapping(uint256 => string) private _scriptBytes;

    // Mapping from address to the number of NFTs owned
    mapping(address => uint256) private _balanceOf;
    constructor() ERC721("SPEAKERNFT", "SPKR") {}

    function mint(address to,string memory cid, string memory _speakerName, string memory _scriptByte) public {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);
        _setTokenCID(tokenId, cid);
        _setSpeakerName(tokenId, _speakerName);
        _setScriptByte(tokenId, _scriptByte);
        unchecked {
            tokenId++;
        }
    }


    function tokenCID(uint256 _tokenId) external view returns (string memory) {
        return _tokenCIDs[_tokenId];
    }

    function speakerName(uint256 _tokenId) external view returns (string memory) {
        return _speakerNames[_tokenId];
    }

    function scriptByte(uint256 _tokenId) external view returns (string memory) {
        return _scriptBytes[_tokenId];
    }

    
    function _setTokenCID(uint256 _tokenId, string memory cid) internal {
        _tokenCIDs[_tokenId] = cid;
    }

    function _setSpeakerName(uint256 _tokenId, string memory name) internal {
        _speakerNames[_tokenId] = name;
    }

    function _setScriptByte(uint256 _tokenId, string memory script) internal {
        _scriptBytes[_tokenId] = script;
    }
}