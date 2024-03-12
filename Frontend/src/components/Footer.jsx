import React from 'react'
import { top } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-0 flex sm:flex-row flex-col items-center justify-between text-center sm:text-base text-sm'>
        <div className='flex sm:flex-row flex-col gap-3 text-white items-center justify-center'>
            <p>&copy;  2024 Gadget Hub</p>
            <p className='sm:flex hidden'>|</p>
            <p>All rights reserved.</p>
        </div>
        <a href='#top' className='flex gap-2 items-center justify-center sm:mt-0 mt-3 group'>
          <p className='text-white group-hover:text-gray-300'>Back to top</p>
          <img src={top} alt="back-to-top" className='size-5'/>
        </a>
    </div>
  )
}

export default Footer