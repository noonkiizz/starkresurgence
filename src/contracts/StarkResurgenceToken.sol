// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StarkResurgenceToken
 * @dev ERC20 Token for Stark Resurgence project, deployable on OP Sepolia via Remix
 */
contract StarkResurgenceToken is ERC20, Ownable {
    // Events for better transparency
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    
    /**
     * @dev Constructor that gives the msg.sender all of existing tokens.
     * @param initialSupply The initial token supply (in wei)
     */
    constructor(uint256 initialSupply) ERC20("Stark Resurgence", "SRG") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Creates `amount` tokens and assigns them to `recipient`
     * @param recipient The address which will receive the minted tokens
     * @param amount The amount of tokens to mint
     */
    function mint(address recipient, uint256 amount) external onlyOwner {
        _mint(recipient, amount);
        emit TokensMinted(recipient, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`
     * @param account The address from which to burn tokens
     * @param amount The amount of tokens to burn
     */
    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
        emit TokensBurned(account, amount);
    }

    /**
     * @dev Allows users to burn their own tokens
     * @param amount The amount of tokens to burn
     */
    function burnOwn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Returns the chain ID of the current blockchain
     * @return The chain ID
     */
    function getChainId() external view returns (uint256) {
        return block.chainid;
    }
}