
import React from "react";
import Logo from "../assets/images/logo-transparent-png.png";
import Meta from "../assets/images/metamask.png";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  async function connectMetamask() {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this app.");
        return;
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []); // Request accounts
      const signer = await provider.getSigner();
  
      // Retrieve the address directly
      const address = await signer.getAddress();
  
      if (accounts.length > 0) {
        alert(`${address} is successfully logged in`);
        navigate("/home", { state: { signerAddress: address } });
      } else {
        alert("Failed to connect MetaMask wallet.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("An error occurred while connecting to MetaMask.");
    }
  }
  

  return (
    <>
      <body className="bg-[#FFECD1]">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div>
            <img src={Logo} alt="Ticket" className="h-[200px] w-[300px] mb-6" />
          </div>
          <div>
            <p className="text-center text-pink-500 font-bold text-lg">
              Connect your MetaMask wallet to explore, create, and securely <br />
              manage your experience on our decentralized platform.
            </p>
          </div>
          <div className="p-4 mt-6">
            <button
              onClick={connectMetamask}
              className="bg-pink-400 px-28 py-4 text-white rounded-full hover:bg-pink-500 shadow-xl flex items-center"
            >
              <img src={Meta} alt="MetaMask Logo" className="w-6 h-6 mr-2" />
              Connect Your MetaMask Wallet
            </button>
          </div>
        </div>
      </body>
    </>
  );
};

export default Index;

