const router = require('express').Router();
const db = require('../db');

var USN = ''
router.post('/willing', async (req, res) => {
    try {
        const rooms = db.getCollection('rooms'); // Get the collection here
        const response = req.body;

        const user = await rooms.findOne({ USN: response.USN });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const update = { $set: { willing: response.willing } };
        await rooms.updateOne({ USN: response.USN }, update);
        res.send(user);
    } catch (error) {
        console.error('Error in /willing route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/getdata', async (req, res) => {
    try {
        const rooms = db.getCollection('rooms');
        const USN = req.body.USN.toUpperCase();
        const user = await rooms.findOne({ USN: USN });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.send(user);
    } catch (error) {
        console.error('Error in /getdata route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/getprevious', async (req, res) => {
    try {
        const rooms = db.getCollection('rooms');
        const USN = req.body.USN.toUpperCase();
        const user = await rooms.findOne({ USN: USN });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const prevRoommate = await rooms.find({
            "Present\rRoom No": {
                "": user["Present\rRoom No"][""]
            },
            "USN": {
                $ne: user.USN
            }
        }).toArray();
        res.send(prevRoommate);
    } catch (error) {
        console.error('Error in /getprevious route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/getnew', async (req, res) => {
    try {
        const rooms = db.getCollection('rooms');
        const USN = req.body.USN.toUpperCase();
        const user = await rooms.findOne({ USN: USN });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newRoommate = await rooms.find({
            "New Room\rNo": {
                " Alloted": user["New Room\rNo"][" Alloted"]
            },
            "USN": {
                $ne: user.USN
            }
        }).toArray();
        res.send(newRoommate);
    } catch (error) {
        console.error('Error in /getnew route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/setUSN',async(req,res)=>{
    USN=req.body.USN
    res.send({message:'USN set successfully'})
})
router.get('/getUSN',async(req,res)=>{
    res.send({USN})
})
module.exports = router;
