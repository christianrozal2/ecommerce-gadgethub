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
		<div className='container px-0 mt-20'>
			<div className='bg-container flex p-10 backgroundImage2 h-[600px] rounded-md'>
				<div className='flex flex-col gap-5 justify-center lg: pl-20'>
					<h1 className='text-6xl font-bold'>Unleash Innovation<br />
						in Every Byte</h1>
					<p className='text-3xl'>Explore a World of Cutting-Edge Tech</p>
					<Link to='/products' className='mt-5'>
						<Button label='Shop Now' />
					</Link>
					
				</div>
			</div>
			<div className='mt-36'>
				<div className='flex justify-between'>
					<h2 className='text-3xl font-bold mb-5 uppercase'>Featured Products</h2>
					<Link to='/products'>
						<p className='text-xl text-gray-700 hover:text-gray-400'>Show all</p>
					</Link>
				</div>
				<FeaturedProducts />
			</div>
				
			<div className='mt-36 flex gap-10'>
				<div className='w-[60%]'>
					<h2 className='text-3xl font-bold uppercase'>Deals of the Month</h2>
					<p className='text-lg mt-10'>
						Discover unbeatable savings on the latest tech essentials, from smartphones and laptops to smart home devices and more. Each month, we handpick a selection of top-quality gadgets at discounted prices, so you can stay ahead of the curve without breaking the bank. Don't miss out on these exclusive offers – shop now and upgrade your tech game for less!
					</p>

					<div className="flex gap-10 mt-10 text-center">
						<div className="flex flex-col text-3xl font-semibold border px-6 py-4">{timeRemaining.days} <span className="text-lg font-normal">Days</span></div>
						<div className="flex flex-col text-3xl font-semibold border px-6 py-4">{timeRemaining.hours} <span className="text-lg font-normal">Hours</span></div>
						<div className="flex flex-col text-3xl font-semibold border px-6 py-4">{timeRemaining.minutes} <span className="text-lg font-normal">Minutes</span></div>
						<div className="flex flex-col text-3xl font-semibold border px-6 py-4">{timeRemaining.seconds} <span className="text-lg font-normal">Seconds</span></div>
					</div>

					<div className='mt-10'>
						<Link to='/products'>
							<Button label='View Products' />
						</Link>
					</div>
				</div>
				<div>
					<img src={deal} alt="deal" />
				</div>
			</div>

		</div>
	)
}