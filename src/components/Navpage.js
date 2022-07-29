import React from 'react'
import './Navpage.css';

const Navpage = () => {
  return (
      <div className='page1'>
          <div className='page1-buttons'>
              <div className='page1-buttons-admin'>
                  <button className='button-admin'>Admin</button>       
              </div>

              <div className='page1-buttons-user'>
                  <button className='button-user'>User</button>
              </div>       
          </div>

          <div className='page1-panel'>
              <div className='page1-panel-recieptant'>
                  <div className='reciepant-address'> Recieptant Address</div>
                  <input type="text" className='reciepant-address-input'></input>
              </div>

              <div className='page1-panel-serialno'>
                  <div className='serialno.'> Serial Number</div>
                  <input type="text" className='serialno-input'></input>
              </div>
              
              <div className='page1-panel-warranty_duration'>
                  <div className='warranty_duration'> Warranty Duration (days)</div>
                  <input type="text" className='warranty_duration-input'></input>
              </div>

              <div className='page1-panel-transfers'>
                  <div className='reciepant-transfers'> Recieptant Address</div>
                  <input type="text" className='transfers-input'></input>
              </div>

          </div>

          <div className='page1-mint-button'>
              <button className='mint-button'>Mint</button>
          </div>
    </div>
  )
}

export default Navpage