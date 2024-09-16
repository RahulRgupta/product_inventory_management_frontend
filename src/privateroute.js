import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element }) => {
  // Check if oauth flag is set and token exists
  const isAuthenticated = Cookies.get('token');

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
