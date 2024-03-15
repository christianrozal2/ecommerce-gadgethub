import React, { useEffect, useState } from 'react';
import Button from './Button'


const UpdateProfile = ({setDetails}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if all fields are filled in
      if (!firstName || !lastName || !mobileNo) { 
        setMessage('Please fill in all fields');
        return;
     }

      // Check if mobile number meets length requirement
      if (mobileNo.length !== 11) {
        setMessage('Mobile number invalid');
        return;
      }
      
    
      try {
        console.log('Mobile number submitted:', mobileNo);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/update-profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            newFirstName: firstName,
            newLastName: lastName,
            newMobileNo: mobileNo
          })
        });
    
        if (response.ok) {
          setMessage('Profile updated successfully');
          setFirstName('');
          setLastName('');
          setMobileNo('');

          // Update details in Profile component
          setDetails((prevDetails) => ({
            ...prevDetails,
            firstName: firstName, 
            lastName: lastName
        })); 

        } else {
          const errorData = await response.json();
          setMessage(errorData.message);
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
        console.error(error);
      }
    };
      

    return (
        <div className=''>
          <h3 className='text-2xl font-bold'>Personal Information</h3>
            <form className="md:mt-10 mt-5">
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
                {message && (
                  <div
                    className={`mt-7 p-4 rounded ${
                      message.includes('success')
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {message}
                  </div>
                )}
                <Button label='Update Profile' onClick={handleSubmit} className='mt-7' />
            </form>
        </div>
    );
}

export default UpdateProfile;
