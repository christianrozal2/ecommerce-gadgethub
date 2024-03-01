import React from 'react'

const FeatureCard = ({card}) => {
    const { image, title, description } = card;
  return (
    <div className='flex flex-col gap-3'>
        <img src={image} alt={title} className='w-12'/>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <p>{description}</p>
    </div>
  )
}

export default FeatureCard