import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import FeaturedProducts from '../components/FeaturedProducts';
import { features } from '../constants/constants';
import Button from '../components/Button'
import { deal, reg } from '../assets/assets';
import { useEffect, useState } from 'react';


export default function Home(){
	const [countDownDate, setCountDownDate] = useState(new Date('2024-03-19')); // Set your target date here

  const getTimeRemaining = () => {
    const now = new Date();
    const difference = countDownDate.getTime() - now.getTime();

    const seconds = Math.floor(difference / 1000) % 60;
    const minutes = Math.floor(difference / 1000 / 60) % 60;
    const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

	return (
		<div className='container px-0 lg:mt-20 sm:mt-16 mt-12'>
			<div className='bg-container flex backgroundImage2 lg:py-44 md:py-40 sm:py-24 ss:py-24 py-16 rounded-md'>
				<div className='flex flex-col gap-5 justify-center lg:px-28 md:px-24 sm:px-12 px-10 md:max-w-[70%]'>
					<h1 className='lg:text-6xl md:text-5xl text-4xl font-bold'>Unleash Innovation <br/> in Every Byte</h1>	
					<p className='lg:text-3xl sm:text-2xl text-xl text-gray-900'>Explore a World of Cutting-Edge Tech</p>
					<Link to='/products' className='mt-5'>
						<Button label='Shop Now' />
					</Link>
					
				</div>
			</div>
			<div className='lg:mt-36 md:mt-24 sm:mt-16 mt-12'>
				<div className='flex sm:flex-row flex-col justify-between'>
					<h2 className='md:text-3xl sm:text-2xl text-xl font-bold mb-5 uppercase'>Featured Products</h2>
					<Link to='/products'>
						<p className='md:text-xl sm:text-lg text-base text-gray-900 hover:text-gray-400'>Show all</p>
					</Link>
				</div>
				<FeaturedProducts />
			</div>
				
			<div className='lg:mt-36 md:mt-24 sm:mt-16 mt-12 flex sm:flex-row flex-col gap-10'>
				<div className='md:w-[60%] sm:w-[50%]'>
					<h2 className='md:text-3xl sm:text-2xl text-xl font-bold mb-5 uppercase'>Deals of the Month</h2>
					<p className='md:text-xl text-base text-gray-900'>
						Discover unbeatable savings on the latest tech essentials, from smartphones and laptops to smart home devices and more. Each month, we handpick a selection of top-quality gadgets at discounted prices, so you can stay ahead of the curve without breaking the bank. Don't miss out on these exclusive offers – shop now and upgrade your tech game for less!
					</p>

					<div className="flex lg:gap-10 ss:gap-3 gap-1 mt-10 text-center">
						<div className="flex flex-col lg:text-3xl text-lg font-bold border lg:px-6 lg:py-4 px-3 py-2 items-center justify-center">{timeRemaining.days} <span className="lg:text-lg text-xs font-normal text-gray-900">Days</span></div>
						<div className="flex flex-col lg:text-3xl text-lg font-bold border lg:px-6 lg:py-4 px-3 py-2 items-center justify-center">{timeRemaining.hours} <span className="lg:text-lg text-xs font-normal text-gray-900">Hours</span></div>
						<div className="flex flex-col lg:text-3xl text-lg font-bold border lg:px-6 lg:py-4 px-3 py-2 items-center justify-center">{timeRemaining.minutes} <span className="lg:text-lg text-xs font-normal text-gray-900">Minutes</span></div>
						<div className="flex flex-col lg:text-3xl text-lg font-bold border lg:px-6 lg:py-4 px-3 py-2 items-center justify-center">{timeRemaining.seconds} <span className="lg:text-lg text-xs font-normal text-gray-900">Seconds</span></div>
					</div>

					<div className='mt-10'>
						<Link to='/products'>
							<Button label='View Products' />
						</Link>
					</div>
				</div>

				<img src={deal} alt="deal" className='md:size-[60%] sm:size-[50%] size-full'/>

			</div>

		</div>
	)
}