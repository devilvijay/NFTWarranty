// import Navbar from '../components/Navbar/';
// import './Navbar.css';
import { useState } from 'react';
import { uploadJSONToIPFS } from '../pinata';
import Marketplace from '../Marketplace.json';
import { useNavigate } from 'react-router';
import './MintNFT.css';
import Navbar from './Navbar';
import { FallbackProvider } from '@ethersproject/providers';
let map = [];
export default function SellNFT() {

    const navigate = useNavigate();

    const handleclick=() =>{
        navigate('/User');
    }

    const [formParams, updateFormParams] = useState({ Receipantaddress: '', serialnumber: '', warrantydays: '',warrantyconditions: '',numberoftransfer: ''});
    const ethers = require('ethers');
    const [
        message,
        updateMessage,
    ] =
        useState(
            ''
        );
    async function uploadMetaToIPFS(owneraddress) {
        const {Receipantaddress,serialnumber,warrantydays,warrantyconditions,numberoftransfer}=formParams;
        if(!Receipantaddress || !serialnumber || !warrantydays || !numberoftransfer || !warrantyconditions)
        {
            return;
        }
        const nftJSON = {
            owneraddress,Receipantaddress,serialnumber,warrantydays,warrantyconditions,numberoftransfer
        };

        try {
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true)
            {
                console.log("Uploaded JSON to IPFS",response);
                return response.pinataURL;
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async function MintNFT(e)
    {
            e.preventDefault();
            try {
                const metadataURL = await uploadMetaToIPFS();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer =provider.getSigner();
                const owneraddr = signer.getAddress();
                console.log(owneraddr);
                updateMessage("Warranty card is being created");

                let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
                //get these values from form input data
                const {Receipantaddress,serialnumber,warrantydays,warrantyconditions,numberoftransfer}=formParams;
                console.log(Receipantaddress);
                let transaction = await contract.createToken(metadataURL,owneraddr,Receipantaddress,serialnumber,warrantydays,warrantyconditions,numberoftransfer);
                await transaction.wait();
                alert("Trasition is in process!! Please wait.")
                updateMessage("");
                alert("Successfully Created NFT Warranty!!");
                updateMessage("");
                updateFormParams()
                //Redirect to MY NFT PAGE
                window.location.replace("/Seller");
            }
            catch(error)
            {
                console.log(error);
                alert("Error Occured while Creating NFT")
            }
    }

    // console.log(formParams);
    map = formParams;
    return (
        <div className="">
            <Navbar></Navbar>
            <div className="Mint-page" id="nftForm">
                <div className=" buttons-mintpage">
                    <button className="Seller-btn">Seller</button>
                    <button className="Owner-btn" onClick={() =>{handleclick()}}>Owner</button>
                    
                </div>
                <form className="form">
                    <h1 className="form-heading">Create your NFT Warranty Card</h1>
                    <div className="seller-content">
                        <label className="content-label">Receipant Address:</label>
                        <input className="receipt-input" id="Receipantaddress" type="text" placeholder="Receipant Address" onChange={(e) => updateFormParams({...formParams,Receipantaddress :e.target.value})} value={formParams.Receipantaddress}>
                        </input>
                    </div>
                    <div className="seller-content">
                        <label className="content-label">Serial Number:</label>
                        <input
                            className="serial-input"
                            id="serialnumber"
                            type="text"
                            placeholder="Serial no"
                            onChange={(
                                e
                            ) =>
                                updateFormParams(
                                    {
                                        ...formParams,
                                        serialnumber: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.serialnumber
                            }
                        >
                        
                        </input>
                    </div>
                    <div className="seller-content">
                        <label className="content-label">Warranty Duration(Days):</label>
                        <input
                            className="warranty-input"
                            id="warrantydays"
                            type="text"
                            placeholder="Exipre in Days"
                            onChange={(
                                e
                            ) =>
                                updateFormParams(
                                    {
                                        ...formParams,
                                        warrantydays: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.warrantydays
                            }
                        >
                    
                        </input>
                    </div>
                    <div className="seller-content">
                        <label
                            className="content-label"
                        >
                            Warranty
                            Conditions(URL):
                        </label>
                        <input
                            className="warranty-input"
                            id="warrantyconditions"
                            type="text"
                            placeholder="URL for conditions"
                            onChange={(
                                e
                            ) =>
                                updateFormParams(
                                    {
                                        ...formParams,
                                        warrantyconditions: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.warrantyconditions
                            }
                        >
                        
                        </input>
                    </div>
                    <div className="seller-content">
                        <label
                            className="content-label"
                        >
                        
                            Number
                            of
                            Transfers
                            Allowed:
                        </label>
                        <input
                            className="warranty-input"
                            id="numberoftransfer"
                            type="text"
                            placeholder="Transfer allowed"
                            onChange={(
                                e
                            ) =>
                                updateFormParams(
                                    {
                                        ...formParams,
                                        numberoftransfer: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.numberoftransfer
                            }
                        >
                    
                        </input>
                    </div>
                    <br>
                    
                    </br>
                    <div className="text-green text-center">
                        
                        {
                            message
                        }
                    </div>
                    <button onClick={MintNFT} className="mint-btn">Mint NFT</button>
                </form>
            </div>
        </div>
    );
}

export  { map };