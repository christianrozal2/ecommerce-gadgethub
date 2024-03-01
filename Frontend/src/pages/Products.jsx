// import productsData from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Products(){

	const {user} = useContext(UserContext)

	// Checks to see if the mock data was captured
	// console.log(productsData);
	// console.log(productsData[0]);

	// State that will be used to store the products retrieved from the database
	const [products, setProducts] = useState([]);

	const fetchData = () => {

		// Allows to have a dynamic url depending whether the user that's logged in is an admin or not
		let fetchUrl = user.isAdmin === true ? `${REACT_APP_API_BASE_URL}/products/all` : `${REACT_APP_API_BASE_URL}/products/`

		// headers is included for both /products/all and /products/ to allow flexibility even if it is not needed
		fetch(fetchUrl, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			console.log(typeof data);

			// Sets the "products" state to map the data retrieved from the fetch request into several "ProductCard" component
			// If the data.message is not a string or equal to undefined it will set the products state with the products from fetch
			if(typeof data.message !== "string"){
				setProducts(data.products);
			} else {
				setProducts([]);
			}
		})
	}
	// Retrieves the products from the database upon initial render of the "Products" page component.
	useEffect(() => {

		fetchData();

	}, [])

	return(
		<>
			{
				(user.isAdmin === true) ?
					// Pass the fetchData as a props
					<AdminView productsData={products} fetchData={fetchData}/>

				:

					<UserView productsData={products} />
			}
		</>
		)
}