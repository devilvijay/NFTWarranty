import React from 'react';
import './App.css';
// import Navbar from './components/Navbar.js';
// import Marketplace from './components/Marketplace';
// import Profile from './components/Profile';
// import SellNFT from './components/SellNFT';
// import NFTPage from './components/NFTpage';
import Seller from './components/Seller';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Homepage from "./components/Homepage.js";
import Navbar from './components/Navbar';
const App =()=> {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/warranty" element={<Seller/>}/>  
        </Routes>
    </div>
  );
}

export default App;
