
import { useState,useEffect } from "react"
import axios from "axios"

const Lists =()=>{
    const [users,setUsers]= useState([])
    const [distinct,setDistinct] = useState([])
    const listdata = async()=>{
        console.log('hi')
        const response = await axios.get('http://localhost:5000/getList')
        const list = response.data
        
        // list.forEach(element => {
        //     setUsers(element)
        // });
        setUsers(list)
        const distinct = await axios.get('http://localhost:5000/distinct')
        setDistinct(distinct.data)
        // console.log(users)

    }
    useEffect(()=>{
        listdata()
    },[])
    return(
        <div className=" m-3">
            <h1 className=" font-extrabold text-lg">Current roomates</h1>
{/*  
            <div className=" grid grid-cols-3">


            <div className=" flex justify-center items-center">
                <div>Names</div>
                {}
            </div>

            <div className=" flex justify-center items-center">
            <div>Current Room No</div>
            </div>
       
            <div className="flex justify-center items-center">
            <div>Request</div>
            </div>
            </div> */}
            <section>
                <div className=" flex w-full bg-red-600 justify-between">
                    <div>Name</div>
                    <div>Current Room No</div>
                    <div>Request</div>
                </div>
                {distinct.map((roommate,ind)=>(
                    <>
                    <div className=" border-pink-700 border-b-2" key={ind}>
                        {roommate.map((names,index)=>(
                            <div className=" flex w-full justify-between" key={index}>
                                <div>{names["Names"]}</div>
                                <div>{names["New Room\rNo"][" Alloted"]}</div>
                                <div><button className=" bg-yellow-700 rounded-sm">Send</button></div>
                                
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