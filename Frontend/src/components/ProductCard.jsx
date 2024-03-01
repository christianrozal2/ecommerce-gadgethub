import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { p1 } from '../assets/assets';

export default function ProductCard({ productProp }) {
  const { _id, name, description, price } = productProp;

  return (
    <Link to={`/products/${_id}`} className="group"> 
    <div className="bg-container rounded-md p-7 mt-5 group-hover:bg-gray-300 transition-colors duration-300">
        <img src={p1} alt="p1" />
    </div>
    <div className='mt-3'>
        <h2 className="text-lg font-semibold max-w-full truncate">{name}</h2>
        <p className="text-sm max-w-full truncate">{description}</p>
        <p className="text-lg font-bold text-orange-500">₱{price}.00</p>
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
