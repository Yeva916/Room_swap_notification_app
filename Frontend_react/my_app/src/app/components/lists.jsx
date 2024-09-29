
import { useState,useEffect } from "react"
import axios from "axios"

const Lists =()=>{
    const [users,setUsers]= useState([])
    const [distinct,setDistinct] = useState([])
    const listdata = async()=>{
        console.log('hi')
        const response = await axios.get('http://localhost:5001/getList')
        const list = response.data
        
        // list.forEach(element => {
        //     setUsers(element)
        // });
        setUsers(list)
        const distinct = await axios.get('http://localhost:5001/distinct')
        setDistinct(distinct.data)
        // console.log(users)

    }
    useEffect(()=>{
        listdata()
    },[])
    return(
        <div className=" m-10 p-24 bg-white rounded-lg shadow-lg">
            <h1 className=" font-semibold text-2xl text-black text-center mb-6">Current roomates</h1>

            <section>
               <div className="flex w-full bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg rounded-lg text-white">
                  <div className="flex-1 font-bold text-lg ">Name</div>
                  <div className="flex-1 font-bold text-lg text-center">Current Room No</div>
                  <div className="flex-1 font-bold text-lg text-right">Request</div>
                </div>


                {distinct.map((roommate,ind)=>(
                    <>
                    <div className=" m-3 p-4 bg-white rounded-lg shadow-lg" key={ind}>
                         {roommate.map((names, index) => (
                            <div className="flex w-full justify-between items-center p-3 hover:bg-gray-100 transition duration-200" key={index}>
                                <div className="flex-1 text-lg text-gray-700">{names["Names"]}</div>
                                <div className="flex-1 text-lg text-gray-700 text-rigt">{names["New Room\rNo"][" Alloted"]}</div>
                                <div>
                                    <button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition duration-200">Send</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                ))}
                
            </section>
        </div>
    )
}

export default Lists