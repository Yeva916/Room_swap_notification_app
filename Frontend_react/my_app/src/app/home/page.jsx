'use client'; // Mark as client-side

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import io from 'socket.io-client';
import Home from '../components/home';
const port= process.env.NEXT_PUBLIC_PORT
const socket = io(`http://localhost:${port}`); // Connect to the server

const HomePage = () => {

  const [USN, setUSN] = useState(null);
  const searchParams = useSearchParams();


  useEffect(() => {
    const usn = searchParams.get('USN');
    if (usn) {
      setUSN(usn)
      socket.emit('user_loggin',USN)
      
    }
  }, [searchParams]); // Fetch data whenever USN changes

  return (
    <Home USN={USN}/>
  );
};

export default HomePage;
