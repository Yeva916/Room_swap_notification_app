const router = require('express').Router();
const { getCollection } = require('../db'); // Import the getCollection function

router.post('/login', async (req, res) => {
    const USN = req.body.USN.toUpperCase();
    const rooms = getCollection('rooms'); // Access the collection

    try {
        const user = await rooms.findOne({ USN });
        console.log(user);

        if (!user) {
            return res.status(401).json({ message: 'Invalid USN' });
        }

        const roommates = await rooms.find({
            $or: [
                { "Present\rRoom No": user["Present\rRoom No"] },
                {
                    "New Room\rNo": user["New Room\rNo"],
                    "USN": { $ne: user.USN }
                }
            ]
        }).toArray();

        const responseData = {
            message: 'Login successful',
            user,
            roommates,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
