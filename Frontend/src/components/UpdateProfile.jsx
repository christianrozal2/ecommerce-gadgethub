import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from './Button'


const UpdateProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    const fetchProfile = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
    
        const data = await response.json();
        console.log('User Data: ', data)
    
        if (response.ok) {
          setUserProfile(data);
        } else {
          console.error(`Error: ${data.message}`);
        }
      };

      useEffect(() => {
        fetchProfile();
      }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/details`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                firstName,
                lastName,
                mobileNo
            })
        });

        const data = await response.json();

        if (response.ok) {
      Swal.fire('Success', 'Profile updated successfully', 'success');
      fetchProfile(); // Fetch the updated profile here
    } else {
      Swal.fire('Error', `Error: ${data.message}`, 'error');
    }
    };

    return (
        <div className=''>
          <h3 className='text-2xl font-bold'>Personal Information</h3>
            <form className="mt-10">
                <div className="flex flex-col">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        className="border rounded-md w-full p-3 mt-3"
                        id="firstName"
                        value={firstName}
                        placeholder='Taylor'
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        className="border rounded-md w-full p-3 mt-3"
                        id="lastName"
                        value={lastName}
                        placeholder='Swift'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="mobileNo">Mobile Number:</label>
                    <input
                        type="text"
                        className="border rounded-md w-full p-3 mt-3"
                        id="mobileNo"
                        value={mobileNo}
                        placeholder='09123456789'
                        onChange={(e) => setMobileNo(e.target.value)}
                    />
                </div>
                <Button label='Update Profile' onClick={handleSubmit} className='mt-7' />
            </form>
        </div>
    );
}

export default UpdateProfile;
