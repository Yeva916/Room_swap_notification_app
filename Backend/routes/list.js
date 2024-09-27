const router = require('express').Router();
const { getCollection } = require('../db')


router.get('/getList',async(req,res)=>{
    // const response = req.body;
    const rooms = getCollection('rooms');
    const User=[]
    const users = await rooms.find().toArray()
    users.forEach((name)=>{
        User.push(name)
    })
    res.send(User)
})

router.get('/distinct',async(req,res)=>{
//     const distinct = await rooms.distinct({
//         "New Room\rNo": " Alloted"

// })
const rooms = getCollection('rooms');
const user = await rooms.find().toArray()
const distinct = await rooms.distinct("New Room\rNo. Alloted")
const collection = []

distinct.forEach((room)=>{
   
    const roommates=[]
    user.forEach((name)=>{
        if(name["New Room\rNo"][" Alloted"]==room){
            roommates.push(name)
        }
    })
    collection.push(roommates)
})
// user.forEach((name)=>{

// })
// console.log(counter)
res.send(collection)
})

router.get('/test',async(req,res)=>{
    const rooms = getCollection('rooms');
    const distinct = await rooms.distinct("New Room\rNo. Alloted")
    res.send(distinct)
})

module.exports = router;