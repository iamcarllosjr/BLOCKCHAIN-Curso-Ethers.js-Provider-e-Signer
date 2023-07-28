"use client"

import { ethers } from "ethers"
import { useState } from "react";

export default function Home() {

  const [addressField, setAddress] = useState("...");
  const [balanceField, setBalance] = useState("0");

  const handleClick = async () => {
    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum); //Conectando ao provider do Browser (metamask)
        const signer = await provider.getSigner(); //Atráves do provider, posso obter tudo sobre o siger usando getSinger
        await provider.send("eth_requestAccounts", []); //Metódo de fazer o request de uma conta
  
        const address = await signer.getAddress(); //Pegando o address do Signer
        const balance = await provider.getBalance(address); //pegando balance do Singer guardado na variável address
        console.log("Address :", address);
        console.log("Balance em BigNumber :", balance); //Vai retornar em BigNumber, ai tem que fazer a conversão para Ether
        console.log("Balance convertido para Ether :", ethers.formatEther(balance));
        const balanceFormated = ethers.formatEther(balance); //Balance em BigNumber convertido para Ether
        setAddress(address);
        setBalance(balanceFormated);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        <h1>Ether.js - Provider e Signer</h1>
         
          <button onClick={handleClick} className="btn px-4 py-2 bg-gray-700 rounded-full text-white">Connect Wallet</button>
          <div className="flex gap-3">
            <h1 className="font-bold">Balance :</h1>
            <p className="balance">{balanceField}</p>
          </div>

          <div className="flex gap-3">
            <h1 className="font-bold">Address :</h1>
            <p className="address">{addressField}</p>

          </div>
       
      </div>
      
    </main>
  )
}
