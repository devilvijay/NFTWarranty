import React from 'react'
import logo12 from '../logo12.png'
import './Navbar.css'
const Navbar = () => {
  return (
      <div className='navbar' >
          <div className='navbar-head'>
              <img src={logo12} className='navbar-logo'></img>
              <h2 className='navbar-heading'>NFT Warranty</h2>
          </div>

          <div className='navbar-address'>
              {/* <div className='contract-address'> */}
                  <div className='add-head'>Contract Address : 0x83D7bF193FDa9421Cd018995E12Bc5D97f373435</div>
              {/* </div> */}

              {/* <div className='user-address'> */}
                  <div className='user-head'>User Address : 0x83D7bF193FDa9421Cd018995E12Bc5D97f373435</div>
              {/* </div> */}
          </div>

          <button className='disconnect'>Disconnect</button>
    </div>
  )
}

export default Navbar;