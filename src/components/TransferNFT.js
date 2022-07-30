import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import "./TransferNFT.css"
import Marketplace from '../Marketplace.json';
import Navbar from './Navbar';
const TransferNFT = () => {

    const navigate = useNavigate();
    const ethers = require('ethers');
    const handleclick=() =>{
        navigate('/Seller');
    }
    async function getMyNFTs()
    {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer =provider.getSigner();
        //   const owneraddr = signer.getAddress();
        //   console.log(owneraddr);
          const owneraddr = '0x83D7bF193FDa9421Cd018995E12Bc5D97f373435';
          let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
          let data = await contract.fetchMyNFTs(owneraddr);
            const items = await Promise.all(data.map(async i => {
            // const tokenUri = await contract.tokenURI(i.tokenId)
            // const meta = await axios.get(tokenUri)
            // let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
              seller: i.issuer,
              owner: i.owner,
              serial_number: i.serial_number,
              warranty_duration: parseInt(i.warranty_duration._hex),
              link_to_warranty: i.link_to_warrenty_condition,
              num_transfrers_allowed: parseInt(i.num_transfers_allowed._hex)
            }
            return item;
          }));
        //   console.log(items);
        //   sessionStorage.setItem('Items',JSON.stringify(items));

        }  
        catch(err)
        {
          console.log(err);
        }
    } 
    getMyNFTs();
//   const getstorage = () =>{
//      var string= sessionStorage.getItem('Items');
//      var arr=JSON.parse(string);
//      console.log(arr)
//   }
//   getstorage();
  return (
    <div className="">
           <Navbar></Navbar>
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