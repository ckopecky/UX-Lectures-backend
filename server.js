const express = require("express");
require("dotenv").config();
const server = express();

const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
var mongoose = require('mongoose');
const database = "ux1lecturesdb";
const user = process.env.USERS; //when you use USER, the computer reads it as user of PC - so it read ckopecky and not what's in .env file. Don't user USER. 
const password = process.env.PW;
const mysecret = "You're a wizard, Harry";
const mongoOptions = {useNewUrlParser: true}
const lectureController = require("./lectureController");
const authController = require("./authController");
//database connection
// var url = `mongodb://localhost:27017/${database}`;
var url = `mongodb://cmvnk:UX1Lectures@ds145093.mlab.com:45093/ux1lecturesdb`;


mongoose.connect(url,mongoOptions, (err, db)=>{
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', database);
    }

})
//middleware

//local
//restricted function goes here for auth later
const authenticate = (req, res, next) => {
    // You won't need to change anything in this file here.
    const token = req.headers.authorization;
    console.log("get token", token)
    
    if (token) { //token authentication on server side
        jwt.verify(token, mysecret, (err, decodedToken) => {
        console.log("decoded Token", decodedToken);
        if(err){
            return res
                .status(401)
                .json({ message: 'you shall not pass! not decoded', err });
        }

        next();
    });
    } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
    }
}

//global



server.use((req, res, next) => {
    res.setHeader('Authorization');
    next();
});
const corsOptions = {
    origin: '*',
    credentials: true 
}

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

server.use("/api/lectures/", authenticate, lectureController);
server.use("/auth/", authController);




server.get("/", (req, res) => {
    res.send({Success: "api is working..."});
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

