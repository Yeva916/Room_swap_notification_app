const express = require('express');
const db = require('./db'); // Database module
const http = require('http');
const { Server } =require('socket.io')
const login = require('./routes/login');
const home = require('./routes/home');
const list = require('./routes/list');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { Socket } = require('dgram');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",//need to change while deploying
    }
})
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());






// Connect to the database before starting the server
db.connectDB()
    .then(() => {
        // Use routes only after successful connection
        app.use("/", login);
        app.use("/", home);
        app.use("/",list)

        const userOnline= new Map()
        io.on('connection',(socket)=>{
            console.log('a user connected:',socket.id);
            
            socket.on('user_loggin',(userId)=>{
                console.log(userId)
                userOnline.set(userId,socket.id)

                const pendingNotification = db.getCollection('notifications').find({receiverId:userId,status:'pending'}).toArray()
                pendingNotification.then((notification)=>{
                    notification.forEach((notification)=>{
                        io.to(socket.id).emit('receive_form',notification)

                        db.getCollection('notifications').upadateOne({
                            _id:notification._id
                        },{
                            $set:{
                                status:'received'
                            }
                        })
                    })
                })
                // if(pendingNotification){
                //     pendingNotification.forEach((notification)=>{
                //         io.to(socket.id).emit('receive_form',notification)
    
                //         db.getCollection('notifications').upadateOne({
                //             _id:notification._id
                //         },{
                //             $set:{
                //                 status:'received'
                //             }
                //         })
                //     })
                // }

                

            })
            socket.on('send_form',async(data)=>{
                const {senderId,receiverId,message}=data
                const receiver_socket_id =userOnline.get(receiverId)

                if(receiver_socket_id){
                    io.to(receiver_socket_id).emit('receive_form',{senderId,message})
                }else{
                    await db.getCollection('notifications').insertOne({
                        senderId,
                        receiverId,
                        message,
                        status:'pending',
                        createdAt:new Date()
                    })
                }

            })

            socket.on('disconnect',()=>{
                for (let [userId,socketId] of userOnline.entries()){
                    if(socketId==socket.id){
                        userOnline.delete(userId);
                        break;
                    }
                }
            })
        })

        // Start the server
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the process if DB connection fails
    });
