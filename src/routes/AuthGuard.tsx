import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactElement;
}

/**
 * AuthGuard component that protects routes from unauthorized access.
 * If the user is not authenticated, they will be redirected to the login page.
 * @param {AuthGuardProps} props - The props for the AuthGuard.
 * @param {React.ReactElement} props.children - The child component to render if authenticated.
 * @returns {JSX.Element} The protected component or a redirect to the login page.
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default AuthGuard;