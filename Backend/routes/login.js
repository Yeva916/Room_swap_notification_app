const router = require('express').Router();
const db = require('../db');

const rooms = db.collection('rooms');
router.get('/login',async(req,res)=>{
    const USN = req.body.USN.toUpperCase();
    const user = await rooms.findOne({USN:USN}); 
    res.send(user)
})

module.exports = router;


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
