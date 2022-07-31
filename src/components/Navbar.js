import React, { useState } from 'react'
import logo12 from '../logo12.png'
import './Navbar.css'
import { useNavigate } from 'react-router'
import Marketplace from '../Marketplace.json'

import { useSearchParams } from 'react-router-dom'
const Navbar = () => {
    const updatedaddres = {window.address};
    const navigate = useNavigate();
    const handleclick = () => {
        
        navigate('/');
    }

    
  return (
      <div className='navbar' >
          <div className='navbar-head'>
              <img src={logo12} className='navbar-logo'></img>
              <h2 className='navbar-heading'>NFT Warranty</h2>
          </div>

          <div className='navbar-address'>
              {/* <div className='contract-address'> */}
              <div className='add-head'>Contract Address : { Marketplace.address}</div>
              {/* </div> */}

              {/* <div className='user-address'> */}
              <div className='user-head'>User Address : {updatedaddres}</div>
              {/* </div> */}
          </div>

          <button className='disconnect' onClick={handleclick}>Disconnect</button>
    </div>
  )
}

export default Navbar;
