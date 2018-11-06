const router = require("express").Router();
const LectureModel = require("./lectureSchema");

    
const get = (req, res) => { //works
    LectureModel.find()
        .then(lectures => {
            console.log(lectures);
            if(lectures.length===0){
                res.status(404).json({Message: "lectures not found"})
            } else {
                res.status(200).json(lectures);
            }
        
        })
        .catch(err => {
            res.status(500).json({Error: "There was an error in retrieving lectures", err});
        });

};

const getId = (req, res) => { //works
    const { id } = req.params;
    if(!id){
        res.status(400).json({Error: "The specified id doesn't not exist"})
    } else{
        Notes.findById(id)
            .then(note => {
                if(note.length===0){
                    res.status(404).json({Error: "Lecture could not be found"});
                } else {
                    res.status(200).json(note);
                }
            })
            .catch(err => {
                res.status(500).json({Error: err.message});
            });
    };
        
};

// "./api/lectures/"
router.route("/")
    .get(get);

router.route("/:id")
    .get(getId)



module.exports = router;