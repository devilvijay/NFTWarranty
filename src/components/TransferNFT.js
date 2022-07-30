import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import "./TransferNFT.css"

const TransferNFT = () => {

    const navigate = useNavigate();

    const handleclick=() =>{
        navigate('/Seller');
    }
    
  return (
    <div className="">
            <div className="Mint-page" id="nftForm">
                <div className=" buttons-mintpage">
                    <button className="Seller-btn" onClick={handleclick}>Seller</button>
                    <button className="Owner-btn">Owner</button>
                    
                </div>
              <div className='table-user'>
                  <div className='table-def'>
                      <table> 
                          <tr>
                              <th className='table-heading'>Select</th>
                              <th className='table-heading'>Issuer</th>
                              <th className='table-heading'>Serial Number</th>
                              <th className='table-heading'>Issue Time</th>
                              <th className='table-heading'>Warranty Duration</th>
                              <th className='table-heading'>Transfers Remaining</th>
                          </tr>
                          <tr>
                              <td className='table-definition'><input type='checkbox'></input></td>
                              <td className='table-definition'>Rinku Dhanraj Gabhane{/* issuer address*/ }</td>
                              <td className='table-definition'>1234526663774{/*serial number*/}</td>
                              <td className='table-definition'>14/01/2001{/*issue date*/}</td>
                              <td className='table-definition'>10years{/*warranty duration*/}</td>
                              <td className='table-definition'>10{/*number of transfers*/}</td>
                          </tr>
                      </table>
                  </div>
                  <div className='transfer-add'>
                      <label className='recieptant-label'> Receiptant Address : </label>
                      <input type='text' placeholder='' className='add-input'></input>
                  </div>
                    <br></br>
                    <button onClick={''} className="mint-btn">Transfer NFT</button>
                </div>
            </div>
        </div>

  )
}

export default TransferNFT;