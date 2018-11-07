const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true
        
    },
    confirmPassword: {
        type: String,
        minlength: 4,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }

});

UserSchema.pre('save', function(next) {
    return bcrypt
        .hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            return next(err);
        });
});

UserSchema.methods.validatePassword = function(guess) {
    return bcrypt.compare(guess, this.password);
};

module.exports = mongoose.model('User', UserSchema);