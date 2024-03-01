import { Link } from 'react-router-dom';

export default function Banner({data}){

	console.log(data);
	const {title, content, destination, label} = data
	
	return (
		<div className="container bg-secondary"> 
			<div className="p-5 text-center flex flex-col items-center"> 
				<h1 className="text-2xl font-bold">{title}</h1> 
				<p className="text-gray-600">{content}</p> 
				<Link to={destination} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					{label}
				</Link>
			</div>
		</div>

	)
}