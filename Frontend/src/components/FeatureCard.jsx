import React from 'react'

const FeatureCard = ({card}) => {
    const { image, title, description } = card;
  return (
    <div className='flex flex-col gap-2'>
        <img src={image} alt={title} className='sm:w-12 w-6'/>
        <h3 className='lg:text-2xl md:text-xl sm:text-lg text-sm sm:font-bold'>{title}</h3>
        <p className='sm:flex hidden text-gray-700'>{description}</p>
    </div>
  )
}

export default FeatureCard