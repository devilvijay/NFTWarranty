
import React, {
  useState,useEffect,useLocation
} from 'react';
import logo from '../logo12.png';
import './Homepage.css';
import MarketplaceJSON from "../Marketplace.json";

import { utils } from 'ethers';
// import Navbar from './Navbar';
import { useNavigate } from 'react-router';
// import {useHistory} from 'react-router-dom';
const addressTrans = '';


const Homepage =
    () => {
        // const [connected, toggleConnect] = useState(false);
        const [currAddress, updateAddress] = useState('0x');
        const navigate = useNavigate();

        // async function handleclick() {
        //     console.log(connected);
        //     if (connected === true)
        //     {
        //         navigate("/Page1");
        //     }
        //     else
        //     {
        //         alert("Wallet not connect 'Please use Polygon Mumbai Testnet'");
        //         navigate("/");
        //     }
        // }

        // let hsitory = useHistory();

      async function getAddress() {
        try {
          const ethers = require("ethers");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const addr = await signer.getAddress();
          // console.log(addr);
          window.address=addr
          updateAddress(addr);
        }
        catch (e)
        {
          console.log(e);
        }
    }
    
    
    
        async function connectWebsite() {
            
          console.log("inside");
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          console.log(chainId);
        if(chainId !== utils.hexValue(80001))
        {
          console.log("error")
          //alert('Incorrect network! Switch your metamask network to Polygon Mumbai Testnet');
            await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: utils.hexValue(80001)}],
         })
        }  
        await window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(() => {
            // updateButton();
            console.log("here");
            getAddress();
            // window.location.replace(location.pathname)
            // console.log(currAddress)
            let val = window.ethereum.isConnected();
            console.log(val);
            if (val) {
              
              //Inside this Only if wallet is connected
              if (currAddress === MarketplaceJSON.address)
              {
                  //Navigate to admin page or seller  
                  navigate("/Seller");
              }
              else
              {
                  //Navigate to User page  
                navigate("/User");
              }
              // handleclick(); 
            }
            else
            { 
              alert("Wallet not connect 'Please use Polygon Mumbai Testnet'");
              navigate("/");
            }
          });

      }
      
    return (
      <div className="home">
        <div className="home-logo">
          <img
            src={
              logo
            }
            className="home-logo-img"
          ></img>
        </div>
        <div className="home-heading">
          <span className="p11">
            NFT
            WARRANTIES
          </span>
          <span className="p12">
            by
            devil_demon
          </span>
        </div>
        <div className="home-warranty-address">
          <span className="p1">
            Warranty
            Contact
            Address
            :
          </span>
          <span className="p2">
            {MarketplaceJSON.address}
          </span>
        </div>
        <div className="home-button">
                <button className="home-button-btn" onClick={connectWebsite} >
                    Connect Wallet
                    {/* {connected ? handleclick : null} */}
        </button>
        </div>
      </div>
    );
  };

export default Homepage;

