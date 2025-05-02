import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirect to the main landing page
const Index = () => {
  console.log('Index component rendered, redirecting to root');
  return <Navigate to="/" replace />;
};

export default Index;