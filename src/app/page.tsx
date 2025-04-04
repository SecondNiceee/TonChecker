'use client'
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";

import {Address} from "@ton/core"

export default function Home() {

  const [tonConnectUI] = useTonConnectUI();

  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address : string) => {
    setTonWalletAddress(address);
    console.log("Wallet connect successfuly");
    setIsLoading(false);
  }, [] )

  const handleWalletDisconnection = useCallback( () => {
    setTonWalletAddress(null);
    console.log("Wallet discconnection successfuly!")
    setIsLoading(false)
  }, [] )


  useEffect( () => {

     const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address){
        handleWalletConnection(tonConnectUI.account.address)
      }
      else{
        handleWalletDisconnection()
      }
     }

     checkWalletConnection()

     const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet){
        handleWalletConnection(wallet.account.address)
      }
      else{
        handleWalletDisconnection()
      }
     })


     return () => {
      unsubscribe()
     }

  }, [tonConnectUI, handleWalletConnection, handleWalletConnection] );


  const handleWalletAction = async () => {
    if (tonConnectUI.connected){
      setIsLoading(true);
      await tonConnectUI.disconnect()
    }
    else{
      await tonConnectUI.openModal()
    }
   }

  const formatAdress = (address : string) => {
    const tempAdress = Address.parse(address).toString()
    return `${tempAdress.slice(0, 4)}...${tempAdress.slice(-4)}`
  }

  if (isLoading){
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Loading....
        </div>
      </main>
    )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">TON Connect Demo</h1>
        {tonWalletAddress ? (
          <div className="flex flex-col items-center">
            <p className="mb-4">Connected : {formatAdress(tonWalletAddress)}</p>
            <button 
            onClick={handleWalletAction} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Disconnect Wallet
            </button>
          </div>
        ) 
      :
      (
        <button onClick={handleWalletAction}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect TON Wallet
        </button>
      )}
    </main>
  );
}
