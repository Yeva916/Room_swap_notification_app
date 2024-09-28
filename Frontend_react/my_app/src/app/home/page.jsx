'use client'; // Mark as client-side

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Home from '../components/home';
import Header from '../components/header';
const port= process.env.NEXT_PUBLIC_PORT
const socket = io(`http://localhost:${port}`); // Connect to the server

const HomePage = async() => {
  // const socket=useSocket()

  const [USN, setUSN] = useState(null);
  const searchParams = useSearchParams();
  

  useEffect(() => {
    const usn = searchParams.get('USN');
    if (usn) {
      setUSN(usn)
      // socket.emit('user_loggin',USN) 
    }
  }, [searchParams]);
  
  // Fetch data whenever USN changes
  useEffect(() => {
    if (USN) {
      console.log('Emitting user_loggin with USN:', USN);
      socket.emit('user_loggin', USN);
    }
  }, [USN]);

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
    <Header/>
    <Home USN={USN}/>
    </div>
    
    </>
  );
};

export default HomePage;
