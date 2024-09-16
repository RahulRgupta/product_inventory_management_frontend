// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });


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
      const response = await axios.post('https://productinventory.vercel.app/register', formData);
      const data = response.data;
      console.log(response)
      if (data.success) {
        alert('Registration successful!');
        navigate('/login')
      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };
  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
        <div className='w-full max-w-md'>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className=" flex items-center justify-center text-2xl mb-4 ">Register</h2>
      <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 w-full border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 w-full border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg">
        Register
      </button>
      <div className='mt-2'>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg"
      onClick={handleGoToLogin}
      >
        Login
      </button>
      </div>
    
      
    </form>
    </div>
    </div>
  );
}
