import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import "./TransferNFT.css"
import Marketplace from '../Marketplace.json';
import Navbar from './Navbar';


const TransferNFT = () => {
  const sampleData = [
    {
      "name": "NFT#1",
      "description": "Alchemy's First NFT",
      "website": "http://axieinfinity.io",
      "image": "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      "price": "0.03ETH",
      "currentlySelling": "True",
      "address": "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];
  var d = new Array();
  const navigate = useNavigate();
  const ethers = require('ethers');
  const handleclick = () => {
    navigate('/Seller');
  }
  const [data, updatedata] = useState(sampleData);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState('0x');
  var token_ids = [];
  async function getMyNFTs() {

    try {
      // console.log("indside");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      // const owneraddr = await signer.getAddress();
      // console.log(owneraddr);

      // console.log(addressTrans);

      const owneraddr = '0x83D7bF193FDa9421Cd018995E12Bc5D97f373435';
      let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
      updateAddress(owneraddr);
      let data = await contract.fetchMyNFTs(owneraddr);
      // console.log(data);
      const items = await Promise.all(data.map(async i => {
        // const tokenUri = await contract.tokenURI(i.tokenId)
        // const meta = await axios.get(tokenUri)
        // let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          token_id: parseInt(i.tokenId._hex),
          seller: i.issuer,
          owner: i.owner,
          serial_number: i.serial_number,
          issue_time: parseInt(i.issue_time._hex),
          warranty_duration: parseInt(i.warranty_duration._hex),
          link_to_warranty: i.link_to_warrenty_condition,
          num_transfrers_allowed: parseInt(i.num_transfers_allowed._hex)
        }
        return item;
      }));
      // console.log(items);
      //   sessionStorage.setItem('Items',JSON.stringify(items));
      updateFetched(true);
      updatedata(items);
    }
    catch (err) {
      console.log("error", err);
    }
  }
  if (!dataFetched) {
    getMyNFTs();
  }

  async function TransferNFT(Receipantaddress, token_id) {
    console.log(token_id)
    if(token_id.length !== 0)
    {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
      let transaction = await contract.TransferNFT(address, Receipantaddress, token_id[0]);
      await transaction.wait();
      alert("Successfully Transfered NFT Warranty!!");
    }
    else
    {
      alert("Select A token First!!");
    }
    

  }

  function chkbox() {
    var checkboxed = document.querySelectorAll('input[name="nft"]');
    checkboxed.forEach((this1) => {

      var s = this1.value;
      if (this1.checked) {
        if (d.indexOf(s) === -1) {
          d.push(s);
        }
      } else {
        var index = d.indexOf(s);
        if (index > -1) {
          d.splice(index, 1);
        }
      }
    })
    console.log(d);
  }
  function TableHeader() {
    return (
      <tr>
        <th className='table-heading'>Select</th>
        <th className='table-heading'>Issuer</th>
        <th className='table-heading'>Serial Number</th>
        <th className='table-heading'>Issue Time</th>
        <th className='table-heading'>Warranty Duration</th>
        <th className='table-heading'>Transfers Remaining</th>
      </tr>
    )
  };

  function TableRow(nft) {
    let sec = nft.issue_time;
    let id = nft.token_id;
    let normalDate = new Date(sec * 1000).toLocaleString('en-GB', { timeZone: 'UTC' });
    return (
      <tr key={id}>
        <td className='table-definition'><input type='checkbox' name='nft' value={id} onChange={chkbox}></input></td>
        <td className='table-definition'>{nft.seller}</td>
        <td className='table-definition'>{nft.serial_number}</td>
        <td className='table-definition'>{normalDate}</td>
        <td className='table-definition'>{nft.warranty_duration}</td>
        <td className='table-definition'>{nft.num_transfrers_allowed}</td>
      </tr>
    )
  }
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
              <TableHeader />
              {data.map((nft) => TableRow(nft))}
              {/* TableRow(nft.tokenId, nft) */}

            </table>
          </div>
          <div className='transfer-add'>
            <label className='recieptant-label'> Receiptant Address : </label>
            <input id="Receipant" type='text' placeholder='Enter Receipant Address' className='add-input'></input>
          </div>
          <br></br>
          <button onClick={() => TransferNFT(document.getElementById('Receipant').value, d)} className="transfer-btn">Transfer NFT</button>
        </div>
      </div>
    </div>

  )
}

export default TransferNFT;
