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

    mapping(uint256 => NFTMetadata) private nftMetadata;

    address public speakerNFTAddress = 0xB31B82CDF32ce766E7acB943565347383Ac9ec26;

    constructor() ERC721("BuyerNFT", "BNFT") {

    }

    function mint (
        address to,
        uint256 tokenId,
        string memory cid,
        address speakerAddress,
        address buyerAddress,
        string memory script
    ) public onlyOwner {
        SpeakerNFT spk = SpeakerNFT(speakerNFTAddress);
        uint256 prc = spk.price(tokenId);
        require(prc <= msg.value); // decimals


        NFTMetadata memory metadata = nftMetadata[tokenId];
        metadata.cid = cid;
        metadata.speakerAddress = speakerAddress;
        metadata.buyerAddress = buyerAddress;
        metadata.script = script;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, cid);
        //todo send money to dub3 and speaker
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
}
