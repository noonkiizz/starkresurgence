import { useClick, useGame } from 'phaser-react-ui';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { phrase } from '~lib/lang';
import { Tutorial } from '~lib/tutorial';
import { Overlay } from '~scene/system/interface/overlay';
import { GameStat, IGame } from '~type/game';

import { Result } from './result';
import {
  Wrapper, Label, Button, Head, IconRestart,
} from './styles';

// Import ethers v6 correctly
import { ethers } from 'ethers';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { parseEther } from 'ethers';

import TokenABI from './TokenABI.json'

// Define a type for our ethereum provider without modifying Window
type EthereumProvider = {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  isMetaMask?: boolean;
};

type Props = {
  stat: GameStat
  record: Nullable<GameStat>
};

const GameoverUIInternal: React.FC<Props> = ({ stat, record }) => {
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [isClaimingInProgress, setIsClaimingInProgress] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  
  // Store game ID to prevent double claiming
  const gameId = useMemo(() => Math.random().toString(36).substring(2, 15), []);
  
  const game = useGame<IGame>();
  const contractAddress = '0x2921dbEd807E9ADfF57885a6666d82d6e6596AC2';

  const refButton = useRef<HTMLDivElement>(null);

  // Helper function to safely access ethereum
  const getEthereum = (): EthereumProvider | null => {
    const ethereum = (window as any).ethereum;
    return ethereum && typeof ethereum.request === 'function' ? ethereum : null;
  };

  // Check if this game session has already claimed tokens
  useEffect(() => {
    const checkPreviousClaim = () => {
      const claimedGames = localStorage.getItem('claimedGames');
      if (claimedGames) {
        const claimedGameIds = JSON.parse(claimedGames);
        if (claimedGameIds.includes(gameId)) {
          setRewardClaimed(true);
        }
      }
    };
    
    checkPreviousClaim();
  }, [gameId]);

  useEffect(() => {
    const connectWallet = async () => {
      const ethereum = getEthereum();
      
      if (ethereum) {
        try {
          // Request accounts
          await ethereum.request({ method: 'eth_requestAccounts' });
          
          // Create provider with type assertion
          const browserProvider = new BrowserProvider(ethereum as any);
          setProvider(browserProvider);
          
          // Get signer
          const walletSigner = await browserProvider.getSigner();
          setSigner(walletSigner);
          
          // Get address
          const walletAddress = await walletSigner.getAddress();
          setAddress(walletAddress);
          
          // Check if the connected wallet is the contract owner
          const contract = new ethers.Contract(contractAddress, TokenABI, browserProvider);
          const ownerAddress = await contract.owner();
          setIsOwner(ownerAddress.toLowerCase() === walletAddress.toLowerCase());
        } catch (error) {
          console.error("Error connecting to wallet:", error);
          window.alert('Failed to connect wallet. Please try again.');
        }
      } else {
        window.alert('Please install MetaMask to use this feature.');
      }
    };

    connectWallet();
  }, []);

  // Record a successful claim
  const recordClaim = () => {
    try {
      const claimedGames = localStorage.getItem('claimedGames');
      let claimedGameIds = claimedGames ? JSON.parse(claimedGames) : [];
      
      // Add current game ID to the list
      claimedGameIds.push(gameId);
      
      // Store back to localStorage
      localStorage.setItem('claimedGames', JSON.stringify(claimedGameIds));
    } catch (error) {
      console.error("Error recording claim:", error);
    }
  };

  const claim = useCallback(async () => {
    if (isClaimingInProgress) {
      return; // Prevent multiple clicks
    }
    
    if (!signer || !address) {
      window.alert('Wallet not connected.');
      return;
    }
    
    if (rewardClaimed) {
      window.alert('Rewards for this game have already been claimed.');
      return;
    }

    try {
      setIsClaimingInProgress(true);
      
      const contract = new ethers.Contract(
        contractAddress,
        TokenABI,
        signer
      );

      const pointToClaim = stat?.score;
      if (!pointToClaim) {
        window.alert('No points to claim.');
        setIsClaimingInProgress(false);
        return;
      }

      // Check if the connected wallet is the owner
      if (!isOwner) {
        window.alert('Only the contract owner can mint tokens. This is a demo feature.');
        setIsClaimingInProgress(false);
        return;
      }

      const tx = await contract.mint(
        address,
        parseEther(pointToClaim.toString())
      );

      await tx.wait();
      
      // Record this claim to prevent double claiming
      recordClaim();
      
      setRewardClaimed(true);
      window.alert(`Successfully claimed ${pointToClaim} SRG tokens!`);
    } catch (err) {
      console.error(err);
      window.alert('Claim Failed. Please check your wallet and try again.');
    } finally {
      setIsClaimingInProgress(false);
    }
  }, [signer, address, stat, isOwner, rewardClaimed, isClaimingInProgress, gameId]);

  const restartGame = useCallback(() => {
    game.restartGame();
    // Don't reset rewardClaimed here - it should persist across game restarts
  }, [game]);

  useEffect(() => {
    Tutorial.ToggleHintsVisible(false);

    return () => {
      Tutorial.ToggleHintsVisible(true);
    };
  }, []);

  const handleConnectWallet = async () => {
    const ethereum = getEthereum();
    if (ethereum) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        // The page will refresh with the useEffect
      } catch (error) {
        console.error(error);
      }
    } else {
      window.alert('Please install MetaMask to use this feature.');
    }
  };

  return (
    <Overlay>
      <Wrapper>
        <Head>
          <Label>GAME OVER</Label>
          <Result stat={stat} record={record} />
          {rewardClaimed || !stat?.score ? (
            <Button onClick={() => restartGame()}>
              <IconRestart src='assets/sprites/hud/restart.png' />
              {phrase('RESTART_GAME')}
            </Button>
          ) : signer && address ? (
            <>
              <Button 
                onClick={isClaimingInProgress ? undefined : () => claim()} 
                style={{ 
                  opacity: isClaimingInProgress ? 0.7 : 1,
                  cursor: isClaimingInProgress ? 'not-allowed' : 'pointer'
                }}
              >
                {isClaimingInProgress ? 'CLAIMING...' : `CLAIM ${stat?.score} SRG TOKENS`}
              </Button>
              {!isOwner && (
                <div style={{ fontSize: '12px', marginTop: '8px', color: '#ff9900' }}>
                  Note: Only the contract owner can mint tokens in this demo.
                </div>
              )}
            </>
          ) : (
            <Button onClick={handleConnectWallet}>
              CONNECT WALLET
            </Button>
          )}
        </Head>
      </Wrapper>
    </Overlay>
  );
};

export const GameoverUI: React.FC<Props> = ({ stat, record }) => {
  return (
    <GameoverUIInternal stat={stat} record={record} />
  )
}

GameoverUI.displayName = 'GameoverUI';