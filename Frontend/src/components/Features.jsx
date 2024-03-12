import React from 'react'
import { features } from '../constants/constants'
import FeatureCard from './FeatureCard'

const Features = () => {
  return (
    <div className='lg:mt-36 md:mt-24 sm:mt-16 mt-12 md:px-14 sm:px-12 px-6'>
        <div className='container px-0 sm:py-20 py-12'>
            <div className='flex gap-3 justify-between'>
            {features.map ((index) =>
                <FeatureCard key={index.id} card={index} />
            )}
            </div>
        </div>
    </div>
  )
}

export default Features