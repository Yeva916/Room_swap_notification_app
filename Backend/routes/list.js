const router = require('express').Router();
const db = require('../db');

const rooms = db.collection('rooms');
router.get('/getList',async(req,res)=>{
    // const response = req.body;
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
console.log(counter)
res.send(collection)
})

router.get('/test',async(req,res)=>{
    const distinct = await rooms.distinct("New Room\rNo. Alloted")
    res.send(distinct)
})

module.exports = router;

// output
// [
//     "Tummalapalli Sri Sai Sampath",
//     "Dokuparthi Mohan",
//     "Dhruv Narwat",
//     "Karthik H Gadagi",
//     "Chetan S Siddannavar",
//     "Ameetkumar",
//     "Mahantesh S Ingale",
//     "Prathamesh Basavant Sutar",
//     "Vishal Bhushan",
//     "Chipkar Yash Vivek",
//     "Suraj Krishna Banavalikar",
//     "Aadesh Deshatty",
//     "Abhijit Gautam",
//     "Darshan Rathod",
//     "Vishwanath Jahagirdar",
//     "Puneeth M C",
//     "Vishnu R G",
//     "Arman K B",
//     "Gokul K C",
//     "Akash",
//     "Veeresh M R",
//     "Neeraj Hiremath",
//     "Biliyannara Srijan Raviraj",
//     "Mallikarjun Chandrappa Jinara",
//     "Prajwal Kumar Mahajan",
//     "Abhijit Shivaji More",
//     "Jayakeerthi",
//     "Om Kumar",
//     "Jedla Guru Koushik Reddy",
//     "Mohit V S",
//     "Pavan Prakash Hebballi",
//     "Bharath",
//     "Yashwanth M",
//     "Mohammad Hamd Ashfaque",
//     "Lucky",
//     "Vinayak Dhar",
//     "Srujan B P",
//     "Adikeshavan D",
//     "Kalle Hitheswara Rao",
//     "C Lokaprathap Gowda",
//     "Prince Khatri",
//     "Prakhar Srivastava",
//     "Shashidhar Subhas Kusali",
//     "Saiabhilash Karashiddappa Bel",
//     "Abhay G Kulkarni",
//     "Omkar Sanjay Kulkarni",
//     "Hardik Bansal",
//     "Devesh Ahuja",
//     "Nitish Byadagihal",
//     "Kallanagouda Patil",
//     "Sudhish Mazumdar",
//     "Arya Saha",
//     "Shitij Algundi",
//     "Dhawan Hanamantagouda Patil",
//     "Anand",
//     "Abhay Maheshwari",
//     "Ladi Tilak",
//     "Kumar Aadarsh Suman",
//     "Vigensh Iyer",
//     "Anurag Singh",
//     "Vittal Gangappa Bhajantri",
//     "Vishwa",
//     "Sanjay Jaganur",
//     "Kavya Agarwal",
//     "Yeshwant I Kuriyavar",
//     "Aneesh Anandrao Kulkarni",
//     "Chinmaya R L",
//     "Soutrik Raha",
//     "Sambhav Heda",
//     "Aakash Kumar",
//     "Bharath S",
//     "Mahadev Kumar M",
//     "Mohammed Nadeemuddin",
//     "Shaikh Furqanuddin",
//     "Priyanshu Kumar Jha",
//     "Harish Gopi",
//     "Sai Prannesh S",
//     "Navya Ullas Rai",
//     "Abhishek",
//     "Arya N",
//     "Chinmai Suresh Naik",
//     "Saisamarth Rajendrakumar Jad",
//     "Karan Jamkhandi",
//     "Vinayak Suresh Sidnal",
//     "Vijay Veerabhadra Patil",
//     "Veerendra Pandurang Desai",
//     "Ishan Singh Chawla",
//     "Gubbala Siddharth Priyatam",
//     "Kubireddi Akshay",
//     "Shashank Patel",
//     "Jaiswal Sahil Sanjay",
//     "Sujal Sharma",
//     "Rishi Raj",
//     "Saksham Yadav",
//     "Yash Saxena",
//     "Utkarsh Dubey",
//     "Yerru Maneesh Kumar Reddy",
//     "Madineni Reddy Pudhvilah",
//     "Aryan Bhardwaj",
//     "Amay Ranjan",
//     "Atharv Shukla",
//     "Siddharth Singh",
//     "Archit K",
//     "Rohit Kumar",
//     "Shivansh Sharma",
//     "Anmol",
//     "Sushil Kumar",
//     "Sushant Mandla",
//     "Sumit Singh Bhutyal",
//     "Abhi Sharma",
//     "Ubaid Rashid Bhat",
//     "Ansh Sharma",
//     "Gurjeet Singh",
//     "Sandeep P",
//     "Lamondame Adrian Kharkango",
//     "Likha Kama",
//     "Vidhan Dhoka",
//     "Anish Dattatreya Tabib",
//     "Shreyas",
//     "Pratyush Mohanty",
//     "Nakshatra Pandey",
//     "Diptangshu Sarkar",
//     "Shivraj R",
//     "Kaja Mohit",
//     "Pullagura Kaustub",
//     "Ninad N Hebbar",
//     "Sagar S R",
//     "Swanand Rohit Gadwe",
//     "Gokul Raj",
//     "Rajnish Patel",
//     "Sannakki Vivekananda",
//     "Joshua Dsouza",
//     "Pramod Raj Prakash Rai",
//     "Abutalha SK",
//     "Om Jha",
//     "Kapale Krishna Shivaji",
//     "Atharv Dixit",
//     "Manyam Sai Sandilya",
//     "Venkata Lokesh Vemuri",
//     "Kartikey Mani Tripathi",
//     "Mohammad Adil Khan",
//     "Dhruv Gupta",
//     "Suraj Pratap Singh",
//     "Sarthak B Jha",
//     "Himank Sharma",
//     "Varun K",
//     "Gagan G N",
//     "Yash Ingale",
//     "Nishant Satish Pai",
//     "Karthik S Poojary",
//     "Darshan S K",
//     "Shashanka C",
//     "Saamarth Sharma",
//     "Raymond Nicholas A",
//     "Rithesh Hebbar K S",
//     "Siddhant Kumargouda Patil",
//     "Rakesh Kumar T",
//     "Kushal",
//     "Omkar A Shetti",
//     "Arpan Pal",
//     "Vashudev Jha",
//     "Subodh Kumar"
// ]