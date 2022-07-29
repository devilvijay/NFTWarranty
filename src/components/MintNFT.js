import Navbar from "./Navbar";
import { useState } from "react";
import { uploadJSONToIPFS } from "../pinata";
import Marketplace from '../Marketplace.json';
import { useLocation } from "react-router";

export default function SellNFT () {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();
    
    // async function uploadMetaToIPFS() {
    //     const (name ,description,price ) =formParams;
    //     if(!name || !description )
    //     {
    //         return;
    //     }
    //     const nftJSON {
    //         owneraddress,serial_number,warranty_duration,num_transfers_allowed
    //     };

    //     try {
    //         const response = await uploadJSONToIPFS(nftJSON);
    //         if(response.success === true)
    //         {
    //             console.log("Uploaded JSON to IPFS",response);
    //             return response.pinataURL;
    //         }
    //     }
    //     catch(error)
    //     {
    //         console.log(error);
    //     }
    // }
    
    // async function MintNFT(e)
    // {
    //         e.preventDefault();

    //         try {
    //             const metadataURL = await uploadMetaToIPFS();
    //             const provider = new ethers.providers.Web3Provider(window.ethereum);
    //             const signer =provider.getSigner();

    //             updateMessage("Warranty card is being created");

    //             let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
    //             //get these values from form input data
    //             let transaction = await contract.createToken(metadataURL,owner,serial_number,warranty_duration,link_to_warranty_condition,num_transfers_allowed);
    //             await transaction.wait();

    //             alert("Successfully Created NFT Warranty!!");
    //             updateMessage("");
    //             updateFormParams()
    //             //Redirect to MY NFT PAGE 
    //             window.location.replace("/")
    //         }
    //         catch(error)
    //         {
    //             alert("Error Occured while Creating NFT")
    //         }
    // }


    return (
        <div className="">
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-purple-500 mb-8">Create your NFT Warranty Card</h3>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="Address">Recipient Address</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Serial Number</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Warranty Duration (Days)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Warranty Conditions (URL)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Number of Transfers Allowed</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>                
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button onClick={""} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                    Mint NFT
                </button>
            </form>
        </div>
        </div>
    )
}