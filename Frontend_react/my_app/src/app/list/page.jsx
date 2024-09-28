'use client';

import axios from "axios"
import Lists from "../components/lists";

const { useState, useEffect } = require("react")

const List= ()=>{
    const [users,setUsers]= useState([])
    const listdata = async()=>{
        // console.log('hi')
        const response = await axios.get('http://localhost:5000/getList')
        const list = response.data
        
        // list.forEach(element => {
        //     setUsers(element)
        // });
        setUsers(list)

    }
    useEffect(()=>{
        listdata()
    },[])
    return (  
        <Lists/>

    //   <div className="">
    //     <ul className=" ">
    //     {users.map((names,index)=>(
    //         <li key={index} className=" text-black">{names["Names"]}</li>
    //     ))}
    //     </ul>
    //   </div>
    )
}

export default List