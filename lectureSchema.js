const mongoose = require('mongoose')


const lectureDefinition = {
    "Unit Title": {
        type: String,
        required: true,
        createIndex: true
    },
    "Module Title": {
        type: String,
        required: true,
        
    },
    "Video Title": {
        type: String,
        required: true,

    },  
    "Website-URL": { 
        type: String,
        required: true
    },
};

const lectureOptions = {
    timestamps: true
};

const lectureSchema = new mongoose.Schema(lectureDefinition, lectureOptions);

const lectureModel = mongoose.model("lecture-video", lectureSchema, "lecture-videos");
//lectureModel is the name of the collection
module.exports = lectureModel;