"use client";
import { useEffect, useState } from 'react';
// import { useSocket } from '../lib/socketContext';
// import { socket } from '../socket';
import { io } from 'socket.io-client';
const port= process.env.NEXT_PUBLIC_PORT
const socket = io(`http://localhost:${port}`);

const Notification = () => {
    // const socket= useSocket()
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy notification data for demonstration
  const notifications = [
    { id: 1, message: "You have a new message!" },
    { id: 2, message: "Roommate request pending." },
    { id: 3, message: "New room allotted." }
  ];

useEffect(()=>{
  socket.on('receive_form',async(data)=>{
    console.log(data)
  })
  return ()=>{
    socket.off('receive_form')
  }
})

  const handleBellClick = () => {
    
    setShowNotifications(!showNotifications); // Toggle notification list visibility
  };

  return (
    <div className=" relative">
      {/* Notification bell icon */}
      <button onClick={handleBellClick} className="relative focus:outline-none ">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill cursor-pointer" viewBox="0 0 16 16">
      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"
      />
    </svg> {/* Bootstrap bell icon */}
        {/* Badge for number of notifications */}
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
        )}
      </button>

      {/* Notification List */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
          <ul className="p-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id} className="py-2 border-b">
                  {notification.message}
                </li>
              ))
            ) : (
              <li className="py-2">No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;

