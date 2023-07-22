import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const location = useLocation();

  return (
    <>
      {isLoggedIn ? children : <Navigate to="/sign-in" state={{ from: location }} />}
    </>
  );
};

export default PrivateRoute;
