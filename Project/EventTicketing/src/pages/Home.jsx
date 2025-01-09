// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import SecondNavbar from '../components/SecondNavbar';

// const Home = () => {
//     const location = useLocation();
//     const signerAddress = location.state?.signerAddress;

//     return (
//         <div className='bg-[#FFECD1] min-h-screen w-full'>
//             <Navbar />
//             <SecondNavbar />

//             <div className="p-4">
//                 <h1>Welcome to Home Page</h1>
//                 {signerAddress ? (
//                     <p>Your Signer Address: {signerAddress}</p>
//                 ) : (
//                     <p>No signer address found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Home;


import React from 'react';
import Navbar from '../components/Navbar';
import SecondNavbar from '../components/SecondNavbar';
import Footer from '../components/Footer';
import EventList from '../components/EventList';

const Home = ({ signerAddress }) => {
  return (
    <>
    <div className="bg-[#FFECD1] min-h-screen w-full">
      <Navbar signerAddress={signerAddress} />
      <SecondNavbar />
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
        {signerAddress && <p>Your wallet address: {signerAddress}</p>}
      </div>
      <EventList />

    </div>
    <Footer />
    </>
  );
};

export default Home;
