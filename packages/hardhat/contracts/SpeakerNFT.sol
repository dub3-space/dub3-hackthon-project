// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SpeakerNFT is ERC721 {
    using SafeMath for uint256;

    // Mapping from token ID to CID of the IPFS file
    mapping(uint256 => string) private _tokenCIDs;

    // Mapping from token ID to speaker name
    mapping(uint256 => string) private _speakerNames;

    // Mapping from token ID to script bytes
    mapping(uint256 => string) private _scriptBytes;

    // Counter for generating unique token IDs
    uint256 private _tokenIdCounter;

    // Mapping from address to the number of NFTs owned
    mapping(address => uint256) private _balanceOf;

    // Base URI for metadata
    string private _baseTokenURI;

    constructor(string memory name, string memory symbol, string memory baseTokenURI) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
    }

    function mint(string memory cid, string memory speakerName, string memory scriptByte) external {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenCID(tokenId, cid);
        _setSpeakerName(tokenId, speakerName);
        _setScriptByte(tokenId, scriptByte);
        _tokenIdCounter = _tokenIdCounter.add(1);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenCID(uint256 tokenId) external view returns (string memory) {
        return _tokenCIDs[tokenId];
    }

    function speakerName(uint256 tokenId) external view returns (string memory) {
        return _speakerNames[tokenId];
    }

    function scriptByte(uint256 tokenId) external view returns (string memory) {
        return _scriptBytes[tokenId];
    }

    
    function _setTokenCID(uint256 tokenId, string memory cid) internal {
        _tokenCIDs[tokenId] = cid;
    }

    function _setSpeakerName(uint256 tokenId, string memory name) internal {
        _speakerNames[tokenId] = name;
    }

    function _setScriptByte(uint256 tokenId, string memory script) internal {
        _scriptBytes[tokenId] = script;
    }
}
