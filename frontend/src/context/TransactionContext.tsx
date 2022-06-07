import React from 'react';
import {ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constans';
export const TransactionContext = React.createContext(null as any);
// @ts-ignore
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return { provider, signer, transactionContract }
}


export const TransactionProvider =  ({ children }: any) => {

  const [currentAccount, setCurrentAccount] = React.useState('');
  const [formData, setFormData] = React.useState({ addressTo: '', amount: '', keyword: '', message: ''});

  const handleChange = (e: any, name: any) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value}))
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {

      }
    }
    catch (e) {

    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0])

    } catch (e) {
        throw new Error('No ethereum object')
    }

  }



    React.useEffect(() => {
      checkIfWalletIsConnected()
    }, [])



  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange } as any}>
      {children}
    </TransactionContext.Provider>
  )
}

