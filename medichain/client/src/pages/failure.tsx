import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-red-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-700 mb-2">❌ Payment Failed</h1>
      <p className="text-red-700">Something went wrong. Please try again later.</p>
      {/* <Link to="/payment" className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
        Try Again
      </Link> */}
    </div>
  );
};

export default PaymentFailed;
