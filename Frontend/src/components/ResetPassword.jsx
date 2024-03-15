import React, { useState } from 'react';
import Button from './Button';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if password meets length requirement
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/update-password`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (response.ok) {
        setMessage('Password updated successfully');
        setPassword('');
        setConfirmPassword('');
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
    <div className="">
      <h2 className='text-2xl font-bold'>Reset Password</h2>
      <form>
        <div className="flex flex-col md:mt-10 mt-5">
          <label htmlFor="password">
            New Password
          </label>
          <input
            type="password"
            className="border rounded-md w-full p-3 mt-3"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            className="border rounded-md w-full p-3 mt-3"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
        <Button label='Update Password' onClick={handleResetPassword} className='mt-7' />
      </form>
    </div>
  );
};

export default ResetPassword;
