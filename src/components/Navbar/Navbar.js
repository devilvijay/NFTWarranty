// import logo from '../logo_3.png';
import logo12 from '../logo12.png';
//import '../App.css';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from 'react-router-dom';
import {
    useEffect,
    useState,
} from 'react';
import { useLocation } from 'react-router';
import

    function Navbar() {
        return (
            // <div className='navbar'>
            //   <div className='navbar-logo-head'>
            //     <Link to='/'>
            //     <div className='navbar-logo'>
            //       <img src={logo12} alt="logo" className='logo-img'></img>
            //         <div className='navbar-heading'> NFT WARRANTY</div>
            //       </div>
            //     </Link>
            //   </div>
            // </div>

            <div className="Navbar " >
                <div className="Navbar-logo-head" >
                    <div className="flex items-end ml-5 pb-2" >
                        <Link to="/Seller" >
                            <div className="navbar-logo-img" >
                                <img src={
                                    logo12
                                }
                                    alt=""
                                    width={
                                        120
                                    }
                                    height={
                                        120
                                    }
                                    className="inline-block -mt-2" />
        
                            </div>
                            <div className="nav-heading" >
                                NFT Warranty
                            </div>
                        </Link >
                    </div>
                    <div className="w-2/6" >
                        <div className="lg:flex justify-between font-bold mr-10 text-lg" >
                            <div className="border-b-2 hover:pb-0 p-2" >
                                <label className="contract-add" > {' '}
                                    Warranty Contract Address
                                </label>
                            </div >
                            <div >
        
                                <label className="curr-add" >
                                    Current Address
                                </label>
                            </div >

                            <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" >
                                Disconnect
                            </button>
                        </ div>
                    </div>
                </div>
            </div>
        );

    }
export default Navbar;