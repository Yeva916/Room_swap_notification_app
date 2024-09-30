'use client'
import { createContext, useContext, useEffect, useState } from "react";
import {io} from "socket.io-client";

// Create a context for the socket connection
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext); // Custom hook to use the socket context

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const port = process.env.NEXT_PUBLIC_PORT;
  // console.log("port:",port)
  // const socketInstance = io(`http://localhost:${port}`);
  // console.log(`http://localhost:${port}`)
  // console.log("socket_connection",socketInstance)
  // setSocket(socketInstance);
  useEffect(() => {
    if (!port) {
      console.error('Port is not defined');
      return;
    }},[])
  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(`http://localhost:${port}`);
    // console.log(`http://localhost:${port}`)
    // console.log("socket_connection",socketInstance)
    setSocket(socketInstance);

    // Handle connection established
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    // Cleanup on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
