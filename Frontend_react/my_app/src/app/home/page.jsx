
'use client'; // Mark as client-side

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
const HomePage = () => {
  // Retrieve the email from the query string
  const [user,setUser]=useState('')
  const [prev,setPrev]=useState([])
  const [new1,setNew1]=useState([])
  // const [username,setUsername]=useState('')
  // const [prevname,setPrevname]=useState([])
  // const [newname,setNewname]=useState([])
  const [searchParams] = useSearchParams();

  const USN = searchParams[1]
  const fetchData = async()=>{
    const response = await axios.post('http://localhost:5000/getdata',{"USN":USN})
    setUser(response.data)
    const response1 = await axios.post('http://localhost:5000/getprevious',{"USN":USN})
    setPrev(response1.data)
    const response2 = await axios.post('http://localhost:5000/getnew',{"USN":USN})
    setNew1(response2.data)
  }

  // fetchData()
// const nameCollection = ()=>{
//   console.log("hi")
//   console.log(user.Names)
//   setUsername(user.Names)
//   // console.log(name1)
//   // setUsername(user["Names"])
//   prev.forEach((name)=>{
//     setPrevname(name["Names"])  
//   })
//   // prev.forEach((name)=>{
//   //   setPrevname(name["Names"])  
//   // })
//   new1.forEach((name)=>{
//     setNewname(name["Names"])  
//   })
// }


// nameCollection()



useEffect(()=>{
  // pk()
fetchData();
// nameCollection()
},[])


const pk= ()=>{
  console.log("hi")
}
// console.log("user:",user)
// console.log("prev:",prevname)
// console.log("new1:",newname)


  return (
    <div>
      <header>
        <div className=' bg-black flex justify-between p-2  rounded-full'>
          <div className=' text-white'>logo</div>
          <div className=' text-white'>Notification</div>
          
        </div>
      </header>
      <section className=' grid grid-cols-3 bg-pink-700 h-full py-4 mt-4'>
        <div className=' flex items-center justify-center'>
          <div className=' flex flex-col items-center justify-center'>
            <div className=' h-20 w-20 rounded-full bg-red-600'></div>
            {/* {prev.forEach((name)=>{
              console.log(name["Names"])
              return(<div className=' text-black'>{name["Names"]}</div>)
            })} */}
                    {prev.map((name, index) => (
          <div key={index} className='text-black'>
            {name["Names"]}
          </div>
        ))}

          </div>
        </div>
        <div className=' flex text-black items-center justify-center'> {user["Names"]}</div>
        <div className='flex items-center justify-center'>
        <div className=' flex flex-col items-center justify-center'>
            <div className=' h-20 w-20 rounded-full bg-red-600'></div>
            {new1.map((name, index) => (
          <div key={index} className='text-black'>
            {name["Names"]}
          </div>
        ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;