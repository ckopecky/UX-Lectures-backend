const User = require('./authSchema');
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mysecret = "You're a wizard, Harry";

const generateToken = (user) => {
    const options = {
        expiresIn: "1h",
    };
    const payload = {
        username: user.username
    }; // what will determine our payload.
    return jwt.sign(payload, mysecret, options); // creates our JWT with a secret and a payload and a hash.
}

    const register = (req, res) => {
        // create user takes in the username and password and saves a user.
        // our pre save hook should kick in here saving this user to the DB with an encrypted password.
        const { username, password, confirmPassword, firstName, lastName, email } = req.body;
        User
            .create({ username, password, firstName, lastName, email})
            .then(user => {
            if(user.username){
                const token = generateToken(user);
                res.status(201).json({user: user.username, token});
            }
            else{
                res.status(422).json({Error:err.message})
            }
            })
            .catch(err => {
            res.status(500).json({Error: err.message});
            });
        };

    const login = (req, res) => {
        const { username, password } = req.body;
        User.findOne({ username }, (err, user) => {
            if (err) {
                res.status(403).json({ error: 'Invalid Username/Password' });
                return;
            }
            else if (user === null || user === undefined) {
                res.status(422).json({ error: 'No user with that username in our DB' });
                return;
            } else{
                user.validatePassword(password)
                // This is an example of using our User.method from our model.
                .then(hashMatch => {
                if (hashMatch) {
                    const token = generateToken(user);
                    res.status(200).json({ message: `Hello, ${user.username}`, token }); 
                    return;
                    // sends the token back to the client
                }
                else {
                    res.status(422).json({ error: 'Invalid password' });
                    return;
                }
                })
                .catch(err => {
                    res.status(500).json({Error: err.message});
                });
            }
        });
    };

    const get = (req, res) => { //works
        User.find()
            .then(users => {
                console.log(users);
                if(users.length===0){
                    res.status(404).json({Message: "users not found"})
                } else {
                    res.status(200).json(users);
                }
            
            })
            .catch(err => {
                res.status(500).json({Error: "There was an error in retrieving lectures", err});
            });
    
    };
    router.route("/register")
        .post(register);

    router.route("/login")
        .post(login);

    router.route("/users")
        .get(get);

    module.exports = router;