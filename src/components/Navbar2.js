import React,{useState} from 'react';
import './Navbar.css';
import logo from '../logo12.png';

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false);


  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={logo} alt="app logo getrich" />
      </div>
      <ul className='app__navbar-links'>
        <li className='p__opensans'><a href="#home">Home</a></li>
        <li className='p__opensans'><a href="#about">About</a></li>
        <li className='p__opensans'><a href="#menu">Menu</a></li>
        <li className='p__opensans'><a href="#awards">Awards</a></li>
        <li className='p__opensans'><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}; 

export default Navbar;
