import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { p1 } from '../assets/assets';

export default function ProductCard({ productProp }) {
  const { _id, name, description, price } = productProp;

  return (
    <Link to={`/products/${_id}`} className="group"> 
      <div className="bg-container rounded-md lg:p-7 md:p-5 sm:p-3 ss:p-10 p-3 mt-5 group-hover:bg-gray-300 transition-colors duration-300">
          <img src={p1} alt="p1" />
      </div>
      <div className='mt-3'>
          <h2 className="sm:text-lg text-base font-semibold max-w-full truncate">{name}</h2>
          <p className="text-sm max-w-full truncate text-gray-900">{description}</p>
          <p className="sm:text-lg text-base font-bold text-orange-500">₱{price}.00</p>
      </div>
  </Link>

  );
}

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired, // Add image prop to propTypes
  })
};
