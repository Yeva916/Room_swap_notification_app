//need to use redux to get the current user usn and delete the get and set usn from the list.js

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
// import { socket } from "../socket";

// import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import Header from "./header";
import { useSelector } from "react-redux";
// import { useSocket } from "../lib/socketContext";
const port= process.env.NEXT_PUBLIC_PORT
const socket = io(`http://localhost:${port}`);
// const socket = useSocket();
const Lists = () => {
  // const socket= useSocket()
  const [users, setUsers] = useState([]);
  const [userUSN, setUserUSN] = useState("");
  const [distinct, setDistinct] = useState([]);
  // const [socket, setSocket] = useState(null);
// const socket = useSocket();
// const USN = ''
// const USN = useSelector((state)=>state.usn.activeUSN)

// console.log("USN:",USN)
  const listdata = async () => {
  
    
    
    const response = await axios.get("http://localhost:5000/getList");
    const list = response.data;

    setUsers(list);
    const distinct = await axios.get("http://localhost:5000/distinct");
    setDistinct(distinct.data);

    const response1 = await axios.get("http://localhost:5000/getUSN");
    setUserUSN(response1.data);
  };
  // useEffect(()=>{
  //   setSocket(socket)
  // },[socket])

  // Function to handle click, passing USN as an argument
  const HandleClick = async(USN) => {
    // console.log("hi")
    const response = await axios.post("http://localhost:5000/senderList", { currentUSN:userUSN,USN:USN });
    const data = response.data;
    // console.log(data)
    const clickedUser=data["disRoommate"].USN //desired roommate
    const newRoommateID=[]
    const clickedUserNewRoommateID=[]
    
    // console.log(currentUser)
    data["myNewRoomate"].forEach((name)=>{ //my new roomated
      newRoommateID.push(name.USN)
    })
    data["disRoommateNewRoommate"].forEach((name)=>{ //his new roomate
      clickedUserNewRoommateID.push(name.USN)
    })
    
    // previousRoommateID.forEach(async(USN)=>{
    //   const sendingData={"senderId":currentUser,"receiverId":USN,"message":"Roommate request pending."}
    //   // socket.emit("send_form",sendingData)
    //   socket.emit("send_form",sendingData)
    //   // console.log(sendingData)
    // })
    if (socket.connected) {
      //emit to derised roommate
      socket.emit("send_form", { senderId: userUSN, receiverId: clickedUser, message: "Roommate request pending." });
      newRoommateID.forEach(async (usn) => {
        const sendingData = {
          senderId: userUSN,
          receiverId:usn ,
          message: "Roommate request pending.",
        }; 
        socket.emit("send_form", sendingData);
      })
      clickedUserNewRoommateID.forEach(async (usn) => {
        // console.log(currentUser)
        const sendingData = {
          senderId: userUSN,
          receiverId:usn ,
          message: "Roommate request pending.",
        };
        
        // Emit the event only when the socket is connected
        socket.emit("send_form", sendingData);
        // console.log("Sending data via socket:", sendingData);
      });
    } else {
      console.error("Socket is not connected");
    }
    //to desired roommate
    
    
    // You can add more logic here to send requests or handle other actions
  };
  useEffect(()=>{
    console.log("localStorageUsn:",localStorage.getItem("USN"))
    const usn = localStorage.getItem("USN");
    console.log(usn)
    setUserUSN(usn)
    console.log('userusn:',userUSN)
  })
  useEffect(() => {
    // const USN = 
    // setUserUSN(localStorage.getItem("USN"));
    // console.log("localStorageUsn:",localStorage.getItem("USN"))
    listdata();
    
  }, []);

  return (
    <>
    <Header />
    <div className="m-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Current Roommates</h1>
      <section className="space-y-6">
        <div className="flex w-full bg-blue-600 text-white font-semibold justify-between p-4 rounded-lg shadow-md">
          <div>Name</div>
          <div>Current Room No</div>
          <div>Request</div>
        </div>

        {/* Map through distinct roommates */}
        {distinct.map((roommate, ind) => (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md" key={ind}>
            {roommate.map((names, index) => (
              <div
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition duration-300"
                key={index}
              >
                <div className="text-gray-700 font-medium">{names["Names"]}</div>
                <div className="text-gray-600">{names["New Room\rNo"][" Alloted"]}</div>
                <div>
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                    onClick={() => HandleClick(names["USN"])}
                  >
                    Send
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
    </>
  );
};

export default Lists;
