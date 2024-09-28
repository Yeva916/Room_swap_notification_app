"use client";
import Image from "next/image";
import LoginPage from "./login/page";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { socket } from "./socket";
import { useEffect, useState } from "react";
export default function Home() {

  // const [isConnected,setIsConnected]=useState(false);
  // const [transport,setTransport]=useState(null);


  
  // function onConnect() {
  //   setIsConnected(true);
  //   setTransport(socket.io.engine.transport.name);

  //   socket.io.engine.on("upgrade", (transport) => {
  //     setTransport(transport.name);
  //   });
  // }

  // function onDisconnect() {
  //   setIsConnected(false);
  //   setTransport("N/A");
  // }
  // useEffect(()=>{
  //   if(socket.connected){
  //     onConnect();
  //   }
  // })
  return (
    <>
    <LoginPage/>
    </>
  );
}
