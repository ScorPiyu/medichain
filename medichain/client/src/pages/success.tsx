import React, { useEffect, useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const url = window.location.pathname;
  const encodedParts = url.split('/')[2]?.split('_') || [];
  const nav = useNavigate();
  const hasRun = useRef(false);

  // Decode the components
  const [date, time, name, mode, email, doctor] = encodedParts.map(decodeURIComponent);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Name:", name);
    console.log("Mode:", mode);
    console.log("Email:", email);
    console.log("Doctor:", doctor);

     let bookApt = async () => {
      let response = await fetch('http://localhost:5000/bookAppointment', {
        method : 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body : JSON.stringify({"date" : date, "time" : time, "name" : localStorage.getItem("name"), "mode" : mode, "email" : localStorage.getItem("email"), "id" : doctor})
      })
    }
    bookApt();
    alert(`Appointment request sent for ${date.slice(0,2)}/${date.slice(2,4)}/${date.slice(4)} at ${time.slice(0,2)}:${time.slice(2,4)}`);
  }, []);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-700 mb-2">🎉 Payment Successful!</h1>
      <p className="text-green-700">You can now go back.</p>
      <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800" onClick = {() => {nav("/dashboard/appointments")}}>Go back</button>
    
    </div>
  );
};

export default PaymentSuccess;
