// import React from 'react'
// import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
// import Index from './pages/Index'
// import Home from './pages/Home'
// import AddEvent from './pages/AddEvent'
// import MyEvents from './pages/MyEvents'

// const App = () => {
//   const router= createBrowserRouter(
//     createRoutesFromElements(
//       <>
//       <Route path='/' element={<Index />}></Route>
//       <Route path='/home' element={<Home />}></Route>
//       <Route path='/Addevent' element={<AddEvent />}></Route>
//       <Route path='/myevents' element={<MyEvents />}></Route>



//       </>
//     )
//   )
//   return (
//     <>
//     <RouterProvider router={router} />
//     </>
//   )
// }

// export default App


import React, { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Index from './pages/Index';
import Home from './pages/Home';
import AddEvent from './pages/AddEvent';
import MyEvents from './pages/MyEvents';

const App = () => {
  const [signerAddress, setSignerAddress] = useState('');

  useEffect(() => {
    // Function to fetch MetaMask wallet address
    const fetchSignerAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setSignerAddress(accounts[0]);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask is not installed');
      }
    };

    fetchSignerAddress();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home signerAddress={signerAddress} />} />
        <Route path="/Addevent" element={<AddEvent signerAddress={signerAddress} />} />
        <Route path="/myevents" element={<MyEvents signerAddress={signerAddress} />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
