import React from 'react'
import TransferNFT from './TransferNFT';
import { map } from './MintNFT';

const User = () => {

  console.log(map);
  
  return (
      <div>
          <TransferNFT></TransferNFT>
    </div>
  )
}

export default User;