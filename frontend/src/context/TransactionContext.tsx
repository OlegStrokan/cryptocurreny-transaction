import React from 'react';
import {ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constans';
export const TransactionContext = React.createContext(null);
// @ts-ignore
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
}


export const TransactionProvider =  ({ children }: any) => {

  const [connectedAccount, setConnectedAccount] = React.useState('');

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert('Please install metamask');

    const accounts = await ethereum.request({ method: 'eth_accounts' });
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setConnectedAccount(accounts[0])

    } catch (e) {
        throw new Error('No ethereum object')
    }

  }



    React.useEffect(() => {
      checkIfWalletIsConnected()
    }, [])



  return (
    <TransactionContext.Provider value={{ connectWallet } as any}>
      {children}
    </TransactionContext.Provider>
  )
}

