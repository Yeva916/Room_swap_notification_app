const router = require('express').Router();
const db = require('../db');

const rooms = db.collection('rooms');
router.post('/willing',async(req,res)=>{
    const response = req.body;
    // console.log(req.body)
    const user = await db.collection('rooms').findOne({USN:response.USN});
    if(response.willing === 'yes'){
        const willing = await db.collection('rooms').updateOne({USN:response.USN},{$set:{willing:'yes'}});
        res.send(user)
    }if(response.willing === 'no'){
        const willing = await db.collection('rooms').updateOne({USN:response.USN},{$set:{willing:'no'}});
        res.send(user)
    }

})

// const newRoommate = await rooms.find({
//     "New Room\rNo": {
//         " Alloted": user["New Room\rNo"][" Alloted"]
//     },
//     "USN": {
//         $ne: user.USN
//     }
// }).toArray();
router.post('/getdata',async(req,res)=>{
    const USN = req.body.USN.toUpperCase();
    const user = await rooms.findOne({USN:USN}); 
    
    res.send(user)
})

router.post('/getprevious',async(req,res)=>{
    const USN = req.body.USN.toUpperCase();
    const user = await rooms.findOne({USN:USN}); 
    const prevRoommate = await rooms.find({
        "Present\rRoom No": {
            "": user["Present\rRoom No"][""]
        },
        "USN": {
            $ne: user.USN
        }
    }).toArray();
    res.send(prevRoommate)
})

router.post('/getnew',async(req,res)=>{
    const USN = req.body.USN.toUpperCase();
    const user = await rooms.findOne({USN:USN}); 
    const newRoommate = await rooms.find({
        "New Room\rNo": {
            " Alloted": user["New Room\rNo"][" Alloted"]
        },
        "USN": {
            $ne: user.USN
        }
    }).toArray();
    res.send(newRoommate)
})


module.exports = router;