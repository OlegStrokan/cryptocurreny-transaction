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


export const TransactionProvider = ({ children }: any) => {

  if (!ethereum) return alert('Please install metamask');

  return (
    <TransactionContext.Provider value={null}>
      {children}
    </TransactionContext.Provider>
  )
}

