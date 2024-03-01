import Swal from 'sweetalert2';
import Button from './Button';

export default function ArchiveProduct({ product, isActive, fetchData }) {

    const archiveToggle = (productId) => {
        fetch(`http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.message === 'Product archived successfully') {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully disabled'
                })
                fetchData();

            } else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'Error',
                    text: 'Please Try again'
                })
                fetchData();
            }
        })
    }

    const activateToggle = (productId) => {
        fetch(`http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.message === "Product activated successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully enabled'
                })
                fetchData();
            } else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'Error',
                    text: 'Please Try again'
                })
                fetchData();
            }
        })
    }

    return (
        <>
            {isActive ?
                <Button label='Archive' color='red'  onClick={() => archiveToggle(product)} />
                :
                <Button label='Activate' color='green'  onClick={() => activateToggle(product)} />
            }
        </>
    )
}
