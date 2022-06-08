import React from 'react';
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constans';

export const TransactionContext = React.createContext(null as any);
// @ts-ignore
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer)
}


export const TransactionProvider = ({ children }: any) => {

  const [currentAccount, setCurrentAccount] = React.useState('');
  const [formData, setFormData] = React.useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // @ts-ignore
  const [transactionCount, setTransactionCount] = React.useState<boolean>(localStorage.getItem('transactionCount'));

  const handleChange = (e: any, name: any) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  const checkIfWalletIsConnected = async() => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {

      }
    } catch (e) {
      throw new Error('No ethereum object')
    }
  }

  const connectWallet = async() => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0])
      window.location.reload();

    } catch (e) {
      throw new Error('No ethereum object')
    }

  }

  const sendTransaction = async() => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();

      const parseAmount = ethers.utils.parseEther(amount)

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208',
          value: parseAmount._hex,
        }]
      })

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);

      setIsLoading(true);

      console.log(`Loading - ${transactionHash.hash}`)

      await transactionHash.wait();

      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber())
    } catch (e) {
      throw new Error('No ethereum object')
    }
  }


  React.useEffect(() => {
     checkIfWalletIsConnected()
  }, [])


  return (
    <TransactionContext.Provider
      value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction } as any}>
      {children}
    </TransactionContext.Provider>
  )
}

