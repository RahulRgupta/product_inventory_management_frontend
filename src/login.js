// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [serverError, setServerError] = useState('');


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

   const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('https://productinventory.vercel.app/login', formData);
      const { token } = response.data;
      if (token) {
        // Store the token in a cookie
        Cookies.set('token', token, { expires: 1 }); // Cookie expires in 1 day
        alert('Login successful!');
        navigate('/ProductTable'); // Redirect to the ProductTable page
      } else {
        setServerError('Invalid credentials'); // Handle cases where no token is returned
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle invalid credentials error
        setServerError('Invalid email or password.');
      } else {
        console.error('Error logging in user:', error);
        setServerError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleGoToRegister = () => {
    navigate('/');
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
        <div className='w-full max-w-md'>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="flex items-center justify-center text-2xl mb-4">Login</h2>
      {serverError && <p className="text-red-500 text-sm mt-1 text-center">{serverError}</p>}
     <div className='mt-4'>
     <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="mb-4 p-2 w-full border rounded"
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
     </div>
     
     <div className='mt-4'>
     <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="mb-4 p-2 w-full border rounded"
      />
     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
     </div>
      
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg">
        Login
      </button>
      <div className='mt-2'>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg"
      onClick={handleGoToRegister}
      >
        Register
      </button>
      </div>
    </form>
    </div>
    </div>
  );
}
