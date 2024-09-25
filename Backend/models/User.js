// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Assuming you're using ObjectId
    USN: {
        type: String,
        required: true,
        unique: true,
        set: v => v.toLowerCase(), // Automatically convert to lowercase
    },
    Names: String,
    Sem: String,
    Branch: String,
    PresentRoomNo: Object, // Define according to your actual schema
    NewRoomNo: Object, // Define according to your actual schema
    Amount: String // Change type if needed
});

const User = mongoose.model('User', userSchema);

export default User;
