


import React from 'react';
import Logo from '../assets/images/logo-transparent-png.png';
import { Link } from 'react-router-dom';

const Navbar = ({ signerAddress }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-[#FFECD1] shadow-md">
      <div>
        <Link to="/home">
          <img src={Logo} alt="Logo" className="w-[100px] h-[80px]" />
        </Link>
      </div>
      <div className="flex items-center justify-center py-6 px-4 bg-pink-400 text-white rounded-l-full">
        <p>
          Welcome to EnterSmart &nbsp;&nbsp;
          {signerAddress ? signerAddress : 'Not Connected'}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
