import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import Navpage from "./Navpage";
import SellNFT from "./MintNFT";
export default function Seller() {

return (
    <div>
        {/* <Navbar></Navbar> */}
        <SellNFT></SellNFT>
        {/* <Navbar2></Navbar2> */}
        {/* <Navpage></Navpage> */}
        {/* <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>             */}
    </div>
);

}