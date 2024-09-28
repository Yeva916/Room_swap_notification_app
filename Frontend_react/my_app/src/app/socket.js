"use client";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3000",{
    transports: ["websocket","polling"], // Try WebSocket first, fall back to polling
    autoConnect: false,  // Don't auto-connect to prevent premature connections
  }); // Connect to the server