'use client';
import { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUSN } from "../slice/usn";


const port= process.env.NEXT_PUBLIC_PORT

const Home = (props)=>{
    const [user, setUser] = useState(null);
    const [prev, setPrev] = useState([]);
    const [new1, setNew1] = useState([]);
    const USN = props.USN;
    const dispatch = useDispatch()
    // console.log(USN)
    const fetchData = async () => {
        try {
          const response = await axios.post(`http://localhost:${port}/getdata`, { USN });
          setUser(response.data);
    
          const response1 = await axios.post(`http://localhost:${port}/getprevious`, { USN });
          setPrev(response1.data);
    
          const response2 = await axios.post(`http://localhost:${port}/getnew`, { USN });
          setNew1(response2.data);
          const response3 = await axios.post("http://localhost:5000/setUSN", { USN: USN });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };


      useEffect(() => {
        if (USN) {
          fetchData();
          dispatch(setUSN(USN))
        }
      }, [USN]);
      
      // Fetch data whenever USN changes
      return (
        // <div className="min-h-screen bg-gray-100 p-6">

        <>
          {/* Current User Section */}
          <section className="bg-white shadow-md rounded-lg p-6 my-4 flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-blue-600 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-20 w-20 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.75-2.04 4.75-4.75S14.7 2.5 12 2.5 7.25 4.54 7.25 7.25 9.3 12 12 12zm0 2.5c-4.24 0-7.75 2.24-7.75 5v1h15.5v-1c0-2.76-3.51-5-7.75-5z"/>
              </svg>
            </div>
            <div className="text-black text-2xl font-semibold">{user ? user["Names"] : 'Loading...'}</div>
            <div className="text-gray-600 text-lg">{user ? user["USN"] : ''}</div>
          </section>
    
          {/* Previous and New Roommates Section */}
          <section className="flex justify-between my-6">
            {/* Previous Roommates Section */}
            <div className="flex flex-col items-center w-1/2 pr-2">
              <h2 className="text-xl font-bold mb-4">Previous Roommates</h2>
              <div className="bg-gray-50 shadow-md rounded-lg p-4 w-full flex flex-col items-center">
                {prev.length > 0 ? (
                  prev.map((roommate, index) => (
                    <div key={index} className="border-b py-3 w-full text-center hover:bg-gray-100 transition duration-200">
                      <div className="text-black font-medium">{roommate["Names"]}</div>
                      <div className="text-gray-600">{roommate["USN"]}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No previous roommates found.</div>
                )}
              </div>
            </div>
    
            {/* New Roommates Section */}
            <div className="flex flex-col items-center w-1/2 pl-2">
              <h2 className="text-xl font-bold mb-4">New Roommates</h2>
              <div className="bg-gray-50 shadow-md rounded-lg p-4 w-full flex flex-col items-center">
                {new1.length > 0 ? (
                  new1.map((roommate, index) => (
                    <div key={index} className="border-b py-3 w-full text-center hover:bg-gray-100 transition duration-200">
                      <div className="text-black font-medium">{roommate["Names"]}</div>
                      <div className="text-gray-600">{roommate["USN"]}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No new roommates found.</div>
                )}
              </div>
            </div>
          </section>
          </>
       
      );

}
export default Home