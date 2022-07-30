// import Navbar from '../components/Navbar/';
// import './Navbar.css';
import { useState } from 'react';
import { uploadJSONToIPFS } from '../pinata';
import Marketplace from '../Marketplace.json';
import { useLocation, useNavigate } from 'react-router';
import './MintNFT.css';

export default function SellNFT() {

    const navigate = useNavigate();

    const handleclick=() =>{
        navigate('/User');
    }

    const [
        formParams,
        updateFormParams,
    ] = useState(
        {
            name: '',
            description:
                '',
            price:
                '',
        }
    );
    const ethers = require('ethers');
    const [
        message,
        updateMessage,
    ] =
        useState(
            ''
        );
    const location =
        useLocation();

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
            {/* <Navbar></Navbar> */}
            <div className="Mint-page" id="nftForm">
                <div className=" buttons-mintpage">
                    <button className="Seller-btn">Seller</button>
                    <button className="Owner-btn" onClick={handleclick}>Owner</button>
                    
                </div>
                <form className="form">
                    <h1 className="form-heading">Create your NFT Warranty Card</h1>
                    <div className="seller-content">
                        <label className="content-label">Receiptant Adress : </label>
                        <input className="receipt-input" id="name" type="text" placeholder=""
                            onChange={(e) => updateFormParams({
                                        ...formParams,
                                        name: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.name
                            }
                        >
                        
                        </input>
                    </div>
                    <div className="seller-content">
                        <label
                            className="content-label"
                            htmlFor="name"
                        >
                            
                            Serial
                            Number:
                        </label>
                        <input
                            className="serial-input"
                            id="number"
                            type="text"
                            placeholder="Axie#4563"
                            onChange={(
                                e
                            ) =>
                                updateFormParams(
                                    {
                                        ...formParams,
                                        name: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.name
                            }
                        >
                        
                        </input>
                    </div>
                    <div className="seller-content">
                        <label
                            className="content-label"
                            htmlFor="name"
                        >
                            
                            Warranty
                            Duration(Days):
                        </label>
                        <input
                            className="warranty-input"
                            id="days"
                            type="text"
                            placeholder="Axie#4563"
                            onChange={(
                                e
                            ) =>
                                updateFormParams(
                                    {
                                        ...formParams,
                                        name: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.name
                            }
                        >
                    
                        </input>
                    </div>
                    <div className="seller-content">
                        <label
                            className="content-label"
                            htmlFor="name"
                        >
                            Warranty
                            Conditions(URL):
                        </label>
                        <input
                            className="warranty-input"
                            id="text"
                            type="text"
                            placeholder="Axie#4563"
                            onChange={(
                                e
                            ) =>
                                updateFormParams(
                                    {
                                        ...formParams,
                                        name: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.name
                            }
                        >
                        
                        </input>
                    </div>
                    <div className="seller-content">
                        <label
                            className="content-label"
                            htmlFor="name"
                        >
                        
                            Number
                            of
                            Transfers
                            Allowed:
                        </label>
                        <input
                            className="warranty-input"
                            id="text"
                            type="text"
                            placeholder="Axie#4563"
                            onChange={(
                                e
                            ) =>
                                updateFormParams(
                                    {
                                        ...formParams,
                                        name: e
                                            .target
                                            .value,
                                    }
                                )
                            }
                            value={
                                formParams.name
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
                    <button onClick={''} className="mint-btn">Mint NFT</button>
                </form>
            </div>
        </div>
    );
}
