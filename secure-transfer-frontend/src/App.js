import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SecureTransfer from './contracts/SecureTransfer.json';

const contractAddress = "YOUR_CELO_CONTRACT_ADDRESS_HERE";
const providerUrl = "https://alfajores-forno.celo-testnet.org"; // Alfajores testnet URL

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [whitelistAddress, setWhitelistAddress] = useState('');
  const [nickname, setNickname] = useState('');
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const init = async () => {
      if (window.celo) {
        await window.celo.enable();
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SecureTransfer.abi, signer);
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      } else {
        console.error("Please install CeloExtensionWallet!");
      }
    };
    init();
  }, []);

  const whitelistAddressHandler = async () => {
    try {
      const tx = await contract.addWhitelistedAddress(whitelistAddress, nickname);
      await tx.wait();
      setStatus(`Address ${whitelistAddress} whitelisted successfully!`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const transferHandler = async () => {
    try {
      const tx = await contract.transfer(transferAddress, ethers.utils.parseEther(transferAmount));
      await tx.wait();
      setStatus(`Transfer to ${transferAddress} of ${transferAmount} successful!`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Secure Transfer DApp</h1>
      <div>
        <h2>Whitelist Address</h2>
        <input 
          type="text" 
          placeholder="Address" 
          value={whitelistAddress} 
          onChange={(e) => setWhitelistAddress(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Nickname" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
        />
        <button onClick={whitelistAddressHandler}>Whitelist Address</button>
      </div>
      <div>
        <h2>Transfer</h2>
        <input 
          type="text" 
          placeholder="Address" 
          value={transferAddress} 
          onChange={(e) => setTransferAddress(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Amount" 
          value={transferAmount} 
          onChange={(e) => setTransferAmount(e.target.value)} 
        />
        <button onClick={transferHandler}>Transfer</button>
      </div>
      <div>
        <h2>Status</h2>
        <p>{status}</p>
      </div>
    </div
