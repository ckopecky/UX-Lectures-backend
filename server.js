const express = require("express");
require("dotenv").config();
const server = express();

const port = process.env.PORT || 5000;

const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const database = "ux1lecturesdb";
const user = process.env.USERS; //when you use USER, the computer reads it as user of PC - so it read ckopecky and not what's in .env file. Don't user USER. 
const password = process.env.PW;

const lectureController = require("./lectureController");
const mongoOptions =  { useNewUrlParser: true } 
//database connection
mongoose.connect(`mongodb://${user}:${password}@ds153093.mlab.com:53093/heroku_lrgcbcfr`
    , mongoOptions)
    .then((mongoose)=> {
        console.log(`Connected to ${database} on mongoDb`);
    })
    .catch(err => {
        console.log({Error: err.message});
    });

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

