const express = require("express");
require("dotenv").config();
const server = express();

const port = process.env.PORT || 5000;

const cors = require("cors");
const helmet = require("helmet");
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const database = "ux1lecturesdb";
const user = process.env.USERS; //when you use USER, the computer reads it as user of PC - so it read ckopecky and not what's in .env file. Don't user USER. 
const password = process.env.PW;

const lectureController = require("./lectureController");
//database connection
// var url = `mongodb://localhost:27017/${database}`;
var url = `mongodb://${user}:${password}@ds145093.mlab.com:45093/${database}`;


MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
    }
})
//middleware

//local
//restricted function goes here for auth later



//global

const corsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Cross Site Allowance
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

server.use("/api/lectures/", lectureController);




server.get("/", (req, res) => {
    res.send({Success: "api is working..."});
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

