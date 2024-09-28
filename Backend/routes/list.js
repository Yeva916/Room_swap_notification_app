
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

router.post('/senderList',async(req,res)=>{
    console.log(req.body)
    const clickedUSN = req.body.USN
    const currentUSN = req.body.currentUSN
    const rooms = getCollection('rooms');
    // const users = await rooms.find().toArray()

    const currentUser = await rooms.findOne({USN:currentUSN})
    console.log(currentUser)
    const clickedUser = await rooms.findOne({USN:clickedUSN})
    const currentUserCurrentRoommate = await rooms.find({
        "New Room\rNo": {
            " Alloted": currentUser["New Room\rNo"][" Alloted"]
        },
        "USN": {
            $ne: currentUSN
        }
    }).toArray();
    const clickedUserCurrentRoommate = await rooms.find({
        "New Room\rNo": {
            " Alloted": clickedUser["New Room\rNo"][" Alloted"]
        },
        "USN": {
            $ne: clickedUSN
        }
    }).toArray();

    // const current=await rooms.findOne({USN:USN})
    // const prevRoommate = await rooms.find({
    //     "Present\rRoom No": {
    //         "": current["Present\rRoom No"][""]
    //     },
    //     "USN": {
    //         $ne: current.USN
    //     }

    // }).toArray();
    // const newRoommate = await rooms.find({
    //     "New Room\rNo": {
    //         " Alloted": current["New Room\rNo"][" Alloted"]
    //     },
    //     "USN": {
    //         $ne: current.USN
    //     }
    // }).toArray();
  const data = {
    "disRoommate":clickedUser,
    "myNewRoomate":currentUserCurrentRoommate,
    "disRoommateNewRoommate":clickedUserCurrentRoommate
  }
    res.send(data)
})
module.exports = router;