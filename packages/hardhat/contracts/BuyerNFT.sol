// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SpeakerNFT.sol";

contract BuyerNFT is ERC721URIStorage, Ownable {

    
    struct NFTMetadata {
        string cid;
        address speakerAddress;
        address buyerAddress;
        string script;
    }
    uint256 internal tokenId;
    // Mapping from token ID to CID of the IPFS file
    mapping(address => uint256[]) private _tokenIDs;
    mapping(uint256 => NFTMetadata) private nftMetadata;


    address public speakerNFTAddress = 0x938049a537939AC054FFF6E0CafCe39D726BDd9c;

    constructor() ERC721("BuyerNFT", "BNFT") {

    }

    function mint (
        address to,
        uint256 speakerTokenId,
        string memory cid,
        address speakerAddress,
        address buyerAddress,
        string memory script
    ) public payable {
        uint256 prc = getPriceOfOtherContract(tokenId);
        require(prc <= msg.value); // decimals


        NFTMetadata memory metadata = nftMetadata[speakerTokenId];
        metadata.cid = cid;
        metadata.speakerAddress = speakerAddress;
        metadata.buyerAddress = buyerAddress;
        metadata.script = script;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, cid);
        _setTokenIds(to,tokenId);

        unchecked {
            tokenId++;
        }
        //todo send money to dub3 and speaker
    }
    function tokenIDs(address speaker) external view returns (uint256[] memory) {
        return _tokenIDs[speaker];
    }
    function getNFTMetadata(uint256 tokenId)
        public
        view
        returns (
            string memory cid,
            address speakerAddress,
            address buyerAddress,
            string memory script
        )
    {
        NFTMetadata storage metadata = nftMetadata[tokenId];
        return (
            metadata.cid,
            metadata.speakerAddress,
            metadata.buyerAddress,
            metadata.script
        );
    }

    function getPriceOfOtherContract(uint256 otherContractTokenId) public view returns (uint256) {
        require(speakerNFTAddress != address(0), "Other contract address not set");

        // Call the price function of the other contract
        SpeakerNFT spk = SpeakerNFT(speakerNFTAddress);
        return spk.price(otherContractTokenId);
    }

    function _setTokenIds(address speaker, uint256 _tokenId) internal {
        _tokenIDs[speaker].push(_tokenId);
    }


}