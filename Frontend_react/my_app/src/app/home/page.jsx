'use client'; // Mark as client-side

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Provider} from 'react-redux';
// import { usnSlice } from '../slice/usn'; 
import Home from '../components/home';
import Header from '../components/header';
import { store } from '../store';
import { useSocket } from '../lib/socketContext';
const port= process.env.NEXT_PUBLIC_PORT
const socket = io(`http://localhost:${port}`); // Connect to the server
// const socket = useSocket();
const HomePage = () => {
  // const socket=useSocket()
  console.log(socket)
  const [USN, setUSN] = useState(null);
  const searchParams = useSearchParams();
  // const activeUSN = useSelector((state) => state.usn.value);

  useEffect(() => {
    const usn = searchParams.get('USN');
    if (usn) {
      setUSN(usn)
      localStorage.setItem('USN',usn)
      // socket.emit('user_loggin',USN) 
    }
  }, [searchParams]);
  
  // Fetch data whenever USN changes
  useEffect(() => {
    
    if (USN) {
      console.log('Emitting user_loggin with USN:', USN);
      socket.emit('user_loggin', USN);
      socket.on('receive_form',async(data)=>{
        console.log(data)
      })
      
    }
    console.log('home:',USN)
  }, [USN]);

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
    <Provider store={store}>
    <Header />
    <Home USN={USN}/>
    </Provider>
    </div>
    
    </>
  );
};

export default HomePage;
