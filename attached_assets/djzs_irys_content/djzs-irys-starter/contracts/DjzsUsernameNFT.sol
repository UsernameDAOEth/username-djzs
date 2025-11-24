// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DjzsUsernameNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(string => bool) public usernameTaken;

    event UsernameMinted(address indexed to, uint256 tokenId, string username, string tokenURI);

    constructor() ERC721("DJZS Username", "DJZSNAME") Ownable(msg.sender) {}

    function mintUsername(address to, string calldata username, string calldata tokenURI)
        external
        onlyOwner
        returns (uint256)
    {
        require(bytes(username).length > 0, "Empty username");
        require(!usernameTaken[username], "Username taken");

        uint256 tokenId = ++nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI); // if using ERC721URIStorage instead

        usernameTaken[username] = true;

        emit UsernameMinted(to, tokenId, username, tokenURI);
        return tokenId;
    }
}
