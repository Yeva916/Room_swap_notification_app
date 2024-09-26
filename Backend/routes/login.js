const router = require('express').Router();
const db = require('../db');

const rooms = db.collection('rooms');
router.post('/login',async(req,res)=>{
    const User=[]
    const USN = req.body.USN.toUpperCase();
    const user = await rooms.findOne({USN:USN}); 
    // const prevRoommate = await rooms.find({
    //     "Present\rRoom No": {
    //         "": user["Present\rRoom No"][""]
    //     },
    //     "USN": {
    //         $ne: user.USN
    //     }
    // }).toArray();
    // const newRoommate = await rooms.find({
    //     "New Room\rNo": {
    //         " Alloted": user["New Room\rNo"][" Alloted"]
    //     },
    //     "USN": {
    //         $ne: user.USN
    //     }
    // }).toArray();
    // console.log("prevRoommate",prevRoommate)
    // console.log("newRoommate",newRoommate)

    const roommates = await rooms.find({
        $or:[
            {
                "Present\rRoom No": {
                    "": user["Present\rRoom No"][""]
                },
                // "USN": {
                //     $ne: user.USN
                // }
            },
            {
                "New Room\rNo": {
                    " Alloted": user["New Room\rNo"][" Alloted"]
                },
                "USN": {
                    $ne: user.USN
                }
            }

        ]
    }).toArray();
    // console.log(user["PresentRoom No"][""])
    console.log(roommates)
    
    res.send(roommates)
    // console.log(user["Present\rRoom No"][""])
    // console.log(user["New Room\rNo"][" Alloted"])
})

module.exports = router;

// need to add try and catch block for error handling
// here i am sending the data to the frontend in the format fo json object:
// ex:
// {
//     "_id": "66f46d5468d67b6a41ba330d",
//     "Sl": {
//         "\rNo": {
//             "": 65
//         }
//     },
//     "Present\rRoom No": {
//         "": "FB-219"
//     },
//     "USN": "1MS23AI072",
//     "Names": "Yeshwant I Kuriyavar",
//     "Sem": "III",
//     "Branch": "AI",
//     "New Room\rNo": {
//         " Alloted": "F-31"
//     },
//     "Amount": "73,000"
// }
